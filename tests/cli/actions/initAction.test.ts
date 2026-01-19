import * as fs from 'node:fs/promises';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createConfigFile, createIgnoreFile } from '../../../src/cli/actions/initAction.js';
import { getGlobalDirectory } from '../../../src/config/globalDirectory.js';

vi.mock('node:fs/promises');
vi.mock('../../../src/shared/folderUtils');
vi.mock('../../../src/config/globalDirectory.js');

describe('initAction', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('createConfigFile', () => {
    it('should create a new local config file when one does not exist', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('File does not exist'));
      // Since prompts are removed, we need to simulate the function behavior differently
      // The function will now use default values instead of prompting

      await createConfigFile('/test/dir', false);

      const configPath = path.resolve('/test/dir/repomix.config.json');

      expect(fs.writeFile).toHaveBeenCalledWith(configPath, expect.any(String));
    });

    it('should create a new global config file when one does not exist', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('File does not exist'));
      vi.mocked(getGlobalDirectory).mockImplementation(() => '/global/repomix');

      await createConfigFile('/test/dir', true);

      const configPath = path.resolve('/global/repomix/repomix.config.json');

      expect(fs.mkdir).toHaveBeenCalledWith(path.dirname(configPath), { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledWith(configPath, expect.any(String));
    });

    it('should not overwrite when config file already exists', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);

      await createConfigFile('/test/dir', false);

      // With prompts removed, the function should not overwrite by default
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should handle errors appropriately', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('File does not exist'));
      vi.mocked(fs.writeFile).mockRejectedValue(new Error('Write failed'));

      const result = await createConfigFile('/test/dir', false);
      // Function should handle errors gracefully
      expect(result).toBeDefined();
    });
  });

  describe('createIgnoreFile', () => {
    it('should not create a new .repomixignore file when global flag is set', async () => {
      const result = await createIgnoreFile('/test/dir', true);

      expect(result).toBe(false);
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should create a new .repomixignore file when one does not exist', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('File does not exist'));

      await createIgnoreFile('/test/dir', false);

      const ignorePath = path.resolve('/test/dir/.repomixignore');

      expect(fs.writeFile).toHaveBeenCalledWith(
        ignorePath,
        expect.stringContaining('# Add patterns to ignore here, one per line'),
      );
    });

    it('should not overwrite when .repomixignore file already exists', async () => {
      vi.mocked(fs.access).mockResolvedValue(undefined);

      await createIgnoreFile('/test/dir', false);

      // With prompts removed, the function should not overwrite by default
      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should handle errors appropriately', async () => {
      vi.mocked(fs.access).mockRejectedValue(new Error('File does not exist'));
      vi.mocked(fs.writeFile).mockRejectedValue(new Error('Write failed'));

      const result = await createIgnoreFile('/test/dir', false);

      expect(result).toBe(false); // Function should return false on error
    });
  });
});
