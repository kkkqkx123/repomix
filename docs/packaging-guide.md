# 多文件打包解决方案

## 当前限制分析
1. 现有打包系统(v1.6.1)使用`--include`参数仅支持目录级包含
2. 文件路径保留原始目录结构
3. 缺乏直接指定多个独立文件的能力

## 推荐实现方案

### 新增文件结构
```
src/core/file/
├── filePattern.ts          # 文件模式匹配核心逻辑
├── fileCollector.ts        # 文件收集器
└── pathFlattener.ts        # 路径扁平化处理器

src/cli/options/
└── fileOptions.ts          # 文件相关CLI选项定义
```

### 核心文件功能

#### 1. `src/core/file/filePattern.ts`
```typescript
// 主要功能：处理glob模式匹配
- 支持多模式并行匹配
- 处理相对路径和绝对路径转换
- 提供模式验证和错误处理
- 集成现有ignore规则
```

#### 2. `src/core/file/fileCollector.ts`  
```typescript
// 主要功能：文件收集和筛选
- 基于glob模式收集文件
- 与现有目录收集逻辑集成
- 处理重复文件去重
- 提供文件统计信息
```

#### 3. `src/core/file/pathFlattener.ts`
```typescript
// 主要功能：路径扁平化处理
- 将完整路径转换为文件名
- 处理文件名冲突（添加数字后缀）
- 保留文件扩展名信息
- 提供扁平化配置选项
```

#### 4. `src/cli/options/fileOptions.ts`
```typescript
// 主要功能：CLI选项定义
- 定义--files和--flatten参数
- 参数验证和默认值设置
- 与现有选项的兼容性处理
```

### 实施TODO列表

#### 第一阶段：核心功能开发
- [ ] 创建`filePattern.ts`实现glob模式匹配
- [ ] 创建`fileCollector.ts`集成文件收集逻辑
- [ ] 创建`pathFlattener.ts`实现路径扁平化
- [ ] 修改`packager.ts`调用新文件收集器

#### 第二阶段：CLI集成
- [ ] 创建`fileOptions.ts`定义新CLI选项
- [ ] 修改`cliRun.ts`集成新选项
- [ ] 更新命令行帮助文档
- [ ] 添加参数验证逻辑

#### 第三阶段：测试和文档
- [ ] 为新增功能编写单元测试
- [ ] 更新集成测试用例
- [ ] 编写使用示例文档
- [ ] 更新README.md说明新功能

#### 第四阶段：向后兼容
- [ ] 确保现有--include参数正常工作
- [ ] 处理文件和目录模式的优先级
- [ ] 添加模式冲突检测
- [ ] 提供迁移指南

## Git信息控制

### 确保完全去除Git信息

为了确保打包输出中不包含任何Git相关信息（如差异信息、提交历史等），可以使用`--no-git-sort-by-changes`参数：

```bash
# 确保完全去除Git信息
repomix --files "src/**/*.ts" --no-git-sort-by-changes
```

### 干净输出模式

使用`--clean`参数可以一次性启用所有确保输出仅包含干净文件所需的配置：

```bash
# 启用干净输出模式，仅保留文件内容
repomix --files "src/**/*.ts" --clean
```

**重要发现**：即使Git差异默认禁用，在某些情况下工作区的Git状态仍可能被检测到。为确保完全去除Git信息，推荐使用`--no-git-sort-by-changes`参数或`--clean`参数。

## 临时解决方案
1. 在项目根目录创建`.packinclude`文件
2. 每行写入一个glob模式：
```
src/utils/*.ts
tests/*.test.ts
*.config.json
```
3. 运行命令：
```bash
repomix --include .packinclude
```

## 架构影响
| 组件        | 修改点                 | 风险等级 |
|-------------|-----------------------|----------|
| packager    | 文件收集逻辑          | 中       |
| CLI         | 新参数解析            | 低       |
| 输出格式    | 路径扁平化处理        | 高       |