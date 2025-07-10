#!/usr/bin/env node

/**
 * @file copyright-check.js
 * @author Aswin
 * @copyright © 2025 Aswin. All rights reserved.
 * @description Pre-commit script to validate copyright headers in source files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  requiredCopyright: '© 2025 Aswin. All rights reserved.',
  requiredAuthor: 'Aswin',
  fileExtensions: ['.js', '.jsx', '.ts', '.tsx'],
  ignorePaths: [
    'node_modules',
    'dist',
    'build',
    '.git',
    'coverage',
    'public',
    'scripts/cleanup-previews.js',
    'scripts/security-check.js',
    'scripts/copyright-check.js', // Don't check this file itself initially
    'eslint.config.js',
    'postcss.config.js',
    'tailwind.config.js',
    'vite.config.js',
    'vitest.config.js',
    'src/setupTests.js',
    'src/main.jsx',
    'src/components/__tests__',
    'src/data/', // Data files are content, not source code
    'server/server.js',
    'worker.js',
    'script.js',
  ],
};

/**
 * Check if a file path should be ignored
 * @param {string} filePath - The file path to check
 * @returns {boolean} - Whether the file should be ignored
 */
function shouldIgnoreFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  return CONFIG.ignorePaths.some(
    ignorePath => relativePath.includes(ignorePath) || relativePath.startsWith(ignorePath)
  );
}

/**
 * Check if a file has the required copyright header
 * @param {string} filePath - The file path to check
 * @returns {object} - Check result with success status and message
 */
function checkCopyrightHeader(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').slice(0, 10); // Check first 10 lines
    const headerText = lines.join('\n');

    const hasCopyright = headerText.includes(CONFIG.requiredCopyright);
    const hasAuthor = headerText.includes(`@author ${CONFIG.requiredAuthor}`);
    const hasFileComment = headerText.includes('* @file');

    if (!hasCopyright || !hasAuthor || !hasFileComment) {
      return {
        success: false,
        message: `Missing required copyright header components:
          ${!hasFileComment ? '❌ Missing @file comment' : '✅ @file comment found'}
          ${!hasAuthor ? '❌ Missing @author' : '✅ @author found'}
          ${!hasCopyright ? '❌ Missing copyright notice' : '✅ Copyright found'}
          
          Expected format:
          /**
           * @file [filename]
           * @author ${CONFIG.requiredAuthor}
           * @copyright ${CONFIG.requiredCopyright}
           * @description [description]
           */`,
      };
    }

    return { success: true, message: 'Copyright header valid' };
  } catch (error) {
    return {
      success: false,
      message: `Error reading file: ${error.message}`,
    };
  }
}

/**
 * Get all files to check recursively
 * @param {string} dir - Directory to search
 * @returns {string[]} - Array of file paths to check
 */
function getAllFiles(dir) {
  const files = [];

  function traverseDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);

      if (shouldIgnoreFile(itemPath)) {
        continue;
      }

      if (stat.isDirectory()) {
        traverseDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (CONFIG.fileExtensions.includes(ext)) {
          files.push(itemPath);
        }
      }
    }
  }

  traverseDirectory(dir);
  return files;
}

/**
 * Main function to run copyright checks
 */
function main() {
  const isStrictMode = process.argv.includes('--strict');
  console.log(
    `🔍 Checking copyright headers${isStrictMode ? ' (strict mode)' : ' (warning mode)'}...`
  );

  const filesToCheck = getAllFiles(process.cwd());
  const failures = [];

  if (filesToCheck.length === 0) {
    console.log('ℹ️  No files found to check.');
    return;
  }

  console.log(`📄 Checking ${filesToCheck.length} files...`);

  for (const filePath of filesToCheck) {
    const result = checkCopyrightHeader(filePath);
    const relativePath = path.relative(process.cwd(), filePath);

    if (result.success) {
      console.log(`✅ ${relativePath}`);
    } else {
      console.log(`${isStrictMode ? '❌' : '⚠️'} ${relativePath}`);
      failures.push({ file: relativePath, message: result.message });
    }
  }

  if (failures.length > 0) {
    const icon = isStrictMode ? '🚨' : '⚠️';
    const action = isStrictMode ? 'failed' : 'warnings';
    console.log(`\n${icon} Copyright header validation ${action}!\n`);

    if (!isStrictMode) {
      console.log('ℹ️  The following files are missing copyright headers:');
      failures.forEach(failure => {
        console.log(`  - ${failure.file}`);
      });
      console.log('\n💡 Consider adding copyright headers to these files.');
      console.log('📋 Use --strict flag to make this check mandatory.\n');
    } else {
      failures.forEach(failure => {
        console.log(`File: ${failure.file}`);
        console.log(failure.message);
        console.log('---');
      });
      console.log(`\n💡 Fix ${failures.length} file(s) and try again.`);
      process.exit(1);
    }
  }

  console.log('\n✅ All files have valid copyright headers!');
}

// Run the check
main();
