#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';
import { 
  STATUS,
  STATUS_PRIORITY,
  normalizeText,
  detectStatus,
  shouldUpdateStatus
} from './status-handler.mjs';

// Memory Bank specific patterns
const PATTERNS = [
  // Match "- ✅ Feature name" format
  /^\s*-\s*(✅|⚠️|❌|✓|⚠|x)\s+(.+)$/,
  // Match "- Feature name: ✅" format
  /^\s*-\s*([^:]+):\s*(✅|⚠️|❌|✓|⚠|x)$/,
  // Match "Feature name: ✅" format
  /^\s*([^:]+):\s*(✅|⚠️|❌|✓|⚠|x)$/,
  // Match "- [ ] Feature name" format
  /^\s*-\s*\[([ x✓])\]\s*(.+)$/,
  // Match "- Feature name" format (default to not started)
  /^\s*-\s+(.+)$/
];

function processTask(text, taskMap, status = STATUS.NOT_STARTED) {
  // Skip empty lines and section markers
  if (!text.trim() || text.trim().startsWith('#')) {
    return;
  }

  const normalizedText = normalizeText(text);
  
  // Skip if text is empty or just status markers
  if (!normalizedText || Object.values(STATUS).includes(normalizedText)) {
    return;
  }

  // Check for in-progress indicators in text
  const detectedStatus = detectStatus(text);
  const finalStatus = STATUS_PRIORITY[status] > STATUS_PRIORITY[detectedStatus] ? 
    status : detectedStatus;

  const existing = taskMap.get(normalizedText);
  if (!existing || shouldUpdateStatus(finalStatus, existing)) {
    taskMap.set(normalizedText, finalStatus);
  }
}

// Helper function to process patterns
function processPatterns(line, taskMap) {
  for (const pattern of PATTERNS) {
    const match = line.match(pattern);
    if (match) {
      if (match.length === 2) {
        // Handle simple list item
        processTask(match[1], taskMap, STATUS.NOT_STARTED);
      } else {
        // Handle status + text
        const [status, text] = match[1].length === 1 ? 
          [match[1], match[2]] : 
          [match[2], match[1]];
        processTask(text, taskMap, status);
      }
      return true;
    }
  }
  return false;
}

// Helper function to handle status legend
function handleStatusLegend(line, inStatusLegend) {
  if (line.toLowerCase().includes('status legend')) {
    return true;
  }
  if (inStatusLegend && line.startsWith('#')) {
    return false;
  }
  return inStatusLegend;
}

function parseContent(content) {
  const lines = content.split('\n');
  const taskMap = new Map();
  let inStatusLegend = false;

  lines.forEach(line => {
    // Skip empty lines, headers, and code blocks
    if (!line.trim() || line.trim().startsWith('```')) {
      return;
    }

    // Handle status legend section
    inStatusLegend = handleStatusLegend(line, inStatusLegend);
    if (inStatusLegend) {
      return;
    }

    // Try to match patterns
    const matched = processPatterns(line, taskMap);

    // If no pattern matched, treat as plain text
    if (!matched && line.trim()) {
      processTask(line.trim(), taskMap, STATUS.NOT_STARTED);
    }
  });

  return taskMap;
}

export function parseMemoryBankFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    return parseContent(content);
  } catch (error) {
    console.warn(`Warning: Could not read Memory Bank file: ${filePath}`);
    console.warn(error.message);
    return new Map();
  }
}

export function parseMemoryBank(memoryBankPath) {
  const activeContextPath = join(memoryBankPath, 'activeContext.md');
  const progressPath = join(memoryBankPath, 'progress.md');
  
  // Parse both Memory Bank files
  const activeContextTasks = parseMemoryBankFile(activeContextPath);
  const progressTasks = parseMemoryBankFile(progressPath);
  
  // Combine tasks, keeping the highest priority status
  const combinedTasks = new Map();
  
  // Process tasks from both files
  for (const [key, status] of activeContextTasks) {
    combinedTasks.set(key, status);
  }
  
  for (const [key, status] of progressTasks) {
    const existing = combinedTasks.get(key);
    if (!existing || shouldUpdateStatus(status, existing)) {
      combinedTasks.set(key, status);
    }
  }
  
  return combinedTasks;
}