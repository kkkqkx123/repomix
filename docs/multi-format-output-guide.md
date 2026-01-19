# Repomix 多格式输出功能指南

## 概述

Repomix 支持四种输出格式：XML、Markdown、JSON 和 Plain，通过 `--style` 参数控制。每种格式都有其特定的使用场景和优势。

## 基本 CLI 用法

### 格式选择

```bash
# XML 格式（默认）
repomix --style xml

# Markdown 格式
repomix --style markdown

# JSON 格式
repomix --style json

# 纯文本格式
repomix --style plain
```

### 输出文件控制

```bash
# 指定输出文件名
repomix --style markdown -o my-project.md

# 输出到标准输出
repomix --style json --stdout
# 或者
repomix --style json -o -
```

## 格式详细说明

### 1. XML 格式（默认）

**优势**：
- AI 模型解析最准确，特别是 Claude
- 结构化程度高，易于机器处理
- 支持复杂的嵌套结构

**默认文件名**：`repomix-output.xml`

**示例输出结构**：
```xml
本文件是整个代码库的合并表示形式...

<file_summary>
（元数据和 AI 指令）
</file_summary>

<directory_structure>
src/
  index.ts
  utils/
    helper.ts
</directory_structure>

<files>
<file path="src/index.ts">
// 文件内容
</file>
</files>

<git_logs>
<!-- Git 日志信息 -->
</git_logs>
```

**适用场景**：
- Claude 等 AI 模型分析
- 需要高精度解析的场景
- 复杂项目结构分析

### 2. Markdown 格式

**优势**：
- 人类可读性最好
- 支持代码高亮
- 易于文档化和分享

**默认文件名**：`repomix-output.md`

**示例输出结构**：
```markdown
本文件是整个代码库的合并表示形式...

# 文件概要
（元数据和 AI 指令）

# 目录结构
```
src/
index.ts
utils/
helper.ts
```

# 文件

## File: src/index.ts
```typescript
// 文件内容
```

# Git Logs

## 提交：2025-08-20 00:47:19 +0900
**消息：** feat(cli): Add --include-logs option

**文件：**
- README.md
- src/cli/cliRun.ts
```

**适用场景**：
- 代码审查和文档生成
- 人工阅读和分析
- 技术文档编写

### 3. JSON 格式

**优势**：
- 程序化处理最方便
- API 集成友好
- 支持复杂的数据操作

**默认文件名**：`repomix-output.json`

**示例输出结构**：
```json
{
  "fileSummary": {
    "generationHeader": "本文件是由 Repomix 将整个代码库合并到单个文档中的表示形式。",
    "purpose": "本文件包含整个存储库内容的打包表示...",
    "fileFormat": "内容组织如下...",
    "usageGuidelines": "- 此文件应视为只读...",
    "notes": "- 某些文件可能已根据 .gitignore 规则被排除..."
  },
  "userProvidedHeader": "指定时的自定义标题文本",
  "directoryStructure": "src/\n  cli/\n    cliOutput.ts\n    index.ts\n  config/\n    configLoader.ts",
  "files": {
    "src/index.js": "// 文件内容",
    "src/utils.js": "// 文件内容"
  },
  "instruction": "来自 instructionFilePath 的自定义指令"
}
```

**程序化操作示例**：

```bash
# 列出所有文件路径
cat repomix-output.json | jq -r '.files | keys[]'

# 计算文件总数
cat repomix-output.json | jq '.files | keys | length'

# 提取特定文件内容
cat repomix-output.json | jq -r '.files["src/index.js"]'

# 按扩展名查找文件
cat repomix-output.json | jq -r '.files | keys[] | select(endswith(".ts"))'

# 查找包含特定文本的文件
cat repomix-output.json | jq -r '.files | to_entries[] | select(.value | contains("function")) | .key'
```

**适用场景**：
- 自动化工具开发
- 数据分析和统计
- API 服务和集成

### 4. 纯文本格式

**优势**：
- 简单通用，兼容性最好
- 文件大小最小
- 易于文本处理工具操作

**默认文件名**：`repomix-output.txt`

**示例输出结构**：
```text
本文件是整个代码库的合并表示形式...

================
文件概要
================
（元数据和 AI 指令）

================
目录结构
================
src/
  index.ts
  utils/
    helper.ts

================
文件
================

================
File: src/index.ts
================
// 文件内容

================
Git Logs
================
================
Date: 2025-08-20 00:47:19 +0900
Message: feat(cli): Add --include-logs option
Files:
  - README.md
  - src/cli/cliRun.ts
================
```

**适用场景**：
- 简单文本处理
- 通用兼容性要求
- 最小文件大小需求

## 高级选项

### 可解析格式

使用 `--parsable-style` 确保输出严格遵循格式规范：

```bash
repomix --style xml --parsable-style
repomix --style markdown --parsable-style
```

### 组合其他选项

```bash
# Markdown + 移除注释 + 显示行号
repomix --style markdown --remove-comments --output-show-line-numbers

# JSON + 压缩 + Git 日志
repomix --style json --compress --include-logs

# Plain + 清理模式（仅文件内容）
repomix --style plain --clean

# XML + Tree-sitter 压缩 + Token 计数
repomix --style xml --compress --token-count-tree
```

## 配置文件设置

在 `repomix.config.json` 中设置默认格式：

```json
{
  "output": {
    "style": "markdown",
    "filePath": "output.md"
  }
}
```

## 格式选择建议

| 格式 | 最佳用途 | AI模型兼容性 | 人类可读性 | 程序化操作 |
|------|----------|--------------|------------|------------|
| XML | Claude 分析、复杂结构 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Markdown | 文档、审查、分享 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| JSON | API、自动化、分析 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Plain | 通用兼容、简单处理 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

## 实际使用示例

### 1. 项目文档生成
```bash
# 生成 Markdown 格式的项目文档
repomix --style markdown --include-logs --output docs/project-overview.md
```

### 2. AI 代码审查
```bash
# 生成 XML 格式供 Claude 分析
repomix --style xml --compress --include-diffs --output review.xml
```

### 3. 自动化分析
```bash
# 生成 JSON 格式进行数据分析
repomix --style json --no-directory-structure | jq '.files | keys[]' > file-list.txt
```

### 4. 快速查看
```bash
# 生成纯文本格式快速查看
repomix --style plain --clean --stdout | less
```

## 注意事项

1. **Token 计数**：不同格式的 Token 计数会有差异，XML 通常比 Plain 文本多 10-20%
2. **文件大小**：JSON 格式通常文件最大，Plain 格式最小
3. **特殊字符**：使用 `--parsable-style` 可以确保特殊字符正确处理
4. **压缩兼容性**：`--compress` 选项与所有格式兼容，可以减少 70% 的 Token 使用量

## 总结

Repomix 的多格式输出功能提供了灵活的选择，用户可以根据具体需求选择最适合的格式。XML 适合 AI 分析，Markdown 适合人工阅读，JSON 适合程序化处理，Plain 适合通用兼容。通过合理选择格式和选项组合，可以最大化工具的使用效果。