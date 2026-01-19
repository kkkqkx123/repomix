import path from 'node:path';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { reportCompletion, reportSummary, reportTopFiles } from '../../src/cli/cliReport.js';
import type { PackResult } from '../../src/index.js';
import { logger } from '../../src/shared/logger.js';
import { createMockConfig } from '../testing/testUtils.js';

vi.mock('../../src/shared/logger');
vi.mock('picocolors', () => ({
  default: {
    white: (str: string) => `WHITE:${str}`,
    dim: (str: string) => `DIM:${str}`,
    green: (str: string) => `GREEN:${str}`,
    yellow: (str: string) => `YELLOW:${str}`,
    red: (str: string) => `RED:${str}`,
    cyan: (str: string) => `CYAN:${str}`,
    underline: (str: string) => `UNDERLINE:${str}`,
  },
}));

describe('cliReport', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });


  describe('reportTopFiles', () => {
    test('should print top files sorted by character count', () => {
      const fileCharCounts = {
        'src/index.ts': 1000,
        'src/utils.ts': 500,
        'README.md': 2000,
      };
      const fileTokenCounts = {
        'src/index.ts': 200,
        'src/utils.ts': 100,
        'README.md': 400,
      };

      reportTopFiles(fileCharCounts, fileTokenCounts, 2, 60);

      expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('Top 2 Files'));
      expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('README.md'));
      expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('src/index.ts'));
      expect(logger.log).not.toHaveBeenCalledWith(expect.stringContaining('src/utils.ts'));
    });

    test('should handle empty file list', () => {
      reportTopFiles({}, {}, 5, 0);

      expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('Top 5 Files'));
    });
  });

  describe('reportCompletion', () => {
    test('should print completion message', () => {
      reportCompletion();

      expect(logger.log).toHaveBeenCalledWith('GREEN:🎉 All Done!');
      expect(logger.log).toHaveBeenCalledWith('WHITE:Your repository has been successfully packed.');
    });
  });
});
