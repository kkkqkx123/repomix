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
  process.stderr.write('=== collectFiles called ===\n');
  process.stderr.write(`File paths: ${JSON.stringify(filePaths)}\n`);
  process.stderr.write(`Root dir: ${rootDir}\n`);
  process.stderr.write(`DEBUG: collectFiles called with ${filePaths.length} files\n`);
  process.stderr.write(`DEBUG: rootDir: ${rootDir}\n`);
  process.stderr.write(`DEBUG: config files patterns: ${JSON.stringify(config.files?.patterns)}\n`);
  process.stderr.write(`DEBUG: config files flatten: ${config.files?.flatten}\n`);
  // 添加更多调试信息
  process.stderr.write(`DEBUG: filePaths array: ${JSON.stringify(filePaths)}\n`);
  
  // 临时禁用工作进程模式，直接调用文件收集逻辑
  const rawFiles: RawFile[] = [];
  const skippedFiles: SkippedFileInfo[] = [];
  
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    progressCallback(`Collect file... (${i + 1}/${filePaths.length}) ${pc.dim(filePath)}`);
    
    try {
      // 直接读取文件内容（简化版本）
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const absolutePath = path.resolve(rootDir, filePath);
      const content = await fs.readFile(absolutePath, 'utf-8');
      
      rawFiles.push({
        path: filePath,
        content: content
      });
    } catch (error) {
      skippedFiles.push({
        path: filePath,
        reason: 'encoding-error'
      });
    }
  }
  
  return { rawFiles, skippedFiles };
};
