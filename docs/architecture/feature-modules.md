# Repomix 功能模块详细分析

## 1. 文件处理与打包模块

### 1.1 文件收集系统
**核心文件**: `src/core/file/fileCollect.ts`, `src/core/file/fileCollector.ts`

**主要功能**:
- **智能文件发现**: 递归扫描目录结构，识别所有相关文件
- **模式匹配**: 支持 glob 模式进行文件筛选
- **文件过滤**: 基于 .gitignore 规则和自定义模式过滤文件
- **文件模式匹配**: 支持通过文件模式进行精确文件选择

**技术特点**:
```typescript
// 文件收集配置接口
interface FileCollectOptions {
  rootDir: string;
  config: RepomixConfigMerged;
  progressCallback: RepomixProgressCallback;
  filePatterns?: string[];
  flattenPaths?: boolean;
}
```

**处理流程**:
1. 目录扫描和文件发现
2. 应用过滤规则（.gitignore、默认模式、自定义模式）
3. 文件路径排序和优化
4. 文件内容读取和预处理

### 1.2 文件内容处理
**核心文件**: `src/core/file/fileProcess.ts`

**处理功能**:
- **注释移除**: 移除代码中的注释（支持多种编程语言）
- **空行清理**: 删除空白行以减少输出大小
- **Base64 截断**: 截断长的 Base64 字符串
- **代码压缩**: 使用 Tree-sitter 提取代码结构

**支持的编程语言**:
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- 其他主流编程语言

## 2. 输出格式系统

### 2.1 XML 格式输出
**核心文件**: `src/core/output/outputGenerate.ts`

**XML 结构**:
```xml
<file_summary>
  <purpose>文件用途说明</purpose>
  <file_format>文件格式描述</file_format>
  <usage_guidelines>使用指南</usage_guidelines>
</file_summary>

<repository_information>
  <repository_name>仓库名称</repository_name>
  <directory_structure>目录结构</directory_structure>
</repository_information>

<files>
  <file path="文件路径">
    <content>文件内容</content>
  </file>
</files>
```

**特点**:
- 结构化数据，便于 AI 解析
- 包含完整的元数据信息
- 支持自定义头部文本
- 可包含 Git 历史和差异信息

### 2.2 Markdown 格式输出
**适用场景**: 人工阅读、文档生成

**结构特点**:
- 层次化的标题结构
- 代码块语法高亮
- 目录树可视化
- 文件统计信息

### 2.3 JSON 格式输出
**适用场景**: 程序化处理和数据分析

**结构特点**:
- 机器友好的数据格式
- 完整的文件元数据
- 易于解析和处理
- 支持自定义字段

## 3. 安全检查系统

### 3.1 敏感信息检测
**核心文件**: `src/core/security/securityCheck.ts`

**检测模式**:
```typescript
const securityPatterns = [
  // API 密钥
  /api[_-]?key\s*[:=]\s*["']?[a-zA-Z0-9]{16,}["']?/i,
  // 密码
  /password\s*[:=]\s*["']?[^"'\s]{8,}["']?/i,
  // 令牌
  /token\s*[:=]\s*["']?[a-zA-Z0-9]{16,}["']?/i,
  // 私钥
  /-----BEGIN\s+(RSA\s+)?PRIVATE\s+KEY-----/i,
  // 其他敏感模式...
];
```

**检测流程**:
1. 文件内容扫描
2. 模式匹配和识别
3. 风险等级评估
4. 检测报告生成

### 3.2 Git 安全检查
**功能模块**: Git diff 和 Git log 安全检查

**检查内容**:
- Git 历史中的敏感信息
- 提交的差异内容
- 文件变更历史
- 分支合并记录

## 4. Git 集成模块

### 4.1 Git Diff 获取
**核心文件**: `src/core/git/gitDiffHandle.ts`

**功能特性**:
- **工作区差异**: 获取未提交的更改
- **暂存区差异**: 获取已暂存的更改
- **历史差异**: 获取提交间的差异
- **分支差异**: 获取分支间的差异

**输出格式**:
```
=== Git Diff ===
文件: src/example.ts
@@ -1,5 +1,5 @@
- const oldCode = "old";
+ const newCode = "new";
```

### 4.2 Git Log 分析
**核心文件**: `src/core/git/gitLogHandle.ts`

**功能特性**:
- **提交历史**: 获取最近的提交记录
- **作者信息**: 提取提交者信息
- **变更文件**: 列出每次提交变更的文件
- **时间戳**: 包含提交时间信息

**配置选项**:
- 提交数量限制（默认 50 个）
- 作者过滤
- 时间范围过滤
- 分支选择

### 4.3 文件变更频率分析
**应用场景**: 识别核心文件和热点代码

**分析维度**:
- 文件提交次数
- 最近修改时间
- 变更复杂度
- 作者数量

## 5. Token 计数和度量系统

### 5.1 Token 计数引擎
**核心文件**: `src/core/tokenCount/tokenCount.ts`

**支持的编码**:
- `o200k_base`: GPT-4o 模型
- `cl100k_base`: GPT-3.5/4 模型
- `p50k_base`: Codex 模型
- `p50k_edit`: 编辑模型

**计数精度**:
- 精确的 Token 计数
- 支持多种 Tokenizer
- 字符级和 Token 级统计
- 文件级别的详细计数

### 5.2 代码度量分析
**核心文件**: `src/core/metrics/calculateMetrics.ts`

**度量指标**:
- **文件统计**: 文件数量、总行数、总字符数
- **代码结构**: 类、函数、接口数量
- **复杂度分析**: 基于 Tree-sitter 的代码复杂度
- **语言分布**: 不同编程语言的文件分布

**输出示例**:
```
统计信息:
- 总文件数: 125
- 总字符数: 45,230
- 总行数: 1,890
- 估计 Token 数: 12,340

文件类型分布:
- TypeScript: 45 文件 (36%)
- JavaScript: 30 文件 (24%)
- CSS: 20 文件 (16%)
- 其他: 30 文件 (24%)
```

## 6. Tree-sitter 代码分析

### 6.1 代码结构提取
**核心文件**: `src/core/treeSitter/`

**支持的语言**:
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- Ruby
- PHP

**提取内容**:
- **类定义**: 类名、继承关系、修饰符
- **函数定义**: 函数名、参数、返回类型
- **接口定义**: 接口名、方法签名
- **变量声明**: 变量名、类型信息

### 6.2 代码压缩功能
**应用场景**: 减少 Token 使用量

**压缩策略**:
- 提取核心结构，移除实现细节
- 保留重要的类型信息
- 移除注释和文档字符串
- 简化变量名和函数名

**压缩示例**:
```typescript
// 原始代码
class UserService {
  /**
   * 获取用户信息
   */
  async getUserById(id: number): Promise<User> {
    const user = await this.db.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

// 压缩后
class UserService {
  async getUserById(id: number): Promise<User>
}
```

## 7. MCP 服务器工具

### 7.1 代码库打包工具
**核心文件**: `src/mcp/tools/packCodebaseTool.ts`

**功能特性**:
- **本地打包**: 打包本地代码库
- **远程打包**: 打包 GitHub 等远程仓库
- **配置选项**: 支持完整的打包配置
- **进度反馈**: 实时打包进度

### 7.2 文件系统工具
**工具列表**:
- **文件读取**: 读取打包输出文件
- **目录浏览**: 浏览文件系统结构
- **搜索工具**: 在打包输出中搜索内容

**应用场景**: AI 助手集成、自动化代码分析

## 8. 配置管理系统

### 8.1 配置结构
**核心文件**: `src/config/configSchema.ts`

**配置层级**:
- **默认配置**: 内置的默认设置
- **文件配置**: repomix.config.json 文件
- **命令行配置**: 命令行参数
- **环境配置**: 环境变量（未来支持）

**主要配置项**:
```typescript
interface RepomixConfig {
  output: {
    filePath: string;
    style: 'xml' | 'markdown' | 'json' | 'plain';
    compress: boolean;
    removeComments: boolean;
    removeEmptyLines: boolean;
    headerText?: string;
  };
  ignore: {
    useGitignore: boolean;
    useDefaultPatterns: boolean;
    customPatterns: string[];
  };
  security: {
    enableSecurityCheck: boolean;
  };
}
```

### 8.2 配置验证
**验证机制**:
- JSON Schema 验证
- 类型安全验证
- 依赖关系验证
- 运行时验证

这些功能模块共同构成了 Repomix 强大的代码库分析和打包能力，为 AI 辅助开发提供了完整的解决方案。