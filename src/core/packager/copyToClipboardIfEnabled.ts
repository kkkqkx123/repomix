import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import type { RepomixProgressCallback } from '../../shared/types.js';

export const copyToClipboardIfEnabled = async (
  output: string,
  progressCallback: RepomixProgressCallback,
  config: RepomixConfigMerged,
): Promise<void> => {
  if (!config.output.copyToClipboard) return;
  progressCallback('Skipping clipboard copy (feature removed for simplicity)...');
  
  logger.log('Note: Clipboard functionality has been removed to simplify the tool. Output saved to file only.');
};