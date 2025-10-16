const fs = require('fs');
const path = require('path');

// 模拟配置
const config = {
  cwd: process.cwd(),
  input: {
    maxFileSize: 50000000
  },
  output: {
    filePath: 'repomix-output-test.xml',
    style: 'xml',
    compress: false,
    removeComments: false,
    removeEmptyLines: false,
    truncateBase64: true,
    includeEmptyDirectories: false,
    git: {
      sortByChanges: false,
      includeDiffs: false,
      includeLogs: false
    }
  },
  include: [], // 添加缺失的include属性
  ignore: {
    useGitignore: true,
    useDefaultPatterns: true,
    customPatterns: []
  },
  security: {
    enableSecurityCheck: false
  }
};

async function testDetailedProcess() {
  try {
    console.log('=== 测试详细处理流程 ===');
    
    // 1. 文件搜索
    console.log('1. 测试文件搜索...');
    const { searchFiles } = await import('./lib/core/file/fileSearch.js');
    const searchStartTime = Date.now();
    const searchResult = await searchFiles('./temp-test-dir/original-constants-test', config);
    const searchEndTime = Date.now();
    console.log(`文件搜索完成，耗时: ${searchEndTime - searchStartTime}ms`);
    console.log(`找到文件数: ${searchResult.filePaths.length}`);
    console.log(`文件列表:`, searchResult.filePaths);
    
    // 2. 文件收集
    console.log('\n2. 测试文件收集...');
    const { collectFiles } = await import('./lib/core/file/fileCollect.js');
    const collectStartTime = Date.now();
    const collectResult = await collectFiles(searchResult.filePaths, './temp-test-dir/original-constants-test', config, (progress) => {
      console.log(`收集进度: ${progress}`);
    });
    const collectEndTime = Date.now();
    console.log(`文件收集完成，耗时: ${collectEndTime - collectStartTime}ms`);
    console.log(`收集到的文件数: ${collectResult.rawFiles.length}`);
    console.log(`跳过的文件数: ${collectResult.skippedFiles.length}`);
    
    // 3. 文件处理
    console.log('\n3. 测试文件处理...');
    const { processFiles } = await import('./lib/core/file/fileProcess.js');
    const processStartTime = Date.now();
    const processedFiles = await processFiles(collectResult.rawFiles, config, (progress) => {
      console.log(`处理进度: ${progress}`);
    });
    const processEndTime = Date.now();
    console.log(`文件处理完成，耗时: ${processEndTime - processStartTime}ms`);
    console.log(`处理后的文件数: ${processedFiles.length}`);
    
    // 4. 输出生成
    console.log('\n4. 测试输出生成...');
    const { generateOutput } = await import('./lib/core/output/outputGenerate.js');
    const generateStartTime = Date.now();
    const output = await generateOutput(
      ['./temp-test-dir/original-constants-test'], 
      config, 
      processedFiles, 
      searchResult.filePaths,
      undefined, // gitDiffResult
      undefined  // gitLogResult
    );
    const generateEndTime = Date.now();
    console.log(`输出生成完成，耗时: ${generateEndTime - generateStartTime}ms`);
    console.log(`输出长度: ${output.length} 字符`);
    
    console.log('\n=== 所有测试完成 ===');
  } catch (error) {
    console.error('测试过程中出现错误:', error);
  }
}

testDetailedProcess();