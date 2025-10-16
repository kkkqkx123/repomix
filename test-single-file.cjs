const fs = require('fs');
const path = require('path');

// 由于使用CommonJS require，需要导入构建后的文件
const { processContent } = require('./lib/core/file/fileProcessContent.js');
const { defaultConfig } = require('./lib/config/configSchema.js');

// 读取问题文件
const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(`测试处理文件: ${filePath}`);
console.log(`文件大小: ${fileContent.length} 字符, ${fileContent.split('\n').length} 行`);

// 测试配置 - 不启用压缩
const config = {
  ...defaultConfig,
  output: {
    ...defaultConfig.output,
    compress: false,  // 确保压缩被禁用
    removeComments: false,
    removeEmptyLines: false,
    showLineNumbers: false,
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
    })
    .catch(error => {
      const endTime = Date.now();
      console.error(`❌ 文件处理失败！耗时: ${endTime - startTime}ms`);
      console.error('错误:', error.message);
    });
} catch (error) {
  const endTime = Date.now();
  console.error(`❌ 同步错误！耗时: ${endTime - startTime}ms`);
  console.error('错误:', error.message);
}