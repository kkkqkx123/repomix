/**
 * 模板引擎，用于替代 handlebars
 */

export interface TemplateContext {
  [key: string]: any;
}

export interface TemplateHelpers {
  [key: string]: Function;
}

const processCondition = (template: string, context: TemplateContext, condition: string, negate = false): string => {
  const conditionValue = context[condition];
  const conditionMet = Boolean(conditionValue) !== negate;

  const regex = new RegExp(`\{\{#${negate ? 'unless' : 'if'} ${condition}\}\}(.*?)\{\{\/${negate ? 'unless' : 'if'}\}\}`, 'gs');

  return template.replace(regex, (_, content) => {
    return conditionMet ? processTemplate(content, context, {}) : '';
  });
};

const processEach = (template: string, context: TemplateContext, arrayName: string, helpers: TemplateHelpers): string => {
  const arrayValue = context[arrayName];
  if (!Array.isArray(arrayValue)) {
    return template.replace(new RegExp(`\{\{#each ${arrayName}\}\}.*?\{\{\/each\}\}`, 'gs'), '');
  }

  const regex = new RegExp(`\{\{#each ${arrayName}\}\}(.*?)\{\{\/each\}\}`, 'gs');

  return template.replace(regex, (_, content) => {
    return arrayValue.map((item, index) => {
      const itemContext = {
        ...context,
        this: item,
        '@index': index,
        '@first': index === 0,
        '@last': index === arrayValue.length - 1
      };

      return processTemplate(content, itemContext, helpers);
    }).join('');
  });
};

const processVariables = (template: string, context: TemplateContext, helpers: TemplateHelpers): string => {
  // Process custom helpers like getFileExtension
  template = template.replace(/\{\{(\w+)\s+(.+?)\}\}/g, (match: string, helperName: string, params: string) => {
    if (helpers[helperName]) {
      const paramValues = params.trim().split(/\s+/).map((param: string) => {
        // Check if it's a variable reference or a literal
        if (param.startsWith('"') && param.endsWith('"')) {
          return param.slice(1, -1); // Remove quotes for string literals
        } else {
          // Get the value from context
          return getNestedProperty(context, param);
        }
      });

      try {
        return helpers[helperName](...paramValues);
      } catch (e) {
        console.error(`Error executing helper ${helperName}:`, e);
        return '';
      }
    }
    return match; // Return original if helper not found
  });

  // Process triple curly braces (unescaped) - including ../ references
  template = template.replace(/\{\{\{([^}]+)\}\}\}/g, (match: string, variable: string) => {
    const varTrimmed = variable.trim();
    let value;

    // Handle ../ references (parent context)
    if (varTrimmed.startsWith('../')) {
      // This assumes parent context is available in a specific way
      // For now, we'll just try to access it from the main context
      value = getNestedProperty(context, varTrimmed.substring(3)); // Remove '../'
    } else {
      value = getNestedProperty(context, varTrimmed);
    }

    return value != null ? String(value) : '';
  });

  // Process double curly braces (escaped) - including ../ references
  template = template.replace(/\{\{([^}]+)\}\}/g, (match: string, variable: string) => {
    const varTrimmed = variable.trim();
    let value;

    // Handle ../ references (parent context)
    if (varTrimmed.startsWith('../')) {
      // This assumes parent context is available in a specific way
      // For now, we'll just try to access it from the main context
      value = getNestedProperty(context, varTrimmed.substring(3)); // Remove '../'
    } else {
      value = getNestedProperty(context, varTrimmed);
    }

    return value != null ? escapeHtml(String(value)) : '';
  });

  return template;
};

const getNestedProperty = (obj: any, path: string): any => {
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current == null) {
      return undefined;
    }
    current = current[part];
  }

  return current;
};

const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, (m) => map[m]);
};

export const processTemplate = (template: string, context: TemplateContext, helpers: TemplateHelpers = {}): string => {
  let result = template;

  // Process conditions first
  let prevResult: string;
  do {
    prevResult = result;
    // Process all {{#if}} statements
    const ifMatches = result.match(/\{\{#if ([^}]+)\}\}[\s\S]*?\{\{\/if\}\}/g);
    if (ifMatches) {
      for (const match of ifMatches) {
        const condition = match.match(/\{\{#if ([^}]+)\}\}/)?.[1]?.trim();
        if (condition) {
          result = processCondition(result, context, condition, false);
        }
      }
    }

    // Process all {{#unless}} statements
    const unlessMatches = result.match(/\{\{#unless ([^}]+)\}\}[\s\S]*?\{\{\/unless\}\}/g);
    if (unlessMatches) {
      for (const match of unlessMatches) {
        const condition = match.match(/\{\{#unless ([^}]+)\}\}/)?.[1]?.trim();
        if (condition) {
          result = processCondition(result, context, condition, true);
        }
      }
    }
  } while (result !== prevResult);

  // Process each loops
  let eachPrevResult: string;
  do {
    eachPrevResult = result;
    const eachMatches = result.match(/\{\{#each ([^}]+)\}\}[\s\S]*?\{\{\/each\}\}/g);
    if (eachMatches) {
      for (const match of eachMatches) {
        const arrayName = match.match(/\{\{#each ([^}]+)\}\}/)?.[1]?.trim();
        if (arrayName) {
          result = processEach(result, context, arrayName, helpers);
        }
      }
    }
  } while (result !== eachPrevResult);

  // Process variables
  result = processVariables(result, context, helpers);

  return result;
};