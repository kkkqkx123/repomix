import fs from 'node:fs/promises';
import path from 'node:path';
import { globby } from 'globby';
import { RepomixError } from '../../shared/errorHandle.js';
import { logger } from '../../shared/logger.js';
import { escapeGlobPattern } from './fileSearch.js';

export interface FilePatternOptions {
  cwd: string;
  ignorePatterns: string[];
  absolute?: boolean;
}

export interface FilePatternResult {
  filePaths: string[];
  relativePaths: string[];
}

/**
 * 检测模式是否包含glob特殊字符
 */
const containsGlobSpecialChars = (pattern: string): boolean => {
  // 检查是否包含glob特殊字符：*, ?, [, ], {, }, **
  return /[*?[\]{}]|\*\*/.test(pattern);
};

/**
 * 使用glob模式匹配文件
 * 支持精确文件路径匹配和glob模式匹配
 */
export const matchFilesByPattern = async (
  patterns: string[],
  options: FilePatternOptions,
): Promise<FilePatternResult> => {
  console.log('=== matchFilesByPattern STARTED ===');
  console.log('Patterns:', patterns);
  console.log('Ignore patterns:', options.ignorePatterns);
  console.log('CWD:', options.cwd);

  if (!patterns || patterns.length === 0) {
    throw new RepomixError('No file patterns provided');
  }

  logger.trace('Matching files with patterns:', patterns);
  logger.trace('Using ignore patterns:', options.ignorePatterns);

  const allFilePaths: string[] = [];
  const allRelativePaths: string[] = [];

  // 添加更多调试：检查每个模式处理过程
  for (const pattern of patterns) {
    console.log(`Processing pattern: "${pattern}"`);
    console.log(`Contains glob chars: ${containsGlobSpecialChars(pattern)}`);
  }

  try {
    // 处理每个模式
    for (const pattern of patterns) {
      let patternFilePaths: string[] = [];

      // 检查是否是精确文件路径（不包含glob特殊字符）
      if (!containsGlobSpecialChars(pattern)) {
        console.log(`Trying exact file match for: ${pattern}`);
        // 尝试作为精确文件路径匹配
        const fullPath = path.resolve(options.cwd, pattern);
        console.log(`Full path: ${fullPath}`);
        try {
          const stats = await fs.stat(fullPath);
          console.log(`File stats found, isFile: ${stats.isFile()}`);
          if (stats.isFile()) {
            // 文件存在，添加到结果中
            // 使用相对路径，确保与glob结果一致
            const relativePath = path.relative(options.cwd, fullPath);
            patternFilePaths = [options.absolute ? fullPath : relativePath];
            logger.trace(`Exact file match found: ${pattern} -> ${relativePath}`);
            console.log(`Exact file match SUCCESS: ${pattern} -> ${relativePath}`);
          }
        } catch (error) {
          // 文件不存在，继续尝试glob匹配
          console.log(`Exact file match FAILED for ${pattern}, trying glob: ${error}`);
          logger.trace(`Exact file not found, trying glob match: ${pattern}`);
        }
      }

      // 如果没有找到精确匹配，使用glob匹配
      if (patternFilePaths.length === 0) {
        console.log(`Using glob matching for pattern: ${pattern}`);
        const escapedPattern = escapeGlobPattern(pattern);
        console.log(`Escaped pattern: ${escapedPattern}`);
        console.log(`Globby options:`, {
          cwd: options.cwd,
          ignore: options.ignorePatterns,
          onlyFiles: true,
          absolute: options.absolute ?? false,
          dot: true,
          followSymbolicLinks: false,
        });
        const globResult = await globby([escapedPattern], {
          cwd: options.cwd,
          ignore: options.ignorePatterns,
          onlyFiles: true,
          absolute: options.absolute ?? false,
          dot: true,
          followSymbolicLinks: false,
        });
        console.log(`Glob result for ${pattern}:`, globResult);
        patternFilePaths = globResult;
        logger.trace(`Glob match found ${globResult.length} files for pattern: ${pattern}`);
      }

      // 添加到总结果中
      allFilePaths.push(...patternFilePaths);

      // 转换为相对路径
      const relativePaths = patternFilePaths.map((filePath) =>
        options.absolute ? path.relative(options.cwd, filePath) : filePath,
      );
      allRelativePaths.push(...relativePaths);
    }

    // 去重
    const uniqueFilePaths = [...new Set(allFilePaths)];
    const uniqueRelativePaths = [...new Set(allRelativePaths)];

    logger.trace(`Matched ${uniqueFilePaths.length} unique files with patterns`);

    return {
      filePaths: uniqueFilePaths,
      relativePaths: uniqueRelativePaths,
    };
  } catch (error) {
    logger.error('Error matching files by pattern:', error);
    throw new RepomixError(`Failed to match files with patterns: ${patterns.join(', ')}`);
  }
};

/**
 * 验证文件模式是否有效
 */
export const validateFilePatterns = (patterns: string[]): string[] => {
  const invalidPatterns: string[] = [];

  for (const pattern of patterns) {
    if (!pattern || typeof pattern !== 'string' || pattern.trim() === '') {
      invalidPatterns.push(pattern);
    }
  }

  return invalidPatterns;
};

/**
 * 处理相对路径模式，确保相对于当前工作目录
 */
export const normalizePatterns = (patterns: string[], cwd: string): string[] => {
  return patterns.map((pattern) => {
    // 如果模式已经是绝对路径，转换为相对路径
    if (path.isAbsolute(pattern)) {
      return path.relative(cwd, pattern);
    }
    return pattern;
  });
};
