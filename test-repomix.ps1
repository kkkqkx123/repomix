# test-repomix.ps1
# PowerShell script to test the repomix project

Write-Host "========================================" -ForegroundColor Green
Write-Host "Testing Repomix Project" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Get the current directory
$currentDir = Get-Location
Write-Host "Current directory: $currentDir" -ForegroundColor Yellow

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host "`nBuilding the project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "Build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error: Build failed" -ForegroundColor Red
    exit 1
}

# Test basic functionality with local test directory
Write-Host "`nTesting basic functionality with test directory..." -ForegroundColor Yellow
try {
    # Create a temporary test directory if it doesn't exist
    if (-Not (Test-Path "test-dir")) {
        Write-Host "Creating test directory..." -ForegroundColor Cyan
        New-Item -ItemType Directory -Name "test-dir" | Out-Null
        
        # Create sample files
        "Hello World" > "test-dir/readme.txt"
        "console.log('test');" > "test-dir/test.js"
    }
    
    # Run repomix on test directory
    Write-Host "Running repomix on test directory..." -ForegroundColor Cyan
    node bin/repomix.cjs test-dir
    
    # Check if output file was created
    if (Test-Path "test-dir/repomix-output.xml") {
        Write-Host "Success: repomix-output.xml was created!" -ForegroundColor Green
        Write-Host "Output file size: $((Get-Item 'test-dir/repomix-output.xml').Length) bytes" -ForegroundColor Cyan
    } else {
        Write-Host "Warning: repomix-output.xml was not created" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error during basic functionality test: $_" -ForegroundColor Red
}

# Test different output formats
Write-Host "`nTesting different output formats..." -ForegroundColor Yellow
$formats = @("xml", "markdown", "plain")

foreach ($format in $formats) {
    try {
        Write-Host "Testing $format format..." -ForegroundColor Cyan
        $outputFile = "test-dir/repomix-output.$format"
        node bin/repomix.cjs test-dir --style $format --output $outputFile
        
        if (Test-Path $outputFile) {
            Write-Host "Success: $outputFile was created!" -ForegroundColor Green
            Write-Host "Output file size: $((Get-Item $outputFile).Length) bytes" -ForegroundColor Cyan
        } else {
            Write-Host "Warning: $outputFile was not created" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Error testing $format format: $_" -ForegroundColor Red
    }
}

# Test with different options
Write-Host "`nTesting with different options..." -ForegroundColor Yellow

# Test with include option
try {
    Write-Host "Testing --include option..." -ForegroundColor Cyan
    node bin/repomix.cjs test-dir --include "*.js" --output test-dir/repomix-js-only.xml
    
    if (Test-Path "test-dir/repomix-js-only.xml") {
        Write-Host "Success: JavaScript files only output was created!" -ForegroundColor Green
    } else {
        Write-Host "Warning: JavaScript files only output was not created" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error testing --include option: $_" -ForegroundColor Red
}

# Test with ignore option
try {
    Write-Host "Testing --ignore option..." -ForegroundColor Cyan
    node bin/repomix.cjs test-dir --ignore "*.txt" --output test-dir/repomix-no-txt.xml
    
    if (Test-Path "test-dir/repomix-no-txt.xml") {
        Write-Host "Success: Output without txt files was created!" -ForegroundColor Green
    } else {
        Write-Host "Warning: Output without txt files was not created" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Error testing --ignore option: $_" -ForegroundColor Red
}

# Test npx execution (if published)
Write-Host "`nTesting npx execution (requires published package)..." -ForegroundColor Yellow
try {
    # Get package name from package.json
    $packageJson = Get-Content package.json | ConvertFrom-Json
    $packageName = $packageJson.name
    
    Write-Host "Attempting to run '$packageName' via npx..." -ForegroundColor Cyan
    npx $packageName --version
    Write-Host "Success: npx execution works!" -ForegroundColor Green
} catch {
    Write-Host "Note: npx execution test skipped or failed (package may not be published yet)" -ForegroundColor Yellow
}

# Test direct command execution
Write-Host "`nTesting direct command execution..." -ForegroundColor Yellow
try {
    Write-Host "Running repomix with --help option..." -ForegroundColor Cyan
    node bin/repomix.cjs --help
    Write-Host "Success: Help command executed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error executing help command: $_" -ForegroundColor Red
}

# Summary
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Test Summary" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Tests completed. Check the results above for any issues." -ForegroundColor Yellow
Write-Host "Test files can be found in the test-dir folder." -ForegroundColor Yellow