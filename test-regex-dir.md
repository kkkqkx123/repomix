This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
- Pay special attention to the Repository Description. These contain important context and guidelines specific to this project.
- Pay special attention to the Repository Instruction. These contain important context and guidelines specific to this project.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Long base64 data strings (e.g., data:image/png;base64,...) have been truncated to reduce token count
- Files are sorted by Git change count (files with more changes are at the bottom)
- Git diffs from the worktree and staged changes are included
- Git logs (50 commits) are included to show development patterns
</notes>

</file_summary>

<user_provided_header>
This repository contains the source code for the Repomix tool.
Repomix is designed to pack repository contents into a single file,
making it easier for AI systems to analyze and process the codebase.

Key Features:
- Configurable ignore patterns
- Custom header text support
- Efficient file processing and packing

Please refer to the README.md file for more detailed information on usage and configuration.

</user_provided_header>

<directory_structure>
__tests__/test1.js
__tests__/test2.spec.js
test-regex-issue.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="__tests__/test1.js">
console.log('test file 1');

</file>

<file path="__tests__/test2.spec.js">
describe('test suite', () => { it('should work', () => {}); });

</file>

<file path="test-regex-issue.ts">

export const TEST_PATTERNS = {

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


export const SYNTAX_PATTERNS: Record<string, RegExp[]> = {
  python: [
    /^import\s+\w+/m,
    /^from\s+\w+\s+import/m,
    /^def\s+\w+\s*\(/m,
    /^class\s+\w+/m,
    /print\s*\(/m,
    /self\./m,
    /if\s+__name__\s*==\s*['"']__main__['"']/m,
    /#\s*.*$/m,
    /\"\"\"[\s\S]*?\"\"\"/m,
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
    /=>\s*{/m,
    /\/\*[\s\S]*?\*\//m,
    /\/\/.*$/m
  ]
};
</file>

</files>

<git_diffs>
<git_diff_work_tree>

</git_diff_work_tree>
<git_diff_staged>
diff --git "a/docs/\345\234\250\345\205\266\344\273\226\347\233\256\345\275\225\346\265\213\350\257\225.md" "b/docs/\345\234\250\345\205\266\344\273\226\347\233\256\345\275\225\346\265\213\350\257\225.md"
new file mode 100644
index 0000000..1562f96
--- /dev/null
+++ "b/docs/\345\234\250\345\205\266\344\273\226\347\233\256\345\275\225\346\265\213\350\257\225.md"
@@ -0,0 +1 @@
+cd "D:\ide\tool\code-search-helper\src\service\parser\universal" && node "D:\ide\tool\repomix\bin\repomix.cjs" . --output test-universal.md --verbose
diff --git a/package.json b/package.json
index 7352150..70865b2 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "kkkqkx-repomix",
-  "version": "1.0.5",
+  "version": "1.0.6",
   "description": "A tool to pack repository contents to single file for AI consumption",
   "main": "./lib/index.js",
   "types": "./lib/index.d.ts",
diff --git a/temp-test-dir/__tests__/test1.js b/temp-test-dir/__tests__/test1.js
new file mode 100644
index 0000000..cc61d40
--- /dev/null
+++ b/temp-test-dir/__tests__/test1.js
@@ -0,0 +1 @@
+console.log('test file 1');
diff --git a/temp-test-dir/__tests__/test2.spec.js b/temp-test-dir/__tests__/test2.spec.js
new file mode 100644
index 0000000..0aebd7d
--- /dev/null
+++ b/temp-test-dir/__tests__/test2.spec.js
@@ -0,0 +1 @@
+describe('test suite', () => { it('should work', () => {}); });
diff --git a/test-simple-dir/test.js b/test-simple-dir/test.js
new file mode 100644
index 0000000..42db46d
--- /dev/null
+++ b/test-simple-dir/test.js
@@ -0,0 +1,10 @@
+// Simple test file
+function hello() {
+    console.log("Hello, World!");
+}
+
+function add(a, b) {
+    return a + b;
+}
+
+module.exports = { hello, add };
\ No newline at end of file
diff --git a/test-with-tests.md b/test-with-tests.md
new file mode 100644
index 0000000..b4bc043
--- /dev/null
+++ b/test-with-tests.md
@@ -0,0 +1,1456 @@
+This file is a merged representation of the entire codebase, combined into a single document by Repomix.
+
+<file_summary>
+This section contains a summary of this file.
+
+<purpose>
+This file contains a packed representation of the entire repository's contents.
+It is designed to be easily consumable by AI systems for analysis, code review,
+or other automated processes.
+</purpose>
+
+<file_format>
+The content is organized as follows:
+1. This summary section
+2. Repository information
+3. Directory structure
+4. Repository files (if enabled)
+5. Multiple file entries, each consisting of:
+  - File path as an attribute
+  - Full contents of the file
+</file_format>
+
+<usage_guidelines>
+- This file should be treated as read-only. Any changes should be made to the
+  original repository files, not this packed version.
+- When processing this file, use the file path to distinguish
+  between different files in the repository.
+- Be aware that this file may contain sensitive information. Handle it with
+  the same level of security as you would the original repository.
+- Pay special attention to the Repository Description. These contain important context and guidelines specific to this project.
+- Pay special attention to the Repository Instruction. These contain important context and guidelines specific to this project.
+</usage_guidelines>
+
+<notes>
+- Some files may have been excluded based on .gitignore rules and Repomix's configuration
+- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
+- Files matching patterns in .gitignore are excluded
+- Files matching default ignore patterns are excluded
+- Long base64 data strings (e.g., data:image/png;base64,...) have been truncated to reduce token count
+- Files are sorted by Git change count (files with more changes are at the bottom)
+- Git diffs from the worktree and staged changes are included
+- Git logs (50 commits) are included to show development patterns
+</notes>
+
+</file_summary>
+
+<user_provided_header>
+This repository contains the source code for the Repomix tool.
+Repomix is designed to pack repository contents into a single file,
+making it easier for AI systems to analyze and process the codebase.
+
+Key Features:
+- Configurable ignore patterns
+- Custom header text support
+- Efficient file processing and packing
+
+Please refer to the README.md file for more detailed information on usage and configuration.
+
+</user_provided_header>
+
+<directory_structure>
+__tests__/test1.js
+__tests__/test2.spec.js
+</directory_structure>
+
+<files>
+This section contains the contents of the repository's files.
+
+<file path="__tests__/test1.js">
+console.log('test file 1');
+
+</file>
+
+<file path="__tests__/test2.spec.js">
+describe('test suite', () => { it('should work', () => {}); });
+
+</file>
+
+</files>
+
+<git_diffs>
+<git_diff_work_tree>
+
+</git_diff_work_tree>
+<git_diff_staged>
+diff --git a/package.json b/package.json
+index 7352150..70865b2 100644
+--- a/package.json
++++ b/package.json
+@@ -1,6 +1,6 @@
+ {
+   "name": "kkkqkx-repomix",
+-  "version": "1.0.5",
++  "version": "1.0.6",
+   "description": "A tool to pack repository contents to single file for AI consumption",
+   "main": "./lib/index.js",
+   "types": "./lib/index.d.ts",
+
+</git_diff_staged>
+</git_diffs>
+
+<git_logs>
+<git_log_commit>
+<date>2025-10-16 09:16:12 +0800</date>
+<message>fix issue in non-git folder</message>
+<files>
+package.json
+src/core/git/gitCommand.ts
+src/core/git/gitRepositoryHandle.ts
+src/core/output/outputSort.ts
+test-examples.md
+test-repomix-quick.ps1
+test-repomix-usage-guide.md
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-16 08:27:55 +0800</date>
+<message>add ps1 script and rm useless language support</message>
+<files>
+test-repomix.ps1
+website/client/src/de/guide/code-compress.md
+website/client/src/de/guide/command-line-options.md
+website/client/src/de/guide/comment-removal.md
+website/client/src/de/guide/community-projects.md
+website/client/src/de/guide/configuration.md
+website/client/src/de/guide/custom-instructions.md
+website/client/src/de/guide/development/index.md
+website/client/src/de/guide/development/using-repomix-as-a-library.md
+website/client/src/de/guide/github-actions.md
+website/client/src/de/guide/index.md
+website/client/src/de/guide/installation.md
+website/client/src/de/guide/mcp-server.md
+website/client/src/de/guide/output.md
+website/client/src/de/guide/prompt-examples.md
+website/client/src/de/guide/remote-repository-processing.md
+website/client/src/de/guide/security.md
+website/client/src/de/guide/sponsors.md
+website/client/src/de/guide/tips/best-practices.md
+website/client/src/de/guide/usage.md
+website/client/src/de/guide/use-cases.md
+website/client/src/de/index.md
+website/client/src/es/guide/code-compress.md
+website/client/src/es/guide/command-line-options.md
+website/client/src/es/guide/comment-removal.md
+website/client/src/es/guide/community-projects.md
+website/client/src/es/guide/configuration.md
+website/client/src/es/guide/custom-instructions.md
+website/client/src/es/guide/development/index.md
+website/client/src/es/guide/development/using-repomix-as-a-library.md
+website/client/src/es/guide/github-actions.md
+website/client/src/es/guide/index.md
+website/client/src/es/guide/installation.md
+website/client/src/es/guide/mcp-server.md
+website/client/src/es/guide/output.md
+website/client/src/es/guide/prompt-examples.md
+website/client/src/es/guide/remote-repository-processing.md
+website/client/src/es/guide/security.md
+website/client/src/es/guide/sponsors.md
+website/client/src/es/guide/tips/best-practices.md
+website/client/src/es/guide/usage.md
+website/client/src/es/guide/use-cases.md
+website/client/src/es/index.md
+website/client/src/fr/guide/code-compress.md
+website/client/src/fr/guide/command-line-options.md
+website/client/src/fr/guide/comment-removal.md
+website/client/src/fr/guide/community-projects.md
+website/client/src/fr/guide/configuration.md
+website/client/src/fr/guide/custom-instructions.md
+website/client/src/fr/guide/development/index.md
+website/client/src/fr/guide/development/using-repomix-as-a-library.md
+website/client/src/fr/guide/github-actions.md
+website/client/src/fr/guide/index.md
+website/client/src/fr/guide/installation.md
+website/client/src/fr/guide/mcp-server.md
+website/client/src/fr/guide/output.md
+website/client/src/fr/guide/prompt-examples.md
+website/client/src/fr/guide/remote-repository-processing.md
+website/client/src/fr/guide/security.md
+website/client/src/fr/guide/sponsors.md
+website/client/src/fr/guide/tips/best-practices.md
+website/client/src/fr/guide/usage.md
+website/client/src/fr/guide/use-cases.md
+website/client/src/fr/index.md
+website/client/src/hi/guide/code-compress.md
+website/client/src/hi/guide/command-line-options.md
+website/client/src/hi/guide/comment-removal.md
+website/client/src/hi/guide/community-projects.md
+website/client/src/hi/guide/configuration.md
+website/client/src/hi/guide/custom-instructions.md
+website/client/src/hi/guide/development/index.md
+website/client/src/hi/guide/development/using-repomix-as-a-library.md
+website/client/src/hi/guide/github-actions.md
+website/client/src/hi/guide/index.md
+website/client/src/hi/guide/installation.md
+website/client/src/hi/guide/mcp-server.md
+website/client/src/hi/guide/output.md
+website/client/src/hi/guide/prompt-examples.md
+website/client/src/hi/guide/remote-repository-processing.md
+website/client/src/hi/guide/security.md
+website/client/src/hi/guide/sponsors.md
+website/client/src/hi/guide/tips/best-practices.md
+website/client/src/hi/guide/usage.md
+website/client/src/hi/guide/use-cases.md
+website/client/src/hi/index.md
+website/client/src/id/guide/code-compress.md
+website/client/src/id/guide/command-line-options.md
+website/client/src/id/guide/comment-removal.md
+website/client/src/id/guide/community-projects.md
+website/client/src/id/guide/configuration.md
+website/client/src/id/guide/custom-instructions.md
+website/client/src/id/guide/development/index.md
+website/client/src/id/guide/development/using-repomix-as-a-library.md
+website/client/src/id/guide/github-actions.md
+website/client/src/id/guide/index.md
+website/client/src/id/guide/installation.md
+website/client/src/id/guide/mcp-server.md
+website/client/src/id/guide/output.md
+website/client/src/id/guide/prompt-examples.md
+website/client/src/id/guide/remote-repository-processing.md
+website/client/src/id/guide/security.md
+website/client/src/id/guide/sponsors.md
+website/client/src/id/guide/tips/best-practices.md
+website/client/src/id/guide/usage.md
+website/client/src/id/guide/use-cases.md
+website/client/src/id/index.md
+website/client/src/ja/guide/code-compress.md
+website/client/src/ja/guide/command-line-options.md
+website/client/src/ja/guide/comment-removal.md
+website/client/src/ja/guide/community-projects.md
+website/client/src/ja/guide/configuration.md
+website/client/src/ja/guide/custom-instructions.md
+website/client/src/ja/guide/development/index.md
+website/client/src/ja/guide/development/using-repomix-as-a-library.md
+website/client/src/ja/guide/github-actions.md
+website/client/src/ja/guide/index.md
+website/client/src/ja/guide/installation.md
+website/client/src/ja/guide/mcp-server.md
+website/client/src/ja/guide/output.md
+website/client/src/ja/guide/prompt-examples.md
+website/client/src/ja/guide/remote-repository-processing.md
+website/client/src/ja/guide/security.md
+website/client/src/ja/guide/sponsors.md
+website/client/src/ja/guide/tips/best-practices.md
+website/client/src/ja/guide/usage.md
+website/client/src/ja/guide/use-cases.md
+website/client/src/ja/index.md
+website/client/src/ko/guide/code-compress.md
+website/client/src/ko/guide/command-line-options.md
+website/client/src/ko/guide/comment-removal.md
+website/client/src/ko/guide/community-projects.md
+website/client/src/ko/guide/configuration.md
+website/client/src/ko/guide/custom-instructions.md
+website/client/src/ko/guide/development/index.md
+website/client/src/ko/guide/development/using-repomix-as-a-library.md
+website/client/src/ko/guide/github-actions.md
+website/client/src/ko/guide/index.md
+website/client/src/ko/guide/installation.md
+website/client/src/ko/guide/mcp-server.md
+website/client/src/ko/guide/output.md
+website/client/src/ko/guide/prompt-examples.md
+website/client/src/ko/guide/remote-repository-processing.md
+website/client/src/ko/guide/security.md
+website/client/src/ko/guide/sponsors.md
+website/client/src/ko/guide/tips/best-practices.md
+website/client/src/ko/guide/usage.md
+website/client/src/ko/guide/use-cases.md
+website/client/src/ko/index.md
+website/client/src/pt-br/guide/code-compress.md
+website/client/src/pt-br/guide/command-line-options.md
+website/client/src/pt-br/guide/comment-removal.md
+website/client/src/pt-br/guide/community-projects.md
+website/client/src/pt-br/guide/configuration.md
+website/client/src/pt-br/guide/custom-instructions.md
+website/client/src/pt-br/guide/development/index.md
+website/client/src/pt-br/guide/development/using-repomix-as-a-library.md
+website/client/src/pt-br/guide/github-actions.md
+website/client/src/pt-br/guide/index.md
+website/client/src/pt-br/guide/installation.md
+website/client/src/pt-br/guide/mcp-server.md
+website/client/src/pt-br/guide/output.md
+website/client/src/pt-br/guide/prompt-examples.md
+website/client/src/pt-br/guide/remote-repository-processing.md
+website/client/src/pt-br/guide/security.md
+website/client/src/pt-br/guide/sponsors.md
+website/client/src/pt-br/guide/tips/best-practices.md
+website/client/src/pt-br/guide/usage.md
+website/client/src/pt-br/guide/use-cases.md
+website/client/src/pt-br/index.md
+website/client/src/vi/guide/code-compress.md
+website/client/src/vi/guide/command-line-options.md
+website/client/src/vi/guide/comment-removal.md
+website/client/src/vi/guide/community-projects.md
+website/client/src/vi/guide/configuration.md
+website/client/src/vi/guide/custom-instructions.md
+website/client/src/vi/guide/development/index.md
+website/client/src/vi/guide/development/using-repomix-as-a-library.md
+website/client/src/vi/guide/github-actions.md
+website/client/src/vi/guide/index.md
+website/client/src/vi/guide/installation.md
+website/client/src/vi/guide/mcp-server.md
+website/client/src/vi/guide/output.md
+website/client/src/vi/guide/prompt-examples.md
+website/client/src/vi/guide/remote-repository-processing.md
+website/client/src/vi/guide/security.md
+website/client/src/vi/guide/sponsors.md
+website/client/src/vi/guide/tips/best-practices.md
+website/client/src/vi/guide/usage.md
+website/client/src/vi/guide/use-cases.md
+website/client/src/vi/index.md
+website/client/src/zh-tw/guide/code-compress.md
+website/client/src/zh-tw/guide/command-line-options.md
+website/client/src/zh-tw/guide/comment-removal.md
+website/client/src/zh-tw/guide/community-projects.md
+website/client/src/zh-tw/guide/configuration.md
+website/client/src/zh-tw/guide/custom-instructions.md
+website/client/src/zh-tw/guide/development/index.md
+website/client/src/zh-tw/guide/development/using-repomix-as-a-library.md
+website/client/src/zh-tw/guide/github-actions.md
+website/client/src/zh-tw/guide/index.md
+website/client/src/zh-tw/guide/installation.md
+website/client/src/zh-tw/guide/mcp-server.md
+website/client/src/zh-tw/guide/output.md
+website/client/src/zh-tw/guide/prompt-examples.md
+website/client/src/zh-tw/guide/remote-repository-processing.md
+website/client/src/zh-tw/guide/security.md
+website/client/src/zh-tw/guide/sponsors.md
+website/client/src/zh-tw/guide/tips/best-practices.md
+website/client/src/zh-tw/guide/usage.md
+website/client/src/zh-tw/guide/use-cases.md
+website/client/src/zh-tw/index.md
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-16 08:26:33 +0800</date>
+<message>update diff</message>
+<files>
+src/cli/actions/defaultAction.ts
+src/core/file/fileCollect.ts
+src/core/file/fileCollectSync.ts
+src/core/git/gitCommand.ts
+src/shared/processConcurrency.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-15 23:40:19 +0800</date>
+<message>fix json issue</message>
+<files>
+package.json
+repomix.config.json
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-15 23:38:47 +0800</date>
+<message>update fileCollect</message>
+<files>
+package.json
+src/cli/actions/defaultAction.ts
+src/core/file/fileCollect.ts
+src/core/file/fileCollectSync.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-15 23:13:11 +0800</date>
+<message>fix fileCollect logic</message>
+<files>
+package.json
+src/cli/actions/defaultAction.ts
+src/cli/actions/workers/defaultActionWorker.ts
+src/cli/cliRun.ts
+src/cli/options/fileOptions.ts
+src/core/file/fileCollect.ts
+src/core/file/fileCollector.ts
+src/core/file/filePattern.ts
+src/core/file/fileProcess.ts
+src/core/file/pathFlattener.ts
+src/core/metrics/calculateMetrics.ts
+src/core/output/outputGenerate.ts
+src/core/output/outputStyleDecorate.ts
+src/core/packager.ts
+src/core/security/securityCheck.ts
+test-dir/readme.txt
+test-dir/test.js
+tests/cli/actions/workers/defaultActionWorker.test.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-05 14:41:45 +0800</date>
+<message>fix strcture issue</message>
+<files>
+src/cli/actions/defaultAction.ts
+src/cli/actions/workers/defaultActionWorker.ts
+src/core/file/fileCollect.ts
+src/core/file/fileProcess.ts
+src/core/security/securityCheck.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-05 14:35:30 +0800</date>
+<message>update</message>
+<files>
+docs/file-filtering-analysis.md
+docs/file-patterns-guide.md
+docs/packaging-guide.md
+docs/prompt/temp
+"docs/\351\252\214\350\257\201.txt"
+src/cli/actions/defaultAction.ts
+src/cli/cliRun.ts
+src/cli/types.ts
+website/client/src/en/guide/command-line-options.md
+website/client/src/zh-cn/guide/command-line-options.md
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-05 14:00:48 +0800</date>
+<message>succeed</message>
+<files>
+docs/file-filtering-analysis.md
+"docs/\351\252\214\350\257\201.txt"
+src/cli/actions/defaultAction.ts
+src/core/output/outputGenerate.ts
+src/core/output/outputStyleDecorate.ts
+src/core/packager.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-05 12:47:04 +0800</date>
+<message>complete files filter</message>
+<files>
+src/cli/actions/defaultAction.ts
+src/cli/actions/workers/defaultActionWorker.ts
+src/config/configLoad.ts
+src/config/configSchema.ts
+src/core/file/fileCollect.ts
+src/core/file/fileCollector.ts
+src/core/file/filePattern.ts
+src/core/file/fileProcess.ts
+src/core/metrics/calculateMetrics.ts
+src/core/security/securityCheck.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-04 22:17:17 +0800</date>
+<message>update</message>
+<files>
+"docs/\351\252\214\350\257\201.txt"
+src/core/file/fileCollector.ts
+src/core/file/filePattern.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-04 21:54:36 +0800</date>
+<message>add --files and --flatten</message>
+<files>
+README.md
+docs/file-patterns-api.md
+docs/file-patterns-changelog.md
+docs/file-patterns-guide.md
+docs/packaging-guide.md
+src/cli/actions/defaultAction.ts
+src/cli/actions/workers/defaultActionWorker.ts
+src/cli/cliRun.ts
+src/cli/options/fileOptions.ts
+src/config/configSchema.ts
+src/core/file/fileCollector.ts
+src/core/file/filePattern.ts
+src/core/file/pathFlattener.ts
+src/core/packager.ts
+tests/cli/actions/workers/defaultActionWorker.test.ts
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-04 20:36:21 +0800</date>
+<message>add plan</message>
+<files>
+docs/packaging-guide.md
+</files>
+</git_log_commit>
+<git_log_commit>
+<date>2025-10-04 19:39:12 +0800</date>
+<message>init</message>
+<files>
+.agents/commands/agent/claude-rule-update.md
+.agents/commands/agent/gemini-discuss.md
+.agents/commands/code/lint-fix.md
+.agents/commands/git/git-commit-push.md
+.agents/commands/git/git-commit.md
+.agents/commands/git/pr-create.md
+.agents/commands/git/pr-review-request.md
+.agents/commands/git/pr-review.md
+.agents/commands/git/release-note-generate.md
+.agents/rules/base.md
+.claude/agents/browser-extension-developer.md
+.claude/agents/lint-fixer.md
+.claude/agents/website-maintainer.md
+.claude/commands
+.codecov.yml
+.coderabbit.yaml
+.cursor/commands
+.cursor/rules/base.mdc
+.devcontainer/Dockerfile
+.devcontainer/devcontainer.json
+.devcontainer/init-firewall.sh
+.dockerignore
+.editorconfig
+.gitignore
+.oxlintrc.json
+.pinact.yaml
+.repomixignore
+.secretlintrc.json
+.tool-versions
+AGENTS.md
+CLAUDE.md
+Dockerfile
+LICENSE
+README.md
+SECURITY.md
+bin/repomix.cjs
+biome.json
+browser/.gitignore
+browser/CLAUDE.md
+browser/README.md
+browser/entrypoints/background.ts
+browser/entrypoints/content.ts
+browser/entrypoints/styles.css
+browser/package-lock.json
+browser/package.json
+browser/promo/Chrome-Webstore-Icon_128x128.png
+browser/promo/Promo-Image-Marquee_1400x560.png
+browser/promo/Promo-Image-Small_440x280.png
+browser/promo/Screenshot_1280x800.png
+browser/public/_locales/de/detailed-description.txt
+browser/public/_locales/de/messages.json
+browser/public/_locales/en/detailed-description.txt
+browser/public/_locales/en/messages.json
+browser/public/_locales/es/detailed-description.txt
+browser/public/_locales/es/messages.json
+browser/public/_locales/fr/detailed-description.txt
+browser/public/_locales/fr/messages.json
+browser/public/_locales/hi/detailed-description.txt
+browser/public/_locales/hi/messages.json
+browser/public/_locales/id/detailed-description.txt
+browser/public/_locales/id/messages.json
+browser/public/_locales/ja/detailed-description.txt
+browser/public/_locales/ja/messages.json
+browser/public/_locales/ko/detailed-description.txt
+browser/public/_locales/ko/messages.json
+browser/public/_locales/pt_BR/detailed-description.txt
+browser/public/_locales/pt_BR/messages.json
+browser/public/_locales/vi/detailed-description.txt
+browser/public/_locales/vi/messages.json
+browser/public/_locales/zh_CN/detailed-description.txt
+browser/public/_locales/zh_CN/messages.json
+browser/public/_locales/zh_TW/detailed-description.txt
+browser/public/_locales/zh_TW/messages.json
+browser/public/images/icon-128.png
+browser/public/images/icon-16.png
+browser/public/images/icon-19.png
+browser/public/images/icon-32.png
+browser/public/images/icon-38.png
+browser/public/images/icon-48.png
+browser/public/images/icon-64.png
+browser/public/images/icon.svg
+browser/scripts/generate-icons.ts
+browser/tests/repomix-integration.test.ts
+browser/tsconfig.json
+browser/types.d.ts
+browser/vitest.config.ts
+browser/wxt.config.ts
+llms-install.md
+package-lock.json
+package.json
+repomix-instruction.md
+repomix.config.json
+scripts/memory/.gitignore
+scripts/memory/README.md
+scripts/memory/package-lock.json
+scripts/memory/package.json
+scripts/memory/src/memory-test.ts
+scripts/memory/src/types.ts
+scripts/memory/tsconfig.json
+src/cli/actions/defaultAction.ts
+src/cli/actions/initAction.ts
+src/cli/actions/mcpAction.ts
+src/cli/actions/migrationAction.ts
+src/cli/actions/remoteAction.ts
+src/cli/actions/versionAction.ts
+src/cli/actions/workers/defaultActionWorker.ts
+src/cli/cliReport.ts
+src/cli/cliRun.ts
+src/cli/cliSpinner.ts
+src/cli/reporters/tokenCountTreeReporter.ts
+src/cli/types.ts
+src/config/configLoad.ts
+src/config/configSchema.ts
+src/config/defaultIgnore.ts
+src/config/globalDirectory.ts
+src/core/file/fileCollect.ts
+src/core/file/fileManipulate.ts
+src/core/file/filePathSort.ts
+src/core/file/fileProcess.ts
+src/core/file/fileProcessContent.ts
+src/core/file/fileRead.ts
+src/core/file/fileSearch.ts
+src/core/file/fileStdin.ts
+src/core/file/fileTreeGenerate.ts
+src/core/file/fileTypes.ts
+src/core/file/packageJsonParse.ts
+src/core/file/permissionCheck.ts
+src/core/file/truncateBase64.ts
+src/core/file/workers/fileCollectWorker.ts
+src/core/file/workers/fileProcessWorker.ts
+src/core/git/gitCommand.ts
+src/core/git/gitDiffHandle.ts
+src/core/git/gitHubArchive.ts
+src/core/git/gitHubArchiveApi.ts
+src/core/git/gitLogHandle.ts
+src/core/git/gitRemoteHandle.ts
+src/core/git/gitRemoteParse.ts
+src/core/git/gitRepositoryHandle.ts
+src/core/metrics/TokenCounter.ts
+src/core/metrics/calculateGitDiffMetrics.ts
+src/core/metrics/calculateGitLogMetrics.ts
+src/core/metrics/calculateMetrics.ts
+src/core/metrics/calculateOutputMetrics.ts
+src/core/metrics/calculateSelectiveFileMetrics.ts
+src/core/metrics/tokenCounterFactory.ts
+src/core/metrics/workers/calculateMetricsWorker.ts
+src/core/metrics/workers/types.ts
+src/core/output/outputGenerate.ts
+src/core/output/outputGeneratorTypes.ts
+src/core/output/outputSort.ts
+src/core/output/outputStyleDecorate.ts
+src/core/output/outputStyles/markdownStyle.ts
+src/core/output/outputStyles/plainStyle.ts
+src/core/output/outputStyles/xmlStyle.ts
+src/core/packager.ts
+src/core/packager/copyToClipboardIfEnabled.ts
+src/core/packager/writeOutputToDisk.ts
+src/core/security/filterOutUntrustedFiles.ts
+src/core/security/securityCheck.ts
+src/core/security/validateFileSafety.ts
+src/core/security/workers/securityCheckWorker.ts
+src/core/tokenCount/buildTokenCountStructure.ts
+src/core/tokenCount/types.ts
+src/core/treeSitter/ext2Lang.ts
+src/core/treeSitter/lang2Query.ts
+src/core/treeSitter/languageParser.ts
+src/core/treeSitter/loadLanguage.ts
+src/core/treeSitter/parseFile.ts
+src/core/treeSitter/parseStrategies/CssParseStrategy.ts
+src/core/treeSitter/parseStrategies/DefaultParseStrategy.ts
+src/core/treeSitter/parseStrategies/GoParseStrategy.ts
+src/core/treeSitter/parseStrategies/ParseStrategy.ts
+src/core/treeSitter/parseStrategies/PythonParseStrategy.ts
+src/core/treeSitter/parseStrategies/TypeScriptParseStrategy.ts
+src/core/treeSitter/parseStrategies/VueParseStrategy.ts
+src/core/treeSitter/queries/README.md
+src/core/treeSitter/queries/queryC.ts
+src/core/treeSitter/queries/queryCSharp.ts
+src/core/treeSitter/queries/queryCpp.ts
+src/core/treeSitter/queries/queryCss.ts
+src/core/treeSitter/queries/queryGo.ts
+src/core/treeSitter/queries/queryJava.ts
+src/core/treeSitter/queries/queryJavascript.ts
+src/core/treeSitter/queries/queryPhp.ts
+src/core/treeSitter/queries/queryPython.ts
+src/core/treeSitter/queries/queryRuby.ts
+src/core/treeSitter/queries/queryRust.ts
+src/core/treeSitter/queries/querySolidity.ts
+src/core/treeSitter/queries/querySwift.ts
+src/core/treeSitter/queries/queryTypescript.ts
+src/core/treeSitter/queries/queryVue.ts
+src/index.ts
+src/mcp/mcpServer.ts
+src/mcp/prompts/packRemoteRepositoryPrompts.ts
+src/mcp/tools/attachPackedOutputTool.ts
+src/mcp/tools/fileSystemReadDirectoryTool.ts
+src/mcp/tools/fileSystemReadFileTool.ts
+src/mcp/tools/grepRepomixOutputTool.ts
+src/mcp/tools/mcpToolRuntime.ts
+src/mcp/tools/packCodebaseTool.ts
+src/mcp/tools/packRemoteRepositoryTool.ts
+src/mcp/tools/readRepomixOutputTool.ts
+src/shared/constants.ts
+src/shared/errorHandle.ts
+src/shared/logger.ts
+src/shared/memoryUtils.ts
+src/shared/patternUtils.ts
+src/shared/processConcurrency.ts
+src/shared/types.ts
+src/types/git-url-parse.d.ts
+tests/cli/actions/defaultAction.buildCliConfig.test.ts
+tests/cli/actions/defaultAction.test.ts
+tests/cli/actions/defaultAction.tokenCountTree.test.ts
+tests/cli/actions/diffsFlag.test.ts
+tests/cli/actions/initAction.test.ts
+tests/cli/actions/mcpAction.test.ts
+tests/cli/actions/migrationAction.test.ts
+tests/cli/actions/remoteAction.test.ts
+tests/cli/actions/versionAction.test.ts
+tests/cli/actions/workers/defaultActionWorker.test.ts
+tests/cli/cliReport.binaryFiles.test.ts
+tests/cli/cliReport.test.ts
+tests/cli/cliRun.test.ts
+tests/cli/reporters/tokenCountTreeReporter.test.ts
+tests/config/configLoad.test.ts
+tests/config/configSchema.test.ts
+tests/config/globalDirectory.test.ts
+tests/core/file/fileCollect.test.ts
+tests/core/file/fileManipulate.test.ts
+tests/core/file/filePathSort.test.ts
+tests/core/file/fileProcess.test.ts
+tests/core/file/fileProcessContent.test.ts
+tests/core/file/fileSearch.test.ts
+tests/core/file/fileStdin.test.ts
+tests/core/file/packageJsonParse.test.ts
+tests/core/file/permissionCheck.test.ts
+tests/core/file/truncateBase64.test.ts
+tests/core/git/gitCommand.test.ts
+tests/core/git/gitDiffHandle.test.ts
+tests/core/git/gitHubArchive.test.ts
+tests/core/git/gitHubArchiveApi.test.ts
+tests/core/git/gitLogHandle.test.ts
+tests/core/git/gitRemoteHandle.test.ts
+tests/core/git/gitRemoteParse.test.ts
+tests/core/git/gitRepositoryHandle.test.ts
+tests/core/metrics/TokenCounter.test.ts
+tests/core/metrics/calculateGitDiffMetrics.test.ts
+tests/core/metrics/calculateGitLogMetrics.test.ts
+tests/core/metrics/calculateMetrics.test.ts
+tests/core/metrics/calculateOutputMetrics.test.ts
+tests/core/metrics/calculateSelectiveFileMetrics.test.ts
+tests/core/metrics/diffTokenCount.test.ts
+tests/core/output/diffsInOutput.test.ts
+tests/core/output/outputGenerate.test.ts
+tests/core/output/outputGenerateDiffs.test.ts
+tests/core/output/outputSort.test.ts
+tests/core/output/outputStyleDecorate.test.ts
+tests/core/output/outputStyles/jsonStyle.test.ts
+tests/core/output/outputStyles/markdownStyle.test.ts
+tests/core/output/outputStyles/plainStyle.test.ts
+tests/core/output/outputStyles/xmlStyle.test.ts
+tests/core/packager.test.ts
+tests/core/packager/copyToClipboardIfEnabled.test.ts
+tests/core/packager/diffsFunctionality.test.ts
+tests/core/packager/writeOutputToDisk.test.ts
+tests/core/security/filterOutUntrustedFiles.test.ts
+tests/core/security/securityCheck.test.ts
+tests/core/security/validateFileSafety.test.ts
+tests/core/security/workers/securityCheckWorker.test.ts
+tests/core/tokenCount/buildTokenCountStructure.test.ts
+tests/core/treeSitter/LanguageParser.test.ts
+tests/core/treeSitter/loadLanguage.test.ts
+tests/core/treeSitter/parseFile.c.test.ts
+tests/core/treeSitter/parseFile.comments.test.ts
+tests/core/treeSitter/parseFile.cpp.test.ts
+tests/core/treeSitter/parseFile.csharp.test.ts
+tests/core/treeSitter/parseFile.css.test.ts
+tests/core/treeSitter/parseFile.go.test.ts
+tests/core/treeSitter/parseFile.java.test.ts
+tests/core/treeSitter/parseFile.javascript.test.ts
+tests/core/treeSitter/parseFile.php.test.ts
+tests/core/treeSitter/parseFile.python.test.ts
+tests/core/treeSitter/parseFile.ruby.test.ts
+tests/core/treeSitter/parseFile.rust.test.ts
+tests/core/treeSitter/parseFile.solidity.test.ts
+tests/core/treeSitter/parseFile.swift.test.ts
+tests/core/treeSitter/parseFile.test.ts
+tests/core/treeSitter/parseFile.typescript.test.ts
+tests/core/treeSitter/parseFile.vue.test.ts
+tests/integration-tests/fixtures/packager/inputs/simple-project/.repomixignore
+tests/integration-tests/fixtures/packager/inputs/simple-project/README.md
+tests/integration-tests/fixtures/packager/inputs/simple-project/build/test.js
+tests/integration-tests/fixtures/packager/inputs/simple-project/package.json
+tests/integration-tests/fixtures/packager/inputs/simple-project/repomix.config.json
+tests/integration-tests/fixtures/packager/inputs/simple-project/resources/.repomixignore
+tests/integration-tests/fixtures/packager/inputs/simple-project/resources/data.txt
+tests/integration-tests/fixtures/packager/inputs/simple-project/resources/ignored-data.txt
+tests/integration-tests/fixtures/packager/inputs/simple-project/src/build/test.js
+tests/integration-tests/fixtures/packager/inputs/simple-project/src/index.js
+tests/integration-tests/fixtures/packager/inputs/simple-project/src/utils.js
+tests/integration-tests/fixtures/packager/outputs/simple-project-output.md
+tests/integration-tests/fixtures/packager/outputs/simple-project-output.txt
+tests/integration-tests/fixtures/packager/outputs/simple-project-output.xml
+tests/integration-tests/packager.test.ts
+tests/mcp/mcpServer.test.ts
+tests/mcp/prompts/packRemoteRepositoryPrompts.test.ts
+tests/mcp/tools/attachPackedOutputTool.test.ts
+tests/mcp/tools/fileSystemReadDirectoryTool.test.ts
+tests/mcp/tools/fileSystemReadFileTool.test.ts
+tests/mcp/tools/grepRepomixOutputTool.test.ts
+tests/mcp/tools/mcpToolRuntime.test.ts
+tests/mcp/tools/packCodebaseTool.test.ts
+tests/mcp/tools/readRepomixOutputTool.test.ts
+tests/shared/logger.test.ts
+tests/shared/patternUtils.test.ts
+tests/shared/processConcurrency.test.ts
+tests/testing/testUtils.ts
+tsconfig.build.json
+tsconfig.json
+typos.toml
+vitest.config.ts
+website/README.md
+website/client/.gitignore
+website/client/.tool-versions
+website/client/.vitepress/config.ts
+website/client/.vitepress/config/configDe.ts
+website/client/.vitepress/config/configEnUs.ts
+website/client/.vitepress/config/configEs.ts
+website/client/.vitepress/config/configFr.ts
+website/client/.vitepress/config/configHi.ts
+website/client/.vitepress/config/configId.ts
+website/client/.vitepress/config/configJa.ts
+website/client/.vitepress/config/configKo.ts
+website/client/.vitepress/config/configPtBr.ts
+website/client/.vitepress/config/configShard.ts
+website/client/.vitepress/config/configVi.ts
+website/client/.vitepress/config/configZhCn.ts
+website/client/.vitepress/config/configZhTw.ts
+website/client/.vitepress/theme/component.d.ts
+website/client/.vitepress/theme/custom.css
+website/client/.vitepress/theme/index.ts
+website/client/.vitepress/theme/style.css
+website/client/Dockerfile
+website/client/components/Home.vue
+website/client/components/Home/FileSelectionWarning.vue
+website/client/components/Home/Hero.vue
+website/client/components/Home/PackButton.vue
+website/client/components/Home/PackIcon.vue
+website/client/components/Home/TryIt.vue
+website/client/components/Home/TryItFileSelection.vue
+website/client/components/Home/TryItFileUpload.vue
+website/client/components/Home/TryItFolderUpload.vue
+website/client/components/Home/TryItLoading.vue
+website/client/components/Home/TryItPackOptions.vue
+website/client/components/Home/TryItResult.vue
+website/client/components/Home/TryItResultContent.vue
+website/client/components/Home/TryItResultErrorContent.vue
+website/client/components/Home/TryItUrlInput.vue
+website/client/components/HomeBadges.vue
+website/client/components/YouTubeVideo.vue
+website/client/components/api/client.ts
+website/client/components/utils/analytics.ts
+website/client/components/utils/requestHandlers.ts
+website/client/components/utils/resultViewer.ts
+website/client/components/utils/validation.ts
+website/client/composables/useFileUpload.ts
+website/client/composables/usePackOptions.ts
+website/client/composables/usePackRequest.ts
+website/client/composables/useZipProcessor.ts
+website/client/constants/fileSelection.ts
+website/client/constants/videos.ts
+website/client/package-lock.json
+website/client/package.json
+website/client/scripts/generateSchema.ts
+website/client/src/de/guide/code-compress.md
+website/client/src/de/guide/command-line-options.md
+website/client/src/de/guide/comment-removal.md
+website/client/src/de/guide/community-projects.md
+website/client/src/de/guide/configuration.md
+website/client/src/de/guide/custom-instructions.md
+website/client/src/de/guide/development/index.md
+website/client/src/de/guide/development/using-repomix-as-a-library.md
+website/client/src/de/guide/github-actions.md
+website/client/src/de/guide/index.md
+website/client/src/de/guide/installation.md
+website/client/src/de/guide/mcp-server.md
+website/client/src/de/guide/output.md
+website/client/src/de/guide/prompt-examples.md
+website/client/src/de/guide/remote-repository-processing.md
+website/client/src/de/guide/security.md
+website/client/src/de/guide/sponsors.md
+website/client/src/de/guide/tips/best-practices.md
+website/client/src/de/guide/usage.md
+website/client/src/de/guide/use-cases.md
+website/client/src/de/index.md
+website/client/src/en/guide/code-compress.md
+website/client/src/en/guide/command-line-options.md
+website/client/src/en/guide/comment-removal.md
+website/client/src/en/guide/community-projects.md
+website/client/src/en/guide/configuration.md
+website/client/src/en/guide/custom-instructions.md
+website/client/src/en/guide/development/index.md
+website/client/src/en/guide/development/using-repomix-as-a-library.md
+website/client/src/en/guide/github-actions.md
+website/client/src/en/guide/index.md
+website/client/src/en/guide/installation.md
+website/client/src/en/guide/mcp-server.md
+website/client/src/en/guide/output.md
+website/client/src/en/guide/prompt-examples.md
+website/client/src/en/guide/remote-repository-processing.md
+website/client/src/en/guide/security.md
+website/client/src/en/guide/sponsors.md
+website/client/src/en/guide/tips/best-practices.md
+website/client/src/en/guide/usage.md
+website/client/src/en/guide/use-cases.md
+website/client/src/en/index.md
+website/client/src/es/guide/code-compress.md
+website/client/src/es/guide/command-line-options.md
+website/client/src/es/guide/comment-removal.md
+website/client/src/es/guide/community-projects.md
+website/client/src/es/guide/configuration.md
+website/client/src/es/guide/custom-instructions.md
+website/client/src/es/guide/development/index.md
+website/client/src/es/guide/development/using-repomix-as-a-library.md
+website/client/src/es/guide/github-actions.md
+website/client/src/es/guide/index.md
+website/client/src/es/guide/installation.md
+website/client/src/es/guide/mcp-server.md
+website/client/src/es/guide/output.md
+website/client/src/es/guide/prompt-examples.md
+website/client/src/es/guide/remote-repository-processing.md
+website/client/src/es/guide/security.md
+website/client/src/es/guide/sponsors.md
+website/client/src/es/guide/tips/best-practices.md
+website/client/src/es/guide/usage.md
+website/client/src/es/guide/use-cases.md
+website/client/src/es/index.md
+website/client/src/fr/guide/code-compress.md
+website/client/src/fr/guide/command-line-options.md
+website/client/src/fr/guide/comment-removal.md
+website/client/src/fr/guide/community-projects.md
+website/client/src/fr/guide/configuration.md
+website/client/src/fr/guide/custom-instructions.md
+website/client/src/fr/guide/development/index.md
+website/client/src/fr/guide/development/using-repomix-as-a-library.md
+website/client/src/fr/guide/github-actions.md
+website/client/src/fr/guide/index.md
+website/client/src/fr/guide/installation.md
+website/client/src/fr/guide/mcp-server.md
+website/client/src/fr/guide/output.md
+website/client/src/fr/guide/prompt-examples.md
+website/client/src/fr/guide/remote-repository-processing.md
+website/client/src/fr/guide/security.md
+website/client/src/fr/guide/sponsors.md
+website/client/src/fr/guide/tips/best-practices.md
+website/client/src/fr/guide/usage.md
+website/client/src/fr/guide/use-cases.md
+website/client/src/fr/index.md
+website/client/src/hi/guide/code-compress.md
+website/client/src/hi/guide/command-line-options.md
+website/client/src/hi/guide/comment-removal.md
+website/client/src/hi/guide/community-projects.md
+website/client/src/hi/guide/configuration.md
+website/client/src/hi/guide/custom-instructions.md
+website/client/src/hi/guide/development/index.md
+website/client/src/hi/guide/development/using-repomix-as-a-library.md
+website/client/src/hi/guide/github-actions.md
+website/client/src/hi/guide/index.md
+website/client/src/hi/guide/installation.md
+website/client/src/hi/guide/mcp-server.md
+website/client/src/hi/guide/output.md
+website/client/src/hi/guide/prompt-examples.md
+website/client/src/hi/guide/remote-repository-processing.md
+website/client/src/hi/guide/security.md
+website/client/src/hi/guide/sponsors.md
+website/client/src/hi/guide/tips/best-practices.md
+website/client/src/hi/guide/usage.md
+website/client/src/hi/guide/use-cases.md
+website/client/src/hi/index.md
+website/client/src/id/guide/code-compress.md
+website/client/src/id/guide/command-line-options.md
+website/client/src/id/guide/comment-removal.md
+website/client/src/id/guide/community-projects.md
+website/client/src/id/guide/configuration.md
+website/client/src/id/guide/custom-instructions.md
+website/client/src/id/guide/development/index.md
+website/client/src/id/guide/development/using-repomix-as-a-library.md
+website/client/src/id/guide/github-actions.md
+website/client/src/id/guide/index.md
+website/client/src/id/guide/installation.md
+website/client/src/id/guide/mcp-server.md
+website/client/src/id/guide/output.md
+website/client/src/id/guide/prompt-examples.md
+website/client/src/id/guide/remote-repository-processing.md
+website/client/src/id/guide/security.md
+website/client/src/id/guide/sponsors.md
+website/client/src/id/guide/tips/best-practices.md
+website/client/src/id/guide/usage.md
+website/client/src/id/guide/use-cases.md
+website/client/src/id/index.md
+website/client/src/ja/guide/code-compress.md
+website/client/src/ja/guide/command-line-options.md
+website/client/src/ja/guide/comment-removal.md
+website/client/src/ja/guide/community-projects.md
+website/client/src/ja/guide/configuration.md
+website/client/src/ja/guide/custom-instructions.md
+website/client/src/ja/guide/development/index.md
+website/client/src/ja/guide/development/using-repomix-as-a-library.md
+website/client/src/ja/guide/github-actions.md
+website/client/src/ja/guide/index.md
+website/client/src/ja/guide/installation.md
+website/client/src/ja/guide/mcp-server.md
+website/client/src/ja/guide/output.md
+website/client/src/ja/guide/prompt-examples.md
+website/client/src/ja/guide/remote-repository-processing.md
+website/client/src/ja/guide/security.md
+website/client/src/ja/guide/sponsors.md
+website/client/src/ja/guide/tips/best-practices.md
+website/client/src/ja/guide/usage.md
+website/client/src/ja/guide/use-cases.md
+website/client/src/ja/index.md
+website/client/src/ko/guide/code-compress.md
+website/client/src/ko/guide/command-line-options.md
+website/client/src/ko/guide/comment-removal.md
+website/client/src/ko/guide/community-projects.md
+website/client/src/ko/guide/configuration.md
+website/client/src/ko/guide/custom-instructions.md
+website/client/src/ko/guide/development/index.md
+website/client/src/ko/guide/development/using-repomix-as-a-library.md
+website/client/src/ko/guide/github-actions.md
+website/client/src/ko/guide/index.md
+website/client/src/ko/guide/installation.md
+website/client/src/ko/guide/mcp-server.md
+website/client/src/ko/guide/output.md
+website/client/src/ko/guide/prompt-examples.md
+website/client/src/ko/guide/remote-repository-processing.md
+website/client/src/ko/guide/security.md
+website/client/src/ko/guide/sponsors.md
+website/client/src/ko/guide/tips/best-practices.md
+website/client/src/ko/guide/usage.md
+website/client/src/ko/guide/use-cases.md
+website/client/src/ko/index.md
+website/client/src/pt-br/guide/code-compress.md
+website/client/src/pt-br/guide/command-line-options.md
+website/client/src/pt-br/guide/comment-removal.md
+website/client/src/pt-br/guide/community-projects.md
+website/client/src/pt-br/guide/configuration.md
+website/client/src/pt-br/guide/custom-instructions.md
+website/client/src/pt-br/guide/development/index.md
+website/client/src/pt-br/guide/development/using-repomix-as-a-library.md
+website/client/src/pt-br/guide/github-actions.md
+website/client/src/pt-br/guide/index.md
+website/client/src/pt-br/guide/installation.md
+website/client/src/pt-br/guide/mcp-server.md
+website/client/src/pt-br/guide/output.md
+website/client/src/pt-br/guide/prompt-examples.md
+website/client/src/pt-br/guide/remote-repository-processing.md
+website/client/src/pt-br/guide/security.md
+website/client/src/pt-br/guide/sponsors.md
+website/client/src/pt-br/guide/tips/best-practices.md
+website/client/src/pt-br/guide/usage.md
+website/client/src/pt-br/guide/use-cases.md
+website/client/src/pt-br/index.md
+website/client/src/public/images/docs/browser-extension.png
+website/client/src/public/images/docs/repomix-file-usage-1.png
+website/client/src/public/images/docs/repomix-file-usage-2.png
+website/client/src/public/images/og-image-large.png
+website/client/src/public/images/pwa/repomix-192x192.png
+website/client/src/public/images/pwa/repomix-512x512.png
+website/client/src/public/images/repomix-logo.png
+website/client/src/public/images/repomix-logo.svg
+website/client/src/public/images/repomix-title.png
+website/client/src/public/images/sponsors/tuple/github_repo_sponsorship.png
+website/client/src/public/images/sponsors/warp/Terminal-Image.png
+website/client/src/public/schemas/0.3.5/schema.json
+website/client/src/public/schemas/1.3.0/schema.json
+website/client/src/public/schemas/1.4.0/schema.json
+website/client/src/public/schemas/1.4.1/schema.json
+website/client/src/public/schemas/1.4.2/schema.json
+website/client/src/public/schemas/1.5.0/schema.json
+website/client/src/public/schemas/1.6.0/schema.json
+website/client/src/public/schemas/latest/schema.json
+website/client/src/shared/sponsors-section.md
+website/client/src/vi/guide/code-compress.md
+website/client/src/vi/guide/command-line-options.md
+website/client/src/vi/guide/comment-removal.md
+website/client/src/vi/guide/community-projects.md
+website/client/src/vi/guide/configuration.md
+website/client/src/vi/guide/custom-instructions.md
+website/client/src/vi/guide/development/index.md
+website/client/src/vi/guide/development/using-repomix-as-a-library.md
+website/client/src/vi/guide/github-actions.md
+website/client/src/vi/guide/index.md
+website/client/src/vi/guide/installation.md
+website/client/src/vi/guide/mcp-server.md
+website/client/src/vi/guide/output.md
+website/client/src/vi/guide/prompt-examples.md
+website/client/src/vi/guide/remote-repository-processing.md
+website/client/src/vi/guide/security.md
+website/client/src/vi/guide/sponsors.md
+website/client/src/vi/guide/tips/best-practices.md
+website/client/src/vi/guide/usage.md
+website/client/src/vi/guide/use-cases.md
+website/client/src/vi/index.md
+website/client/src/zh-cn/guide/code-compress.md
+website/client/src/zh-cn/guide/command-line-options.md
+website/client/src/zh-cn/guide/comment-removal.md
+website/client/src/zh-cn/guide/community-projects.md
+website/client/src/zh-cn/guide/configuration.md
+website/client/src/zh-cn/guide/custom-instructions.md
+website/client/src/zh-cn/guide/development/index.md
+website/client/src/zh-cn/guide/development/using-repomix-as-a-library.md
+website/client/src/zh-cn/guide/github-actions.md
+website/client/src/zh-cn/guide/index.md
+website/client/src/zh-cn/guide/installation.md
+website/client/src/zh-cn/guide/mcp-server.md
+website/client/src/zh-cn/guide/output.md
+website/client/src/zh-cn/guide/prompt-examples.md
+website/client/src/zh-cn/guide/remote-repository-processing.md
+website/client/src/zh-cn/guide/security.md
+website/client/src/zh-cn/guide/sponsors.md
+website/client/src/zh-cn/guide/tips/best-practices.md
+website/client/src/zh-cn/guide/usage.md
+website/client/src/zh-cn/guide/use-cases.md
+website/client/src/zh-cn/index.md
+website/client/src/zh-tw/guide/code-compress.md
+website/client/src/zh-tw/guide/command-line-options.md
+website/client/src/zh-tw/guide/comment-removal.md
+website/client/src/zh-tw/guide/community-projects.md
+website/client/src/zh-tw/guide/configuration.md
+website/client/src/zh-tw/guide/custom-instructions.md
+website/client/src/zh-tw/guide/development/index.md
+website/client/src/zh-tw/guide/development/using-repomix-as-a-library.md
+website/client/src/zh-tw/guide/github-actions.md
+website/client/src/zh-tw/guide/index.md
+website/client/src/zh-tw/guide/installation.md
+website/client/src/zh-tw/guide/mcp-server.md
+website/client/src/zh-tw/guide/output.md
+website/client/src/zh-tw/guide/prompt-examples.md
+website/client/src/zh-tw/guide/remote-repository-processing.md
+website/client/src/zh-tw/guide/security.md
+website/client/src/zh-tw/guide/sponsors.md
+website/client/src/zh-tw/guide/tips/best-practices.md
+website/client/src/zh-tw/guide/usage.md
+website/client/src/zh-tw/guide/use-cases.md
+website/client/src/zh-tw/index.md
+website/client/tsconfig.json
+website/client/tsconfig.node.json
+website/client/types/ui.ts
+website/client/utils/urlParams.ts
+website/client/utils/videos.ts
+website/compose.yml
+website/server/.dockerignore
+website/server/.gcloudignore
+website/server/.gitignore
+website/server/Dockerfile
+website/server/cloudbuild.yaml
+website/server/package-lock.json
+website/server/package.json
+website/server/src/actions/packAction.ts
+website/server/src/domains/pack/processZipFile.ts
+website/server/src/domains/pack/remoteRepo.ts
+website/server/src/domains/pack/utils/cache.ts
+website/server/src/domains/pack/utils/fileUtils.ts
+website/server/src/domains/pack/utils/sharedInstance.ts
+website/server/src/domains/pack/utils/validation.ts
+website/server/src/index.ts
+website/server/src/middlewares/bodyLimit.ts
+website/server/src/middlewares/cloudLogger.ts
+website/server/src/middlewares/cors.ts
+website/server/src/middlewares/rateLimit.ts
+website/server/src/types.ts
+website/server/src/utils/clientInfo.ts
+website/server/src/utils/errorHandler.ts
+website/server/src/utils/http.ts
+website/server/src/utils/logger.ts
+website/server/src/utils/memory.ts
+website/server/src/utils/processConcurrency.ts
+website/server/src/utils/rateLimit.ts
+website/server/src/utils/time.ts
+website/server/src/utils/validation.ts
+website/server/tsconfig.json
+</files>
+</git_log_commit>
+</git_logs>
+
+<instruction>
+# Repomix Project Structure and Overview
+
+This document provides a structural overview of the Repomix project, designed to aid AI code assistants (like Copilot) in understanding the codebase.
+
+Please refer to `README.md` for a complete and up-to-date project overview, and `CONTRIBUTING.md` for implementation guidelines and contribution procedures.
+
+## Project Overview
+
+Repomix is a tool that packs the contents of a software repository into a single file, making it easier for AI systems to analyze and process the codebase. It supports various output formats (plain text, XML, Markdown), ignores files based on configurable patterns, and performs security checks to exclude potentially sensitive information.
+
+## Directory Structure
+
+The project is organized into the following directories:
+
+```
+repomix/
+├── src/ # Main source code
+│   ├── cli/ # Command-line interface logic (argument parsing, command handling, output)
+│   ├── config/ # Configuration loading, schema, and defaults
+│   ├── core/ # Core logic of Repomix
+│   │   ├── file/ # File handling (reading, processing, searching, tree structure generation, git commands)
+│   │   ├── metrics/ # Calculating code metrics (character count, token count)
+│   │   ├── output/ # Output generation (different styles, headers, etc.)
+│   │   ├── packager/ # Orchestrates file collection, processing, output, and clipboard operations.
+│   │   ├── security/ # Security checks to exclude sensitive files
+│   │   ├── tokenCount/ # Token counting using Tiktoken
+│   │   └── tree-sitter/ # Code parsing using Tree-sitter and language-specific queries
+│   └── shared/ # Shared utilities and types (error handling, logging, helper functions)
+├── tests/ # Unit and integration tests (organized mirroring src/)
+│   ├── cli/
+│   ├── config/
+│   ├── core/
+│   ├── integration-tests/
+│   ├── shared/
+│   └── testing/
+└── website/ # Documentation website (VitePress)
+    ├── client/      # Client-side code (Vue.js components, styles, configuration)
+    │   ├── .vitepress/  # VitePress configuration and theme
+    │   │   ├── config/  # Site configuration files (navigation, sidebar, etc.)
+    │   │   └── theme/   # Custom theme and styles
+    │   ├── components/ # Vue.js components for the website
+    │   └── src/        # Markdown files for the documentation in various languages (en, ja, etc.)
+    └── server/      # Server-side API (for remote repository processing)
+        └── src/       # Server source code (API endpoints, request handling)
+```
+
+----------------------------------------------------------------
+
+# Coding Guidelines
+- Follow the Airbnb JavaScript Style Guide.
+- Split files into smaller, focused units when appropriate:
+  - Aim to keep code files under 250 lines. If a file exceeds 250 lines, split it into multiple files based on functionality.
+- Add comments to clarify non-obvious logic. **Ensure all comments are written in English.**
+- Provide corresponding unit tests for all new features.
+- After implementation, verify changes by running:
+  ```bash
+  npm run lint  # Ensure code style compliance
+  npm run test  # Verify all tests pass
+  ```
+
+## Dependencies and Testing
+- Inject dependencies through a deps object parameter for testability
+- Example:
+  ```typescript
+  export const functionName = async (
+    param1: Type1,
+    param2: Type2,
+    deps = {
+      defaultFunction1,
+      defaultFunction2,
+    }
+  ) => {
+    // Use deps.defaultFunction1() instead of direct call
+  };
+  ```
+- Mock dependencies by passing test doubles through deps object
+- Use vi.mock() only when dependency injection is not feasible
+
+## Generate Comprehensive Output
+- Include all content without abbreviation, unless specified otherwise
+- Optimize for handling large codebases while maintaining output quality
+
+----------------------------------------------------------------
+
+# GitHub Release Note Guidelines
+When writing release notes, please follow these guidelines:
+
+- When referencing issues or PRs, use the gh command to verify the content:
+  ```bash
+  gh issue view <issue-number>  # For checking issue content
+  gh pr view <pr-number>        # For checking PR content
+  ```
+  This helps ensure accuracy in release note descriptions.
+
+Here are some examples of release notes that follow the guidelines:
+
+v0.2.25
+````md
+This release brings significant improvements to output formatting and introduces flexible remote repository handling capabilities along with enhanced logging features.
+
+# Improvements ⚡
+
+## Remote Repository Enhancement (#335)
+- Added branch/tag parsing directly from repository URLs:
+```bash
+repomix --remote https://github.com/yamadashy/repomix/tree/0.1.x
+```
+Functions identically to:
+```bash
+repomix --remote https://github.com/yamadashy/repomix --remote-branch 0.1.x
+```
+
+Special thanks to @huy-trn for implementing this user-friendly feature!
+
+## Enhanced Output Formatting (#328, #329, #330)
+- Added "End of Codebase" marker for better clarity in output
+- Improved output header accuracy:
+  - Better representation of codebase scope
+  - Clear indication when using `--include` or `--ignore` options
+
+Special thanks to @gitkenan for adding the "End of Codebase" marker and reporting the header issue!
+
+## Path Pattern Support (#337)
+- Added support for special characters in paths:
+  - Handles parentheses in include patterns (e.g., `src/(categories)/**/*`)
+  - Improved escaping for `[]` and `{}`
+  - Essential for Next.js route groups and similar frameworks
+
+Thank you @matheuscoelhomalta for improving path pattern support!
+
+# How to Update
+
+```bash
+npm update -g repomix
+```
+
+---
+
+As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
+````
+
+v0.2.24
+````md
+This release significantly enhances configuration flexibility with comprehensive CLI flag support and expands default ignore patterns for better project scaffolding. 
+
+# What's New 🚀
+
+## CLI Flags Revolution (#324)
+- New command-line configuration now available.
+
+```
+- `--no-gitignore`: Disable .gitignore file usage
+- `--no-default-patterns`: Disable default patterns
+- `--header-text <text>`: Custom text to include in the file header
+- `--instruction-file-path <path>`: Path to a file containing detailed custom instructions
+- `--include-empty-directories`: Include empty directories in the output
+```
+
+Special recognition to @massdo for driving ecosystem growth.
+
+# Improvements ⚡
+
+## Enhanced Ignore Patterns (#318, #322)
+- Expanded default ignores for Rust projects:
+  - `target/`, `Cargo.lock`, build artifacts
+  - PHP, Ruby, Go, Elixir, Haskell: package manager lock files
+
+To @boralg for helping curate Rust-specific patterns!
+
+# How to Update
+```bash
+npm update -g repomix
+```
+
+---
+
+As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
+````
+
+v0.2.23
+````md
+This release adds significant performance improvements for large repositories, making Repomix faster and more efficient when needed.
+
+# Improvements ⚡
+
+## Parallel Processing Enhancement (#309)
+- Implemented worker threads using [Tinypool](https://github.com/tinylibs/tinypool) for parallel processing
+
+### Benchmark Results
+- `yamadashy.repomix`: No significant change
+  - Before: 868.73 millis
+  - After: 671.26 millis
+- `facebook/react`: 29x faster
+  - Before: 123.31 secs
+  - After: 4.19 secs
+- `vercel/next.js`: 58x faster
+  - Before: 17.85 mins
+  - After: 17.27 secs
+
+Note: While Repomix is not primarily designed for processing large repositories, and speed is not a primary goal, faster processing can provide a better user experience when working with larger codebases.
+
+# How to Update
+
+```bash
+npm update -g repomix
+```
+
+
+---
+
+As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
+````
+
+v0.2.22
+````md
+This release introduces significant improvements to large file handling and expands the Repomix ecosystem with new tools and community channels.
+
+# Improvements ⚡ 
+
+## Improved Large File Handling (#302)
+
+- Added a file size limit check (50MB) to prevent memory issues
+- Graceful error handling for large files with clear user guidance:
+
+Special thanks to @slavashvets for their continued contributions!
+
+# Ecosystem Growth 🤝 
+
+## New VS Code Extension (#300)
+A community-created VS Code extension "Repomix Runner" is now available:
+- Run Repomix directly from VS Code
+- Extension by @massdo: [View on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=DorianMassoulier.repomix-runner)
+
+Thank you @massdo for bringing Repomix to VS Code and expanding our tooling ecosystem!
+
+## Official Social Media
+- Launched official Repomix X (Twitter) account: [@repomix_ai](https://x.com/repomix_ai)
+  - Follow for updates, tips, and community highlights
+
+# How to Update
+
+```bash
+npm update -g repomix
+```
+
+---
+
+Join our growing community on [Discord](https://discord.gg/BF8GxZHE2C) and follow us on [X](https://x.com/repomix_ai) for updates!
+````
+
+v0.2.21
+````md
+This release introduces significant improvements to output formatting and documentation, featuring a new parsable style option for enhanced XML handling.
+
+# What's New 🚀 
+
+## Enhanced Output Style Control (#287)
+- Added new `parsableStyle` option for better output handling:
+  - Ensures output strictly follows the specification of the chosen format
+  - Provides properly escaped XML output with fast-xml-parser
+  - Dynamically adjusts markdown code block delimiters to avoid content conflicts
+- Available via CLI flag `--parsable-style` or in configuration file
+
+Special thanks to @atollk for their first contribution!
+
+# Documentation 📚
+
+## README Enhancements (#296)
+- Updated Homebrew installation documentation to include Linux support
+
+Special thanks to @chenrui333 for their continued contributions!
+
+## Website Multi-Language Support (#293)
+- Enhanced multi-language support in [repomix.com](https://repomix.com)
+
+# How to Update
+
+To update to the latest version, run:
+```bash
+npm update -g repomix
+```
+
+
+---
+
+As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
+
+</instruction>

</git_diff_staged>
</git_diffs>

<git_logs>
<git_log_commit>
<date>2025-10-16 09:16:12 +0800</date>
<message>fix issue in non-git folder</message>
<files>
package.json
src/core/git/gitCommand.ts
src/core/git/gitRepositoryHandle.ts
src/core/output/outputSort.ts
test-examples.md
test-repomix-quick.ps1
test-repomix-usage-guide.md
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-16 08:27:55 +0800</date>
<message>add ps1 script and rm useless language support</message>
<files>
test-repomix.ps1
website/client/src/de/guide/code-compress.md
website/client/src/de/guide/command-line-options.md
website/client/src/de/guide/comment-removal.md
website/client/src/de/guide/community-projects.md
website/client/src/de/guide/configuration.md
website/client/src/de/guide/custom-instructions.md
website/client/src/de/guide/development/index.md
website/client/src/de/guide/development/using-repomix-as-a-library.md
website/client/src/de/guide/github-actions.md
website/client/src/de/guide/index.md
website/client/src/de/guide/installation.md
website/client/src/de/guide/mcp-server.md
website/client/src/de/guide/output.md
website/client/src/de/guide/prompt-examples.md
website/client/src/de/guide/remote-repository-processing.md
website/client/src/de/guide/security.md
website/client/src/de/guide/sponsors.md
website/client/src/de/guide/tips/best-practices.md
website/client/src/de/guide/usage.md
website/client/src/de/guide/use-cases.md
website/client/src/de/index.md
website/client/src/es/guide/code-compress.md
website/client/src/es/guide/command-line-options.md
website/client/src/es/guide/comment-removal.md
website/client/src/es/guide/community-projects.md
website/client/src/es/guide/configuration.md
website/client/src/es/guide/custom-instructions.md
website/client/src/es/guide/development/index.md
website/client/src/es/guide/development/using-repomix-as-a-library.md
website/client/src/es/guide/github-actions.md
website/client/src/es/guide/index.md
website/client/src/es/guide/installation.md
website/client/src/es/guide/mcp-server.md
website/client/src/es/guide/output.md
website/client/src/es/guide/prompt-examples.md
website/client/src/es/guide/remote-repository-processing.md
website/client/src/es/guide/security.md
website/client/src/es/guide/sponsors.md
website/client/src/es/guide/tips/best-practices.md
website/client/src/es/guide/usage.md
website/client/src/es/guide/use-cases.md
website/client/src/es/index.md
website/client/src/fr/guide/code-compress.md
website/client/src/fr/guide/command-line-options.md
website/client/src/fr/guide/comment-removal.md
website/client/src/fr/guide/community-projects.md
website/client/src/fr/guide/configuration.md
website/client/src/fr/guide/custom-instructions.md
website/client/src/fr/guide/development/index.md
website/client/src/fr/guide/development/using-repomix-as-a-library.md
website/client/src/fr/guide/github-actions.md
website/client/src/fr/guide/index.md
website/client/src/fr/guide/installation.md
website/client/src/fr/guide/mcp-server.md
website/client/src/fr/guide/output.md
website/client/src/fr/guide/prompt-examples.md
website/client/src/fr/guide/remote-repository-processing.md
website/client/src/fr/guide/security.md
website/client/src/fr/guide/sponsors.md
website/client/src/fr/guide/tips/best-practices.md
website/client/src/fr/guide/usage.md
website/client/src/fr/guide/use-cases.md
website/client/src/fr/index.md
website/client/src/hi/guide/code-compress.md
website/client/src/hi/guide/command-line-options.md
website/client/src/hi/guide/comment-removal.md
website/client/src/hi/guide/community-projects.md
website/client/src/hi/guide/configuration.md
website/client/src/hi/guide/custom-instructions.md
website/client/src/hi/guide/development/index.md
website/client/src/hi/guide/development/using-repomix-as-a-library.md
website/client/src/hi/guide/github-actions.md
website/client/src/hi/guide/index.md
website/client/src/hi/guide/installation.md
website/client/src/hi/guide/mcp-server.md
website/client/src/hi/guide/output.md
website/client/src/hi/guide/prompt-examples.md
website/client/src/hi/guide/remote-repository-processing.md
website/client/src/hi/guide/security.md
website/client/src/hi/guide/sponsors.md
website/client/src/hi/guide/tips/best-practices.md
website/client/src/hi/guide/usage.md
website/client/src/hi/guide/use-cases.md
website/client/src/hi/index.md
website/client/src/id/guide/code-compress.md
website/client/src/id/guide/command-line-options.md
website/client/src/id/guide/comment-removal.md
website/client/src/id/guide/community-projects.md
website/client/src/id/guide/configuration.md
website/client/src/id/guide/custom-instructions.md
website/client/src/id/guide/development/index.md
website/client/src/id/guide/development/using-repomix-as-a-library.md
website/client/src/id/guide/github-actions.md
website/client/src/id/guide/index.md
website/client/src/id/guide/installation.md
website/client/src/id/guide/mcp-server.md
website/client/src/id/guide/output.md
website/client/src/id/guide/prompt-examples.md
website/client/src/id/guide/remote-repository-processing.md
website/client/src/id/guide/security.md
website/client/src/id/guide/sponsors.md
website/client/src/id/guide/tips/best-practices.md
website/client/src/id/guide/usage.md
website/client/src/id/guide/use-cases.md
website/client/src/id/index.md
website/client/src/ja/guide/code-compress.md
website/client/src/ja/guide/command-line-options.md
website/client/src/ja/guide/comment-removal.md
website/client/src/ja/guide/community-projects.md
website/client/src/ja/guide/configuration.md
website/client/src/ja/guide/custom-instructions.md
website/client/src/ja/guide/development/index.md
website/client/src/ja/guide/development/using-repomix-as-a-library.md
website/client/src/ja/guide/github-actions.md
website/client/src/ja/guide/index.md
website/client/src/ja/guide/installation.md
website/client/src/ja/guide/mcp-server.md
website/client/src/ja/guide/output.md
website/client/src/ja/guide/prompt-examples.md
website/client/src/ja/guide/remote-repository-processing.md
website/client/src/ja/guide/security.md
website/client/src/ja/guide/sponsors.md
website/client/src/ja/guide/tips/best-practices.md
website/client/src/ja/guide/usage.md
website/client/src/ja/guide/use-cases.md
website/client/src/ja/index.md
website/client/src/ko/guide/code-compress.md
website/client/src/ko/guide/command-line-options.md
website/client/src/ko/guide/comment-removal.md
website/client/src/ko/guide/community-projects.md
website/client/src/ko/guide/configuration.md
website/client/src/ko/guide/custom-instructions.md
website/client/src/ko/guide/development/index.md
website/client/src/ko/guide/development/using-repomix-as-a-library.md
website/client/src/ko/guide/github-actions.md
website/client/src/ko/guide/index.md
website/client/src/ko/guide/installation.md
website/client/src/ko/guide/mcp-server.md
website/client/src/ko/guide/output.md
website/client/src/ko/guide/prompt-examples.md
website/client/src/ko/guide/remote-repository-processing.md
website/client/src/ko/guide/security.md
website/client/src/ko/guide/sponsors.md
website/client/src/ko/guide/tips/best-practices.md
website/client/src/ko/guide/usage.md
website/client/src/ko/guide/use-cases.md
website/client/src/ko/index.md
website/client/src/pt-br/guide/code-compress.md
website/client/src/pt-br/guide/command-line-options.md
website/client/src/pt-br/guide/comment-removal.md
website/client/src/pt-br/guide/community-projects.md
website/client/src/pt-br/guide/configuration.md
website/client/src/pt-br/guide/custom-instructions.md
website/client/src/pt-br/guide/development/index.md
website/client/src/pt-br/guide/development/using-repomix-as-a-library.md
website/client/src/pt-br/guide/github-actions.md
website/client/src/pt-br/guide/index.md
website/client/src/pt-br/guide/installation.md
website/client/src/pt-br/guide/mcp-server.md
website/client/src/pt-br/guide/output.md
website/client/src/pt-br/guide/prompt-examples.md
website/client/src/pt-br/guide/remote-repository-processing.md
website/client/src/pt-br/guide/security.md
website/client/src/pt-br/guide/sponsors.md
website/client/src/pt-br/guide/tips/best-practices.md
website/client/src/pt-br/guide/usage.md
website/client/src/pt-br/guide/use-cases.md
website/client/src/pt-br/index.md
website/client/src/vi/guide/code-compress.md
website/client/src/vi/guide/command-line-options.md
website/client/src/vi/guide/comment-removal.md
website/client/src/vi/guide/community-projects.md
website/client/src/vi/guide/configuration.md
website/client/src/vi/guide/custom-instructions.md
website/client/src/vi/guide/development/index.md
website/client/src/vi/guide/development/using-repomix-as-a-library.md
website/client/src/vi/guide/github-actions.md
website/client/src/vi/guide/index.md
website/client/src/vi/guide/installation.md
website/client/src/vi/guide/mcp-server.md
website/client/src/vi/guide/output.md
website/client/src/vi/guide/prompt-examples.md
website/client/src/vi/guide/remote-repository-processing.md
website/client/src/vi/guide/security.md
website/client/src/vi/guide/sponsors.md
website/client/src/vi/guide/tips/best-practices.md
website/client/src/vi/guide/usage.md
website/client/src/vi/guide/use-cases.md
website/client/src/vi/index.md
website/client/src/zh-tw/guide/code-compress.md
website/client/src/zh-tw/guide/command-line-options.md
website/client/src/zh-tw/guide/comment-removal.md
website/client/src/zh-tw/guide/community-projects.md
website/client/src/zh-tw/guide/configuration.md
website/client/src/zh-tw/guide/custom-instructions.md
website/client/src/zh-tw/guide/development/index.md
website/client/src/zh-tw/guide/development/using-repomix-as-a-library.md
website/client/src/zh-tw/guide/github-actions.md
website/client/src/zh-tw/guide/index.md
website/client/src/zh-tw/guide/installation.md
website/client/src/zh-tw/guide/mcp-server.md
website/client/src/zh-tw/guide/output.md
website/client/src/zh-tw/guide/prompt-examples.md
website/client/src/zh-tw/guide/remote-repository-processing.md
website/client/src/zh-tw/guide/security.md
website/client/src/zh-tw/guide/sponsors.md
website/client/src/zh-tw/guide/tips/best-practices.md
website/client/src/zh-tw/guide/usage.md
website/client/src/zh-tw/guide/use-cases.md
website/client/src/zh-tw/index.md
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-16 08:26:33 +0800</date>
<message>update diff</message>
<files>
src/cli/actions/defaultAction.ts
src/core/file/fileCollect.ts
src/core/file/fileCollectSync.ts
src/core/git/gitCommand.ts
src/shared/processConcurrency.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-15 23:40:19 +0800</date>
<message>fix json issue</message>
<files>
package.json
repomix.config.json
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-15 23:38:47 +0800</date>
<message>update fileCollect</message>
<files>
package.json
src/cli/actions/defaultAction.ts
src/core/file/fileCollect.ts
src/core/file/fileCollectSync.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-15 23:13:11 +0800</date>
<message>fix fileCollect logic</message>
<files>
package.json
src/cli/actions/defaultAction.ts
src/cli/actions/workers/defaultActionWorker.ts
src/cli/cliRun.ts
src/cli/options/fileOptions.ts
src/core/file/fileCollect.ts
src/core/file/fileCollector.ts
src/core/file/filePattern.ts
src/core/file/fileProcess.ts
src/core/file/pathFlattener.ts
src/core/metrics/calculateMetrics.ts
src/core/output/outputGenerate.ts
src/core/output/outputStyleDecorate.ts
src/core/packager.ts
src/core/security/securityCheck.ts
test-dir/readme.txt
test-dir/test.js
tests/cli/actions/workers/defaultActionWorker.test.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-05 14:41:45 +0800</date>
<message>fix strcture issue</message>
<files>
src/cli/actions/defaultAction.ts
src/cli/actions/workers/defaultActionWorker.ts
src/core/file/fileCollect.ts
src/core/file/fileProcess.ts
src/core/security/securityCheck.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-05 14:35:30 +0800</date>
<message>update</message>
<files>
docs/file-filtering-analysis.md
docs/file-patterns-guide.md
docs/packaging-guide.md
docs/prompt/temp
"docs/\351\252\214\350\257\201.txt"
src/cli/actions/defaultAction.ts
src/cli/cliRun.ts
src/cli/types.ts
website/client/src/en/guide/command-line-options.md
website/client/src/zh-cn/guide/command-line-options.md
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-05 14:00:48 +0800</date>
<message>succeed</message>
<files>
docs/file-filtering-analysis.md
"docs/\351\252\214\350\257\201.txt"
src/cli/actions/defaultAction.ts
src/core/output/outputGenerate.ts
src/core/output/outputStyleDecorate.ts
src/core/packager.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-05 12:47:04 +0800</date>
<message>complete files filter</message>
<files>
src/cli/actions/defaultAction.ts
src/cli/actions/workers/defaultActionWorker.ts
src/config/configLoad.ts
src/config/configSchema.ts
src/core/file/fileCollect.ts
src/core/file/fileCollector.ts
src/core/file/filePattern.ts
src/core/file/fileProcess.ts
src/core/metrics/calculateMetrics.ts
src/core/security/securityCheck.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-04 22:17:17 +0800</date>
<message>update</message>
<files>
"docs/\351\252\214\350\257\201.txt"
src/core/file/fileCollector.ts
src/core/file/filePattern.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-04 21:54:36 +0800</date>
<message>add --files and --flatten</message>
<files>
README.md
docs/file-patterns-api.md
docs/file-patterns-changelog.md
docs/file-patterns-guide.md
docs/packaging-guide.md
src/cli/actions/defaultAction.ts
src/cli/actions/workers/defaultActionWorker.ts
src/cli/cliRun.ts
src/cli/options/fileOptions.ts
src/config/configSchema.ts
src/core/file/fileCollector.ts
src/core/file/filePattern.ts
src/core/file/pathFlattener.ts
src/core/packager.ts
tests/cli/actions/workers/defaultActionWorker.test.ts
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-04 20:36:21 +0800</date>
<message>add plan</message>
<files>
docs/packaging-guide.md
</files>
</git_log_commit>
<git_log_commit>
<date>2025-10-04 19:39:12 +0800</date>
<message>init</message>
<files>
.agents/commands/agent/claude-rule-update.md
.agents/commands/agent/gemini-discuss.md
.agents/commands/code/lint-fix.md
.agents/commands/git/git-commit-push.md
.agents/commands/git/git-commit.md
.agents/commands/git/pr-create.md
.agents/commands/git/pr-review-request.md
.agents/commands/git/pr-review.md
.agents/commands/git/release-note-generate.md
.agents/rules/base.md
.claude/agents/browser-extension-developer.md
.claude/agents/lint-fixer.md
.claude/agents/website-maintainer.md
.claude/commands
.codecov.yml
.coderabbit.yaml
.cursor/commands
.cursor/rules/base.mdc
.devcontainer/Dockerfile
.devcontainer/devcontainer.json
.devcontainer/init-firewall.sh
.dockerignore
.editorconfig
.gitignore
.oxlintrc.json
.pinact.yaml
.repomixignore
.secretlintrc.json
.tool-versions
AGENTS.md
CLAUDE.md
Dockerfile
LICENSE
README.md
SECURITY.md
bin/repomix.cjs
biome.json
browser/.gitignore
browser/CLAUDE.md
browser/README.md
browser/entrypoints/background.ts
browser/entrypoints/content.ts
browser/entrypoints/styles.css
browser/package-lock.json
browser/package.json
browser/promo/Chrome-Webstore-Icon_128x128.png
browser/promo/Promo-Image-Marquee_1400x560.png
browser/promo/Promo-Image-Small_440x280.png
browser/promo/Screenshot_1280x800.png
browser/public/_locales/de/detailed-description.txt
browser/public/_locales/de/messages.json
browser/public/_locales/en/detailed-description.txt
browser/public/_locales/en/messages.json
browser/public/_locales/es/detailed-description.txt
browser/public/_locales/es/messages.json
browser/public/_locales/fr/detailed-description.txt
browser/public/_locales/fr/messages.json
browser/public/_locales/hi/detailed-description.txt
browser/public/_locales/hi/messages.json
browser/public/_locales/id/detailed-description.txt
browser/public/_locales/id/messages.json
browser/public/_locales/ja/detailed-description.txt
browser/public/_locales/ja/messages.json
browser/public/_locales/ko/detailed-description.txt
browser/public/_locales/ko/messages.json
browser/public/_locales/pt_BR/detailed-description.txt
browser/public/_locales/pt_BR/messages.json
browser/public/_locales/vi/detailed-description.txt
browser/public/_locales/vi/messages.json
browser/public/_locales/zh_CN/detailed-description.txt
browser/public/_locales/zh_CN/messages.json
browser/public/_locales/zh_TW/detailed-description.txt
browser/public/_locales/zh_TW/messages.json
browser/public/images/icon-128.png
browser/public/images/icon-16.png
browser/public/images/icon-19.png
browser/public/images/icon-32.png
browser/public/images/icon-38.png
browser/public/images/icon-48.png
browser/public/images/icon-64.png
browser/public/images/icon.svg
browser/scripts/generate-icons.ts
browser/tests/repomix-integration.test.ts
browser/tsconfig.json
browser/types.d.ts
browser/vitest.config.ts
browser/wxt.config.ts
llms-install.md
package-lock.json
package.json
repomix-instruction.md
repomix.config.json
scripts/memory/.gitignore
scripts/memory/README.md
scripts/memory/package-lock.json
scripts/memory/package.json
scripts/memory/src/memory-test.ts
scripts/memory/src/types.ts
scripts/memory/tsconfig.json
src/cli/actions/defaultAction.ts
src/cli/actions/initAction.ts
src/cli/actions/mcpAction.ts
src/cli/actions/migrationAction.ts
src/cli/actions/remoteAction.ts
src/cli/actions/versionAction.ts
src/cli/actions/workers/defaultActionWorker.ts
src/cli/cliReport.ts
src/cli/cliRun.ts
src/cli/cliSpinner.ts
src/cli/reporters/tokenCountTreeReporter.ts
src/cli/types.ts
src/config/configLoad.ts
src/config/configSchema.ts
src/config/defaultIgnore.ts
src/config/globalDirectory.ts
src/core/file/fileCollect.ts
src/core/file/fileManipulate.ts
src/core/file/filePathSort.ts
src/core/file/fileProcess.ts
src/core/file/fileProcessContent.ts
src/core/file/fileRead.ts
src/core/file/fileSearch.ts
src/core/file/fileStdin.ts
src/core/file/fileTreeGenerate.ts
src/core/file/fileTypes.ts
src/core/file/packageJsonParse.ts
src/core/file/permissionCheck.ts
src/core/file/truncateBase64.ts
src/core/file/workers/fileCollectWorker.ts
src/core/file/workers/fileProcessWorker.ts
src/core/git/gitCommand.ts
src/core/git/gitDiffHandle.ts
src/core/git/gitHubArchive.ts
src/core/git/gitHubArchiveApi.ts
src/core/git/gitLogHandle.ts
src/core/git/gitRemoteHandle.ts
src/core/git/gitRemoteParse.ts
src/core/git/gitRepositoryHandle.ts
src/core/metrics/TokenCounter.ts
src/core/metrics/calculateGitDiffMetrics.ts
src/core/metrics/calculateGitLogMetrics.ts
src/core/metrics/calculateMetrics.ts
src/core/metrics/calculateOutputMetrics.ts
src/core/metrics/calculateSelectiveFileMetrics.ts
src/core/metrics/tokenCounterFactory.ts
src/core/metrics/workers/calculateMetricsWorker.ts
src/core/metrics/workers/types.ts
src/core/output/outputGenerate.ts
src/core/output/outputGeneratorTypes.ts
src/core/output/outputSort.ts
src/core/output/outputStyleDecorate.ts
src/core/output/outputStyles/markdownStyle.ts
src/core/output/outputStyles/plainStyle.ts
src/core/output/outputStyles/xmlStyle.ts
src/core/packager.ts
src/core/packager/copyToClipboardIfEnabled.ts
src/core/packager/writeOutputToDisk.ts
src/core/security/filterOutUntrustedFiles.ts
src/core/security/securityCheck.ts
src/core/security/validateFileSafety.ts
src/core/security/workers/securityCheckWorker.ts
src/core/tokenCount/buildTokenCountStructure.ts
src/core/tokenCount/types.ts
src/core/treeSitter/ext2Lang.ts
src/core/treeSitter/lang2Query.ts
src/core/treeSitter/languageParser.ts
src/core/treeSitter/loadLanguage.ts
src/core/treeSitter/parseFile.ts
src/core/treeSitter/parseStrategies/CssParseStrategy.ts
src/core/treeSitter/parseStrategies/DefaultParseStrategy.ts
src/core/treeSitter/parseStrategies/GoParseStrategy.ts
src/core/treeSitter/parseStrategies/ParseStrategy.ts
src/core/treeSitter/parseStrategies/PythonParseStrategy.ts
src/core/treeSitter/parseStrategies/TypeScriptParseStrategy.ts
src/core/treeSitter/parseStrategies/VueParseStrategy.ts
src/core/treeSitter/queries/README.md
src/core/treeSitter/queries/queryC.ts
src/core/treeSitter/queries/queryCSharp.ts
src/core/treeSitter/queries/queryCpp.ts
src/core/treeSitter/queries/queryCss.ts
src/core/treeSitter/queries/queryGo.ts
src/core/treeSitter/queries/queryJava.ts
src/core/treeSitter/queries/queryJavascript.ts
src/core/treeSitter/queries/queryPhp.ts
src/core/treeSitter/queries/queryPython.ts
src/core/treeSitter/queries/queryRuby.ts
src/core/treeSitter/queries/queryRust.ts
src/core/treeSitter/queries/querySolidity.ts
src/core/treeSitter/queries/querySwift.ts
src/core/treeSitter/queries/queryTypescript.ts
src/core/treeSitter/queries/queryVue.ts
src/index.ts
src/mcp/mcpServer.ts
src/mcp/prompts/packRemoteRepositoryPrompts.ts
src/mcp/tools/attachPackedOutputTool.ts
src/mcp/tools/fileSystemReadDirectoryTool.ts
src/mcp/tools/fileSystemReadFileTool.ts
src/mcp/tools/grepRepomixOutputTool.ts
src/mcp/tools/mcpToolRuntime.ts
src/mcp/tools/packCodebaseTool.ts
src/mcp/tools/packRemoteRepositoryTool.ts
src/mcp/tools/readRepomixOutputTool.ts
src/shared/constants.ts
src/shared/errorHandle.ts
src/shared/logger.ts
src/shared/memoryUtils.ts
src/shared/patternUtils.ts
src/shared/processConcurrency.ts
src/shared/types.ts
src/types/git-url-parse.d.ts
tests/cli/actions/defaultAction.buildCliConfig.test.ts
tests/cli/actions/defaultAction.test.ts
tests/cli/actions/defaultAction.tokenCountTree.test.ts
tests/cli/actions/diffsFlag.test.ts
tests/cli/actions/initAction.test.ts
tests/cli/actions/mcpAction.test.ts
tests/cli/actions/migrationAction.test.ts
tests/cli/actions/remoteAction.test.ts
tests/cli/actions/versionAction.test.ts
tests/cli/actions/workers/defaultActionWorker.test.ts
tests/cli/cliReport.binaryFiles.test.ts
tests/cli/cliReport.test.ts
tests/cli/cliRun.test.ts
tests/cli/reporters/tokenCountTreeReporter.test.ts
tests/config/configLoad.test.ts
tests/config/configSchema.test.ts
tests/config/globalDirectory.test.ts
tests/core/file/fileCollect.test.ts
tests/core/file/fileManipulate.test.ts
tests/core/file/filePathSort.test.ts
tests/core/file/fileProcess.test.ts
tests/core/file/fileProcessContent.test.ts
tests/core/file/fileSearch.test.ts
tests/core/file/fileStdin.test.ts
tests/core/file/packageJsonParse.test.ts
tests/core/file/permissionCheck.test.ts
tests/core/file/truncateBase64.test.ts
tests/core/git/gitCommand.test.ts
tests/core/git/gitDiffHandle.test.ts
tests/core/git/gitHubArchive.test.ts
tests/core/git/gitHubArchiveApi.test.ts
tests/core/git/gitLogHandle.test.ts
tests/core/git/gitRemoteHandle.test.ts
tests/core/git/gitRemoteParse.test.ts
tests/core/git/gitRepositoryHandle.test.ts
tests/core/metrics/TokenCounter.test.ts
tests/core/metrics/calculateGitDiffMetrics.test.ts
tests/core/metrics/calculateGitLogMetrics.test.ts
tests/core/metrics/calculateMetrics.test.ts
tests/core/metrics/calculateOutputMetrics.test.ts
tests/core/metrics/calculateSelectiveFileMetrics.test.ts
tests/core/metrics/diffTokenCount.test.ts
tests/core/output/diffsInOutput.test.ts
tests/core/output/outputGenerate.test.ts
tests/core/output/outputGenerateDiffs.test.ts
tests/core/output/outputSort.test.ts
tests/core/output/outputStyleDecorate.test.ts
tests/core/output/outputStyles/jsonStyle.test.ts
tests/core/output/outputStyles/markdownStyle.test.ts
tests/core/output/outputStyles/plainStyle.test.ts
tests/core/output/outputStyles/xmlStyle.test.ts
tests/core/packager.test.ts
tests/core/packager/copyToClipboardIfEnabled.test.ts
tests/core/packager/diffsFunctionality.test.ts
tests/core/packager/writeOutputToDisk.test.ts
tests/core/security/filterOutUntrustedFiles.test.ts
tests/core/security/securityCheck.test.ts
tests/core/security/validateFileSafety.test.ts
tests/core/security/workers/securityCheckWorker.test.ts
tests/core/tokenCount/buildTokenCountStructure.test.ts
tests/core/treeSitter/LanguageParser.test.ts
tests/core/treeSitter/loadLanguage.test.ts
tests/core/treeSitter/parseFile.c.test.ts
tests/core/treeSitter/parseFile.comments.test.ts
tests/core/treeSitter/parseFile.cpp.test.ts
tests/core/treeSitter/parseFile.csharp.test.ts
tests/core/treeSitter/parseFile.css.test.ts
tests/core/treeSitter/parseFile.go.test.ts
tests/core/treeSitter/parseFile.java.test.ts
tests/core/treeSitter/parseFile.javascript.test.ts
tests/core/treeSitter/parseFile.php.test.ts
tests/core/treeSitter/parseFile.python.test.ts
tests/core/treeSitter/parseFile.ruby.test.ts
tests/core/treeSitter/parseFile.rust.test.ts
tests/core/treeSitter/parseFile.solidity.test.ts
tests/core/treeSitter/parseFile.swift.test.ts
tests/core/treeSitter/parseFile.test.ts
tests/core/treeSitter/parseFile.typescript.test.ts
tests/core/treeSitter/parseFile.vue.test.ts
tests/integration-tests/fixtures/packager/inputs/simple-project/.repomixignore
tests/integration-tests/fixtures/packager/inputs/simple-project/README.md
tests/integration-tests/fixtures/packager/inputs/simple-project/build/test.js
tests/integration-tests/fixtures/packager/inputs/simple-project/package.json
tests/integration-tests/fixtures/packager/inputs/simple-project/repomix.config.json
tests/integration-tests/fixtures/packager/inputs/simple-project/resources/.repomixignore
tests/integration-tests/fixtures/packager/inputs/simple-project/resources/data.txt
tests/integration-tests/fixtures/packager/inputs/simple-project/resources/ignored-data.txt
tests/integration-tests/fixtures/packager/inputs/simple-project/src/build/test.js
tests/integration-tests/fixtures/packager/inputs/simple-project/src/index.js
tests/integration-tests/fixtures/packager/inputs/simple-project/src/utils.js
tests/integration-tests/fixtures/packager/outputs/simple-project-output.md
tests/integration-tests/fixtures/packager/outputs/simple-project-output.txt
tests/integration-tests/fixtures/packager/outputs/simple-project-output.xml
tests/integration-tests/packager.test.ts
tests/mcp/mcpServer.test.ts
tests/mcp/prompts/packRemoteRepositoryPrompts.test.ts
tests/mcp/tools/attachPackedOutputTool.test.ts
tests/mcp/tools/fileSystemReadDirectoryTool.test.ts
tests/mcp/tools/fileSystemReadFileTool.test.ts
tests/mcp/tools/grepRepomixOutputTool.test.ts
tests/mcp/tools/mcpToolRuntime.test.ts
tests/mcp/tools/packCodebaseTool.test.ts
tests/mcp/tools/readRepomixOutputTool.test.ts
tests/shared/logger.test.ts
tests/shared/patternUtils.test.ts
tests/shared/processConcurrency.test.ts
tests/testing/testUtils.ts
tsconfig.build.json
tsconfig.json
typos.toml
vitest.config.ts
website/README.md
website/client/.gitignore
website/client/.tool-versions
website/client/.vitepress/config.ts
website/client/.vitepress/config/configDe.ts
website/client/.vitepress/config/configEnUs.ts
website/client/.vitepress/config/configEs.ts
website/client/.vitepress/config/configFr.ts
website/client/.vitepress/config/configHi.ts
website/client/.vitepress/config/configId.ts
website/client/.vitepress/config/configJa.ts
website/client/.vitepress/config/configKo.ts
website/client/.vitepress/config/configPtBr.ts
website/client/.vitepress/config/configShard.ts
website/client/.vitepress/config/configVi.ts
website/client/.vitepress/config/configZhCn.ts
website/client/.vitepress/config/configZhTw.ts
website/client/.vitepress/theme/component.d.ts
website/client/.vitepress/theme/custom.css
website/client/.vitepress/theme/index.ts
website/client/.vitepress/theme/style.css
website/client/Dockerfile
website/client/components/Home.vue
website/client/components/Home/FileSelectionWarning.vue
website/client/components/Home/Hero.vue
website/client/components/Home/PackButton.vue
website/client/components/Home/PackIcon.vue
website/client/components/Home/TryIt.vue
website/client/components/Home/TryItFileSelection.vue
website/client/components/Home/TryItFileUpload.vue
website/client/components/Home/TryItFolderUpload.vue
website/client/components/Home/TryItLoading.vue
website/client/components/Home/TryItPackOptions.vue
website/client/components/Home/TryItResult.vue
website/client/components/Home/TryItResultContent.vue
website/client/components/Home/TryItResultErrorContent.vue
website/client/components/Home/TryItUrlInput.vue
website/client/components/HomeBadges.vue
website/client/components/YouTubeVideo.vue
website/client/components/api/client.ts
website/client/components/utils/analytics.ts
website/client/components/utils/requestHandlers.ts
website/client/components/utils/resultViewer.ts
website/client/components/utils/validation.ts
website/client/composables/useFileUpload.ts
website/client/composables/usePackOptions.ts
website/client/composables/usePackRequest.ts
website/client/composables/useZipProcessor.ts
website/client/constants/fileSelection.ts
website/client/constants/videos.ts
website/client/package-lock.json
website/client/package.json
website/client/scripts/generateSchema.ts
website/client/src/de/guide/code-compress.md
website/client/src/de/guide/command-line-options.md
website/client/src/de/guide/comment-removal.md
website/client/src/de/guide/community-projects.md
website/client/src/de/guide/configuration.md
website/client/src/de/guide/custom-instructions.md
website/client/src/de/guide/development/index.md
website/client/src/de/guide/development/using-repomix-as-a-library.md
website/client/src/de/guide/github-actions.md
website/client/src/de/guide/index.md
website/client/src/de/guide/installation.md
website/client/src/de/guide/mcp-server.md
website/client/src/de/guide/output.md
website/client/src/de/guide/prompt-examples.md
website/client/src/de/guide/remote-repository-processing.md
website/client/src/de/guide/security.md
website/client/src/de/guide/sponsors.md
website/client/src/de/guide/tips/best-practices.md
website/client/src/de/guide/usage.md
website/client/src/de/guide/use-cases.md
website/client/src/de/index.md
website/client/src/en/guide/code-compress.md
website/client/src/en/guide/command-line-options.md
website/client/src/en/guide/comment-removal.md
website/client/src/en/guide/community-projects.md
website/client/src/en/guide/configuration.md
website/client/src/en/guide/custom-instructions.md
website/client/src/en/guide/development/index.md
website/client/src/en/guide/development/using-repomix-as-a-library.md
website/client/src/en/guide/github-actions.md
website/client/src/en/guide/index.md
website/client/src/en/guide/installation.md
website/client/src/en/guide/mcp-server.md
website/client/src/en/guide/output.md
website/client/src/en/guide/prompt-examples.md
website/client/src/en/guide/remote-repository-processing.md
website/client/src/en/guide/security.md
website/client/src/en/guide/sponsors.md
website/client/src/en/guide/tips/best-practices.md
website/client/src/en/guide/usage.md
website/client/src/en/guide/use-cases.md
website/client/src/en/index.md
website/client/src/es/guide/code-compress.md
website/client/src/es/guide/command-line-options.md
website/client/src/es/guide/comment-removal.md
website/client/src/es/guide/community-projects.md
website/client/src/es/guide/configuration.md
website/client/src/es/guide/custom-instructions.md
website/client/src/es/guide/development/index.md
website/client/src/es/guide/development/using-repomix-as-a-library.md
website/client/src/es/guide/github-actions.md
website/client/src/es/guide/index.md
website/client/src/es/guide/installation.md
website/client/src/es/guide/mcp-server.md
website/client/src/es/guide/output.md
website/client/src/es/guide/prompt-examples.md
website/client/src/es/guide/remote-repository-processing.md
website/client/src/es/guide/security.md
website/client/src/es/guide/sponsors.md
website/client/src/es/guide/tips/best-practices.md
website/client/src/es/guide/usage.md
website/client/src/es/guide/use-cases.md
website/client/src/es/index.md
website/client/src/fr/guide/code-compress.md
website/client/src/fr/guide/command-line-options.md
website/client/src/fr/guide/comment-removal.md
website/client/src/fr/guide/community-projects.md
website/client/src/fr/guide/configuration.md
website/client/src/fr/guide/custom-instructions.md
website/client/src/fr/guide/development/index.md
website/client/src/fr/guide/development/using-repomix-as-a-library.md
website/client/src/fr/guide/github-actions.md
website/client/src/fr/guide/index.md
website/client/src/fr/guide/installation.md
website/client/src/fr/guide/mcp-server.md
website/client/src/fr/guide/output.md
website/client/src/fr/guide/prompt-examples.md
website/client/src/fr/guide/remote-repository-processing.md
website/client/src/fr/guide/security.md
website/client/src/fr/guide/sponsors.md
website/client/src/fr/guide/tips/best-practices.md
website/client/src/fr/guide/usage.md
website/client/src/fr/guide/use-cases.md
website/client/src/fr/index.md
website/client/src/hi/guide/code-compress.md
website/client/src/hi/guide/command-line-options.md
website/client/src/hi/guide/comment-removal.md
website/client/src/hi/guide/community-projects.md
website/client/src/hi/guide/configuration.md
website/client/src/hi/guide/custom-instructions.md
website/client/src/hi/guide/development/index.md
website/client/src/hi/guide/development/using-repomix-as-a-library.md
website/client/src/hi/guide/github-actions.md
website/client/src/hi/guide/index.md
website/client/src/hi/guide/installation.md
website/client/src/hi/guide/mcp-server.md
website/client/src/hi/guide/output.md
website/client/src/hi/guide/prompt-examples.md
website/client/src/hi/guide/remote-repository-processing.md
website/client/src/hi/guide/security.md
website/client/src/hi/guide/sponsors.md
website/client/src/hi/guide/tips/best-practices.md
website/client/src/hi/guide/usage.md
website/client/src/hi/guide/use-cases.md
website/client/src/hi/index.md
website/client/src/id/guide/code-compress.md
website/client/src/id/guide/command-line-options.md
website/client/src/id/guide/comment-removal.md
website/client/src/id/guide/community-projects.md
website/client/src/id/guide/configuration.md
website/client/src/id/guide/custom-instructions.md
website/client/src/id/guide/development/index.md
website/client/src/id/guide/development/using-repomix-as-a-library.md
website/client/src/id/guide/github-actions.md
website/client/src/id/guide/index.md
website/client/src/id/guide/installation.md
website/client/src/id/guide/mcp-server.md
website/client/src/id/guide/output.md
website/client/src/id/guide/prompt-examples.md
website/client/src/id/guide/remote-repository-processing.md
website/client/src/id/guide/security.md
website/client/src/id/guide/sponsors.md
website/client/src/id/guide/tips/best-practices.md
website/client/src/id/guide/usage.md
website/client/src/id/guide/use-cases.md
website/client/src/id/index.md
website/client/src/ja/guide/code-compress.md
website/client/src/ja/guide/command-line-options.md
website/client/src/ja/guide/comment-removal.md
website/client/src/ja/guide/community-projects.md
website/client/src/ja/guide/configuration.md
website/client/src/ja/guide/custom-instructions.md
website/client/src/ja/guide/development/index.md
website/client/src/ja/guide/development/using-repomix-as-a-library.md
website/client/src/ja/guide/github-actions.md
website/client/src/ja/guide/index.md
website/client/src/ja/guide/installation.md
website/client/src/ja/guide/mcp-server.md
website/client/src/ja/guide/output.md
website/client/src/ja/guide/prompt-examples.md
website/client/src/ja/guide/remote-repository-processing.md
website/client/src/ja/guide/security.md
website/client/src/ja/guide/sponsors.md
website/client/src/ja/guide/tips/best-practices.md
website/client/src/ja/guide/usage.md
website/client/src/ja/guide/use-cases.md
website/client/src/ja/index.md
website/client/src/ko/guide/code-compress.md
website/client/src/ko/guide/command-line-options.md
website/client/src/ko/guide/comment-removal.md
website/client/src/ko/guide/community-projects.md
website/client/src/ko/guide/configuration.md
website/client/src/ko/guide/custom-instructions.md
website/client/src/ko/guide/development/index.md
website/client/src/ko/guide/development/using-repomix-as-a-library.md
website/client/src/ko/guide/github-actions.md
website/client/src/ko/guide/index.md
website/client/src/ko/guide/installation.md
website/client/src/ko/guide/mcp-server.md
website/client/src/ko/guide/output.md
website/client/src/ko/guide/prompt-examples.md
website/client/src/ko/guide/remote-repository-processing.md
website/client/src/ko/guide/security.md
website/client/src/ko/guide/sponsors.md
website/client/src/ko/guide/tips/best-practices.md
website/client/src/ko/guide/usage.md
website/client/src/ko/guide/use-cases.md
website/client/src/ko/index.md
website/client/src/pt-br/guide/code-compress.md
website/client/src/pt-br/guide/command-line-options.md
website/client/src/pt-br/guide/comment-removal.md
website/client/src/pt-br/guide/community-projects.md
website/client/src/pt-br/guide/configuration.md
website/client/src/pt-br/guide/custom-instructions.md
website/client/src/pt-br/guide/development/index.md
website/client/src/pt-br/guide/development/using-repomix-as-a-library.md
website/client/src/pt-br/guide/github-actions.md
website/client/src/pt-br/guide/index.md
website/client/src/pt-br/guide/installation.md
website/client/src/pt-br/guide/mcp-server.md
website/client/src/pt-br/guide/output.md
website/client/src/pt-br/guide/prompt-examples.md
website/client/src/pt-br/guide/remote-repository-processing.md
website/client/src/pt-br/guide/security.md
website/client/src/pt-br/guide/sponsors.md
website/client/src/pt-br/guide/tips/best-practices.md
website/client/src/pt-br/guide/usage.md
website/client/src/pt-br/guide/use-cases.md
website/client/src/pt-br/index.md
website/client/src/public/images/docs/browser-extension.png
website/client/src/public/images/docs/repomix-file-usage-1.png
website/client/src/public/images/docs/repomix-file-usage-2.png
website/client/src/public/images/og-image-large.png
website/client/src/public/images/pwa/repomix-192x192.png
website/client/src/public/images/pwa/repomix-512x512.png
website/client/src/public/images/repomix-logo.png
website/client/src/public/images/repomix-logo.svg
website/client/src/public/images/repomix-title.png
website/client/src/public/images/sponsors/tuple/github_repo_sponsorship.png
website/client/src/public/images/sponsors/warp/Terminal-Image.png
website/client/src/public/schemas/0.3.5/schema.json
website/client/src/public/schemas/1.3.0/schema.json
website/client/src/public/schemas/1.4.0/schema.json
website/client/src/public/schemas/1.4.1/schema.json
website/client/src/public/schemas/1.4.2/schema.json
website/client/src/public/schemas/1.5.0/schema.json
website/client/src/public/schemas/1.6.0/schema.json
website/client/src/public/schemas/latest/schema.json
website/client/src/shared/sponsors-section.md
website/client/src/vi/guide/code-compress.md
website/client/src/vi/guide/command-line-options.md
website/client/src/vi/guide/comment-removal.md
website/client/src/vi/guide/community-projects.md
website/client/src/vi/guide/configuration.md
website/client/src/vi/guide/custom-instructions.md
website/client/src/vi/guide/development/index.md
website/client/src/vi/guide/development/using-repomix-as-a-library.md
website/client/src/vi/guide/github-actions.md
website/client/src/vi/guide/index.md
website/client/src/vi/guide/installation.md
website/client/src/vi/guide/mcp-server.md
website/client/src/vi/guide/output.md
website/client/src/vi/guide/prompt-examples.md
website/client/src/vi/guide/remote-repository-processing.md
website/client/src/vi/guide/security.md
website/client/src/vi/guide/sponsors.md
website/client/src/vi/guide/tips/best-practices.md
website/client/src/vi/guide/usage.md
website/client/src/vi/guide/use-cases.md
website/client/src/vi/index.md
website/client/src/zh-cn/guide/code-compress.md
website/client/src/zh-cn/guide/command-line-options.md
website/client/src/zh-cn/guide/comment-removal.md
website/client/src/zh-cn/guide/community-projects.md
website/client/src/zh-cn/guide/configuration.md
website/client/src/zh-cn/guide/custom-instructions.md
website/client/src/zh-cn/guide/development/index.md
website/client/src/zh-cn/guide/development/using-repomix-as-a-library.md
website/client/src/zh-cn/guide/github-actions.md
website/client/src/zh-cn/guide/index.md
website/client/src/zh-cn/guide/installation.md
website/client/src/zh-cn/guide/mcp-server.md
website/client/src/zh-cn/guide/output.md
website/client/src/zh-cn/guide/prompt-examples.md
website/client/src/zh-cn/guide/remote-repository-processing.md
website/client/src/zh-cn/guide/security.md
website/client/src/zh-cn/guide/sponsors.md
website/client/src/zh-cn/guide/tips/best-practices.md
website/client/src/zh-cn/guide/usage.md
website/client/src/zh-cn/guide/use-cases.md
website/client/src/zh-cn/index.md
website/client/src/zh-tw/guide/code-compress.md
website/client/src/zh-tw/guide/command-line-options.md
website/client/src/zh-tw/guide/comment-removal.md
website/client/src/zh-tw/guide/community-projects.md
website/client/src/zh-tw/guide/configuration.md
website/client/src/zh-tw/guide/custom-instructions.md
website/client/src/zh-tw/guide/development/index.md
website/client/src/zh-tw/guide/development/using-repomix-as-a-library.md
website/client/src/zh-tw/guide/github-actions.md
website/client/src/zh-tw/guide/index.md
website/client/src/zh-tw/guide/installation.md
website/client/src/zh-tw/guide/mcp-server.md
website/client/src/zh-tw/guide/output.md
website/client/src/zh-tw/guide/prompt-examples.md
website/client/src/zh-tw/guide/remote-repository-processing.md
website/client/src/zh-tw/guide/security.md
website/client/src/zh-tw/guide/sponsors.md
website/client/src/zh-tw/guide/tips/best-practices.md
website/client/src/zh-tw/guide/usage.md
website/client/src/zh-tw/guide/use-cases.md
website/client/src/zh-tw/index.md
website/client/tsconfig.json
website/client/tsconfig.node.json
website/client/types/ui.ts
website/client/utils/urlParams.ts
website/client/utils/videos.ts
website/compose.yml
website/server/.dockerignore
website/server/.gcloudignore
website/server/.gitignore
website/server/Dockerfile
website/server/cloudbuild.yaml
website/server/package-lock.json
website/server/package.json
website/server/src/actions/packAction.ts
website/server/src/domains/pack/processZipFile.ts
website/server/src/domains/pack/remoteRepo.ts
website/server/src/domains/pack/utils/cache.ts
website/server/src/domains/pack/utils/fileUtils.ts
website/server/src/domains/pack/utils/sharedInstance.ts
website/server/src/domains/pack/utils/validation.ts
website/server/src/index.ts
website/server/src/middlewares/bodyLimit.ts
website/server/src/middlewares/cloudLogger.ts
website/server/src/middlewares/cors.ts
website/server/src/middlewares/rateLimit.ts
website/server/src/types.ts
website/server/src/utils/clientInfo.ts
website/server/src/utils/errorHandler.ts
website/server/src/utils/http.ts
website/server/src/utils/logger.ts
website/server/src/utils/memory.ts
website/server/src/utils/processConcurrency.ts
website/server/src/utils/rateLimit.ts
website/server/src/utils/time.ts
website/server/src/utils/validation.ts
website/server/tsconfig.json
</files>
</git_log_commit>
</git_logs>

<instruction>
# Repomix Project Structure and Overview

This document provides a structural overview of the Repomix project, designed to aid AI code assistants (like Copilot) in understanding the codebase.

Please refer to `README.md` for a complete and up-to-date project overview, and `CONTRIBUTING.md` for implementation guidelines and contribution procedures.

## Project Overview

Repomix is a tool that packs the contents of a software repository into a single file, making it easier for AI systems to analyze and process the codebase. It supports various output formats (plain text, XML, Markdown), ignores files based on configurable patterns, and performs security checks to exclude potentially sensitive information.

## Directory Structure

The project is organized into the following directories:

```
repomix/
├── src/ # Main source code
│   ├── cli/ # Command-line interface logic (argument parsing, command handling, output)
│   ├── config/ # Configuration loading, schema, and defaults
│   ├── core/ # Core logic of Repomix
│   │   ├── file/ # File handling (reading, processing, searching, tree structure generation, git commands)
│   │   ├── metrics/ # Calculating code metrics (character count, token count)
│   │   ├── output/ # Output generation (different styles, headers, etc.)
│   │   ├── packager/ # Orchestrates file collection, processing, output, and clipboard operations.
│   │   ├── security/ # Security checks to exclude sensitive files
│   │   ├── tokenCount/ # Token counting using Tiktoken
│   │   └── tree-sitter/ # Code parsing using Tree-sitter and language-specific queries
│   └── shared/ # Shared utilities and types (error handling, logging, helper functions)
├── tests/ # Unit and integration tests (organized mirroring src/)
│   ├── cli/
│   ├── config/
│   ├── core/
│   ├── integration-tests/
│   ├── shared/
│   └── testing/
└── website/ # Documentation website (VitePress)
    ├── client/      # Client-side code (Vue.js components, styles, configuration)
    │   ├── .vitepress/  # VitePress configuration and theme
    │   │   ├── config/  # Site configuration files (navigation, sidebar, etc.)
    │   │   └── theme/   # Custom theme and styles
    │   ├── components/ # Vue.js components for the website
    │   └── src/        # Markdown files for the documentation in various languages (en, ja, etc.)
    └── server/      # Server-side API (for remote repository processing)
        └── src/       # Server source code (API endpoints, request handling)
```

----------------------------------------------------------------

# Coding Guidelines
- Follow the Airbnb JavaScript Style Guide.
- Split files into smaller, focused units when appropriate:
  - Aim to keep code files under 250 lines. If a file exceeds 250 lines, split it into multiple files based on functionality.
- Add comments to clarify non-obvious logic. **Ensure all comments are written in English.**
- Provide corresponding unit tests for all new features.
- After implementation, verify changes by running:
  ```bash
  npm run lint  # Ensure code style compliance
  npm run test  # Verify all tests pass
  ```

## Dependencies and Testing
- Inject dependencies through a deps object parameter for testability
- Example:
  ```typescript
  export const functionName = async (
    param1: Type1,
    param2: Type2,
    deps = {
      defaultFunction1,
      defaultFunction2,
    }
  ) => {
    // Use deps.defaultFunction1() instead of direct call
  };
  ```
- Mock dependencies by passing test doubles through deps object
- Use vi.mock() only when dependency injection is not feasible

## Generate Comprehensive Output
- Include all content without abbreviation, unless specified otherwise
- Optimize for handling large codebases while maintaining output quality

----------------------------------------------------------------

# GitHub Release Note Guidelines
When writing release notes, please follow these guidelines:

- When referencing issues or PRs, use the gh command to verify the content:
  ```bash
  gh issue view <issue-number>  # For checking issue content
  gh pr view <pr-number>        # For checking PR content
  ```
  This helps ensure accuracy in release note descriptions.

Here are some examples of release notes that follow the guidelines:

v0.2.25
````md
This release brings significant improvements to output formatting and introduces flexible remote repository handling capabilities along with enhanced logging features.

# Improvements ⚡

## Remote Repository Enhancement (#335)
- Added branch/tag parsing directly from repository URLs:
```bash
repomix --remote https://github.com/yamadashy/repomix/tree/0.1.x
```
Functions identically to:
```bash
repomix --remote https://github.com/yamadashy/repomix --remote-branch 0.1.x
```

Special thanks to @huy-trn for implementing this user-friendly feature!

## Enhanced Output Formatting (#328, #329, #330)
- Added "End of Codebase" marker for better clarity in output
- Improved output header accuracy:
  - Better representation of codebase scope
  - Clear indication when using `--include` or `--ignore` options

Special thanks to @gitkenan for adding the "End of Codebase" marker and reporting the header issue!

## Path Pattern Support (#337)
- Added support for special characters in paths:
  - Handles parentheses in include patterns (e.g., `src/(categories)/**/*`)
  - Improved escaping for `[]` and `{}`
  - Essential for Next.js route groups and similar frameworks

Thank you @matheuscoelhomalta for improving path pattern support!

# How to Update

```bash
npm update -g repomix
```

---

As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
````

v0.2.24
````md
This release significantly enhances configuration flexibility with comprehensive CLI flag support and expands default ignore patterns for better project scaffolding. 

# What's New 🚀

## CLI Flags Revolution (#324)
- New command-line configuration now available.

```
- `--no-gitignore`: Disable .gitignore file usage
- `--no-default-patterns`: Disable default patterns
- `--header-text <text>`: Custom text to include in the file header
- `--instruction-file-path <path>`: Path to a file containing detailed custom instructions
- `--include-empty-directories`: Include empty directories in the output
```

Special recognition to @massdo for driving ecosystem growth.

# Improvements ⚡

## Enhanced Ignore Patterns (#318, #322)
- Expanded default ignores for Rust projects:
  - `target/`, `Cargo.lock`, build artifacts
  - PHP, Ruby, Go, Elixir, Haskell: package manager lock files

To @boralg for helping curate Rust-specific patterns!

# How to Update
```bash
npm update -g repomix
```

---

As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
````

v0.2.23
````md
This release adds significant performance improvements for large repositories, making Repomix faster and more efficient when needed.

# Improvements ⚡

## Parallel Processing Enhancement (#309)
- Implemented worker threads using [Tinypool](https://github.com/tinylibs/tinypool) for parallel processing

### Benchmark Results
- `yamadashy.repomix`: No significant change
  - Before: 868.73 millis
  - After: 671.26 millis
- `facebook/react`: 29x faster
  - Before: 123.31 secs
  - After: 4.19 secs
- `vercel/next.js`: 58x faster
  - Before: 17.85 mins
  - After: 17.27 secs

Note: While Repomix is not primarily designed for processing large repositories, and speed is not a primary goal, faster processing can provide a better user experience when working with larger codebases.

# How to Update

```bash
npm update -g repomix
```


---

As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.
````

v0.2.22
````md
This release introduces significant improvements to large file handling and expands the Repomix ecosystem with new tools and community channels.

# Improvements ⚡ 

## Improved Large File Handling (#302)

- Added a file size limit check (50MB) to prevent memory issues
- Graceful error handling for large files with clear user guidance:

Special thanks to @slavashvets for their continued contributions!

# Ecosystem Growth 🤝 

## New VS Code Extension (#300)
A community-created VS Code extension "Repomix Runner" is now available:
- Run Repomix directly from VS Code
- Extension by @massdo: [View on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=DorianMassoulier.repomix-runner)

Thank you @massdo for bringing Repomix to VS Code and expanding our tooling ecosystem!

## Official Social Media
- Launched official Repomix X (Twitter) account: [@repomix_ai](https://x.com/repomix_ai)
  - Follow for updates, tips, and community highlights

# How to Update

```bash
npm update -g repomix
```

---

Join our growing community on [Discord](https://discord.gg/BF8GxZHE2C) and follow us on [X](https://x.com/repomix_ai) for updates!
````

v0.2.21
````md
This release introduces significant improvements to output formatting and documentation, featuring a new parsable style option for enhanced XML handling.

# What's New 🚀 

## Enhanced Output Style Control (#287)
- Added new `parsableStyle` option for better output handling:
  - Ensures output strictly follows the specification of the chosen format
  - Provides properly escaped XML output with fast-xml-parser
  - Dynamically adjusts markdown code block delimiters to avoid content conflicts
- Available via CLI flag `--parsable-style` or in configuration file

Special thanks to @atollk for their first contribution!

# Documentation 📚

## README Enhancements (#296)
- Updated Homebrew installation documentation to include Linux support

Special thanks to @chenrui333 for their continued contributions!

## Website Multi-Language Support (#293)
- Enhanced multi-language support in [repomix.com](https://repomix.com)

# How to Update

To update to the latest version, run:
```bash
npm update -g repomix
```


---

As always, if you encounter any issues or have suggestions, please let us know through our GitHub issues or join our [Discord community](https://discord.gg/wNYzTwZFku) for support.

</instruction>
