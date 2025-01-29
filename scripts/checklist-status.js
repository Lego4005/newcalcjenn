#!/usr/bin/env node

import { getChecklistProgress } from '../lib/checklist-parser.mjs';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir, platform } from 'os';

// Function to convert full path to tilde path
function toTildePath(fullPath) {
  const home = homedir();
  return fullPath.startsWith(home) ? fullPath.replace(home, '~') : fullPath;
}

function getDocsPathValue(arg) {
  if (!arg || typeof arg !== 'string' || arg.indexOf('=') === -1) {
    return null;
  }

  const parts = arg.split('=');
  if (parts.length < 2) {
    return null;
  }

  let docsPathValue = parts[1];
  if (docsPathValue) {
    docsPathValue = docsPathValue.trim().replace(/^(['"]|["'])$/g, '');
  }

  return docsPathValue;
}

function getGitPath() {
  switch (platform()) {
    case 'win32':
      return 'C:\\Program Files\\Git\\bin\\git.exe';
    case 'darwin':
      return '/usr/bin/git';
    default:
      return '/usr/bin/git';
  }
}

// Repository paths
const VSCODE_CONTEXT_PATH = join(process.cwd());
let DOCS_PATH = join(process.cwd(), 'docs');

// Handle docs path argument
let docsPathValue;
for (const arg of process.argv) {
  if (arg.startsWith('--docs-path=')) {
    docsPathValue = getDocsPathValue(arg);
    break;
  } else if (arg === '--docs-path') {
    docsPathValue = process.argv[process.argv.indexOf(arg) + 1];
    break;
  }
}

if (docsPathValue) {
  const expandedPath = docsPathValue.startsWith('~')
    ? docsPathValue.replace('~', homedir())
    : join(docsPathValue);
  DOCS_PATH = expandedPath;

  if (!existsSync(DOCS_PATH)) {
    throw new Error(`Docs path does not exist: ${DOCS_PATH}`);
  }
}

// Document paths
let IMPLEMENTATION_STATUS_DOC = 'Implementation-Status.md';
let ARCHITECTURE_DOC = join(DOCS_PATH, 'Architecture.md');
let TASKS_DOC = 'tasks.md';

// Handle document name arguments
const statusDocIndex = process.argv.indexOf('--status-doc');
if (statusDocIndex > -1) {
  IMPLEMENTATION_STATUS_DOC = process.argv[statusDocIndex + 1];
}

const archDocIndex = process.argv.indexOf('--arch-doc');
if (archDocIndex > -1) {
  ARCHITECTURE_DOC = process.argv[archDocIndex + 1];
}

const tasksDocIndex = process.argv.indexOf('--tasks-doc');
if (tasksDocIndex > -1) {
  TASKS_DOC = process.argv[tasksDocIndex + 1];
}

// Full document paths
const IMPLEMENTATION_STATUS_PATH = join(DOCS_PATH, IMPLEMENTATION_STATUS_DOC);
const ARCHITECTURE_DOC_PATH = ARCHITECTURE_DOC;
const TASKS_DOC_PATH = join(process.cwd(), TASKS_DOC);

// Parse command line arguments
const showOnlyIncomplete = process.argv.includes('--incomplete');

async function validateRepositories() {
  if (!existsSync(VSCODE_CONTEXT_PATH)) {
    throw new Error(
      `VSCode Context repository not found at: ${toTildePath(VSCODE_CONTEXT_PATH)}`,
    );
  }
  if (!existsSync(join(VSCODE_CONTEXT_PATH, '.git'))) {
    throw new Error(
      `${toTildePath(VSCODE_CONTEXT_PATH)} is not a git repository`,
    );
  }

  if (!existsSync(DOCS_PATH)) {
    throw new Error(
      `Documentation directory not found at: ${toTildePath(DOCS_PATH)}`,
    );
  }

  if (!existsSync(IMPLEMENTATION_STATUS_PATH)) {
    throw new Error(
      `Implementation status document not found at: ${IMPLEMENTATION_STATUS_PATH}`,
    );
  }
  if (!existsSync(TASKS_DOC_PATH)) {
    throw new Error(`Tasks document not found at: ${TASKS_DOC_PATH}`);
  }

  console.log('Repository and Document Validation Successful:');
  console.log('✅ VSCode Context:');
  console.log(`   Path: ${toTildePath(VSCODE_CONTEXT_PATH)}`);

  const { exec } = await import('child_process');
  const gitPath = getGitPath();

  if (!existsSync(gitPath)) {
    console.log(
      '   Remote URL: Could not determine remote URL (git not found)',
    );
  } else {
    const vscodeContextRemoteUrl = await new Promise((resolve) => {
      exec(
        `"${gitPath}" -C "${VSCODE_CONTEXT_PATH}" remote get-url origin`,
        (error, stdout) => {
          if (error) {
            console.error(`exec error: ${error}`);
            resolve('Could not determine remote URL');
            return;
          }
          resolve(stdout.trim());
        },
      );
    });

    console.log('\n✅ Code Repository:');
    console.log(`   Remote URL: ${vscodeContextRemoteUrl}`);
  }

  console.log('\n✅ Documentation:');
  console.log(`   Docs_path: ${toTildePath(DOCS_PATH)}`);
  console.log('   Documents:');
  console.log(
    `     - Found implementation status: ${IMPLEMENTATION_STATUS_PATH}`,
  );
  if (existsSync(ARCHITECTURE_DOC_PATH)) {
    console.log(`     - Found architecture document: ${ARCHITECTURE_DOC}`);
  }
  console.log(
    `     - Found npm run, tasks, code actions doc:${TASKS_DOC_PATH}`,
  );
  console.log('');
}

function displayStatus(progress, showOnlyIncomplete, title) {
  console.log(`
    ${title}
    ${showOnlyIncomplete ? '(Showing only incomplete items)' : ''}
    =========================================================
  `);

  progress.sections.forEach((section) => {
    const incompleteSubsections = section.subsections
      .map((subsection) => ({
        title: subsection.title,
        items: subsection.items.filter((item) =>
          showOnlyIncomplete ? item.status !== 'completed' : true,
        ),
      }))
      .filter((subsection) => subsection.items.length > 0);

    if (showOnlyIncomplete && incompleteSubsections.length === 0) {
      return;
    }

    console.log(`  ${section.title}`);
    console.log(`  ----------------------------`);

    incompleteSubsections.forEach((subsection) => {
      console.log(`    ${subsection.title}:`);
      subsection.items.forEach((item) => {
        let statusIcon = '';
        if (item.status === 'completed') {
          statusIcon = '✅';
        } else if (item.status === 'not implemented') {
          statusIcon = '❌';
        } else if (item.status === 'partially implemented') {
          statusIcon = '⚠️';
        }
        console.log(`      ${statusIcon} ${item.description} (${item.status})`);
      });
    });
    console.log('');
  });
}

async function main() {
  try {
    validateRepositories();

    const implementationStatusProgress = await getChecklistProgress(
      IMPLEMENTATION_STATUS_PATH,
    );
    const tasksProgress = await getChecklistProgress(TASKS_DOC_PATH);

    if (implementationStatusProgress && implementationStatusProgress.error) {
      throw new Error(
        `Failed to get implementation status progress: ${implementationStatusProgress.error}`,
      );
    }

    if (tasksProgress && tasksProgress.error) {
      throw new Error(`Failed to get tasks progress: ${tasksProgress.error}`);
    }

    displayStatus(
      implementationStatusProgress,
      showOnlyIncomplete,
      'VSCode Context Client Implementation Status',
    );
    displayStatus(
      tasksProgress,
      showOnlyIncomplete,
      'VSCode Context Client Tasks Status',
    );
  } catch (error) {
    console.error(
      'Error:',
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(
    'Unhandled error:',
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
});