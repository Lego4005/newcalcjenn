#!/usr/bin/env node

import chalk from 'chalk';
import { parseMarkdownChecklist } from './checklist-parser.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';

const IMPLEMENTATION_STATUS_PATH = join(process.cwd(), 'docs', 'Implementation-Status.md');
const TASKS_PATH = join(process.cwd(), 'tasks.md');

function readMarkdownFile(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    throw new Error(`Implementation status document not found at: ${path}`);
  }
}

function printTaskStatus(tasks, showIncomplete = false) {
  let total = 0;
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;

  tasks.forEach(task => {
    total++;
    if (task.status === '✅') completed++;
    else if (task.status === '⚠️') inProgress++;
    else if (task.status === '❌') notStarted++;

    if (!showIncomplete || task.status !== '✅') {
      const status = task.status === '✅' ? chalk.green(task.status) :
                    task.status === '⚠️' ? chalk.yellow(task.status) :
                    chalk.red(task.status);
      
      console.log(`${status} ${task.text}`);
    }
  });

  console.log('\nSummary:');
  console.log(chalk.green(`✅ Completed: ${completed}/${total} (${Math.round(completed/total*100)}%)`));
  console.log(chalk.yellow(`⚠️ In Progress: ${inProgress}/${total} (${Math.round(inProgress/total*100)}%)`));
  console.log(chalk.red(`❌ Not Started: ${notStarted}/${total} (${Math.round(notStarted/total*100)}%)`));
}

try {
  const implementationStatus = readMarkdownFile(IMPLEMENTATION_STATUS_PATH);
  const tasks = readMarkdownFile(TASKS_PATH);

  console.log(chalk.bold('\nImplementation Status:'));
  printTaskStatus(parseMarkdownChecklist(implementationStatus), process.argv.includes('--incomplete'));

  console.log(chalk.bold('\nProject Tasks:'));
  printTaskStatus(parseMarkdownChecklist(tasks), process.argv.includes('--incomplete'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}