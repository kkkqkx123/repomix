const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');

// 读取问题文件
const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(`测试strip-comments库: ${filePath}`);
console.log(`文件大小: ${fileContent.length} 字符, ${fileContent.split('\n').length} 行`);

// 记录开始时间
const startTime = Date.now();
console.log('开始使用strip-comments移除注释...');

try {
  // 使用javascript模式，就像在fileManipulate.ts中一样
  const result = strip(fileContent, {
    language: 'javascript',
    preserveNewlines: true,
  });
  const endTime = Date.now();
  console.log(`✅ strip-comments完成！耗时: ${endTime - startTime}ms`);
  console.log(`结果大小: ${result.length} 字符`);
} catch (error) {
  const endTime = Date.now();
  console.error(`❌ strip-comments失败！耗时: ${endTime - startTime}ms`);
  console.error('错误:', error.message);
  console.error('堆栈:', error.stack);
}