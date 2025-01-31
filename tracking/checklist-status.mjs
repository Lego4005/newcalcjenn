#!/usr/bin/env node

import chalk from 'chalk';
import { parseMarkdownChecklist } from './checklist-parser.mjs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Constants
const PATHS = {
  implementation: join(process.cwd(), 'docs', 'Implementation-Status.md'),
  tasks: join(process.cwd(), 'tasks.md'),
  activeContext: join(process.cwd(), 'docs', 'cline_docs', 'activeContext.md'),
  progress: join(process.cwd(), 'docs', 'cline_docs', 'progress.md')
};

const STATUS = {
  COMPLETED: '✅',
  IN_PROGRESS: '⚠️',
  NOT_STARTED: '❌'
};

const STATUS_COLORS = {
  [STATUS.COMPLETED]: chalk.green,
  [STATUS.IN_PROGRESS]: chalk.yellow,
  [STATUS.NOT_STARTED]: chalk.red
};

const STATUS_PRIORITY = {
  [STATUS.COMPLETED]: 3,
  [STATUS.IN_PROGRESS]: 2,
  [STATUS.NOT_STARTED]: 1
};

// Status indicators in text
const IN_PROGRESS_INDICATORS = [
  'in progress',
  'working on',
  'started',
  'implementing',
  'updating',
  'enhancing',
  'fixing',
  'needs',
  'requires'
];

// Read markdown file with error handling
function readMarkdownFile(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    console.warn(`Warning: File not found: ${path}`);
    return '';
  }
}

// Determine status from text content
function getStatusFromText(text) {
  const lowerText = text.toLowerCase();
  
  // Check for explicit status markers
  if (text.includes('✅') || text.includes('✓') || lowerText.includes('complete')) {
    return STATUS.COMPLETED;
  }
  if (text.includes('⚠️') || text.includes('⚠')) {
    return STATUS.IN_PROGRESS;
  }
  if (text.includes('❌') || text.includes('x')) {
    return STATUS.NOT_STARTED;
  }

  // Check for in-progress indicators
  if (IN_PROGRESS_INDICATORS.some(indicator => lowerText.includes(indicator))) {
    return STATUS.IN_PROGRESS;
  }

  // Default to not started
  return STATUS.NOT_STARTED;
}

// Extract status from Memory Bank files
function extractMemoryBankStatus() {
  const activeContext = readMarkdownFile(PATHS.activeContext);
  const progress = readMarkdownFile(PATHS.progress);
  
  // Status indicators in text
  const IN_PROGRESS_INDICATORS = [
    'in progress',
    'working on',
    'started',
    'implementing',
    'updating',
    'enhancing',
    'fixing',
    'needs',
    'requires'
  ];
  // Parse completion status from both files
  const activeContextTasks = parseMarkdownChecklist(activeContext);
  const progressTasks = parseMarkdownChecklist(progress);
  
  // Also parse status from notes and descriptions
  function parseNotes(content) {
    const notes = [];
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') && !trimmed.match(/^-\s*(✅|⚠️|❌|✓|⚠|x)/)) {
        notes.push({
          text: trimmed.replace(/^-\s*/, ''),
          status: getStatusFromText(trimmed)
        });
      }
    });
    return notes;
  }

  const activeContextNotes = parseNotes(activeContext);
  const progressNotes = parseNotes(progress);
  
  // Combine all tasks and notes
  const taskMap = new Map();
  
  function processTask(task) {
    let normalizedText = task.text.toLowerCase()
      .replace(/^\s*-\s*/, '')
      .replace(/\s*in progress\s*/i, '')
      .replace(/^(complete|add|implement|update|enhance)\s+/, '')
      .replace(/\s+(system|functionality|feature|tool)$/, '');

    // Check for in-progress indicators in text
    if (IN_PROGRESS_INDICATORS.some(indicator => task.text.toLowerCase().includes(indicator))) {
      task.status = STATUS.IN_PROGRESS;
    }
    const key = normalizedText;
    
    // Get status from both the task's status marker and its text content
    let finalStatus = task.status;
    
    // Check for in-progress indicators in text
    if (IN_PROGRESS_INDICATORS.some(indicator => task.text.toLowerCase().includes(indicator)) ||
        task.text.match(/^(implementing|updating|enhancing|fixing)/i)) {
      finalStatus = STATUS.IN_PROGRESS;
    }
    
    const existing = taskMap.get(key);
    if (!existing || STATUS_PRIORITY[finalStatus] > STATUS_PRIORITY[existing]) {
      taskMap.set(key, finalStatus);
    }
  }
  
  // Process all sources
  [...activeContextTasks, ...progressTasks].forEach(task => processTask(task));
  [...activeContextNotes, ...progressNotes].forEach(note => processTask(note));
  
  return taskMap;
}

// Update markdown content preserving structure
function updateMarkdownContent(content, statusMap) {
  const lines = content.split('\n');
  const updatedLines = [];
  let inSection = false;

  lines.forEach(line => {
    if (line.startsWith('#')) {
      inSection = true;
      updatedLines.push(line);
    } else if (line.trim() && inSection) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        // Extract task text without status
        const taskText = trimmed
          .replace(/^-\s*(✅|⚠️|❌|✓|⚠|x)\s*/, '')
          .replace(/:\s*(✅|⚠️|❌|✓|⚠|x)$/, '')
          .trim();

        // Find status from Memory Bank
        const key = taskText.toLowerCase()
          .replace(/^\s*-\s*/, '')
          .replace(/\s*in progress\s*/i, '')
          .replace(/^(complete|add|implement|update|enhance)\s+/, '')
          .replace(/\s+(system|functionality|feature|tool)$/, '');

        // Get status from map or determine from text
        let status = statusMap.get(key);
        if (!status) {
          // Check for in-progress indicators
          if (IN_PROGRESS_INDICATORS.some(indicator => taskText.toLowerCase().includes(indicator)) ||
              taskText.match(/^(implementing|updating|enhancing|fixing)/i)) {
            status = STATUS.IN_PROGRESS;
          }
        }
        status = status || getStatusFromText(taskText);

        // Preserve original line format
        if (trimmed.includes(':')) {
          updatedLines.push(`- ${taskText}: ${status}`);
        } else {
          updatedLines.push(`- ${status} ${taskText}`);
        }
      } else {
        updatedLines.push(line);
      }
    } else {
      updatedLines.push(line);
    }
  });

  return updatedLines.join('\n');
}

// Sync status files with Memory Bank
function syncStatusFiles(memoryBankTasks) {
  // Read current status files
  const implementation = readMarkdownFile(PATHS.implementation);
  const tasks = readMarkdownFile(PATHS.tasks);
  
  // Update both files preserving structure
  const updatedImplementation = updateMarkdownContent(implementation, memoryBankTasks);
  const updatedTasks = updateMarkdownContent(tasks, memoryBankTasks);
  
  // Write updated files
  writeFileSync(PATHS.implementation, updatedImplementation);
  writeFileSync(PATHS.tasks, updatedTasks);
}

// Calculate status metrics
function calculateMetrics(tasks) {
  return tasks.reduce((metrics, task) => {
    metrics.total++;
    if (task.status === STATUS.COMPLETED || task.status === '✓') metrics.completed++;
    else if (task.status === STATUS.IN_PROGRESS) metrics.inProgress++;
    else if (task.status === STATUS.NOT_STARTED) metrics.notStarted++;
    return metrics;
  }, { total: 0, completed: 0, inProgress: 0, notStarted: 0 });
}

// Format percentage
function formatPercentage(value, total) {
  return Math.round((value / total) * 100);
}

// Print task status preserving sections
function printTaskStatus(content, showIncomplete = false) {
  const sections = parseSections(content);
  const allTasks = [];

  // Print sections
  sections.filter(section => section.title !== 'Status Legend').forEach(section => {
    console.log(chalk.bold(`\n${section.title}`));
    
    section.subsections.forEach(subsection => {
      console.log(chalk.bold(`\n${subsection.title}`));
      const tasks = parseMarkdownChecklist(subsection.content.join('\n'));
      tasks.forEach(task => {
        if (!showIncomplete || task.status !== STATUS.COMPLETED) {
          const colorize = STATUS_COLORS[task.status] || STATUS_COLORS[STATUS.NOT_STARTED];
          console.log(`${colorize(task.status)} ${task.text}`);
        }
        allTasks.push(task);
      });
    });

    const sectionTasks = parseMarkdownChecklist(section.content.join('\n'));
    sectionTasks.forEach(task => {
      if (!showIncomplete || task.status !== STATUS.COMPLETED) {
        const colorize = STATUS_COLORS[task.status] || STATUS_COLORS[STATUS.NOT_STARTED];
        console.log(`${colorize(task.status)} ${task.text}`);
      }
      allTasks.push(task);
    });
  });

  // Print status legend
  console.log(chalk.bold('\nStatus Legend'));
  console.log(chalk.green(`${STATUS.COMPLETED} Completed`));
  console.log(chalk.yellow(`${STATUS.IN_PROGRESS} In Progress`));
  console.log(chalk.red(`${STATUS.NOT_STARTED} Not Started`));

  // Print summary
  const metrics = calculateMetrics(allTasks);
  console.log('\nSummary:');
  console.log(chalk.green(`${STATUS.COMPLETED} Completed: ${metrics.completed}/${metrics.total} (${formatPercentage(metrics.completed, metrics.total)}%)`));
  console.log(chalk.yellow(`${STATUS.IN_PROGRESS} In Progress: ${metrics.inProgress}/${metrics.total} (${formatPercentage(metrics.inProgress, metrics.total)}%)`));
  console.log(chalk.red(`${STATUS.NOT_STARTED} Not Started: ${metrics.notStarted}/${metrics.total} (${formatPercentage(metrics.notStarted, metrics.total)}%)`));
}

// Parse sections from markdown
function parseSections(content) {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = null;
  let currentSubsection = null;

  lines.forEach(line => {
    if (line.startsWith('### ')) {
      currentSubsection = {
        title: line.slice(4).trim(),
        content: []
      };
      if (currentSection) {
        currentSection.subsections.push(currentSubsection);
      }
    } else if (line.startsWith('## ')) {
      currentSection = {
        title: line.slice(3).trim(),
        subsections: [],
        content: []
      };
      currentSubsection = null;
      sections.push(currentSection);
    } else if (line.trim() && !line.startsWith('#')) {
      if (currentSubsection) {
        currentSubsection.content.push(line);
      } else if (currentSection) {
        currentSection.content.push(line);
      }
    }
  });

  return sections;
}

// Main execution
try {
  // Extract status from Memory Bank
  const memoryBankTasks = extractMemoryBankStatus();
  
  // Sync status files with Memory Bank
  syncStatusFiles(memoryBankTasks);

  // Display results preserving file structure
  console.log(chalk.bold('\nImplementation Status:'));
  printTaskStatus(readMarkdownFile(PATHS.implementation), process.argv.includes('--incomplete'));

  console.log(chalk.bold('\nProject Tasks:'));
  printTaskStatus(readMarkdownFile(PATHS.tasks), process.argv.includes('--incomplete'));
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
