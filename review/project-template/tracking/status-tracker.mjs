#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';
import {
  STATUS,
  detectStatus,
  formatStatus,
  calculateMetrics,
  printStatusLegend,
  printMetrics
} from './status-handler.mjs';
import { parseMemoryBank } from './memory-bank-parser.mjs';

// Constants
const PATHS = {
  implementation: 'docs/Implementation-Status.md',
  tasks: 'tasks.md',
  memoryBank: 'docs/cline_docs'
};

// Read markdown file with error handling
function readMarkdownFile(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    console.warn(`Warning: File not found: ${path}`);
    return '';
  }
}

// Update markdown content preserving structure
function updateMarkdownContent(content, statusMap) {
  const lines = content.split('\n');
  const updatedLines = [];
  let inSection = false;
  let inStatusLegend = false;

  lines.forEach(line => {
    // Handle section headers
    if (line.startsWith('#')) {
      inSection = true;
      if (line.toLowerCase().includes('status legend')) {
        inStatusLegend = true;
      } else {
        inStatusLegend = false;
      }
      updatedLines.push(line);
      return;
    }

    // Skip status legend section
    if (inStatusLegend) {
      updatedLines.push(line);
      return;
    }

    if (line.trim() && inSection) {
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

        const status = statusMap.get(key) || detectStatus(trimmed) || STATUS.NOT_STARTED;

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

// Print task status preserving sections
function printTaskStatus(content, showIncomplete = false) {
  const sections = parseSections(content);
  const allTasks = [];

  // Print sections
  sections.filter(section => section.title !== 'Status Legend').forEach(section => {
    console.log(chalk.bold(`\n${section.title}`));
    
    section.subsections.forEach(subsection => {
      console.log(chalk.bold(`\n${subsection.title}`));
      const tasks = parseMemoryBank(subsection.content.join('\n'));
      tasks.forEach((status, text) => {
        if (!showIncomplete || status !== STATUS.COMPLETED) {
          console.log(formatStatus(status, text));
        }
        allTasks.push({ text, status });
      });
    });

    const sectionTasks = parseMemoryBank(section.content.join('\n'));
    sectionTasks.forEach((status, text) => {
      if (!showIncomplete || status !== STATUS.COMPLETED) {
        console.log(formatStatus(status, text));
      }
      allTasks.push({ text, status });
    });
  });

  // Print status legend and metrics
  printStatusLegend();
  printMetrics(calculateMetrics(allTasks));
}

// Main execution
async function main() {
  try {
    // Get command line arguments
    const showIncomplete = process.argv.includes('--incomplete');
    
    // Extract status from Memory Bank
    const memoryBankTasks = parseMemoryBank(PATHS.memoryBank);
    
    // Read status files
    const implementation = readMarkdownFile(PATHS.implementation);
    const tasks = readMarkdownFile(PATHS.tasks);
    
    // Update status files
    const updatedImplementation = updateMarkdownContent(implementation, memoryBankTasks);
    const updatedTasks = updateMarkdownContent(tasks, memoryBankTasks);
    
    // Write updated files
    writeFileSync(PATHS.implementation, updatedImplementation);
    writeFileSync(PATHS.tasks, updatedTasks);

    // Display results
    console.log(chalk.bold('\nImplementation Status:'));
    printTaskStatus(updatedImplementation, showIncomplete);

    console.log(chalk.bold('\nProject Tasks:'));
    printTaskStatus(updatedTasks, showIncomplete);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Unhandled error:', error.message);
  process.exit(1);
});