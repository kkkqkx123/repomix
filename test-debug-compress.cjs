const { spawn } = require('child_process');
const path = require('path');

// 测试在temp-test-dir/original-constants-test目录下执行repomix时的行为
console.log('开始测试在original-constants-test目录下执行repomix...');

// 获取项目根目录路径
const projectRoot = path.resolve(__dirname);
const testDir = path.join(projectRoot, 'temp-test-dir', 'original-constants-test');

console.log(`测试目录: ${testDir}`);

// 执行repomix命令（不带任何参数）
const child = spawn('node', [path.join(projectRoot, 'bin', 'repomix.cjs')], {
  cwd: testDir,
  stdio: ['pipe', 'pipe', 'pipe']  // stdin, stdout, stderr
});

// 设置超时，如果30秒内没有完成则认为卡死了
const timeout = setTimeout(() => {
  console.log('❌ 超时：repomix在30秒内未完成，可能已卡死');
  child.kill();
}, 3000);

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

child.on('close', (code) => {
  clearTimeout(timeout);
  console.log(`子进程退出，退出码: ${code}`);
  
  if (code === null || code === undefined) {
    console.log('❌ repomix被强制终止，可能已卡死');
  } else {
    console.log('✅ repomix正常完成');
  }
});

child.on('error', (err) => {
  clearTimeout(timeout);
  console.error('执行错误:', err);
});