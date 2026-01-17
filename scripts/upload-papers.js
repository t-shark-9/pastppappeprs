#!/usr/bin/env node

/**
 * Local Past Papers Upload Script
 * 
 * This script uploads PDF files from a local directory to the Supabase
 * past-papers storage bucket via the upload-past-papers Edge Function.
 * 
 * Usage:
 *   node scripts/upload-papers.js [directory]
 * 
 * The directory defaults to the path specified in SOURCE_DIR below.
 * 
 * Requirements:
 *   npm install form-data node-fetch
 * 
 * File naming convention:
 *   [TYPE][VARIANT]-[GROUP]-[SUBJECT]-[YEAR]-[EXTRAS].pdf
 *   Example: PP0-04-02-2024-TZ1-P1-001.pdf
 */

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Configuration
const FUNCTION_URL = 'https://jimfuknlntcqgtqfwcod.supabase.co/functions/v1/upload-past-papers';
const SOURCE_DIR = process.argv[2] || '/Users/tjarkschool/Desktop/continued work/sorted papers/website_compressed/past_papers/';

// Optional: Set this if you configured UPLOAD_SECRET_KEY in Supabase secrets
const UPLOAD_KEY = process.env.UPLOAD_SECRET_KEY || '';

// Stats tracking
const stats = {
  total: 0,
  uploaded: 0,
  skipped: 0,
  errors: 0,
  errorFiles: [],
};

async function uploadFile(filePath) {
  const filename = path.basename(filePath);
  
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), filename);
    
    const headers = {
      ...form.getHeaders(),
    };
    
    if (UPLOAD_KEY) {
      headers['x-upload-key'] = UPLOAD_KEY;
    }
    
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      body: form,
      headers,
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }
    
    return result;
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
}

async function processDirectory(dir, depth = 0) {
  const indent = '  '.repeat(depth);
  
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      console.log(`${indent}📁 Entering: ${entry.name}`);
      await processDirectory(fullPath, depth + 1);
    } else if (entry.name.toLowerCase().endsWith('.pdf')) {
      stats.total++;
      console.log(`${indent}📄 Uploading: ${entry.name}`);
      
      try {
        const result = await uploadFile(fullPath);
        
        if (result.status === 'success') {
          stats.uploaded++;
          console.log(`${indent}   ✅ Success: ${result.code}`);
        } else if (result.status === 'skipped') {
          stats.skipped++;
          console.log(`${indent}   ⏭️  Skipped: ${result.message}`);
        } else {
          stats.errors++;
          stats.errorFiles.push({ file: entry.name, error: result.error || 'Unknown error' });
          console.log(`${indent}   ❌ Error: ${result.error || 'Unknown error'}`);
        }
      } catch (error) {
        stats.errors++;
        stats.errorFiles.push({ file: entry.name, error: error.message });
        console.log(`${indent}   ❌ Error: ${error.message}`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('           Past Papers Upload Script');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Source directory: ${SOURCE_DIR}`);
  console.log(`Target: ${FUNCTION_URL}`);
  console.log('═══════════════════════════════════════════════════════════\n');
  
  const startTime = Date.now();
  
  await processDirectory(SOURCE_DIR);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('                       Summary');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Total files found:  ${stats.total}`);
  console.log(`Successfully uploaded: ${stats.uploaded}`);
  console.log(`Skipped (existing):    ${stats.skipped}`);
  console.log(`Errors:                ${stats.errors}`);
  console.log(`Duration:              ${duration}s`);
  console.log('═══════════════════════════════════════════════════════════');
  
  if (stats.errorFiles.length > 0) {
    console.log('\nError details:');
    stats.errorFiles.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
}

main().catch(console.error);
