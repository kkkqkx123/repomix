# repo-packager

## Project Introduction

Repomix is a tool designed to package code repository contents into a single AI-friendly file. It consolidates the entire codebase into one file, making it easier for AI systems to analyze and process. This tool is particularly useful in scenarios where codebases need to be provided to large language models for understanding and analysis.

**Original TypeScript Implementation Notes:**
- **Original Language**: TypeScript
- **Original Runtime**: Node.js (>=20.0.0)
- **Original Package Manager**: npm
- **Original Build Tool**: TypeScript Compiler
- **Original Test Framework**: Vitest
- **Original Module System**: NodeNext module resolution

**Current Rust Implementation:**
Key features include:
- Configurable ignore patterns
- Support for custom header text
- Efficient file processing and packaging
- Support for multiple output formats (XML, Markdown, JSON, plain text)
- Git information integration (differences, logs, change frequency)
- File size limits and compression options
- Token counting functionality

## Technology Stack

- **Language**: Rust (>=1.70.0)  
- **Build System**: Cargo  
- **Runtime**: Native binary  
- **Test Framework**: Built-in `cargo test` + `tokio::test` for async  
- **Async Runtime**: Tokio  
- **Memory Safety**: Zero-cost abstractions with ownership system  

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
│   └── treesitter/     # Tree-sitter syntax parsing
├── shared/             # Shared utilities and types
└── types/              # Type definitions
```

## Scripts Directory

The Scripts directory contains a subproject dedicated to memory usage benchmarking and leak detection:

```
scripts/
└── memory/             # Memory usage benchmarking tools
    ├── src/            # Source code for memory testing
    │   ├── memory_test.rs  # Main memory test script
    │   └── types.rs    # Type definitions
    ├── Cargo.toml      # Dependency configuration for memory tests
    └── README.md       # Usage guide for memory testing tools
```

### Memory Testing Tool

The memory testing tool monitors Repomix's memory usage and detects potential memory leaks. Key capabilities include:

- **Quick Leak Detection**: Run a small number of iterations to quickly identify memory leaks  
- **Continuous Monitoring**: Continuously run tests to observe long-term memory trends  
- **Comprehensive Analysis**: Detailed memory usage analysis and report generation  
- **Graphical Display**: ASCII charts showing memory usage trends  
- **Manual Memory Management**: Explicit control over allocations and deallocations  
- **Result Persistence**: Save test results in JSON format for later analysis  

This tool leverages Rust's memory safety guarantees while simulating real-world usage by repeatedly invoking Repomix's core functions, ensuring optimal memory performance without the overhead of garbage collection.

## Core Functional Modules

### 1. File Processing (`src/core/file/`)
- File searching and filtering with `walkdir` or `ignore` crate  
- File content processing (comment removal, blank line removal, etc.)  
- File tree generation with efficient path handling  
- Path flattening using standard library path operations  

### 2. Git Integration (`src/core/git/`)
- Retrieval of Git diffs using `git2` crate  
- Retrieval of Git logs via `git2` bindings  
- Sorting files by change frequency with efficient algorithms  

### 3. Output Generation (`src/core/output/`)
- Multi-format output support using `serde` for serialization  
- Configurable output styling with template systems  

### 4. Metrics Calculation (`src/core/metrics/`)
- Token counting using optimized string processing  
- File statistics with zero-copy operations  

## Build and Execution

### Development Environment Requirements
- Rust >= 1.70.0  
- Cargo (included with Rust)  
- Git for Git integration features  

### Build Commands
```bash
# Build the project
cargo build

# Build release version
cargo build --release

# Run tests
cargo test

# Check code formatting
cargo fmt --check

# Lint code
cargo clippy
```

### Run Commands
```bash
# Build and run repomix
cargo run

# Run with arguments
cargo run -- --help

# Run specific example
cargo run --example basic_usage
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
Repomix provides rich command-line options using `clap` crate:

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
Repomix supports directly specifying files using glob patterns via the `--files` parameter with `glob` crate, and flattening file paths with `std::path` operations.

### Git Information Integration
- `--include-diffs`: Include Git diff information using `git2`  
- `--include-logs`: Include Git commit logs via Git API  
- `--git-sort-by-changes`: Sort files by Git change frequency  

### Token Counting
Custom token counting implementation with efficient string algorithms, leveraging Rust's zero-cost abstractions for optimal performance.

## Rust-Specific Advantages

- **Memory Safety**: No garbage collector overhead, predictable performance  
- **Zero-Cost Abstractions**: High-level APIs without runtime penalties  
- **Concurrency**: Safe concurrent processing with async/await and thread safety  
- **Performance**: Near C/C++ performance with memory safety guarantees  
- **Ecosystem**: Rich ecosystem of crates for file I/O, Git operations, and serialization  
- **Error Handling**: Comprehensive error handling with `Result<T, E>` and `anyhow` for application-level errors