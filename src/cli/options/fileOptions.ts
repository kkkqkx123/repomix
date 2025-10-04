import { Option } from 'commander';

export interface FileOptions {
  files?: string | string[];
  flatten?: boolean;
}

/**
 * 创建文件相关CLI选项
 */
export const createFileOptions = () => {
  const fileOption = new Option(
    '-f, --files <patterns...>',
    '指定需要包含的glob文件模式（支持多个模式）'
  );
  
  const flattenOption = new Option(
    '-F, --flatten',
    '启用路径扁平化（只保留文件名，不包含目录结构）'
  );
  
  return [fileOption, flattenOption];
};

/**
 * 验证文件选项
 */
export const validateFileOptions = (options: FileOptions): string[] => {
  const errors: string[] = [];
  
  if (options.files && options.files.length === 0) {
    errors.push('--files 选项需要至少一个文件模式');
  }
  
  if (options.flatten && !options.files) {
    errors.push('--flatten 选项需要与 --files 选项一起使用');
  }
  
  return errors;
};

/**
 * 解析文件模式字符串
 */
export const parseFilePatterns = (patterns: string | string[]): string[] => {
  if (typeof patterns === 'string') {
    // 支持逗号分隔的模式
    return patterns.split(',').map(p => p.trim()).filter(p => p.length > 0);
  }
  
  if (Array.isArray(patterns)) {
    return patterns.flatMap(p => 
      typeof p === 'string' ? p.split(',').map(s => s.trim()).filter(s => s.length > 0) : []
    );
  }
  
  return [];
};

/**
 * 获取默认文件选项
 */
export const getDefaultFileOptions = (): FileOptions => ({
  files: undefined,
  flatten: false
});