# Repomix Project Overview

## Project Introduction

Repomix is a tool designed to package code repository contents into a single AI-friendly file. It consolidates the entire codebase into one file, making it easier for AI systems to analyze and process. This tool is particularly useful in scenarios where codebases need to be provided to large language models for understanding and analysis.

Key features include:
- Configurable ignore patterns
- Support for custom header text
- Efficient file processing and packaging
- Support for multiple output formats (XML, Markdown, JSON, plain text)
- Git information integration (differences, logs, change frequency)
- File size limits and compression options
- Token counting functionality

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js (>=20.0.0)
- **Package Manager**: npm
- **Build Tool**: TypeScript Compiler
- **Testing Framework**: Vitest
- **Dependency Management**: NodeNext module resolution

## Project Architecture

```
src/
├── cli/                 # Command-line interface related code
├── config/             # Configuration loading and validation
├── core/               # Core functionality implementation
│   ├── file/           # File processing
│   ├── git/            # Git integration features
│   ├── metrics/        # Metric calculations
│   ├── output/         # Output generation
│   ├── packager/       # Main packaging logic
│   └── treeSitter/     # Tree-sitter syntax parsing
├── shared/             # Shared utilities and types
└── types/              # Type definitions
```

## Scripts Directory

The Scripts directory contains a subproject dedicated to memory usage benchmarking and leak detection:

```
scripts/
└── memory/             # Memory usage benchmarking tools
    ├── src/            # Source code for memory testing
    │   ├── memory-test.ts  # Main memory test script
    │   └── types.ts    # Type definitions
    ├── package.json    # Dependency configuration for memory tests
    └── README.md       # Usage guide for memory testing tools
```

### Memory Testing Tool

The memory testing tool monitors Repomix's memory usage and detects potential memory leaks. Key capabilities include:

- **Quick Leak Detection**: Run a small number of iterations to quickly identify memory leaks
- **Continuous Monitoring**: Continuously run tests to observe long-term memory trends
- **Comprehensive Analysis**: Detailed memory usage analysis and report generation
- **Graphical Display**: ASCII charts showing memory usage trends
- **Automatic Garbage Collection**: Force garbage collection during testing
- **Result Persistence**: Save test results in JSON format for later analysis

This tool simulates real-world usage by repeatedly invoking Repomix's core functions while monitoring process memory consumption, ensuring that Repomix does not suffer from memory leaks when handling large codebases.

## Core Functional Modules

### 1. File Processing (`src/core/file/`)
- File searching and filtering
- File content processing (comment removal, blank line removal, etc.)
- File tree generation
- Path flattening

### 2. Git Integration (`src/core/git/`)
- Retrieval of Git diffs
- Retrieval of Git logs
- Sorting files by change frequency

### 3. Output Generation (`src/core/output/`)
- Multi-format output support (XML, Markdown, JSON, plain text)
- Configurable output styling

### 4. Metrics Calculation (`src/core/metrics/`)
- Token counting
- File statistics

## Build and Execution

### Development Environment Requirements
- Node.js >= 20.0.0
- Yarn >= 1.22.22 (optional)

### Build Commands
```bash
# Build the project
npm run build

# Type checking
npm run lint

# Run tests
npm run test
```

### Run Commands
```bash
# Build and run repomix
npm run repomix

# Run from source (including src and tests directories)
npm run repomix-src

# Alternative way to run directly from compiled files
node --enable-source-maps dist/cli/cliRun.js [options]

# For development and debugging
node tests/debug-cli.mjs
```

## Configuration

### Default Configuration File
The project uses `repomix.config.json` as the default configuration file, supporting the following settings:

- `input.maxFileSize`: Maximum file size limit
- `output`: Output configuration (file path, format, compression, etc.)
- `include`: Include file patterns
- `ignore`: Ignore file patterns
- `tokenCount.encoding`: Encoding method for token counting

### CLI Options
Repomix provides rich command-line options:

- `-o, --output <file>`: Output file path
- `--style <type>`: Output format (xml, markdown, json, plain)
- `--include <patterns>`: Glob patterns for included files
- `-i, --ignore <patterns>`: Glob patterns for ignored files
- `--compress`: Use Tree-sitter to extract code structure
- `--remove-comments`: Remove code comments
- `--clean`: Clean output mode (removes all metadata)
- `--structure`: Generate only directory structure
- `--files`: Specify file patterns (experimental feature)
- `--flatten`: Flatten file paths (experimental feature)

## Special Features

### File Pattern Matching
Repomix supports directly specifying files using glob patterns via the `--files` parameter, and flattening file paths with the `--flatten` parameter.

### Git Information Integration
- `--include-diffs`: Include Git diff information
- `--include-logs`: Include Git commit logs
- `--git-sort-by-changes`: Sort files by Git change frequency

### Token Counting
Integrated with the tiktoken library for accurate token counting, supporting multiple encoding models.

## Issue Resolution Summary

We have successfully resolved the issues with the Repomix CLI tool:

1. Fixed the logger configuration to ensure error messages are always displayed even in stdout mode
2. Modified the CLI entry point to properly handle different log levels
3. Ensured that error and warning messages are always output regardless of log level settings
4. Verified that the CLI can successfully process the repository and generate the output file

The tool now successfully processes all 196 files in the repository, generating a comprehensive output file with detailed statistics.

## Analysis of npm Run Issues

The original problem with `npm run repomix-src` was due to:
1. Incorrect bin entry in package.json pointing to a non-existent file
2. Missing instruction file causing errors during output generation
3. Improper log level handling that suppressed error messages

These issues have been resolved by:
1. Updating the package.json scripts to point to the correct compiled files
2. Removing the instructionFilePath from the config since the file didn't exist
3. Modifying the logger to always show errors and warnings regardless of log level
4. Ensuring proper error handling in the CLI entry point

## Updated Test Files

Test files have been updated to prevent memory leaks by:
1. Properly mocking and restoring logger functions
2. Ensuring cleanup of resources after tests
3. Correctly handling asynchronous operations