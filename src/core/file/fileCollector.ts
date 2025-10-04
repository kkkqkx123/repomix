import type { RepomixConfigMerged } from '../../config/configSchema.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import { collectFiles as collectFilesByPath } from './fileCollect.js';
import { searchFiles } from './fileSearch.js';
import { matchFilesByPattern } from './filePattern.js';
import path from 'node:path';

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
export const collectFilesByPattern = async (
  options: FileCollectionOptions
): Promise<FileCollectionResult> => {
  const { rootDir, config, progressCallback, filePatterns, flattenPaths } = options;
  
  if (filePatterns && filePatterns.length > 0) {
    // 使用文件模式匹配
    const patternResult = await matchFilesByPattern(filePatterns, {
      cwd: rootDir,
      ignorePatterns: config.ignore.customPatterns || [],
      absolute: false // 使用相对路径
    });
    
    // 如果需要扁平化路径，处理相对路径
    let finalFilePaths = patternResult.filePaths;
    if (flattenPaths) {
      // 扁平化处理：将相对路径扁平化，保持文件在根目录下
      finalFilePaths = patternResult.relativePaths.map(relativePath => {
        const fileName = path.basename(relativePath);
        return path.join(rootDir, fileName);
      });
    }
    
    // 确保路径格式正确 - 转换为绝对路径
    finalFilePaths = finalFilePaths.map(filePath => path.resolve(rootDir, filePath));
    
    // 使用现有的文件收集逻辑
    const collectResult = await collectFilesByPath(
      finalFilePaths,
      rootDir,
      config,
      progressCallback
    );
    
    return {
      filePaths: finalFilePaths,
      rawFiles: collectResult.rawFiles,
      skippedFiles: collectResult.skippedFiles
    };
  } else {
    // 使用现有的目录搜索逻辑
    const searchResult = await searchFiles(rootDir, config);
    const collectResult = await collectFilesByPath(
      searchResult.filePaths,
      rootDir,
      config,
      progressCallback
    );
    
    return {
      filePaths: searchResult.filePaths,
      rawFiles: collectResult.rawFiles,
      skippedFiles: collectResult.skippedFiles
    };
  }
};

/**
 * 合并文件和目录收集结果
 */
export const mergeFileCollections = async (
  collections: FileCollectionResult[]
): Promise<FileCollectionResult> => {
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
  const uniqueRawFiles = allRawFiles.filter((file, index, self) => 
    index === self.findIndex(f => f.path === file.path)
  );
  const uniqueSkippedFiles = allSkippedFiles.filter((file, index, self) => 
    index === self.findIndex(f => f.path === file.path)
  );
  
  return {
    filePaths: uniqueFilePaths,
    rawFiles: uniqueRawFiles,
    skippedFiles: uniqueSkippedFiles
  };
};
