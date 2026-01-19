import * as fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { RepomixError } from '../../shared/errorHandle.js';
import { logger } from '../../shared/logger.js';
import type { CliOptions } from '../types.js';
import { type DefaultActionRunnerResult, runDefaultAction } from './defaultAction.js';

export const runRemoteAction = async (
  repoUrl: string,
  cliOptions: CliOptions,
): Promise<DefaultActionRunnerResult> => {
  throw new RepomixError('Remote repository functionality has been removed. Please clone the repository locally first and then run repomix on the local directory.');
};

export const createTempDirectory = async (): Promise<string> => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'repomix-'));
  logger.trace(`Created temporary directory. (path: ${tempDir})`);
  return tempDir;
};

export const cleanupTempDirectory = async (directory: string): Promise<void> => {
  logger.trace(`Cleaning up temporary directory: ${directory}`);
  await fs.rm(directory, { recursive: true, force: true });
};

export const copyOutputToCurrentDirectory = async (
  sourceDir: string,
  targetDir: string,
  outputFileName: string,
): Promise<void> => {
  const sourcePath = path.resolve(sourceDir, outputFileName);
  const targetPath = path.resolve(targetDir, outputFileName);

  try {
    logger.trace(`Copying output file from: ${sourcePath} to: ${targetPath}`);

    // Create target directory if it doesn't exist
    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    await fs.copyFile(sourcePath, targetPath);
  } catch (error) {
    throw new RepomixError(`Failed to copy output file: ${(error as Error).message}`);
  }
};
