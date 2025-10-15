import pc from 'picocolors';
import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import { initTaskRunner } from '../../shared/processConcurrency.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { RawFile } from './fileTypes.js';
import type { FileCollectResult, FileCollectTask, SkippedFileInfo } from './workers/fileCollectWorker.js';

export interface FileCollectResults {
  rawFiles: RawFile[];
  skippedFiles: SkippedFileInfo[];
}

// Re-export SkippedFileInfo for external use
export type { SkippedFileInfo } from './workers/fileCollectWorker.js';

export const collectFiles = async (
  filePaths: string[],
  rootDir: string,
  config: RepomixConfigMerged,
  progressCallback: RepomixProgressCallback = () => {},
  deps = {
    initTaskRunner,
  },
): Promise<FileCollectResults> => {
  const maxFileSize = config.input.maxFileSize;

  // Initialize worker pool for file collection
  const taskRunner = deps.initTaskRunner<FileCollectTask, FileCollectResult>({
    numOfTasks: filePaths.length,
    workerPath: new URL('./workers/fileCollectWorker.js', import.meta.url).href,
    runtime: 'worker_threads',
  });

  const rawFiles: RawFile[] = [];
  const skippedFiles: SkippedFileInfo[] = [];

  try {
    // Process files in parallel using worker pool
    const tasks = filePaths.map((filePath, _index) => ({
      filePath,
      rootDir,
      maxFileSize,
    }));

    // Process files with progress updates
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      progressCallback(`Collect file... (${i + 1}/${tasks.length}) ${pc.dim(task.filePath)}`);

      try {
        const result = await taskRunner.run(task);

        if (result.rawFile) {
          rawFiles.push(result.rawFile);
        } else if (result.skippedFile) {
          skippedFiles.push(result.skippedFile);
        }
      } catch (error) {
        logger.warn(`Failed to process file ${task.filePath}:`, error);
        skippedFiles.push({
          path: task.filePath,
          reason: 'encoding-error',
        });
      }
    }
  } finally {
    // Clean up worker pool
    await taskRunner.cleanup();
  }

  return { rawFiles, skippedFiles };
};
