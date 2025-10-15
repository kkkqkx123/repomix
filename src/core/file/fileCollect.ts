import pc from 'picocolors';
import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import { initTaskRunner } from '../../shared/processConcurrency.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { RawFile } from './fileTypes.js';
import type { FileCollectResult, FileCollectTask, SkippedFileInfo } from './workers/fileCollectWorker.js';
import { collectFilesSync } from './fileCollectSync.js';

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

  // Try to initialize worker pool, but provide fallback if it fails
  try {
    // Determine worker path - try multiple approaches for better compatibility
    let workerPath: string;
    
    try {
      // Method 1: Try using import.meta.url (works in ES modules)
      const currentDir = new URL('.', import.meta.url).href;
      workerPath = new URL('./workers/fileCollectWorker.js', currentDir).href;
    } catch (urlError) {
      // Method 2: Fallback to path resolution
      const path = await import('node:path');
      const currentFilePath = new URL(import.meta.url).pathname;
      const currentDir = path.dirname(currentFilePath);
      workerPath = path.join(currentDir, 'workers', 'fileCollectWorker.js');
    }

    // Initialize worker pool for file collection
    const taskRunner = deps.initTaskRunner<FileCollectTask, FileCollectResult>({
      numOfTasks: filePaths.length,
      workerPath: workerPath,
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

      return { rawFiles, skippedFiles };
    } finally {
      // Clean up worker pool
      await taskRunner.cleanup();
    }
  } catch (workerError) {
    // Fallback to synchronous processing if worker pool fails
    logger.warn('Worker pool initialization failed, falling back to synchronous processing:', workerError);
    return await collectFilesSync(filePaths, rootDir, config, progressCallback);
  }
};