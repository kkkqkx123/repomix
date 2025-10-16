const fs = require('fs');
const path = require('path');

// 导入构建后的相关函数
const { processContent } = require('./lib/core/file/fileProcessContent.js');

// 读取问题文件
const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(`测试完整处理流程: ${filePath}`);
console.log(`文件大小: ${fileContent.length} 字符, ${fileContent.split('\n').length} 行`);

// 创建一个模拟配置，compress为false
const config = {
  output: {
    compress: false,
    removeComments: false,
    removeEmptyLines: false,
    showLineNumbers: false,
    truncateBase64: false
  }
};

console.log('配置中的compress值:', config.output.compress);

// 记录开始时间
const startTime = Date.now();
console.log('开始处理文件...');

try {
  processContent({ path: filePath, content: fileContent }, config)
    .then(result => {
      const endTime = Date.now();
      console.log(`✅ 文件处理完成！耗时: ${endTime - startTime}ms`);
      console.log(`结果大小: ${result.length} 字符`);
      console.log('前100个字符:', result.substring(0, 100));
    })
    .catch(error => {
      const endTime = Date.now();
      console.error(`❌ 文件处理失败！耗时: ${endTime - startTime}ms`);
      console.error('错误:', error.message);
      console.error('堆栈:', error.stack);
    });
} catch (error) {
  const endTime = Date.now();
  console.error(`❌ 同步错误！耗时: ${endTime - startTime}ms`);
  console.error('错误:', error.message);
  console.error('堆栈:', error.stack);
}