# 文件模式匹配功能更新日志

## v1.6.1 - 新增文件模式匹配和路径扁平化功能

### 新增功能

#### 1. 文件模式匹配 (`--files` 参数)
- **功能**: 支持使用 glob 模式精确选择要包含的文件
- **参数**: `--files, -f <patterns...>`
- **示例**: `repomix --files "**/*.ts" "**/*.js"`

#### 2. 路径扁平化 (`--flatten` 参数)
- **功能**: 将文件路径简化为仅文件名，去除目录结构
- **参数**: `--flatten, -F`
- **示例**: `repomix --files "**/*.ts" --flatten`

### 新增文件

#### 核心功能模块
- `src/core/file/filePattern.ts` - 文件模式匹配核心逻辑
- `src/core/file/pathFlattener.ts` - 路径扁平化处理器
- `src/core/file/fileCollector.ts` - 文件收集器集成

#### CLI 选项模块
- `src/cli/options/fileOptions.ts` - 文件相关 CLI 选项定义

### 修改的文件

#### 1. `src/core/packager.ts`
- **修改**: 扩展 `pack` 函数签名，新增 `filePatterns` 和 `flattenPathsOption` 参数
- **修改**: 集成文件模式匹配逻辑，优先处理文件模式匹配
- **修改**: 添加路径扁平化支持

#### 2. `src/cli/actions/defaultAction.ts`
- **修改**: 更新 `buildCliConfig` 函数，支持文件选项处理
- **修改**: 添加文件选项验证和配置映射逻辑

#### 3. `src/cli/actions/workers/defaultActionWorker.ts`
- **修改**: 更新 `defaultActionWorker` 函数，支持文件模式参数传递
- **修改**: 修复 stdin 处理分支的参数传递

#### 4. `src/config/configSchema.ts`
- **修改**: 扩展配置模式，支持文件模式配置

#### 5. `src/cli/cliRun.ts`
- **修改**: 添加文件选项的语义映射

### 新增 API

#### FilePattern 模块
```typescript
// 文件模式匹配
export const matchFilesByPattern = async (patterns: string[], options: FilePatternOptions): Promise<FilePatternResult>

// 模式验证
export const validateFilePatterns = (patterns: string[]): string[]

// 模式规范化
export const normalizePatterns = (patterns: string[], cwd: string): string[]
```

#### PathFlattener 模块
```typescript
// 路径扁平化
export const flattenPaths = (filePaths: string[], options?: PathFlattenOptions): FlattenedPath[]

// 应用扁平化路径
export const applyFlattenedPaths = (files: any[], flattenedPaths: FlattenedPath[]): any[]
```

#### FileCollector 模块
```typescript
// 基于模式收集文件
export const collectFilesByPattern = async (options: FileCollectionOptions): Promise<FileCollectionResult>
```

#### CLI Options 模块
```typescript
// 创建 CLI 选项
export const createFileOptions = (): Option[]

// 验证选项
export const validateFileOptions = (options: FileOptions): string[]

// 解析模式
export const parseFilePatterns = (patterns: string | string[]): string[]
```

### 测试更新

#### 新增测试文件
- `tests/core/file/filePattern.test.ts` - 文件模式匹配单元测试
- `tests/core/file/pathFlattener.test.ts` - 路径扁平化单元测试
- `tests/core/file/fileCollector.test.ts` - 文件收集器集成测试

#### 修改的测试文件
- `tests/cli/actions/workers/defaultActionWorker.test.ts` - 更新测试用例以匹配新的函数签名
- `tests/core/packager.test.ts` - 添加文件模式匹配测试用例

### 配置变更

#### 配置文件结构扩展
```json
{
  "files": {
    "patterns": ["**/*.ts", "**/*.js"],
    "flatten": true
  }
}
```

#### CLI 参数映射
- `pattern`, `glob`, `match`, `find` → `--files`
- `flat`, `flatten`, `no-directory`, `flat-structure` → `--flatten`

### 向后兼容性

#### 保持兼容的功能
- 原有的 `--include` 参数继续正常工作
- 现有的目录包含逻辑保持不变
- 所有现有 API 保持向后兼容

#### 迁移路径
用户可以选择继续使用原有的目录包含方式，或者逐步迁移到新的文件模式匹配方式。

### 性能优化

#### 内存使用优化
- 文件模式匹配使用流式处理，减少内存占用
- 路径扁平化优化了冲突检测算法
- 集成现有的内存使用跟踪功能

#### 大型项目支持
- 支持增量式文件匹配
- 优化了模式匹配性能
- 添加了进度回调支持

### 错误处理改进

#### 新增错误类型
- 文件模式语法错误处理
- 模式验证错误报告
- 路径扁平化冲突处理

#### 调试支持
- 详细的匹配过程日志
- 模式验证调试信息
- 性能监控数据

### 文档更新

#### 新增文档
- `docs/file-patterns-guide.md` - 功能使用指南
- `docs/file-patterns-api.md` - API 参考文档
- `docs/file-patterns-changelog.md` - 更新日志

#### 更新的文档
- `README.md` - 添加新功能说明
- 命令行帮助文档更新

### 已知问题

#### 当前限制
- 路径扁平化在处理大量同名文件时可能会有性能影响
- 复杂的 glob 模式可能会影响匹配性能
- 某些边缘情况的错误处理可能需要进一步优化

#### 未来改进计划
- 支持更复杂的模式组合
- 优化大型项目的性能
- 添加更多的配置选项

### 升级说明

#### 从 v1.6.0 升级
1. 无需任何代码变更即可保持原有功能
2. 新的文件模式匹配功能是可选的附加功能
3. 可以逐步迁移到新的文件选择方式

#### 配置迁移
如果希望使用新的文件模式匹配功能，可以：
1. 将 `--include` 参数替换为 `--files` 参数
2. 在配置文件中添加文件模式配置
3. 根据需要启用路径扁平化

### 贡献者

感谢所有为这个功能做出贡献的开发者和测试人员。

---

*本文档最后更新: 2024年*  
*版本: v1.6.1*