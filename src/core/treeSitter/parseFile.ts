import type { RepomixConfigMerged } from '../../config/configSchema.js';
import { logger } from '../../shared/logger.js';
import type { SupportedLang } from './lang2Query.js';
import { LanguageParser } from './languageParser.js';
import { createParseStrategy, type ParseContext } from './parseStrategies/ParseStrategy.js';

interface CapturedChunk {
  content: string;
  startRow: number;
  endRow: number;
}

let languageParserSingleton: LanguageParser | null = null;

export const CHUNK_SEPARATOR = '⋮----';

// Patterns that may cause Tree-sitter to hang or slow down significantly
const PROBLEMATIC_PATTERNS = [
  /#\w+#/, // Patterns like #filename#
  /\\\s*\n/, // Line continuation patterns
  /\/\*.*?\*\//gs, // Multi-line comments with complex content
  /\/\/.*$/gm, // Single-line comments with complex content
];

/**
 * Check if file content contains patterns that may cause Tree-sitter to hang
 * @param content File content to check
 * @returns true if problematic patterns are detected
 */
const hasProblematicPatterns = (content: string): boolean => {
  logger.trace('Checking for problematic patterns in file');
  
  // Check for excessive regex patterns which might cause performance issues
  const regexPatternCount = (content.match(/\/.*?\/[gimsuy]*/g) || []).length;
  logger.trace(`Found ${regexPatternCount} regex patterns in file`);
  if (regexPatternCount > 50) {
    logger.debug(`Detected ${regexPatternCount} regex patterns, which may cause performance issues (threshold: 50)`);
    return true;
  }
  
  // Check for other problematic patterns
  for (const pattern of PROBLEMATIC_PATTERNS) {
    if (pattern.test(content)) {
      logger.debug(`Detected problematic pattern: ${pattern}`);
      return true;
    }
  }
  
  logger.trace('No problematic patterns detected');
  return false;
};

// TODO: Do something with config: RepomixConfigMerged, it is not used (yet)
export const parseFile = async (fileContent: string, filePath: string, config: RepomixConfigMerged) => {
  logger.trace(`Starting parseFile for ${filePath}`);
  
  // Early exit for files with problematic patterns
  if (hasProblematicPatterns(fileContent)) {
    logger.debug(`Skipping Tree-sitter parsing for ${filePath} due to problematic patterns`);
    return undefined;
  }

  const languageParser = await getLanguageParserSingleton();

  // Split the file content into individual lines
  const lines = fileContent.split('\n');
  if (lines.length < 1) {
    return '';
  }

  const lang: SupportedLang | undefined = languageParser.guessTheLang(filePath);
  if (lang === undefined) {
    // Language not supported
    return undefined;
  }

  const query = await languageParser.getQueryForLang(lang);
  const parser = await languageParser.getParserForLang(lang);
  const processedChunks = new Set<string>();
  const capturedChunks: CapturedChunk[] = [];

  try {
    logger.trace(`Parsing file content into AST for ${filePath}`);
    // Parse the file content into an Abstract Syntax Tree (AST)
    const tree = parser.parse(fileContent);

    // Get the appropriate parse strategy for the language
    const parseStrategy = createParseStrategy(lang);

    // Create parse context
    const context: ParseContext = {
      fileContent,
      lines,
      tree,
      query,
      config,
    };

    logger.trace(`Applying query to AST for ${filePath}`);
    // Apply the query to the AST and get the captures with timeout protection
    const captures = await executeWithTimeout(
      () => query.captures(tree.rootNode),
      30000, // 30 second timeout
      `Tree-sitter query capture for ${filePath}`
    );

    // Sort captures by their start position
    captures.sort((a, b) => a.node.startPosition.row - b.node.startPosition.row);

    for (const capture of captures) {
      const capturedChunkContent = parseStrategy.parseCapture(capture, lines, processedChunks, context);
      if (capturedChunkContent !== null) {
        capturedChunks.push({
          content: capturedChunkContent.trim(),
          startRow: capture.node.startPosition.row,
          endRow: capture.node.endPosition.row,
        });
      }
    }
  } catch (error: unknown) {
    logger.log(`Error parsing file: ${error}\n`);
    // 如果Tree-sitter解析失败，返回undefined让调用者使用原始内容
    return undefined;
  }

  const filteredChunks = filterDuplicatedChunks(capturedChunks);
  const mergedChunks = mergeAdjacentChunks(filteredChunks);

  return mergedChunks
    .map((chunk) => chunk.content)
    .join(`\n${CHUNK_SEPARATOR}\n`)
    .trim();
};

/**
 * Execute a function with a timeout
 * @param fn The function to execute
 * @param timeoutMs Timeout in milliseconds
 * @param operationName Name of the operation for logging
 * @returns Promise that resolves with the result of fn or rejects on timeout
 */
const executeWithTimeout = async <T>(
  fn: () => T,
  timeoutMs: number,
  operationName: string
): Promise<T> => {
  return new Promise((resolve, reject) => {
    // Set up timeout
    const timeoutId = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    try {
      // Execute the function
      const result = fn();
      clearTimeout(timeoutId);
      resolve(result);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
};

const getLanguageParserSingleton = async () => {
  if (!languageParserSingleton) {
    languageParserSingleton = new LanguageParser();
    await languageParserSingleton.init();
  }
  return languageParserSingleton;
};
/**
 * Clean up the language parser singleton by deleting all loaded parsers
 */
export const cleanupLanguageParser = async (): Promise<void> => {
  if (languageParserSingleton) {
    try {
      await languageParserSingleton.dispose();
      logger.debug('Language parser singleton deleted');
    } catch (err) {
      logger.debug('Language parser dispose threw', err);
    } finally {
      languageParserSingleton = null;
    }
  }
};

const filterDuplicatedChunks = (chunks: CapturedChunk[]): CapturedChunk[] => {
  // Group chunks by their start row
  const chunksByStartRow = new Map<number, CapturedChunk[]>();

  for (const chunk of chunks) {
    const startRow = chunk.startRow;
    if (!chunksByStartRow.has(startRow)) {
      chunksByStartRow.set(startRow, []);
    }
    chunksByStartRow.get(startRow)?.push(chunk);
  }

  // For each start row, keep the chunk with the most content
  const filteredChunks: CapturedChunk[] = [];
  for (const [_, rowChunks] of chunksByStartRow) {
    rowChunks.sort((a, b) => b.content.length - a.content.length);
    filteredChunks.push(rowChunks[0]);
  }

  // Sort filtered chunks by start row
  return filteredChunks.sort((a, b) => a.startRow - b.startRow);
};

const mergeAdjacentChunks = (chunks: CapturedChunk[]): CapturedChunk[] => {
  if (chunks.length <= 1) {
    return chunks;
  }

  const merged: CapturedChunk[] = [chunks[0]];

  for (let i = 1; i < chunks.length; i++) {
    const current = chunks[i];
    const previous = merged[merged.length - 1];

    // Merge the current chunk with the previous one
    if (previous.endRow + 1 === current.startRow) {
      previous.content += `\n${current.content}`;
      previous.endRow = current.endRow;
    } else {
      merged.push(current);
    }
  }

  return merged;
};