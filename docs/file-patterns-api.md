# 文件模式匹配 API 参考

## 概述

本文档详细介绍了 Repomix 新增的文件模式匹配和路径扁平化功能的 API 接口。这些接口主要位于 `src/core/file/` 目录下。

## 核心 API

### FilePattern 模块 (`src/core/file/filePattern.ts`)

#### `matchFilesByPattern`

**功能**: 使用 glob 模式匹配文件

**签名**:
```typescript
export const matchFilesByPattern = async (
  patterns: string[],
  options: FilePatternOptions
): Promise<FilePatternResult>
```

**参数**:
- `patterns`: string[] - glob 模式数组
- `options`: FilePatternOptions - 匹配选项

**返回值**: `FilePatternResult` - 匹配结果

**示例**:
```typescript
import { matchFilesByPattern } from './filePattern.js';

const result = await matchFilesByPattern(
  ['**/*.ts', '**/*.js'],
  {
    cwd: process.cwd(),
    ignorePatterns: ['**/*.test.*'],
    absolute: true
  }
);
```

#### `FilePatternOptions` 接口

```typescript
export interface FilePatternOptions {
  cwd: string;                    // 当前工作目录
  ignorePatterns: string[];        // 忽略模式数组
  absolute?: boolean;              // 是否返回绝对路径
}
```

#### `FilePatternResult` 接口

```typescript
export interface FilePatternResult {
  filePaths: string[];             // 匹配的文件路径
  relativePaths: string[];         // 相对路径
}
```

#### `validateFilePatterns`

**功能**: 验证文件模式是否有效

**签名**:
```typescript
export const validateFilePatterns = (patterns: string[]): string[]
```

**返回值**: string[] - 无效的模式列表

#### `normalizePatterns`

**功能**: 规范化文件模式

**签名**:
```typescript
export const normalizePatterns = (patterns: string[], cwd: string): string[]
```

---

### PathFlattener 模块 (`src/core/file/pathFlattener.ts`)

#### `flattenPaths`

**功能**: 将文件路径扁平化为文件名

**签名**:
```typescript
export const flattenPaths = (
  filePaths: string[],
  options: PathFlattenOptions = {}
): FlattenedPath[]
```

**参数**:
- `filePaths`: string[] - 原始文件路径数组
- `options`: PathFlattenOptions - 扁平化选项

**返回值**: `FlattenedPath[]` - 扁平化后的路径数组

**示例**:
```typescript
import { flattenPaths } from './pathFlattener.js';

const flattened = flattenPaths([
  '/project/src/utils/helper.ts',
  '/project/src/components/button.tsx'
]);
// 返回: ['helper.ts', 'button.tsx']
```

#### `PathFlattenOptions` 接口

```typescript
export interface PathFlattenOptions {
  preserveExtensions?: boolean;    // 是否保留文件扩展名
  conflictSuffix?: string;          // 冲突后缀（默认 '_dup'）
}
```

#### `FlattenedPath` 接口

```typescript
export interface FlattenedPath {
  originalPath: string;             // 原始路径
  flattenedPath: string;           // 扁平化路径
  fileName: string;                 // 文件名
}
```

#### `applyFlattenedPaths`

**功能**: 将扁平化路径应用到文件对象

**签名**:
```typescript
export const applyFlattenedPaths = (
  files: any[],
  flattenedPaths: FlattenedPath[]
): any[]
```

---

### FileCollector 模块 (`src/core/file/fileCollector.ts`)

#### `collectFilesByPattern`

**功能**: 基于文件模式收集文件

**签名**:
```typescript
export const collectFilesByPattern = async (
  options: FileCollectionOptions
): Promise<FileCollectionResult>
```

**参数**: `FileCollectionOptions` - 收集选项

**返回值**: `FileCollectionResult` - 收集结果

#### `FileCollectionOptions` 接口

```typescript
export interface FileCollectionOptions {
  rootDir: string;                 // 根目录
  config: RepomixConfigMerged;      // 配置对象
  progressCallback?: RepomixProgressCallback; // 进度回调
  filePatterns?: string[];          // 文件模式
  flattenPaths?: boolean;           // 是否扁平化路径
}
```

#### `FileCollectionResult` 接口

```typescript
export interface FileCollectionResult {
  filePaths: string[];              // 文件路径数组
  rawFiles: any[];                  // 原始文件对象
  skippedFiles: any[];              // 跳过的文件
}
```

---

## CLI 选项 API (`src/cli/options/fileOptions.ts`)

### `createFileOptions`

**功能**: 创建文件相关的 CLI 选项

**签名**:
```typescript
export const createFileOptions = (): Option[]
```

**返回值**: `Option[]` - Commander.js 选项数组

### `FileOptions` 接口

```typescript
export interface FileOptions {
  files?: string | string[];       // 文件模式
  flatten?: boolean;               // 是否扁平化
}
```

### `validateFileOptions`

**功能**: 验证文件选项

**签名**:
```typescript
export const validateFileOptions = (options: FileOptions): string[]
```

**返回值**: string[] - 错误信息数组

### `parseFilePatterns`

**功能**: 解析文件模式字符串

**签名**:
```typescript
export const parseFilePatterns = (patterns: string | string[]): string[]
```

**示例**:
```typescript
parseFilePatterns('*.ts,*.js');        // 返回: ['*.ts', '*.js']
parseFilePatterns(['*.ts', '*.js']);   // 返回: ['*.ts', '*.js']
```

### `getDefaultFileOptions`

**功能**: 获取默认文件选项

**签名**:
```typescript
export const getDefaultFileOptions = (): FileOptions
```

---

## Packager 集成

### 修改后的 `pack` 函数签名

`src/core/packager.ts` 中的 `pack` 函数新增了文件模式相关参数：

```typescript
export const pack = async (
  rootDirs: string[],
  config: RepomixConfigMerged,
  progressCallback: RepomixProgressCallback = () => {},
  overrideDeps: Partial<typeof defaultDeps> = {},
  explicitFiles?: string[],           // 显式文件列表
  filePatterns?: string[],            // 新增：文件模式
  flattenPathsOption?: boolean,        // 新增：路径扁平化选项
): Promise<PackResult>
```

### 文件模式处理逻辑

当 `filePatterns` 参数提供时，packager 会：

1. 使用 `collectFilesByPattern` 收集匹配的文件
2. 如果启用 `flattenPathsOption`，应用路径扁平化
3. 返回处理后的文件结果

---

## 配置集成

### 配置文件结构

新增的配置选项集成到现有的配置系统中：

```typescript
// 在 configSchema.ts 中
files: z.object({
  patterns: z.array(z.string()).optional(),
  flatten: z.boolean().default(false)
}).optional()
```

### CLI 配置映射

在 `defaultAction.ts` 中，CLI 选项被映射到配置对象：

```typescript
if (typeof options.files === 'string' || Array.isArray(options.files)) {
  const filePatterns = parseFilePatterns(options.files);
  cliConfig.files = {
    patterns: filePatterns,
    flatten: options.flatten || false
  };
}
```

---

## 错误处理

### 自定义错误类型

文件模式匹配使用现有的 `RepomixError` 类型处理错误：

```typescript
throw new RepomixError('No file patterns provided');
throw new RepomixError(`Failed to match files with patterns: ${patterns.join(', ')}`);
```

### 验证错误

- 空模式数组会抛出错误
- 无效的模式会被记录但不会中断流程
- 路径扁平化冲突会自动处理

---

## 日志和调试

### 日志级别

文件模式匹配功能使用不同的日志级别：

- `trace`: 详细的匹配过程
- `debug`: 模式验证和结果统计
- `error`: 匹配失败和验证错误

### 进度回调

进度回调用于报告匹配进度：

```typescript
progressCallback('Collecting files by patterns...');
progressCallback('Flattening paths...');
```

---

## 性能监控

### 内存使用跟踪

文件模式匹配功能集成了现有的内存使用跟踪：

```typescript
logMemoryUsage('Pack - Start');
await withMemoryLogging('Collect Files by Pattern', async () => {
  // 文件收集逻辑
});
```

### 性能考虑

- 大型模式集可能会影响性能
- 建议使用具体的模式而非宽泛的模式
- 路径扁平化会增加一些内存使用

---

## 测试支持

### 单元测试

新增的功能包含完整的单元测试覆盖：

- 文件模式匹配测试
- 路径扁平化测试
- 集成测试用例

### Mock 支持

测试中使用 vi.mock() 来模拟文件系统操作：

```typescript
vi.mock('./filePattern.js', () => ({
  matchFilesByPattern: vi.fn()
}));
```

---

## 向后兼容性

### 现有 API 不变

- 原有的 `pack` 函数签名保持不变
- 现有的目录包含功能继续工作
- 配置文件结构向后兼容

### 渐进式迁移

新的文件模式匹配功能是可选的附加功能，不会破坏现有的工作流程。