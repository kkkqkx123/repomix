# 多文件打包解决方案

## 当前限制分析
1. 现有打包系统(v1.6.1)使用`--include`参数仅支持目录级包含
2. 文件路径保留原始目录结构
3. 缺乏直接指定多个独立文件的能力

## 推荐实现方案
### 核心修改点
```javascript
// 在packager.ts中增加文件模式处理逻辑
const { globby } = require('globby');

async function collectFiles(patterns) {
  return globby(patterns, {
    cwd: process.cwd(),
    ignore: options.ignore,
    absolute: true,
    objectMode: true
  });
}

// 路径扁平化处理
function flattenPaths(files) {
  return files.map(file => ({
    ...file,
    relative: path.basename(file.path)
  }));
}
```

### CLI增强
```javascript
// 修改cliRun.ts参数解析
.option('-f, --files <patterns...>', '指定需要包含的glob文件模式')
.option('-F, --flatten', '启用路径扁平化')

// 使用示例
repomix --files 'src/**/*.ts' 'config/*.json' --flatten
```

## 临时解决方案
1. 在项目根目录创建`.packinclude`文件
2. 每行写入一个glob模式：
```
src/utils/*.ts
tests/*.test.ts
*.config.json
```
3. 运行命令：
```bash
repomix --include .packinclude
```

## 架构影响
| 组件        | 修改点                 | 风险等级 |
|-------------|-----------------------|----------|
| packager    | 文件收集逻辑          | 中       |
| CLI         | 新参数解析            | 低       |
| 输出格式    | 路径扁平化处理        | 高       |