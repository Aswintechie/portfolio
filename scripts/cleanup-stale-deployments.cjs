#!/usr/bin/env node

/**
 * Cleanup Stale Cloudflare Worker Deployments
 * 
 * This script identifies and deletes stale PR preview deployments from Cloudflare Workers.
 * A deployment is considered stale if its corresponding GitHub PR is closed or doesn't exist.
 * 
 * Environment Variables Required:
 * - CLOUDFLARE_API_TOKEN: Cloudflare API token with Workers Scripts Edit permission
 * - GITHUB_TOKEN: GitHub token for API access (provided by GitHub Actions)
 * - GITHUB_REPOSITORY: Repository in format 'owner/repo' (provided by GitHub Actions)
 * 
 * Environment Variables Optional:
 * - CLOUDFLARE_ACCOUNT_ID: Cloudflare account ID (auto-detected if not provided)
 */

const https = require('https');

// Configuration
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
let CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;

// Worker naming pattern for PR previews
const PR_WORKER_PREFIX = 'aswin-portfolio-pr-';
const PR_WORKER_PATTERN = /^aswin-portfolio-pr-(\d+)$/;

// Validate required environment variables
if (!CLOUDFLARE_API_TOKEN) {
  console.error('❌ Error: CLOUDFLARE_API_TOKEN environment variable is required');
  process.exit(1);
}

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

if (!GITHUB_REPOSITORY) {
  console.error('❌ Error: GITHUB_REPOSITORY environment variable is required');
  process.exit(1);
}

const [owner, repo] = GITHUB_REPOSITORY.split('/');

/**
 * Make an HTTPS request
 */
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Get Cloudflare account ID from API token
 */
async function getCloudflareAccountId() {
  const options = {
    hostname: 'api.cloudflare.com',
    path: '/client/v4/accounts',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  
  const response = await makeRequest(options);
  const accounts = response.result || [];
  
  if (accounts.length === 0) {
    throw new Error('No Cloudflare accounts found for this API token');
  }
  
  if (accounts.length > 1) {
    console.log(`⚠️  Multiple accounts found (${accounts.length}), using first account: ${accounts[0].name}`);
  }
  
  return accounts[0].id;
}

/**
 * Get all workers from Cloudflare account
 */
async function listCloudflareWorkers() {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  
  const response = await makeRequest(options);
  return response.result || [];
}

/**
 * Delete a worker from Cloudflare
 */
async function deleteWorker(workerName) {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/workers/scripts/${workerName}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  
  await makeRequest(options);
  return true;
}

/**
 * Check if PR is open using GitHub API
 */
async function isPROpen(prNumber) {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/pulls/${prNumber}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'stale-deployment-cleanup',
    },
  };
  
  try {
    const pr = await makeRequest(options);
    return pr.state === 'open';
  } catch (error) {
    console.log(`PR #${prNumber} not found or inaccessible`);
    return false;
  }
}

/**
 * Main cleanup function
 */
async function cleanupStaleDeployments() {
  try {
    // Auto-detect account ID if not provided
    if (!CLOUDFLARE_ACCOUNT_ID) {
      console.log('🔍 CLOUDFLARE_ACCOUNT_ID not set, auto-detecting from API token...');
      CLOUDFLARE_ACCOUNT_ID = await getCloudflareAccountId();
      console.log(`✅ Detected Cloudflare Account ID: ${CLOUDFLARE_ACCOUNT_ID}`);
    }
    
    console.log('🔍 Fetching all workers from Cloudflare...');
    const workers = await listCloudflareWorkers();
    console.log(`Found ${workers.length} total workers`);
    
    // Filter workers that match PR pattern
    const prWorkers = workers.filter(worker => 
      worker.id && PR_WORKER_PATTERN.test(worker.id)
    );
    
    console.log(`Found ${prWorkers.length} PR preview deployments`);
    
    if (prWorkers.length === 0) {
      console.log('✅ No PR preview deployments found');
      return;
    }
    
    let deletedCount = 0;
    let skippedCount = 0;
    const deletedWorkers = [];
    const skippedWorkers = [];
    
    for (const worker of prWorkers) {
      const workerName = worker.id;
      const prMatch = workerName.match(PR_WORKER_PATTERN);
      
      if (!prMatch) {
        console.log(`Skipping ${workerName} - doesn't match expected pattern`);
        continue;
      }
      
      const prNumber = parseInt(prMatch[1], 10);
      console.log(`\nChecking ${workerName} (PR #${prNumber})...`);
      
      const isOpen = await isPROpen(prNumber);
      
      if (!isOpen) {
        console.log(`❌ PR #${prNumber} is closed or doesn't exist`);
        console.log(`🗑️  Deleting worker: ${workerName}...`);
        
        try {
          await deleteWorker(workerName);
          console.log(`✅ Successfully deleted ${workerName}`);
          deletedCount++;
          deletedWorkers.push({ workerName, prNumber });
        } catch (error) {
          console.error(`❌ Failed to delete ${workerName}:`, error.message);
        }
      } else {
        console.log(`✅ PR #${prNumber} is still open - keeping deployment`);
        skippedCount++;
        skippedWorkers.push({ workerName, prNumber });
      }
    }
    
    console.log('\n📊 Cleanup Summary:');
    console.log(`Total PR deployments found: ${prWorkers.length}`);
    console.log(`Deleted stale deployments: ${deletedCount}`);
    console.log(`Active deployments kept: ${skippedCount}`);
    
    if (deletedWorkers.length > 0) {
      console.log('\n🗑️  Deleted deployments:');
      deletedWorkers.forEach(({ workerName, prNumber }) => {
        console.log(`  - ${workerName} (PR #${prNumber})`);
      });
    }
    
    if (skippedWorkers.length > 0) {
      console.log('\n✅ Active deployments (kept):');
      skippedWorkers.forEach(({ workerName, prNumber }) => {
        console.log(`  - ${workerName} (PR #${prNumber})`);
      });
    }
    
    if (deletedCount > 0) {
      console.log(`\n✨ Cleanup completed! ${deletedCount} stale deployment(s) removed.`);
    } else {
      console.log('\n✅ No stale deployments found. All deployments are up to date!');
    }
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanupStaleDeployments();
