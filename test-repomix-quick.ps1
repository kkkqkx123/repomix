# test-repomix-quick.ps1
# 快速测试脚本 - 用于在其他路径中验证 repomix 功能

param(
    [string]$RepomixPath = $null,  # repomix 项目路径
    [string]$TestPath = $null,     # 要测试的目标路径
    [switch]$UseNpx = $false       # 是否使用 npx 而不是本地构建
)

Write-Host "========================================" -ForegroundColor Green
Write-Host "Repomix 快速功能验证" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# 如果没有指定 repomix 路径，尝试自动检测
if (-not $RepomixPath) {
    # 检查当前目录是否是 repomix 项目
    if (Test-Path "package.json") {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        if ($packageJson.name -like "*repomix*") {
            $RepomixPath = Get-Location
            Write-Host "检测到当前目录为 repomix 项目: $RepomixPath" -ForegroundColor Cyan
        }
    }
    
    # 如果没有找到，提示用户
    if (-not $RepomixPath) {
        Write-Host "请指定 repomix 项目路径，或使用 -RepomixPath 参数" -ForegroundColor Yellow
        Write-Host "示例: .\test-repomix-quick.ps1 -RepomixPath 'D:\projects\repomix'" -ForegroundColor Cyan
        exit 1
    }
}

# 如果没有指定测试路径，使用当前目录
if (-not $TestPath) {
    $TestPath = Get-Location
    Write-Host "使用当前目录作为测试路径: $TestPath" -ForegroundColor Cyan
}

# 验证 repomix 路径
if (-not (Test-Path "$RepomixPath\bin\repomix.cjs")) {
    Write-Host "错误: 在 $RepomixPath 中未找到 repomix 可执行文件" -ForegroundColor Red
    Write-Host "请确保路径正确，并且项目已构建" -ForegroundColor Yellow
    exit 1
}

# 创建测试文件
Write-Host "`n创建测试文件..." -ForegroundColor Yellow
$testFiles = @(
    @{ Name = "test-file-1.js"; Content = "console.log('Hello World');" },
    @{ Name = "test-file-2.ts"; Content = "const message: string = 'TypeScript Test';" },
    @{ Name = "readme.md"; Content = "# Test Project`n`nThis is a test project for repomix." }
)

foreach ($file in $testFiles) {
    $filePath = Join-Path $TestPath $file.Name
    $file.Content | Out-File -FilePath $filePath -Encoding UTF8
    Write-Host "  创建: $($file.Name)" -ForegroundColor Gray
}

# 测试基本功能
Write-Host "`n测试基本功能..." -ForegroundColor Yellow

try {
    if ($UseNpx) {
        # 使用 npx 测试
        Write-Host "使用 npx 运行 repomix..." -ForegroundColor Cyan
        $packageJson = Get-Content "$RepomixPath\package.json" | ConvertFrom-Json
        $packageName = $packageJson.name
        
        Set-Location $TestPath
        npx $packageName --output "repomix-test-output.xml"
    } else {
        # 使用本地构建
        Write-Host "使用本地构建运行 repomix..." -ForegroundColor Cyan
        Set-Location $TestPath
        
        # 确保项目已构建
        if (-not (Test-Path "$RepomixPath\lib")) {
            Write-Host "构建 repomix 项目..." -ForegroundColor Yellow
            Set-Location $RepomixPath
            npm run build
            Set-Location $TestPath
        }
        
        node "$RepomixPath\bin\repomix.cjs" --output "repomix-test-output.xml"
    }
    
    # 验证输出
    if (Test-Path "repomix-test-output.xml") {
        $fileSize = (Get-Item "repomix-test-output.xml").Length
        Write-Host "✅ 成功: 输出文件已创建 ($fileSize 字节)" -ForegroundColor Green
        
        # 显示文件内容预览
        Write-Host "`n输出文件预览:" -ForegroundColor Cyan
        Get-Content "repomix-test-output.xml" -First 10 | ForEach-Object {
            Write-Host "  $_" -ForegroundColor Gray
        }
        Write-Host "  ..." -ForegroundColor Gray
        
    } else {
        Write-Host "❌ 失败: 未找到输出文件" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ 错误: $_" -ForegroundColor Red
}

# 测试不同格式
Write-Host "`n测试不同输出格式..." -ForegroundColor Yellow
$formats = @("markdown", "plain")

foreach ($format in $formats) {
    try {
        Write-Host "测试 $format 格式..." -ForegroundColor Cyan
        
        if ($UseNpx) {
            npx $packageName --style $format --output "repomix-test-output.$format"
        } else {
            node "$RepomixPath\bin\repomix.cjs" --style $format --output "repomix-test-output.$format"
        }
        
        if (Test-Path "repomix-test-output.$format") {
            Write-Host "  ✅ $format 格式成功" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $format 格式失败" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  ❌ $format 格式错误: $_" -ForegroundColor Red
    }
}

# 测试选项
Write-Host "`n测试选项功能..." -ForegroundColor Yellow

# 测试 include 选项
try {
    Write-Host "测试 --include 选项..." -ForegroundColor Cyan
    
    if ($UseNpx) {
        npx $packageName --include "*.js" --output "repomix-js-only.xml"
    } else {
        node "$RepomixPath\bin\repomix.cjs" --include "*.js" --output "repomix-js-only.xml"
    }
    
    if (Test-Path "repomix-js-only.xml") {
        $content = Get-Content "repomix-js-only.xml" -Raw
        if ($content -match "test-file-1\.js" -and -not ($content -match "readme\.md")) {
            Write-Host "  ✅ --include 选项工作正常" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  --include 选项可能有问题" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "  ❌ --include 选项错误: $_" -ForegroundColor Red
}

# 清理测试文件
Write-Host "`n清理测试文件..." -ForegroundColor Yellow
$testFiles | ForEach-Object {
    $filePath = Join-Path $TestPath $_.Name
    if (Test-Path $filePath) {
        Remove-Item $filePath -Force
        Write-Host "  删除: $($_.Name)" -ForegroundColor Gray
    }
}

# 清理输出文件
@("repomix-test-output.xml", "repomix-test-output.markdown", "repomix-test-output.plain", "repomix-js-only.xml") | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item $_ -Force
        Write-Host "  删除: $_" -ForegroundColor Gray
    }
}

# 总结
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "快速测试完成" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

if ($UseNpx) {
    Write-Host "测试了通过 npx 安装的 repomix 包" -ForegroundColor Cyan
} else {
    Write-Host "测试了本地构建的 repomix 项目" -ForegroundColor Cyan
}

Write-Host "测试路径: $TestPath" -ForegroundColor Yellow
Write-Host "repomix 路径: $RepomixPath" -ForegroundColor Yellow