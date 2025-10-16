const fs = require('fs');
const path = require('path');
const { truncateBase64Content } = require('./lib/core/file/truncateBase64.js');

// 读取问题文件
const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(`测试Base64截断: ${filePath}`);
console.log(`文件大小: ${fileContent.length} 字符, ${fileContent.split('\n').length} 行`);

// 记录开始时间
const startTime = Date.now();
console.log('开始截断Base64内容...');

try {
  const result = truncateBase64Content(fileContent);
  const endTime = Date.now();
  console.log(`✅ Base64截断完成！耗时: ${endTime - startTime}ms`);
  console.log(`结果大小: ${result.length} 字符`);
} catch (error) {
  const endTime = Date.now();
  console.error(`❌ Base64截断失败！耗时: ${endTime - startTime}ms`);
  console.error('错误:', error.message);
  console.error('堆栈:', error.stack);
}