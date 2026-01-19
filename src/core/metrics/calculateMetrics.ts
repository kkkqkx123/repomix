import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { initTaskRunner, type TaskRunner } from '../../shared/processConcurrency.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { ProcessedFile } from '../file/fileTypes.js';
import type { GitDiffResult } from '../git/gitDiffHandle.js';
import type { GitLogResult } from '../git/gitLogHandle.js';
import { calculateGitDiffMetrics } from './calculateGitDiffMetrics.js';
import { calculateGitLogMetrics } from './calculateGitLogMetrics.js';
import { calculateOutputMetrics } from './calculateOutputMetrics.js';
import { calculateSelectiveFileMetrics } from './calculateSelectiveFileMetrics.js';
import { getTokenCounter } from './tokenCounterFactory.js';
import type { TokenCountTask } from './workers/calculateMetricsWorker.js';

export interface CalculateMetricsResult {
  totalFiles: number;
  totalCharacters: number;
  totalTokens: number;
  fileCharCounts: Record<string, number>;
  fileTokenCounts: Record<string, number>;
  gitDiffTokenCount: number;
  gitLogTokenCount: number;
}

export const calculateMetrics = async (
  processedFiles: ProcessedFile[],
  output: string,
  progressCallback: RepomixProgressCallback,
  config: RepomixConfigMerged,
  gitDiffResult: GitDiffResult | undefined,
  gitLogResult: GitLogResult | undefined,
  deps = {
    calculateSelectiveFileMetrics,
    calculateOutputMetrics,
    calculateGitDiffMetrics,
    calculateGitLogMetrics,
    getTokenCounter,
    taskRunner: undefined as TaskRunner<TokenCountTask, number> | undefined,
  },
): Promise<CalculateMetricsResult> => {
  progressCallback('Calculating metrics...');
  console.log('DEBUG: calculateMetrics called with', processedFiles.length, 'files');

  const totalFiles = processedFiles.length;
  const totalCharacters = output.length;

  // 使用精确的token计数
  const tokenCounter = deps.getTokenCounter(config.tokenCount.encoding);
  const totalTokens = tokenCounter.countTokens(output);

  // Build character counts for all files
  const fileCharCounts: Record<string, number> = {};
  for (const file of processedFiles) {
    fileCharCounts[file.path] = file.content.length;
  }

  // Build token counts only for top files
  const fileTokenCounts: Record<string, number> = {};
  const topFilesLength = Math.min(processedFiles.length, config.output.topFilesLength * 10);
  const topFiles = [...processedFiles].sort((a, b) => b.content.length - a.content.length).slice(0, topFilesLength);

  for (const file of topFiles) {
    fileTokenCounts[file.path] = tokenCounter.countTokens(file.content, file.path);
  }

  // 计算Git差异的token数
  let gitDiffTokenCount = 0;
  if (gitDiffResult) {
    if (gitDiffResult.workTreeDiffContent) {
      gitDiffTokenCount += tokenCounter.countTokens(gitDiffResult.workTreeDiffContent);
    }
    if (gitDiffResult.stagedDiffContent) {
      gitDiffTokenCount += tokenCounter.countTokens(gitDiffResult.stagedDiffContent);
    }
  }

  // 计算Git日志的token数
  let gitLogTokenCount = 0;
  if (gitLogResult && gitLogResult.logContent) {
    gitLogTokenCount = tokenCounter.countTokens(gitLogResult.logContent);
  }

  return {
    totalFiles,
    totalCharacters,
    totalTokens,
    fileCharCounts,
    fileTokenCounts,
    gitDiffTokenCount,
    gitLogTokenCount,
  };
};
