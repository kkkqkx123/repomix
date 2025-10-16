const fs = require('fs');
const path = require('path');

// 导入构建后的parseFile函数
const { parseFile } = require('./lib/core/treeSitter/parseFile.js');

// 读取问题文件
const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(`测试直接解析文件: ${filePath}`);
console.log(`文件大小: ${fileContent.length} 字符, ${fileContent.split('\n').length} 行`);

// 创建一个模拟配置，compress为false
const config = {
  output: {
    compress: false
  }
};

console.log('配置中的compress值:', config.output.compress);

// 记录开始时间
const startTime = Date.now();
console.log('开始解析文件...');

try {
  parseFile(fileContent, filePath, config)
    .then(result => {
      const endTime = Date.now();
      console.log(`✅ 文件解析完成！耗时: ${endTime - startTime}ms`);
      console.log(`结果:`, result);
    })
    .catch(error => {
      const endTime = Date.now();
      console.error(`❌ 文件解析失败！耗时: ${endTime - startTime}ms`);
      console.error('错误:', error.message);
    });
} catch (error) {
  const endTime = Date.now();
  console.error(`❌ 同步错误！耗时: ${endTime - startTime}ms`);
  console.error('错误:', error.message);
}