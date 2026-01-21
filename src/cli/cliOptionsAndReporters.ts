import { Option } from 'commander';
import pc from 'picocolors';
import type { RepomixConfigMerged } from '../config/configSchema.js';
import type { ProcessedFile } from '../core/file/fileTypes.js';
import { logger } from '../shared/logger.js';

// ====== 文件选项相关功能 (来自原 cli/options/fileOptions.ts) ======

export interface FileOptions {
  files?: string | string[];
  flatten?: boolean;
}

/**
 * 创建文件相关CLI选项
 */
export const createFileOptions = () => {
  const fileOption = new Option('-f, --files <patterns...>', '指定需要包含的glob文件模式（支持多个模式）');

  const flattenOption = new Option('-F, --flatten', '启用路径扁平化（只保留文件名，不包含目录结构）');

  return [fileOption, flattenOption];
};

/**
 * 验证文件选项
 */
export const validateFileOptions = (options: FileOptions): string[] => {
  const errors: string[] = [];

  if (options.files && options.files.length === 0) {
    errors.push('--files 选项需要至少一个文件模式');
  }

  if (options.flatten && !options.files) {
    errors.push('--flatten 选项需要与 --files 选项一起使用');
  }

  return errors;
};

/**
 * 解析文件模式字符串
 */
export const parseFilePatterns = (patterns: string | string[]): string[] => {
  if (typeof patterns === 'string') {
    // 支持逗号分隔的模式
    return patterns
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }

  if (Array.isArray(patterns)) {
    return patterns.flatMap((p) =>
      typeof p === 'string'
        ? p
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
        : [],
    );
  }

  return [];
};

/**
 * 获取默认文件选项
 */
export const getDefaultFileOptions = (): FileOptions => ({
  files: undefined,
  flatten: false,
});

// ====== Token计数树报告器 (来自原 cli/reporters/tokenCountTreeReporter.ts) ======

interface FileWithTokens {
  path: string;
  tokens: number;
}

interface TreeNode {
  _files?: FileTokenInfo[];
  _tokenSum?: number;
  [key: string]: TreeNode | FileTokenInfo[] | number | undefined;
}

interface FileTokenInfo {
  name: string;
  tokens: number;
}

export const reportTokenCountTree = (
  processedFiles: ProcessedFile[],
  fileTokenCounts: Record<string, number>,
  config: RepomixConfigMerged,
) => {
  const minTokenCount = typeof config.output.tokenCountTree === 'number' ? config.output.tokenCountTree : 0;

  const filesWithTokens: FileWithTokens[] = [];
  for (const file of processedFiles) {
    const tokens = fileTokenCounts[file.path];
    if (tokens !== undefined) {
      filesWithTokens.push({
        path: file.path,
        tokens,
      });
    }
  }

  // Display the token count tree
  logger.log('🔢 Token Count Tree:');
  logger.log(pc.dim('────────────────────'));

  if (minTokenCount > 0) {
    logger.log(`Showing entries with ${minTokenCount}+ tokens:`);
  }

  const tree = buildTokenCountTree(filesWithTokens);
  displayNode(tree, '', true, minTokenCount);
};

const buildTokenCountTree = (filesWithTokens: FileWithTokens[]): TreeNode => {
  const root: TreeNode = {};

  for (const file of filesWithTokens) {
    // The file.path is already relative to the root directory
    if (!file.path || typeof file.path !== 'string') {
      continue;
    }
    // Always use forward slash for consistency across platforms
    const parts = file.path.split('/');
    const fileName = parts.pop();
    if (!fileName) continue;

    // Navigate/create the directory structure
    let current = root;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as TreeNode;
    }

    // Add the file
    if (!current._files) {
      current._files = [];
    }
    current._files.push({
      name: fileName,
      tokens: file.tokens,
    });
  }

  // Calculate token sums for each directory
  calculateTokenSums(root);

  return root;
};

const calculateTokenSums = (node: TreeNode): number => {
  let totalTokens = 0;

  // Add tokens from files in this directory
  if (node._files) {
    totalTokens += node._files.reduce((sum, file) => sum + file.tokens, 0);
  }

  // Add tokens from subdirectories
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('_') || !value || typeof value !== 'object' || Array.isArray(value)) {
      continue;
    }
    totalTokens += calculateTokenSums(value as TreeNode);
  }

  node._tokenSum = totalTokens;
  return totalTokens;
};

const displayNode = (node: TreeNode, prefix: string, isRoot: boolean, minTokenCount: number): void => {
  // Get all directory entries (excluding _files and _tokenSum)
  const allEntries = Object.entries(node).filter(
    ([key, value]) => !key.startsWith('_') && value && typeof value === 'object' && !Array.isArray(value),
  );

  // Filter directories by minimum token count
  const entries = allEntries.filter(([, value]) => {
    const tokenSum = (value as TreeNode)._tokenSum || 0;
    return tokenSum >= minTokenCount;
  });

  // Get files in this directory and filter by minimum token count
  const allFiles = node._files || [];
  const files = allFiles.filter((file) => file.tokens >= minTokenCount);

  // Sort entries alphabetically
  entries.sort(([a], [b]) => a.localeCompare(b));
  files.sort((a, b) => a.name.localeCompare(b.name));

  // Display files first
  files.forEach((file, index) => {
    const isLastFile = index === files.length - 1 && entries.length === 0;
    const connector = isLastFile ? '└── ' : '├── ';
    const tokenInfo = pc.dim(`(${file.tokens.toLocaleString()} tokens)`);

    if (isRoot && prefix === '') {
      logger.log(`${connector}${file.name} ${tokenInfo}`);
    } else {
      logger.log(`${prefix}${connector}${file.name} ${tokenInfo}`);
    }
  });

  // Display directories
  entries.forEach(([name, childNode], index) => {
    const isLastEntry = index === entries.length - 1;
    const connector = isLastEntry ? '└── ' : '├── ';
    const tokenSum = (childNode as TreeNode)._tokenSum || 0;
    const tokenInfo = pc.dim(`(${tokenSum.toLocaleString()} tokens)`);

    if (isRoot && prefix === '') {
      logger.log(`${connector}${name}/ ${tokenInfo}`);
    } else {
      logger.log(`${prefix}${connector}${name}/ ${tokenInfo}`);
    }

    // Prepare prefix for children
    const childPrefix =
      isRoot && prefix === '' ? (isLastEntry ? '    ' : '│   ') : prefix + (isLastEntry ? '    ' : '│   ');

    displayNode(childNode as TreeNode, childPrefix, false, minTokenCount);
  });

  // If this is the root and it's empty, show a message
  if (isRoot && files.length === 0 && entries.length === 0) {
    if (minTokenCount > 0) {
      logger.log(`No files or directories found with ${minTokenCount}+ tokens.`);
    } else {
      logger.log('No files found.');
    }
  }
};