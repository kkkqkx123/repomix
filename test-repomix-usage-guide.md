# Test-Repomix.ps1 使用指南

## 概述

`test-repomix.ps1` 是一个 PowerShell 脚本，用于测试 repomix 项目的功能。该脚本可以验证从 npm 仓库拉取后的行为，并测试各种功能选项。

## 前提条件

1. **Node.js** (版本 20 或更高)
2. **npm** (已安装并配置)
3. **PowerShell** (pwsh 或 powershell)
4. **Git** (可选，用于测试远程仓库功能)

## 使用方法

### 1. 在当前项目目录中使用

```powershell
# 使用 PowerShell Core (推荐)
pwsh -ExecutionPolicy Bypass -File ./test-repomix.ps1

# 或者使用 Windows PowerShell
powershell -ExecutionPolicy Bypass -File ./test-repomix.ps1
```

### 2. 在其他路径中使用脚本

#### 方法 A: 复制脚本到目标目录

```powershell
# 复制脚本到目标项目目录
Copy-Item "path/to/repomix/test-repomix.ps1" "path/to/target/project/"

# 在目标目录中运行脚本
cd "path/to/target/project"
pwsh -ExecutionPolicy Bypass -File ./test-repomix.ps1
```

#### 方法 B: 从任意位置运行脚本

```powershell
# 使用脚本的完整路径
pwsh -ExecutionPolicy Bypass -File "D:\path\to\repomix\test-repomix.ps1"

# 或者先进入脚本所在目录
cd "D:\path\to\repomix"
pwsh -ExecutionPolicy Bypass -File ./test-repomix.ps1
```

#### 方法 C: 创建可重用的函数

在你的 PowerShell 配置文件中添加以下函数：

```powershell
# 添加到 $PROFILE 文件中
function Test-Repomix {
    param(
        [string]$ScriptPath = "D:\path\to\repomix\test-repomix.ps1",
        [string]$WorkingDirectory = (Get-Location)
    )
    
    Set-Location $WorkingDirectory
    pwsh -ExecutionPolicy Bypass -File $ScriptPath
}

# 使用方法
Test-Repomix
Test-Repomix -WorkingDirectory "C:\my\project"
```

### 3. 测试已发布的 npm 包

如果你想测试从 npm 仓库安装的 repomix 包：

```powershell
# 全局安装 repomix
npm install -g repomix

# 或者使用 npx 临时安装
npx repomix --version

# 在你的项目目录中测试
cd "your/project/directory"
repomix --help
repomix .
```

## 脚本功能验证

脚本会执行以下测试：

### 基础功能测试
- ✅ 检查 Node.js 和 npm 安装
- ✅ 构建项目
- ✅ 创建测试目录和文件
- ✅ 运行基本的 repomix 命令
- ✅ 验证输出文件生成

### 格式测试
- ✅ XML 格式输出
- ✅ Markdown 格式输出
- ✅ Plain 文本格式输出

### 选项测试
- ✅ `--include` 选项（包含特定文件）
- ✅ `--ignore` 选项（排除特定文件）
- ✅ `--help` 命令

### npm 集成测试
- ✅ npx 执行测试
- ✅ 版本信息验证

## 验证结果解读

### 成功指标
- 所有测试步骤显示绿色 "Success" 或 "✅"
- 输出文件正常生成
- 没有错误信息

### 警告信息
- 黄色 "Warning" 信息通常表示可选功能未完全实现
- 不影响核心功能的使用

### 错误处理
- 红色 "Error" 信息需要关注
- 脚本会自动停止在严重错误处
- 检查 Node.js/npm 安装和路径配置

## 在不同环境中的使用

### Windows 环境
```powershell
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File test-repomix.ps1

# PowerShell Core (推荐)
pwsh -ExecutionPolicy Bypass -File test-repomix.ps1
```

### Linux/macOS 环境
```bash
# 确保 PowerShell 已安装
pwsh -ExecutionPolicy Bypass -File test-repomix.ps1

# 或者使用 bash 脚本替代
chmod +x test-repomix.sh
./test-repomix.sh
```

### CI/CD 环境
```yaml
# GitHub Actions 示例
- name: Test Repomix
  run: |
    pwsh -ExecutionPolicy Bypass -File test-repomix.ps1
  shell: pwsh

# Azure DevOps 示例
- task: PowerShell@2
  inputs:
    filePath: 'test-repomix.ps1'
    arguments: '-ExecutionPolicy Bypass'
```

## 故障排除

### 常见问题

1. **PowerShell 未找到**
   ```powershell
   # 检查 PowerShell 安装
   Get-Command pwsh -ErrorAction SilentlyContinue
   # 或安装 PowerShell Core
   winget install --id Microsoft.Powershell --source winget
   ```

2. **执行策略错误**
   ```powershell
   # 临时设置执行策略
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
   ```

3. **Node.js 版本过低**
   ```powershell
   # 检查 Node.js 版本
   node --version
   # 升级到 Node.js 20+
   winget upgrade nodejs
   ```

4. **npm 包未找到**
   ```powershell
   # 清除 npm 缓存
   npm cache clean --force
   # 重新安装
   npm install
   ```

## 扩展功能

你可以修改脚本来添加更多测试：

```powershell
# 添加自定义测试
function Test-CustomFeature {
    param([string]$projectPath)
    
    # 测试远程仓库
    npx repomix --remote username/repo
    
    # 测试配置文件
    Copy-Item "custom-config.json" "$projectPath/repomix.config.json"
    npx repomix
    
    # 测试大文件处理
    # 添加你的自定义测试逻辑
}
```

## 最佳实践

1. **定期测试**：在每次发布前运行测试脚本
2. **环境隔离**：在不同的 Node.js 版本上测试
3. **自动化**：集成到 CI/CD 流程中
4. **文档化**：记录测试结果和已知问题
5. **版本控制**：跟踪脚本的变化历史

## 总结

`test-repomix.ps1` 脚本提供了一个全面的测试框架，可以验证 repomix 项目的核心功能。通过在不同路径和环境中使用该脚本，你可以确保项目的稳定性和可靠性。