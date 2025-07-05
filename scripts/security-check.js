#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔒 Running Security Checks...\n');

// 1. NPM Audit
console.log('📦 Running npm audit...');
try {
  execSync('npm audit --audit-level=moderate', { stdio: 'inherit' });
  console.log('✅ No security vulnerabilities found\n');
} catch (error) {
  console.log('⚠️  Security vulnerabilities detected. Please run "npm audit fix"\n');
}

// 2. Check for sensitive files
console.log('🔍 Checking for sensitive files...');
const sensitiveFiles = [
  '.env',
  '.env.local',
  '.env.production',
  'config/database.yml',
  'config/secrets.yml',
  'private_key.pem',
  'id_rsa',
  'id_dsa',
];

const foundSensitiveFiles = sensitiveFiles.filter(file => fs.existsSync(file));
if (foundSensitiveFiles.length > 0) {
  console.log('⚠️  Sensitive files found:', foundSensitiveFiles.join(', '));
  console.log('   Make sure these are in .gitignore\n');
} else {
  console.log('✅ No sensitive files found in repository\n');
}

// 3. Check .gitignore
console.log('📋 Checking .gitignore...');
if (fs.existsSync('.gitignore')) {
  const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
  const requiredEntries = ['.env', 'node_modules', 'dist'];
  const missingEntries = requiredEntries.filter(entry => !gitignoreContent.includes(entry));

  if (missingEntries.length > 0) {
    console.log('⚠️  Missing entries in .gitignore:', missingEntries.join(', '));
  } else {
    console.log('✅ .gitignore looks good');
  }
} else {
  console.log('⚠️  No .gitignore file found');
}

// 4. Check package.json for security
console.log('\n🔐 Checking package.json for security...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Check for scripts that might be dangerous
const dangerousScripts = ['postinstall', 'preinstall'];
const foundDangerousScripts = dangerousScripts.filter(
  script => packageJson.scripts && packageJson.scripts[script]
);

if (foundDangerousScripts.length > 0) {
  console.log('⚠️  Potentially dangerous scripts found:', foundDangerousScripts.join(', '));
  console.log('   Please review these scripts for security');
} else {
  console.log('✅ No dangerous scripts found in package.json');
}

console.log('\n🎉 Security check completed!');
