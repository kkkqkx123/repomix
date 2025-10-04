import { globby } from 'globby';
import path from 'node:path';
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
 * 使用glob模式匹配文件
 */
export const matchFilesByPattern = async (
  patterns: string[],
  options: FilePatternOptions
): Promise<FilePatternResult> => {
  if (!patterns || patterns.length === 0) {
    throw new RepomixError('No file patterns provided');
  }

  logger.trace('Matching files with patterns:', patterns);
  
  try {
    const escapedPatterns = patterns.map(pattern => escapeGlobPattern(pattern));
    
    const filePaths = await globby(escapedPatterns, {
      cwd: options.cwd,
      ignore: options.ignorePatterns,
      onlyFiles: true,
      absolute: options.absolute ?? false,
      dot: true,
      followSymbolicLinks: false,
    });

    // 转换为相对路径
    const relativePaths = filePaths.map(filePath => 
      options.absolute ? path.relative(options.cwd, filePath) : filePath
    );

    logger.trace(`Matched ${filePaths.length} files with patterns`);
    
    return {
      filePaths: options.absolute ? filePaths : filePaths.map(p => path.join(options.cwd, p)),
      relativePaths
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
  return patterns.map(pattern => {
    // 如果模式已经是绝对路径，转换为相对路径
    if (path.isAbsolute(pattern)) {
      return path.relative(cwd, pattern);
    }
    return pattern;
  });
};