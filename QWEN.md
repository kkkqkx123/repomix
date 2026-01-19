# Repomix 项目概述

## 项目简介

Repomix 是一个用于将代码仓库内容打包成单个AI友好文件的工具。它能够将整个代码库的内容整合到一个文件中，便于AI系统进行分析和处理。该工具特别适用于需要将代码库提供给大语言模型进行理解和分析的场景。

主要特性包括：
- 可配置的忽略模式
- 自定义头部文本支持
- 高效的文件处理和打包
- 支持多种输出格式（XML、Markdown、JSON、纯文本）
- Git信息集成（差异、日志、变更频率）
- 文件大小限制和压缩选项
- Token计数功能

## 技术栈

- **语言**: TypeScript
- **运行时**: Node.js (>=20.0.0)
- **包管理器**: npm
- **构建工具**: TypeScript 编译器
- **测试框架**: Vitest
- **依赖管理**: NodeNext 模块解析

## 项目架构

```
src/
├── cli/                 # 命令行界面相关代码
│   ├── actions/         # CLI操作实现
│   ├── options/         # CLI选项定义
│   └── reporters/       # 输出报告器
├── config/             # 配置加载和验证
├── core/               # 核心功能实现
│   ├── file/           # 文件处理相关
│   ├── git/            # Git集成功能
│   ├── metrics/        # 度量计算
│   ├── output/         # 输出生成
│   ├── packager/       # 打包主逻辑
│   └── treeSitter/     # Tree-sitter语法解析
├── shared/             # 共享工具和类型
└── types/              # 类型定义
```

## Scripts 目录

Scripts 目录包含一个专门用于内存使用情况基准测试和泄漏检测的子项目：

```
scripts/
└── memory/             # 内存使用基准测试工具
    ├── src/            # 内存测试源代码
    │   ├── memory-test.ts  # 主要的内存测试脚本
    │   └── types.ts    # 类型定义
    ├── package.json    # 内存测试项目的依赖配置
    └── README.md       # 内存测试工具使用说明
```

### 内存测试工具

内存测试工具用于监控 Repomix 的内存使用情况，检测潜在的内存泄漏问题。主要功能包括：

- **快速泄漏检测**: 运行少量迭代以快速检测内存泄漏
- **连续监控**: 持续运行测试以观察长期内存使用趋势
- **综合分析**: 详细的内存使用分析和报告生成
- **图形化展示**: ASCII图表显示内存使用趋势
- **自动垃圾回收**: 在测试过程中强制执行垃圾回收
- **结果保存**: 将测试结果保存为JSON格式以便后续分析

该工具通过反复调用 Repomix 的核心功能来模拟实际使用场景，并监控进程的内存使用情况，确保 Repomix 在处理大型代码库时不会出现内存泄漏问题。

## 核心功能模块

### 1. 文件处理 (`src/core/file/`)
- 文件搜索和过滤
- 文件内容处理（注释移除、空行移除等）
- 文件树生成
- 路径扁平化处理

### 2. Git集成 (`src/core/git/`)
- Git差异获取
- Git日志获取
- 按变更频率排序文件

### 3. 输出生成 (`src/core/output/`)
- 多格式输出支持（XML、Markdown、JSON、纯文本）
- 可配置的输出样式

### 4. 度量计算 (`src/core/metrics/`)
- Token计数
- 文件统计信息

## 构建和运行

### 开发环境要求
- Node.js >= 20.0.0
- Yarn >= 1.22.22 (可选)

### 构建命令
```bash
# 构建项目
npm run build

# 类型检查
npm run lint

# 运行测试
npm run test
```

### 运行命令
```bash
# 构建并运行repomix
npm run repomix

# 使用源码运行（包含src和tests目录）
npm run repomix-src
```

## 配置

### 默认配置文件
项目使用 `repomix.config.json` 作为默认配置文件，支持以下配置项：

- `input.maxFileSize`: 最大文件大小限制
- `output`: 输出配置（文件路径、格式、压缩等）
- `include`: 包含的文件模式
- `ignore`: 忽略的文件模式
- `tokenCount.encoding`: Token计数编码方式

### CLI选项
Repomix提供了丰富的命令行选项：

- `-o, --output <file>`: 输出文件路径
- `--style <type>`: 输出格式（xml, markdown, json, plain）
- `--include <patterns>`: 包含文件的glob模式
- `-i, --ignore <patterns>`: 忽略文件的glob模式
- `--compress`: 使用Tree-sitter提取代码结构
- `--remove-comments`: 移除代码注释
- `--clean`: 清理输出模式（移除所有元数据）
- `--structure`: 仅生成目录结构
- `--files`: 指定文件模式（实验性功能）
- `--flatten`: 扁平化文件路径（实验性功能）

## 特殊功能

### 文件模式匹配
Repomix支持通过`--files`参数使用glob模式直接指定文件，以及通过`--flatten`参数将文件路径扁平化。

### Git信息集成
- `--include-diffs`: 包含Git差异信息
- `--include-logs`: 包含Git提交日志
- `--git-sort-by-changes`: 按Git变更频率排序文件

### Token计数
集成tiktoken库进行准确的token计数，支持多种编码模型。