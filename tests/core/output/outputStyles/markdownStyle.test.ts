import { describe, expect, test } from 'vitest';
import { getMarkdownTemplate, getFileExtension } from '../../../../src/core/output/outputStyles/markdownStyle.js';
import { processTemplate } from '../../../../src/core/output/templateEngine.js';

describe('markdownStyle', () => {
  describe('getMarkdownTemplate', () => {
    test('should return valid markdown template', () => {
      const template = getMarkdownTemplate();
      expect(template).toContain('# File Summary');
      expect(template).toContain('# Directory Structure');
      expect(template).toContain('# Files');
      expect(template).toContain('{{#if instruction}}');
      expect(template).toContain('# Instruction');
    });

    test('should correctly render template with basic data', () => {
      const template = getMarkdownTemplate();
      const data = {
        generationHeader: 'Generated Test Header',
        summaryPurpose: 'Test Purpose',
        summaryFileFormat: 'Test Format',
        summaryUsageGuidelines: 'Test Guidelines',
        summaryNotes: 'Test Notes',
        treeString: 'src/\n  index.ts',
        processedFiles: [
          {
            path: 'src/index.ts',
            content: 'console.log("Hello");',
          },
        ],
        fileSummaryEnabled: true,
        directoryStructureEnabled: true,
        filesEnabled: true,
        markdownCodeBlockDelimiter: '```',
      };

      const result = processTemplate(template, data, {});

      expect(result).toContain('Generated Test Header');
      expect(result).toContain('Test Purpose');
      expect(result).toContain('Test Format');
      expect(result).toContain('Test Guidelines');
      expect(result).toContain('Test Notes');
      expect(result).toContain('src/\n  index.ts');
      expect(result).toContain('## File: src/index.ts');
      expect(result).toContain('console.log("Hello");');
    });

    test('should render optional header text when provided', () => {
      const template = getMarkdownTemplate();
      const data = {
        headerText: 'Custom Header Text',
        processedFiles: [],
        fileSummaryEnabled: true,
        directoryStructureEnabled: true,
      };

      const result = processTemplate(template, data, {});

      expect(result).toContain('# User Provided Header');
      expect(result).toContain('Custom Header Text');
    });

    test('should not render header section when headerText is not provided', () => {
      const template = getMarkdownTemplate();
      const data = {
        processedFiles: [],
        fileSummaryEnabled: true,
        directoryStructureEnabled: true,
      };

      const result = processTemplate(template, data, {});

      expect(result).not.toContain('# User Provided Header');
    });

    test('should render instruction section when provided', () => {
      const template = getMarkdownTemplate();
      const data = {
        instruction: 'Custom Instruction Text',
        processedFiles: [],
        fileSummaryEnabled: true,
        directoryStructureEnabled: true,
      };

      const result = processTemplate(template, data, {});

      expect(result).toContain('# Instruction');
      expect(result).toContain('Custom Instruction Text');
    });

    test('should display headerText if specified even if fileSummary is disabled', () => {
      const template = getMarkdownTemplate();
      const data = {
        headerText: 'MARKDOWN HEADER',
        fileSummaryEnabled: false,
        directoryStructureEnabled: true,
        processedFiles: [],
      };
      const result = processTemplate(template, data, {});
      expect(result).not.toContain('This file is a merged representation');
      expect(result).toContain('MARKDOWN HEADER');
    });

    test('should not display generationHeader if fileSummary is disabled', () => {
      const template = getMarkdownTemplate();
      const data = {
        generationHeader: 'Generated Test Header',
        fileSummaryEnabled: false,
        directoryStructureEnabled: true,
        processedFiles: [],
      };
      const result = processTemplate(template, data, {});
      expect(result).not.toContain('This file is a merged representation');
      expect(result).not.toContain('Generated Test Header');
      expect(result).toContain('# Directory Structure');
    });
  });

  describe('getFileExtension helper', () => {
    // JavaScript variants
    test('should handle JavaScript related extensions', () => {
      expect(getFileExtension('file.js')).toBe('javascript');
      expect(getFileExtension('file.jsx')).toBe('javascript');
      expect(getFileExtension('file.ts')).toBe('typescript');
      expect(getFileExtension('file.tsx')).toBe('typescript');
    });

    // Web technologies
    test('should handle web technology extensions', () => {
      expect(getFileExtension('file.html')).toBe('html');
      expect(getFileExtension('file.css')).toBe('css');
      expect(getFileExtension('file.scss')).toBe('scss');
      expect(getFileExtension('file.sass')).toBe('scss');
      expect(getFileExtension('file.vue')).toBe('vue');
    });

    // Backend languages
    test('should handle backend language extensions', () => {
      expect(getFileExtension('file.py')).toBe('python');
      expect(getFileExtension('file.rb')).toBe('ruby');
      expect(getFileExtension('file.php')).toBe('php');
      expect(getFileExtension('file.java')).toBe('java');
      expect(getFileExtension('file.go')).toBe('go');
    });

    // System programming languages
    test('should handle system programming language extensions', () => {
      expect(getFileExtension('file.c')).toBe('cpp');
      expect(getFileExtension('file.cpp')).toBe('cpp');
      expect(getFileExtension('file.rs')).toBe('rust');
      expect(getFileExtension('file.swift')).toBe('swift');
      expect(getFileExtension('file.kt')).toBe('kotlin');
    });

    // Configuration and data format files
    test('should handle configuration and data format extensions', () => {
      expect(getFileExtension('file.json')).toBe('json');
      expect(getFileExtension('file.json5')).toBe('json5');
      expect(getFileExtension('file.xml')).toBe('xml');
      expect(getFileExtension('file.yaml')).toBe('yaml');
      expect(getFileExtension('file.yml')).toBe('yaml');
      expect(getFileExtension('file.toml')).toBe('toml');
    });

    // Shell and scripting
    test('should handle shell and scripting extensions', () => {
      expect(getFileExtension('file.sh')).toBe('bash');
      expect(getFileExtension('file.bash')).toBe('bash');
      expect(getFileExtension('file.ps1')).toBe('powershell');
    });

    // Database and query languages
    test('should handle database related extensions', () => {
      expect(getFileExtension('file.sql')).toBe('sql');
      expect(getFileExtension('file.graphql')).toBe('graphql');
      expect(getFileExtension('file.gql')).toBe('graphql');
    });

    // Functional programming languages
    test('should handle functional programming language extensions', () => {
      expect(getFileExtension('file.fs')).toBe('fsharp');
      expect(getFileExtension('file.fsx')).toBe('fsharp');
      expect(getFileExtension('file.hs')).toBe('haskell');
      expect(getFileExtension('file.clj')).toBe('clojure');
      expect(getFileExtension('file.cljs')).toBe('clojure');
    });

    // Other languages and tools
    test('should handle other programming language extensions', () => {
      expect(getFileExtension('file.scala')).toBe('scala');
      expect(getFileExtension('file.dart')).toBe('dart');
      expect(getFileExtension('file.ex')).toBe('elixir');
      expect(getFileExtension('file.exs')).toBe('elixir');
      expect(getFileExtension('file.erl')).toBe('erlang');
      expect(getFileExtension('file.coffee')).toBe('coffeescript');
    });

    // Infrastructure and templating
    test('should handle infrastructure and templating extensions', () => {
      expect(getFileExtension('file.tf')).toBe('hcl');
      expect(getFileExtension('file.tfvars')).toBe('hcl');
      expect(getFileExtension('file.dockerfile')).toBe('dockerfile');
      expect(getFileExtension('file.pug')).toBe('pug');
      expect(getFileExtension('file.proto')).toBe('protobuf');
    });

    // Miscellaneous
    test('should handle miscellaneous file extensions', () => {
      expect(getFileExtension('file.md')).toBe('markdown');
      expect(getFileExtension('file.r')).toBe('r');
      expect(getFileExtension('file.pl')).toBe('perl');
      expect(getFileExtension('file.pm')).toBe('perl');
      expect(getFileExtension('file.lua')).toBe('lua');
      expect(getFileExtension('file.groovy')).toBe('groovy');
      expect(getFileExtension('file.vb')).toBe('vb');
    });

    // Edge cases
    test('should handle edge cases', () => {
      expect(getFileExtension('file')).toBe(''); // No extension
      expect(getFileExtension('.gitignore')).toBe(''); // Dotfile
      expect(getFileExtension('file.unknown')).toBe(''); // Unknown extension
      expect(getFileExtension('path/to/file.js')).toBe('javascript'); // Path with directory
    });
  });
});
