#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧹 Cleaning up preview deployments...\n');

// Function to get all workers
function getWorkersList() {
  try {
    const output = execSync('npx wrangler list', { encoding: 'utf8' });
    return output;
  } catch (error) {
    console.error('❌ Failed to get workers list:', error.message);
    return '';
  }
}

// Function to delete a worker
function deleteWorker(workerName) {
  try {
    console.log(`🗑️  Deleting worker: ${workerName}`);
    execSync(`npx wrangler delete ${workerName} --force`, { stdio: 'inherit' });
    console.log(`✅ Successfully deleted: ${workerName}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to delete ${workerName}:`, error.message);
    return false;
  }
}

// Main cleanup function
function cleanupPreviews() {
  const workersList = getWorkersList();

  if (!workersList) {
    console.log('❌ Could not fetch workers list');
    return;
  }

  console.log('Current workers:');
  console.log(workersList);

  // Find preview workers (those with -pr- in the name)
  const previewWorkers = workersList
    .split('\n')
    .filter(line => line.includes('aswin-portfolio-pr-'))
    .map(line => line.split(/\s+/)[0]) // Get the first column (worker name)
    .filter(name => name && name.startsWith('aswin-portfolio-pr-'));

  if (previewWorkers.length === 0) {
    console.log('✅ No preview workers found to clean up');
    return;
  }

  console.log(`\n🔍 Found ${previewWorkers.length} preview worker(s) to clean up:`);
  previewWorkers.forEach(worker => console.log(`  - ${worker}`));

  console.log('\n🧹 Starting cleanup...');

  let deleted = 0;
  previewWorkers.forEach(worker => {
    if (deleteWorker(worker)) {
      deleted++;
    }
  });

  console.log(
    `\n🎉 Cleanup completed! Deleted ${deleted}/${previewWorkers.length} preview workers.`
  );
}

// Run the cleanup
cleanupPreviews();
