import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import {
  defaultConfig,
  defaultFilePathMap,
  type RepomixConfigFile,
  type RepomixOutputStyle,
} from '../../config/configSchema.js';
import { getGlobalDirectory } from '../../config/globalDirectory.js';
import { logger } from '../../shared/logger.js';

export const runInitAction = async (rootDir: string, isGlobal: boolean): Promise<void> => {
  try {
    // Create config file with default settings
    await createConfigFile(rootDir, isGlobal);
    
    // Create .repomixignore file with default content
    await createIgnoreFile(rootDir, isGlobal);
    
    logger.log(pc.green('Initialization complete! Configuration files created with default settings.'));
  } catch (error) {
    logger.error('An error occurred during initialization:', error);
    process.exit(1);
  }
};

export const createConfigFile = async (rootDir: string, isGlobal: boolean): Promise<boolean> => {
  const configPath = path.resolve(isGlobal ? getGlobalDirectory() : rootDir, 'repomix.config.json');

  // Check if config file already exists
  try {
    await fs.access(configPath);
    logger.log(pc.yellow(`Config file already exists at: ${configPath}`));
    logger.log(pc.yellow('Skipping creation. Remove the file if you want to regenerate it.'));
    return false;
  } catch {
    // File doesn't exist, so we can proceed
  }

  // Create config with default values
  const config: RepomixConfigFile = {
    ...defaultConfig,
    output: {
      ...defaultConfig.output,
      filePath: defaultFilePathMap[defaultConfig.output.style as RepomixOutputStyle],
    },
  };

  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));

  const relativeConfigPath = path.relative(rootDir, configPath);
  logger.log(pc.green(`Config file created: ${relativeConfigPath}`));

  return true;
};

export const createIgnoreFile = async (rootDir: string, isGlobal: boolean): Promise<boolean> => {
  if (isGlobal) {
    logger.log(pc.dim('Skipping .repomixignore file creation for global configuration.'));
    return false;
  }

  const ignorePath = path.resolve(rootDir, '.repomixignore');

  // Check if ignore file already exists
  try {
    await fs.access(ignorePath);
    logger.log(pc.yellow(`Ignore file already exists at: ${ignorePath}`));
    logger.log(pc.yellow('Skipping creation. Remove the file if you want to regenerate it.'));
    return false;
  } catch {
    // File doesn't exist, so we can proceed
  }

  const defaultIgnoreContent = `# Add patterns to ignore here, one per line
# Example:
# *.log
# tmp/
`;

  await fs.writeFile(ignorePath, defaultIgnoreContent);
  logger.log(pc.green(`Ignore file created: ${path.relative(rootDir, ignorePath)}`));

  return true;
};