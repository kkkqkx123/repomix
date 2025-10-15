import path from 'node:path';
import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import { collectFiles as collectFilesByPath } from './fileCollect.js';
import { matchFilesByPattern } from './filePattern.js';
import { searchFiles } from './fileSearch.js';

export interface FileCollectionOptions {
  rootDir: string;
  config: RepomixConfigMerged;
  progressCallback?: RepomixProgressCallback;
  filePatterns?: string[];
  flattenPaths?: boolean;
}

export interface FileCollectionResult {
  filePaths: string[];
  rawFiles: any[]; // 使用现有类型
  skippedFiles: any[]; // 使用现有类型
}

/**
 * 基于文件模式收集文件
 */
export const collectFilesByPattern = async (options: FileCollectionOptions): Promise<FileCollectionResult> => {
  console.log('=== collectFilesByPattern called ===');
  console.log('Root dir:', options.rootDir);
  console.log('File patterns:', options.filePatterns);
  console.log('Flatten paths:', options.flattenPaths);
  const { rootDir, config, progressCallback, filePatterns, flattenPaths } = options;

  if (filePatterns && filePatterns.length > 0) {
    // 构建忽略模式列表
    // 使用与searchFiles相同的逻辑：当useDefaultPatterns为true时使用getIgnorePatterns，否则只使用自定义模式和输出文件
    const ignorePatterns: string[] = [];

    if (config.ignore.useDefaultPatterns) {
      // 从fileSearch.ts导入完整的忽略模式（包括默认、自定义、输出文件等）
      const { getIgnorePatterns } = await import('./fileSearch.js');
      const fullPatterns = await getIgnorePatterns(rootDir, config);
      ignorePatterns.push(...fullPatterns);
    } else {
      // 当useDefaultPatterns为false时，只添加自定义忽略模式和输出文件
      if (config.ignore.customPatterns) {
        ignorePatterns.push(...config.ignore.customPatterns);
      }

      // 添加输出文件（避免递归包含）
      if (config.output.filePath) {
        const path = await import('node:path');
        const absoluteOutputPath = path.resolve(config.cwd, config.output.filePath);
        const relativeToTargetPath = path.relative(rootDir, absoluteOutputPath);
        ignorePatterns.push(relativeToTargetPath);
      }

      // 当useDefaultPatterns为false时，手动添加.git忽略模式
      ignorePatterns.push('.git/**');
    }

    // 调试日志
    console.log('Using ignore patterns:', ignorePatterns);
    console.log('File patterns:', filePatterns);

    // 使用文件模式匹配
    const patternResult = await matchFilesByPattern(filePatterns, {
      cwd: rootDir,
      ignorePatterns: ignorePatterns,
      absolute: false, // 使用相对路径
    });

    // 如果需要扁平化路径，处理相对路径
    let finalFilePaths = patternResult.filePaths;
    if (flattenPaths) {
      // 扁平化处理：将相对路径扁平化，保持文件在根目录下
      finalFilePaths = patternResult.relativePaths.map((relativePath) => {
        const fileName = path.basename(relativePath);
        return path.join(rootDir, fileName);
      });
      // 扁平化路径需要转换为绝对路径
      finalFilePaths = finalFilePaths.map((filePath) => path.resolve(rootDir, filePath));
    } else {
      // 非扁平化路径：使用相对路径（collectFilesByPath期望相对路径）
      finalFilePaths = patternResult.relativePaths;
    }

    // 使用现有的文件收集逻辑
    const collectResult = await collectFilesByPath(finalFilePaths, rootDir, config, progressCallback);

    return {
      filePaths: finalFilePaths,
      rawFiles: collectResult.rawFiles,
      skippedFiles: collectResult.skippedFiles,
    };
  } else {
    // 使用现有的目录搜索逻辑
    const searchResult = await searchFiles(rootDir, config);
    const collectResult = await collectFilesByPath(searchResult.filePaths, rootDir, config, progressCallback);

    return {
      filePaths: searchResult.filePaths,
      rawFiles: collectResult.rawFiles,
      skippedFiles: collectResult.skippedFiles,
    };
  }
};

/**
 * 合并文件和目录收集结果
 */
export const mergeFileCollections = async (collections: FileCollectionResult[]): Promise<FileCollectionResult> => {
  const allFilePaths: string[] = [];
  const allRawFiles: any[] = [];
  const allSkippedFiles: any[] = [];

  for (const collection of collections) {
    allFilePaths.push(...collection.filePaths);
    allRawFiles.push(...collection.rawFiles);
    allSkippedFiles.push(...collection.skippedFiles);
  }

  // 去重处理
  const uniqueFilePaths = [...new Set(allFilePaths)];
  const uniqueRawFiles = allRawFiles.filter(
    (file, index, self) => index === self.findIndex((f) => f.path === file.path),
  );
  const uniqueSkippedFiles = allSkippedFiles.filter(
    (file, index, self) => index === self.findIndex((f) => f.path === file.path),
  );

  return {
    filePaths: uniqueFilePaths,
    rawFiles: uniqueRawFiles,
    skippedFiles: uniqueSkippedFiles,
  };
};
