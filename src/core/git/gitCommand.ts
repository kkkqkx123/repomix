import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { logger } from '../../shared/logger.js';

const execFileAsync = promisify(execFile);
const DEFAULT_GIT_TIMEOUT = 30000; // 30 seconds timeout for git operations

/**
 * Execute a git command with timeout protection
 */
const execGitCommandWithTimeout = async (
  command: string,
  args: string[],
  timeout: number = DEFAULT_GIT_TIMEOUT,
  deps = {
    execFileAsync,
  },
): Promise<{ stdout: string; stderr: string }> => {
  try {
    // Use Promise.race to implement timeout
    const result = await Promise.race([
      deps.execFileAsync(command, args),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Git command timed out after ${timeout}ms: ${command} ${args.join(' ')}`)),
          timeout,
        ),
      ),
    ]);
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Git command timed out')) {
      logger.warn(`Git command timeout: ${command} ${args.join(' ')}`);
      throw error;
    }
    throw error;
  }
};

export const execGitLogFilenames = async (
  directory: string,
  maxCommits = 100,
  deps = {
    execFileAsync,
  },
  timeout: number = 5000, // 5 seconds timeout for git log operations
): Promise<string[]> => {
  try {
    // Use timeout protection for git log commands to prevent hanging in non-git directories
    const result = await execGitCommandWithTimeout(
      'git',
      [
        '-C',
        directory,
        'log',
        '--pretty=format:',
        '--name-only',
        '-n',
        maxCommits.toString(),
      ],
      timeout,
      { execFileAsync: deps.execFileAsync },
    );

    return result.stdout.split('\n').filter(Boolean);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Git command timed out')) {
      logger.warn(`Git log command timed out for directory: ${directory}`);
    } else {
      logger.trace('Failed to get git log filenames:', (error as Error).message);
    }
    return [];
  }
};

export const execGitDiff = async (
  directory: string,
  options: string[] = [],
  deps = {
    execFileAsync,
  },
  timeout: number = DEFAULT_GIT_TIMEOUT,
): Promise<string> => {
  try {
    // Use timeout protection for git diff commands
    const result = await execGitCommandWithTimeout(
      'git',
      [
        '-C',
        directory,
        'diff',
        '--no-color', // Avoid ANSI color codes
        ...options,
      ],
      timeout,
      deps,
    );

    return result.stdout || '';
  } catch (error) {
    if (error instanceof Error && error.message.includes('Git command timed out')) {
      logger.warn(`Git diff command timed out for directory: ${directory}`);
      return ''; // Return empty string on timeout instead of hanging
    }
    logger.trace('Failed to execute git diff:', (error as Error).message);
    throw error; // Re-throw the original error to maintain expected behavior
  }
};

export const execGitVersion = async (
  deps = {
    execFileAsync,
  },
): Promise<string> => {
  try {
    const result = await deps.execFileAsync('git', ['--version']);
    return result.stdout || '';
  } catch (error) {
    logger.trace('Failed to execute git version:', (error as Error).message);
    throw error;
  }
};

export const execGitRevParse = async (
  directory: string,
  deps = {
    execFileAsync,
  },
  timeout: number = DEFAULT_GIT_TIMEOUT,
): Promise<string> => {
  try {
    const result = await execGitCommandWithTimeout(
      'git',
      ['-C', directory, 'rev-parse', '--is-inside-work-tree'],
      timeout,
      deps,
    );
    return result.stdout || '';
  } catch (error) {
    if (error instanceof Error && error.message.includes('Git command timed out')) {
      logger.warn(`Git rev-parse command timed out for directory: ${directory}`);
      throw error; // Re-throw timeout errors so isGitRepository can handle them
    }
    logger.trace('Failed to execute git rev-parse:', (error as Error).message);
    throw error;
  }
};

export const execGitLog = async (
  directory: string,
  maxCommits: number,
  gitSeparator: string,
  deps = {
    execFileAsync,
  },
): Promise<string> => {
  try {
    const result = await deps.execFileAsync('git', [
      '-C',
      directory,
      'log',
      `--pretty=format:${gitSeparator}%ad|%s`,
      '--date=iso',
      '--name-only',
      '-n',
      maxCommits.toString(),
    ]);

    return result.stdout || '';
  } catch (error) {
    logger.trace('Failed to execute git log:', (error as Error).message);
    throw error;
  }
};
