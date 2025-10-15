import pc from 'picocolors';
import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { RawFile } from './fileTypes.js';
import type { SkippedFileInfo } from './workers/fileCollectWorker.js';
import { readRawFile } from './fileRead.js';
import path from 'node:path';

export interface FileCollectResults {
  rawFiles: RawFile[];
  skippedFiles: SkippedFileInfo[];
}

/**
 * Synchronous fallback for file collection when worker pool fails
 * This is used as a backup when worker_threads are not available or fail to initialize
 */
export const collectFilesSync = async (
  filePaths: string[],
  rootDir: string,
  config: RepomixConfigMerged,
  progressCallback: RepomixProgressCallback = () => {},
): Promise<FileCollectResults> => {
  const maxFileSize = config.input.maxFileSize;
  const rawFiles: RawFile[] = [];
  const skippedFiles: SkippedFileInfo[] = [];

  logger.info('Using synchronous file collection mode (worker pool unavailable)');

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    progressCallback(`Collect file... (${i + 1}/${filePaths.length}) ${pc.dim(filePath)}`);

    try {
      const fullPath = path.resolve(rootDir, filePath);
      const result = await readRawFile(fullPath, maxFileSize);

      if (result.content !== null) {
        rawFiles.push({
          path: filePath,
          content: result.content,
        });
      } else if (result.skippedReason) {
        skippedFiles.push({
          path: filePath,
          reason: result.skippedReason,
        });
      }
    } catch (error) {
      logger.warn(`Failed to process file ${filePath}:`, error);
      skippedFiles.push({
        path: filePath,
        reason: 'encoding-error',
      });
    }
  }

  return { rawFiles, skippedFiles };
};