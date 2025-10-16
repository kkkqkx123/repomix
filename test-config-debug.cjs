const fs = require('fs');
const path = require('path');

// 由于使用CommonJS require，需要导入构建后的文件
const { processContent } = require('./lib/core/file/fileProcessContent.js');
const { defaultConfig } = require('./lib/config/configSchema.js');
const { loadFileConfig, mergeConfigs } = require('./lib/config/configLoad.js');
const { buildCliConfig } = require('./lib/cli/actions/defaultAction.js');

// 模拟CLI选项（不包含任何压缩相关选项）
const cliOptions = {}; // 空选项，模拟不使用任何参数的情况

console.log('=== 配置测试 ===');
console.log('默认配置中的compress值:', defaultConfig.output.compress);

// 构建CLI配置
const cliConfig = buildCliConfig(cliOptions);
console.log('CLI配置中的compress值:', cliConfig.output ? cliConfig.output.compress : 'undefined');

// 合并配置（模拟defaultAction中的逻辑）
const fileConfig = {}; // 空文件配置
const mergedConfig = mergeConfigs(process.cwd(), fileConfig, cliConfig);

console.log('合并后配置中的compress值:', mergedConfig.output.compress);

// 读取问题文件
const filePath = path.join(__dirname, 'temp-test-dir', 'original-constants-test', 'constants.ts');
const fileContent = fs.readFileSync(filePath, 'utf-8');

console.log(`\n测试处理文件: ${filePath}`);
console.log(`文件大小: ${fileContent.length} 字符, ${fileContent.split('\n').length} 行`);

// 记录开始时间
const startTime = Date.now();
console.log('\n开始处理文件...');

try {
  processContent({ path: filePath, content: fileContent }, mergedConfig)
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