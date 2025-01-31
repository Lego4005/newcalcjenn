#!/usr/bin/env node

import { copyFile, mkdir, writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const TRACKING_DIR = join(process.cwd(), 'tracking');

// Template content for package.json scripts
const PACKAGE_SCRIPTS = {
  "status": "node tracking/status-tracker.mjs",
  "status:incomplete": "node tracking/status-tracker.mjs --incomplete"
};

// Template content for Implementation Status
const IMPLEMENTATION_STATUS_TEMPLATE = `# Implementation Status

## Core Features
### Feature Group 1
- ❌ First feature
- ❌ Second feature

## Status Legend
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started
`;

// Template content for Tasks
const TASKS_TEMPLATE = `# Project Tasks

## Current Sprint
### High Priority
- ❌ First task
- ❌ Second task

## Status Legend
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started
`;

// Template content for Memory Bank files
const ACTIVE_CONTEXT_TEMPLATE = `# Active Context

## Current State
- Current tasks and their status
- Work in progress items

## Recent Changes
- Latest updates and modifications
- Status changes

## Next Steps
- Upcoming tasks
- Planned changes

## Status Legend
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started
`;

const PROGRESS_TEMPLATE = `# Progress Tracking

## Implementation Status
- Overall project progress
- Feature completion status

## Current Focus
- Active development areas
- In-progress features

## Status Legend
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started
`;

async function createDirectory(path) {
  try {
    await mkdir(path, { recursive: true });
    console.log(`✅ Created directory: ${path}`);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function copyTrackingFiles() {
  const files = [
    'status-handler.mjs',
    'memory-bank-parser.mjs',
    'status-tracker.mjs'
  ];

  for (const file of files) {
    await copyFile(
      join(TRACKING_DIR, file),
      join(process.cwd(), 'tracking', file)
    );
    console.log(`✅ Copied ${file}`);
  }
}

async function updatePackageJson() {
  try {
    const packagePath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));

    // Add status scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      ...PACKAGE_SCRIPTS
    };

    await writeFile(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json with status scripts');
  } catch (error) {
    console.error('Failed to update package.json:', error.message);
    throw error;
  }
}

async function createTemplateFiles() {
  const files = [
    ['docs/Implementation-Status.md', IMPLEMENTATION_STATUS_TEMPLATE],
    ['tasks.md', TASKS_TEMPLATE],
    ['docs/cline_docs/activeContext.md', ACTIVE_CONTEXT_TEMPLATE],
    ['docs/cline_docs/progress.md', PROGRESS_TEMPLATE]
  ];

  for (const [path, content] of files) {
    const fullPath = join(process.cwd(), path);
    await createDirectory(join(process.cwd(), path.split('/').slice(0, -1).join('/')));
    await writeFile(fullPath, content);
    console.log(`✅ Created ${path}`);
  }
}

async function main() {
  try {
    console.log('Setting up status tracking system...\n');

    // Create necessary directories
    await createDirectory(join(process.cwd(), 'tracking'));
    await createDirectory(join(process.cwd(), 'docs'));
    await createDirectory(join(process.cwd(), 'docs/cline_docs'));

    // Copy tracking files
    await copyTrackingFiles();

    // Create template files
    await createTemplateFiles();

    // Update package.json
    await updatePackageJson();

    console.log('\n✨ Status tracking system setup complete!');
    console.log('\nAvailable commands:');
    console.log('  npm run status          - Show full status');
    console.log('  npm run status:incomplete - Show only incomplete items');
  } catch (error) {
    console.error('Error setting up status tracking:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error.message);
  process.exit(1);
});