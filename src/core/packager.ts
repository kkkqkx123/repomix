import type { RepomixConfigMerged } from '../config/configSchema.js';
import { logMemoryUsage, withMemoryLogging } from '../shared/memoryUtils.js';
import type { RepomixProgressCallback } from '../shared/types.js';
import { collectFiles, type SkippedFileInfo } from './file/fileCollect.js';
import { collectFilesByPattern } from './file/fileCollector.js';
import { sortPaths } from './file/filePathSort.js';
import { processFiles } from './file/fileProcess.js';
import { searchFiles } from './file/fileSearch.js';
import type { ProcessedFile } from './file/fileTypes.js';
import { applyFlattenedPaths, flattenPaths } from './file/pathFlattener.js';
import { type GitDiffResult, getGitDiffs } from './git/gitDiffHandle.js';
import { type GitLogResult, getGitLogs } from './git/gitLogHandle.js';
import { calculateMetrics } from './metrics/calculateMetrics.js';
import { generateOutput } from './output/outputGenerate.js';
import { writeOutputToDisk } from './packager/writeOutputToDisk.js';

export interface PackResult {
  totalFiles: number;
  totalCharacters: number;
  totalTokens: number;
  fileCharCounts: Record<string, number>;
  fileTokenCounts: Record<string, number>;
  gitDiffTokenCount: number;
  gitLogTokenCount: number;
  suspiciousFilesResults: never[]; // Empty array since security check is removed
  suspiciousGitDiffResults: never[]; // Empty array since security check is removed
  suspiciousGitLogResults: never[]; // Empty array since security check is removed
  processedFiles: ProcessedFile[];
  safeFilePaths: string[];
  skippedFiles: SkippedFileInfo[];
}

const defaultDeps = {
  searchFiles,
  collectFiles,
  processFiles,
  generateOutput,
  writeOutputToDisk,
  calculateMetrics,
  sortPaths,
  getGitDiffs,
  getGitLogs,
};

export const pack = async (
  rootDirs: string[],
  config: RepomixConfigMerged,
  progressCallback: RepomixProgressCallback = () => {},
  overrideDeps: Partial<typeof defaultDeps> = {},
  explicitFiles?: string[],
  filePatterns?: string[],
  flattenPathsOption?: boolean,
): Promise<PackResult> => {
  const deps = {
    ...defaultDeps,
    ...overrideDeps,
  };

  logMemoryUsage('Pack - Start');

  // 优先处理文件模式匹配
  let filePathsByDir: Array<{ rootDir: string; filePaths: string[] }>;
  let rawFiles;
  let allSkippedFiles;

  if (filePatterns && filePatterns.length > 0) {
    progressCallback('Collecting files by patterns...');
    const collectionResult = await withMemoryLogging(
      'Collect Files by Pattern',
      async () =>
        await collectFilesByPattern({
          rootDir: rootDirs[0],
          config,
          progressCallback,
          filePatterns,
          flattenPaths: flattenPathsOption,
        }),
    );

    // 如果启用路径扁平化，处理文件路径
    if (flattenPathsOption) {
      progressCallback('Flattening paths...');
      const flattenedPaths = flattenPaths(collectionResult.rawFiles.map((file) => file.filePath));
      collectionResult.rawFiles = applyFlattenedPaths(collectionResult.rawFiles, flattenedPaths);
    }

    // 直接使用收集的文件结果
    rawFiles = collectionResult.rawFiles;
    allSkippedFiles = collectionResult.skippedFiles;

    filePathsByDir = [
      {
        rootDir: rootDirs[0], // 对于文件模式匹配，使用第一个根目录
        filePaths: collectionResult.rawFiles.map((file) => file.filePath),
      },
    ];
  } else {
    // 原有逻辑：基于目录搜索文件
    progressCallback('Searching for files...');
    filePathsByDir = await withMemoryLogging('Search Files', async () =>
      Promise.all(
        rootDirs.map(async (rootDir) => ({
          rootDir,
          filePaths: (await deps.searchFiles(rootDir, config, explicitFiles)).filePaths,
        })),
      ),
    );

    // 原有逻辑：排序和收集文件
    progressCallback('Sorting files...');
    const allFilePaths = filePathsByDir.flatMap(({ filePaths }) => filePaths);
    const sortedFilePaths = deps.sortPaths(allFilePaths);

    // Regroup sorted file paths by rootDir
    const sortedFilePathsByDir = rootDirs.map((rootDir) => ({
      rootDir,
      filePaths: sortedFilePaths.filter((filePath: string) =>
        filePathsByDir.find((item) => item.rootDir === rootDir)?.filePaths.includes(filePath),
      ),
    }));

    progressCallback('Collecting files...');
    const collectResults = await withMemoryLogging(
      'Collect Files',
      async () =>
        await Promise.all(
          sortedFilePathsByDir.map(({ rootDir, filePaths }) =>
            deps.collectFiles(filePaths, rootDir, config, progressCallback),
          ),
        ),
    );

    rawFiles = collectResults.flatMap((curr) => curr.rawFiles);
    allSkippedFiles = collectResults.flatMap((curr) => curr.skippedFiles);
  }

  // Get git diffs if enabled - run this before security check
  let gitDiffResult: GitDiffResult | undefined;
  if (config.output.git?.includeDiffs) {
    progressCallback('Getting git diffs...');
    gitDiffResult = await deps.getGitDiffs(rootDirs, config);
  }

  // Get git logs if enabled - run this before security check
  let gitLogResult: GitLogResult | undefined;
  if (config.output.git?.includeLogs) {
    progressCallback('Getting git logs...');
    gitLogResult = await deps.getGitLogs(rootDirs, config);
  }

  // Since security check is removed, use all files directly
  const safeRawFiles = rawFiles;
  const safeFilePaths = rawFiles.map(file => file.path);
  const suspiciousFilesResults: never[] = []; // Empty array since security check is removed
  const suspiciousGitDiffResults: never[] = []; // Empty array since security check is removed
  const suspiciousGitLogResults: never[] = []; // Empty array since security check is removed

  // Process files (remove comments, etc.)
  progressCallback('Processing files...');
  const processedFiles = await withMemoryLogging('Process Files', () =>
    deps.processFiles(safeRawFiles, config, progressCallback),
  );

  progressCallback('Generating output...');
  const output = await withMemoryLogging('Generate Output', () =>
    deps.generateOutput(rootDirs, config, processedFiles, safeFilePaths, gitDiffResult, gitLogResult),
  );

  progressCallback('Writing output file...');
  await withMemoryLogging('Write Output', () => deps.writeOutputToDisk(output, config));


  const metrics = await withMemoryLogging('Calculate Metrics', () =>
    deps.calculateMetrics(processedFiles, output, progressCallback, config, gitDiffResult, gitLogResult),
  );

  // Create a result object that includes metrics and security results
  const result = {
    ...metrics,
    suspiciousFilesResults,
    suspiciousGitDiffResults,
    suspiciousGitLogResults,
    processedFiles,
    safeFilePaths,
    skippedFiles: allSkippedFiles,
  };

  logMemoryUsage('Pack - End');

  return result;
};
