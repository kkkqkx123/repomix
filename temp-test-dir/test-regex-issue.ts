// 测试正则表达式问题
export const TEST_PATTERNS = {
  // 特殊模式
  '#filename#': 'vim-temporary',
  '~': 'emacs-backup',
  '.swp': 'vim-swap',
  '.swo': 'vim-swap',
  '.bak': 'standard-backup',
  '.backup': 'full-backup',
  '.old': 'old-version',
  '.tmp': 'temporary',
  '.temp': 'temporary',
  '.orig': 'original',
  '.save': 'saved',
  '.hidden': 'hidden-backup'
} as const;

// 正则表达式模式
export const SYNTAX_PATTERNS: Record<string, RegExp[]> = {
  python: [
    /^import\s+\w+/m,
    /^from\s+\w+\s+import/m,
    /^def\s+\w+\s*\(/m,
    /^class\s+\w+/m,
    /print\s*\(/m,
    /self\./m,
    /if\s+__name__\s*==\s*['"']__main__['"']/m,
    /#\s*.*$/m, // Python注释
    /\"\"\"[\s\S]*?\"\"\"/m, // Python多行注释
    /'''[\s\S]*?'''/m
  ],
  javascript: [
    /function\s+\w+\s*\(/m,
    /const\s+\w+\s*=/m,
    /let\s+\w+\s*=/m,
    /var\s+\w+\s*=/m,
    /import\s+.*from\s+['"`]/m,
    /export\s+(default\s+)?/m,
    /require\s*\(/m,
    /module\.exports/m,
    /console\.log/m,
    /=>\s*{/m, // 箭头函数
    /\/\*[\s\S]*?\*\//m, // 多行注释
    /\/\/.*$/m // 单行注释
  ]
};