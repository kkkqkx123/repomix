# 文件模式匹配和路径扁平化功能指南

## 概述

Repomix v1.6.1 引入了强大的文件模式匹配和路径扁平化功能，允许用户更精确地控制哪些文件被包含在打包输出中，以及如何处理文件路径结构。

## 新增功能

### 1. 文件模式匹配 (`--files`)

通过 `--files` 参数，您可以使用 glob 模式来精确指定要包含的文件。

### 2. 路径扁平化 (`--flatten`)

通过 `--flatten` 参数，您可以启用路径扁平化功能，将文件路径简化为仅文件名。

## 使用方法

### 基本语法

```bash
repomix --files <glob-patterns...> [--flatten]
```

### 参数说明

- `--files, -f`: 指定一个或多个 glob 文件模式
- `--flatten, -F`: 启用路径扁平化（可选）

## 使用示例

### 示例 1: 匹配特定文件类型

```bash
# 包含所有 TypeScript 文件
repomix --files "**/*.ts"

# 包含所有 JavaScript 和 TypeScript 文件
repomix --files "**/*.js" "**/*.ts"

# 包含 src 目录下的所有文件
repomix --files "src/**/*"
```

### 示例 2: 使用路径扁平化

```bash
# 包含配置文件并启用路径扁平化
repomix --files "*.json" "*.config.*" --flatten

# 包含所有测试文件并扁平化路径
repomix --files "**/*.test.*" --flatten
```

### 示例 3: 复杂模式组合

```bash
# 包含特定目录下的特定文件类型
repomix --files "src/**/*.ts" "tests/**/*.test.ts"

# 排除某些文件但包含其他
repomix --files "src/**/*" --files "!src/**/*.spec.*"

# 包含多个不连续的模式
repomix --files "package.json" "tsconfig.json" "src/**/*.ts"
```

## 路径扁平化功能

### 什么是路径扁平化？

路径扁平化功能将完整的文件路径转换为仅文件名，去除目录结构信息。

### 扁平化示例

**原始文件结构:**
```
src/
  utils/
    helper.ts
  components/
    button.tsx
  index.ts
```

**启用扁平化后:**
```
helper.ts
button.tsx
index.ts
```

### 文件名冲突处理

当多个文件具有相同文件名时，系统会自动添加后缀来避免冲突：

```
helper.ts
helper_dup1.ts  # 来自不同目录的同名文件
button.tsx
index.ts
```

## 高级用法

### 与现有功能结合使用

文件模式匹配功能可以与现有的 `--include` 参数结合使用：

```bash
# 使用文件模式匹配特定文件，同时包含整个目录
repomix --files "src/**/*.ts" --include "docs"
```

### 在配置文件中使用

您也可以在 `repomix.config.json` 中配置文件模式：

```json
{
  "files": {
    "patterns": ["src/**/*.ts", "tests/**/*.test.ts"],
    "flatten": true
  },
  "output": {
    "stdout": true
  }
}
```

## 模式语法参考

### 支持的 Glob 模式

- `*`: 匹配任意数量的字符，不包括路径分隔符
- `**`: 匹配任意数量的字符，包括路径分隔符
- `?`: 匹配单个字符
- `[abc]`: 匹配括号内的任意一个字符
- `{pattern1,pattern2}`: 匹配多个模式中的任意一个
- `!pattern`: 排除匹配模式的文件

### 常用模式示例

| 模式 | 描述 |
|------|------|
| `*.js` | 当前目录下的所有 JS 文件 |
| `**/*.ts` | 所有子目录中的 TypeScript 文件 |
| `src/**/*` | src 目录及其所有子目录中的所有文件 |
| `*.{json,yml,yaml}` | 所有 JSON、YAML 和 YML 文件 |
| `!**/*.test.*` | 排除所有测试文件 |
| `{src,lib}/**/*.ts` | src 或 lib 目录下的所有 TypeScript 文件 |

## 错误处理

### 常见错误

1. **模式语法错误**: 如果模式语法不正确，系统会显示错误信息
2. **无匹配文件**: 如果模式没有匹配到任何文件，会显示警告
3. **路径扁平化冲突**: 同名文件会自动重命名以避免冲突

### 调试模式

使用 `--verbose` 参数查看详细的匹配过程：

```bash
repomix --files "**/*.ts" --verbose
```

## 性能考虑

### 大型项目优化

对于包含大量文件的项目，建议：

1. 使用更具体的模式来减少匹配范围
2. 避免使用过于宽泛的模式如 `**/*`
3. 结合 `--ignore` 参数排除不需要的目录

### 内存使用

路径扁平化功能会增加一些内存使用，但对于大多数项目来说影响很小。

## Git信息控制

### 完全禁用Git信息

为了确保打包输出中不包含任何Git相关信息（如差异信息、提交历史等），可以使用`--no-git-sort-by-changes`参数：

```bash
# 确保完全去除Git信息
repomix --files "src/**/*.ts" --no-git-sort-by-changes
```

### Git相关参数

| 参数 | 功能 | 默认值 |
|------|------|--------|
| `--include-logs` | 包含Git提交历史 | false（不包含） |
| `--include-diffs` | 包含Git差异信息 | false（不包含） |
| `--no-git-sort-by-changes` | **完全禁用Git相关功能** | false（启用Git排序） |
| `--clean` | **启用干净输出模式**，移除所有元数据和Git信息，仅保留文件内容 | false（禁用干净模式） |

**重要提示**：即使Git差异默认禁用，在某些情况下工作区的Git状态仍可能被检测到。为确保完全去除Git信息，推荐使用`--no-git-sort-by-changes`参数。

## 向后兼容性

新的文件模式匹配功能完全向后兼容现有的目录包含功能（`--include`）。您可以继续使用原有的工作流程，或者逐步迁移到新的文件模式匹配方式。

## 迁移指南

### 从目录包含迁移到文件模式匹配

**原有方式:**
```bash
repomix --include src
```

**新方式:**
```bash
repomix --files "src/**/*"
```

### 保留原有行为

如果您希望保持原有的目录包含行为，可以继续使用 `--include` 参数。新的 `--files` 参数是可选的附加功能。

## 总结

文件模式匹配和路径扁平化功能为 Repomix 提供了更强大的文件选择和控制能力。通过精确的文件选择和灵活的路径处理，您可以更好地定制打包输出，满足不同的使用场景需求。