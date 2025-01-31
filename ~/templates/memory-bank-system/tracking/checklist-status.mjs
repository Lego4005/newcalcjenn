#!/usr/bin/env node

import chalk from 'chalk';
import { parseMarkdownChecklist } from './checklist-parser.mjs';
import { readFileSync } from 'fs';
import { join } from 'path';

// Constants
const PATHS = {
  implementation: join(process.cwd(), 'docs', 'Implementation-Status.md'),
  tasks: join(process.cwd(), 'tasks.md')
};

const STATUS_COLORS = {
  '✅': chalk.green,
  '⚠️': chalk.yellow,
  '❌': chalk.red
};

// Read markdown file with error handling
function readMarkdownFile(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    throw new Error(`File not found: ${path}`);
  }
}

// Calculate status metrics
function calculateMetrics(tasks) {
  return tasks.reduce((metrics, task) => {
    metrics.total++;
    if (task.status === '✅') metrics.completed++;
    else if (task.status === '⚠️') metrics.inProgress++;
    else if (task.status === '❌') metrics.notStarted++;
    return metrics;
  }, { total: 0, completed: 0, inProgress: 0, notStarted: 0 });
}

// Format percentage
function formatPercentage(value, total) {
  return Math.round((value / total) * 100);
}

// Print task status
function printTaskStatus(tasks, showIncomplete = false) {
  const metrics = calculateMetrics(tasks);

  // Print tasks
  tasks.forEach(task => {
    if (!showIncomplete || task.status !== '✅') {
      const colorize = STATUS_COLORS[task.status];
      console.log(`${colorize(task.status)} ${task.text}`);
    }
  });

  // Print summary
  console.log('\nSummary:');
  console.log(chalk.green(`✅ Completed: ${metrics.completed}/${metrics.total} (${formatPercentage(metrics.completed, metrics.total)}%)`));
  console.log(chalk.yellow(`⚠️ In Progress: ${metrics.inProgress}/${metrics.total} (${formatPercentage(metrics.inProgress, metrics.total)}%)`));
  console.log(chalk.red(`❌ Not Started: ${metrics.notStarted}/${metrics.total} (${formatPercentage(metrics.notStarted, metrics.total)}%)`));
}

// Main execution
try {
  const implementationStatus = readMarkdownFile(PATHS.implementation);
  const tasks = readMarkdownFile(PATHS.tasks);

  console.log(chalk.bold('\nImplementation Status:'));
  printTaskStatus(parseMarkdownChecklist(implementationStatus), process.argv.includes('--incomplete'));

  console.log(chalk.bold('\nProject Tasks:'));
  printTaskStatus(parseMarkdownChecklist(tasks), process.argv.includes('--incomplete'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}