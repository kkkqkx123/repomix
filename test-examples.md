# 测试脚本使用示例

## 示例 1: 在当前项目中测试

```powershell
# 进入 repomix 项目目录
cd D:\projects\repomix

# 运行完整测试
pwsh -ExecutionPolicy Bypass -File ./test-repomix.ps1

# 或者运行快速测试
pwsh -ExecutionPolicy Bypass -File ./test-repomix-quick.ps1
```

## 示例 2: 在其他项目中测试本地构建的 repomix

```powershell
# 进入你的项目目录
cd D:\my-project

# 使用快速测试脚本测试本地 repomix
pwsh -ExecutionPolicy Bypass -File "D:\projects\repomix\test-repomix-quick.ps1" -RepomixPath "D:\projects\repomix" -TestPath "D:\my-project"

# 或者手动测试
# 创建一些测试文件
"console.log('test');" > test.js
"Hello World" > readme.txt

# 使用本地构建的 repomix
node "D:\projects\repomix\bin\repomix.cjs" --output my-output.xml

# 检查输出
if (Test-Path "my-output.xml") { Write-Host "成功!" }
```

## 示例 3: 测试已发布的 npm 包

```powershell
# 进入你的项目目录
cd D:\my-project

# 使用 npx 测试（临时安装）
npx kkkqkx-repomix --version
npx kkkqkx-repomix --help
npx kkkqkx-repomix . --output test-output.xml

# 或者全局安装后测试
npm install -g kkkqkx-repomix
repomix --version
repomix . --output test-output.xml
```

## 示例 4: 在 CI/CD 环境中测试

### GitHub Actions
```yaml
name: Test Repomix
on: [push, pull_request]

jobs:
  test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build project
        run: npm run build
      
      - name: Run tests
        shell: pwsh
        run: |
          pwsh -ExecutionPolicy Bypass -File ./test-repomix.ps1
```

### Azure DevOps
```yaml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'
  
- script: npm install
  displayName: 'Install dependencies'
  
- script: npm run build
  displayName: 'Build project'
  
- task: PowerShell@2
  inputs:
    filePath: 'test-repomix.ps1'
    arguments: '-ExecutionPolicy Bypass'
  displayName: 'Run repomix tests'
```

## 示例 5: 批量测试多个项目

```powershell
# 创建批量测试脚本
$projects = @(
    "D:\project1",
    "D:\project2", 
    "D:\project3"
)

foreach ($project in $projects) {
    Write-Host "Testing $project..." -ForegroundColor Yellow
    
    # 进入项目目录
    Set-Location $project
    
    # 创建测试文件
    "console.log('test');" > test.js
    
    # 运行 repomix
    try {
        node "D:\repomix\bin\repomix.cjs" --output "repomix-test.xml"
        
        if (Test-Path "repomix-test.xml") {
            Write-Host "✅ $project - 成功" -ForegroundColor Green
        } else {
            Write-Host "❌ $project - 失败" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ $project - 错误: $_" -ForegroundColor Red
    }
    
    # 清理
    Remove-Item "test.js" -ErrorAction SilentlyContinue
    Remove-Item "repomix-test.xml" -ErrorAction SilentlyContinue
}
```

## 示例 6: 测试远程仓库功能

```powershell
# 测试 GitHub 仓库
npx kkkqkx-repomix --remote yamadashy/repomix --output remote-test.xml

# 测试特定分支
npx kkkqkx-repomix --remote https://github.com/yamadashy/repomix/tree/main --output branch-test.xml

# 测试特定提交
npx kkkqkx-repomix --remote https://github.com/yamadashy/repomix/commit/abc123 --output commit-test.xml
```

## 示例 7: 创建测试报告

```powershell
# 运行测试并生成报告
$testResults = @()

# 测试不同格式
$formats = @("xml", "markdown", "plain")
foreach ($format in $formats) {
    try {
        npx kkkqkx-repomix --style $format --output "test-$format.output"
        $success = Test-Path "test-$format.output"
        $testResults += @{
            Format = $format
            Success = $success
            FileSize = if ($success) { (Get-Item "test-$format.output").Length } else { 0 }
        }
    } catch {
        $testResults += @{
            Format = $format
            Success = $false
            Error = $_.Exception.Message
        }
    }
}

# 生成报告
Write-Host "测试报告:" -ForegroundColor Green
$testResults | Format-Table -AutoSize

# 保存报告
$testResults | ConvertTo-Json | Out-File "test-report.json"
```

## 示例 8: 集成到开发工作流

```powershell
# 在 package.json 中添加测试脚本
# {
#   "scripts": {
#     "test-repomix": "pwsh -ExecutionPolicy Bypass -File ../repomix/test-repomix-quick.ps1 -RepomixPath ../repomix"
#   }
# }

# 然后可以运行
npm run test-repomix

# 或者在 VS Code 任务中
# .vscode/tasks.json
# {
#   "label": "Test with Repomix",
#   "type": "shell",
#   "command": "pwsh",
#   "args": [
#     "-ExecutionPolicy", "Bypass",
#     "-File", "${workspaceFolder}/../repomix/test-repomix-quick.ps1",
#     "-RepomixPath", "${workspaceFolder}/../repomix"
#   ],
#   "group": "test"
# }
```

## 故障排除示例

```powershell
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 PowerShell 执行策略
Get-ExecutionPolicy -List

# 临时设置执行策略
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# 检查路径
$env:PATH -split ';'

# 清除 npm 缓存
npm cache clean --force

# 重新安装依赖
npm install

# 重新构建
npm run build
```

这些示例展示了如何在不同场景和环境中使用测试脚本来验证 repomix 的功能。