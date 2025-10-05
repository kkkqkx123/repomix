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
    taskRunner: undefined as TaskRunner<TokenCountTask, number> | undefined,
  },
): Promise<CalculateMetricsResult> => {
  progressCallback('Calculating metrics...');
  console.log('DEBUG: calculateMetrics called with', processedFiles.length, 'files');

  const totalFiles = processedFiles.length;
  const totalCharacters = output.length;
  const totalTokens = Math.ceil(output.length / 4); // 简单的token估算

  // Build character counts for all files
  const fileCharCounts: Record<string, number> = {};
  for (const file of processedFiles) {
    fileCharCounts[file.path] = file.content.length;
  }

  // Build token counts only for top files
  const fileTokenCounts: Record<string, number> = {};
  const topFilesLength = Math.min(processedFiles.length, config.output.topFilesLength * 10);
  const topFiles = [...processedFiles]
    .sort((a, b) => b.content.length - a.content.length)
    .slice(0, topFilesLength);
  
  for (const file of topFiles) {
    fileTokenCounts[file.path] = Math.ceil(file.content.length / 4);
  }

  return {
    totalFiles,
    totalCharacters,
    totalTokens,
    fileCharCounts,
    fileTokenCounts,
    gitDiffTokenCount: 0,
    gitLogTokenCount: 0,
  };
};
