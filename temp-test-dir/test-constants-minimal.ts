// 简化版本的constants.ts，测试特殊字符问题
export const BACKUP_FILE_TYPE_MAP = {
  // 特殊模式
  '#filename#': 'vim-temporary', // 这行可能导致问题
  '~': 'emacs-backup',
  '.swp': 'vim-swap',
  '.bak': 'standard-backup'
} as const;

// 简化的正则表达式模式
export const SYNTAX_PATTERNS: Record<string, RegExp[]> = {
  python: [
    /^import\s+\w+/m,
    /^def\s+\w+\s*\(/m,
    /print\s*\(/m
  ],
  javascript: [
    /function\s+\w+\s*\(/m,
    /const\s+\w+\s*=/m,
    /console\.log/m
  ]
};