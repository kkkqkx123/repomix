import path from 'node:path';
import type { RepomixConfigMerged } from '../../../config/configSchema.js';
import { type PackResult, pack } from '../../../core/packager.js';
import { logger, setLogLevelByWorkerData } from '../../../shared/logger.js';
import { Spinner } from '../../cliSpinner.js';
import type { CliOptions } from '../../types.js';

// Initialize logger configuration from workerData at module load time
// This must be called before any logging operations in the worker
setLogLevelByWorkerData();

export interface DefaultActionTask {
  directories: string[];
  cwd: string;
  config: RepomixConfigMerged;
  cliOptions: CliOptions;
  stdinFilePaths?: string[];
}

export interface PingTask {
  ping: true;
}

export interface DefaultActionWorkerResult {
  packResult: PackResult;
  config: RepomixConfigMerged;
}

export interface PingResult {
  ping: true;
}

// Function overloads for better type inference
function defaultActionWorker(task: DefaultActionTask): Promise<DefaultActionWorkerResult>;
function defaultActionWorker(task: PingTask): Promise<PingResult>;
async function defaultActionWorker(
  task: DefaultActionTask | PingTask,
): Promise<DefaultActionWorkerResult | PingResult> {
  // Handle ping requests for Bun compatibility check
  if ('ping' in task) {
    return {
      ping: true,
    };
  }

  // At this point, task is guaranteed to be DefaultActionTask
  const { directories, cwd, config, cliOptions, stdinFilePaths } = task;

  logger.trace('Worker: Using pre-loaded config:', config);

  // Initialize spinner in worker
  const spinner = new Spinner('Initializing...', cliOptions);
  spinner.start();

  let packResult: PackResult;

  try {
    if (stdinFilePaths) {
      // Handle stdin processing with file paths from main process
      // File paths were already read from stdin in the main process
      logger.trace(`Worker: Processing ${stdinFilePaths.length} files from stdin`);

      // 检查是否有文件模式配置，如果有，优先使用文件模式匹配
      const filePatterns = config.files?.patterns;
      const flattenPathsOption = config.files?.flatten;
      
      console.log('DEBUG: File patterns from config:', filePatterns);
      console.log('DEBUG: Flatten paths option:', flattenPathsOption);
      
      if (filePatterns && filePatterns.length > 0) {
        // 如果有文件模式，使用文件模式匹配逻辑
        logger.trace(`Worker: Using file patterns from config: ${filePatterns.join(', ')}`);
        packResult = await pack(
          [cwd],
          config,
          (message) => {
            spinner.update(message);
          },
          {},
          undefined, // explicitFiles
          filePatterns,
          flattenPathsOption
        );
      } else {
        // 否则使用stdin文件路径
        logger.trace(`Worker: Using stdin file paths`);
        packResult = await pack(
          [cwd],
          config,
          (message) => {
            spinner.update(message);
          },
          {},
          stdinFilePaths,
          undefined, // filePatterns
          undefined  // flattenPathsOption
        );
      }
    } else {
      // Handle directory processing
      const targetPaths = directories.map((directory) => path.resolve(cwd, directory));

      // 提取文件模式和扁平化选项
      const filePatterns = config.files?.patterns;
      const flattenPathsOption = config.files?.flatten;
      
      console.log('DEBUG: File patterns from config (directory):', filePatterns);
      console.log('DEBUG: Flatten paths option (directory):', flattenPathsOption);

      packResult = await pack(
        targetPaths, 
        config, 
        (message) => {
          spinner.update(message);
        },
        {},
        undefined, // explicitFiles
        filePatterns,
        flattenPathsOption
      );
    }

    spinner.succeed('Packing completed successfully!');

    return {
      packResult,
      config,
    };
  } catch (error) {
    spinner.fail('Error during packing');
    throw error;
  }
}

export default defaultActionWorker;

// Export cleanup function for Tinypool teardown
export const onWorkerTermination = async () => {
  // Any cleanup needed when worker terminates
  // Currently no specific cleanup required for defaultAction worker
};
