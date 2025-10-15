import pc from 'picocolors';
import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import { initTaskRunner } from '../../shared/processConcurrency.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import { type FileManipulator, getFileManipulator } from './fileManipulate.js';
import type { ProcessedFile, RawFile } from './fileTypes.js';
import type { FileProcessTask } from './workers/fileProcessWorker.js';

type GetFileManipulator = (filePath: string) => FileManipulator | null;

export const processFiles = async (
  rawFiles: RawFile[],
  config: RepomixConfigMerged,
  progressCallback: RepomixProgressCallback,
  deps: {
    initTaskRunner: typeof initTaskRunner;
    getFileManipulator: GetFileManipulator;
  } = {
    initTaskRunner,
    getFileManipulator,
  },
): Promise<ProcessedFile[]> => {
  const results: ProcessedFile[] = [];

  for (let i = 0; i < rawFiles.length; i++) {
    const rawFile = rawFiles[i];
    const manipulator = deps.getFileManipulator(rawFile.path);

    progressCallback(`Processing file... (${i + 1}/${rawFiles.length}) ${pc.dim(rawFile.path)}`);
    logger.trace(`Processing file... (${i + 1}/${rawFiles.length}) ${rawFile.path}`);

    let processedFile: ProcessedFile;

    if (manipulator) {
      processedFile = {
        path: rawFile.path,
        content: manipulator.removeComments(rawFile.content),
      };
    } else {
      processedFile = {
        path: rawFile.path,
        content: rawFile.content,
      };
    }

    results.push(processedFile);
  }

  logger.trace(`File processing completed for ${rawFiles.length} files`);
  return results;
};
