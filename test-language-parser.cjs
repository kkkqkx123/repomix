const fs = require('fs');
const path = require('path');

// 导入构建后的语言解析器
const { LanguageParser } = require('./lib/core/treeSitter/languageParser.js');

console.log('测试语言解析器初始化...');

const startTime = Date.now();
console.log('开始初始化语言解析器...');

const languageParser = new LanguageParser();

languageParser.init()
  .then(() => {
    const endTime = Date.now();
    console.log(`✅ 语言解析器初始化完成！耗时: ${endTime - startTime}ms`);
    
    // 测试文件类型识别
    const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
    const lang = languageParser.guessTheLang(filePath);
    console.log(`文件 ${path.basename(filePath)} 识别的语言:`, lang);
    
    return languageParser.dispose();
 })
  .then(() => {
    console.log('✅ 语言解析器清理完成');
  })
  .catch(error => {
    const endTime = Date.now();
    console.error(`❌ 语言解析器操作失败！耗时: ${endTime - startTime}ms`);
    console.error('错误:', error.message);
    console.error('堆栈:', error.stack);
  });