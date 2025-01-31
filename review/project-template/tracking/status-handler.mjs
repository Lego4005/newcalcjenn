#!/usr/bin/env node

// Core status definitions
export const STATUS = {
  COMPLETED: '✅',
  IN_PROGRESS: '⚠️',
  NOT_STARTED: '❌'
};

export const STATUS_PRIORITY = {
  [STATUS.COMPLETED]: 3,
  [STATUS.IN_PROGRESS]: 2,
  [STATUS.NOT_STARTED]: 1
};

export const STATUS_COLORS = {
  [STATUS.COMPLETED]: '\x1b[32m', // green
  [STATUS.IN_PROGRESS]: '\x1b[33m', // yellow
  [STATUS.NOT_STARTED]: '\x1b[31m', // red
  RESET: '\x1b[0m'
};

// Status indicators in text
export const IN_PROGRESS_INDICATORS = [
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

// Common word variations to normalize
export const WORD_MAPPINGS = {
  'migration': ['migrate', 'migrating'],
  'implementation': ['implement', 'implementing'],
  'development': ['develop', 'developing'],
  'enhancement': ['enhance', 'enhancing'],
  'completion': ['complete', 'completing'],
  'configuration': ['configure', 'configuring'],
  'optimization': ['optimize', 'optimizing'],
  'documentation': ['document', 'documenting']
};

// Status detection utilities
export function normalizeText(text) {
  let normalized = text.trim()
    .replace(/^\s*-\s*/, '')  // Remove leading dash
    .replace(/\s*\([^)]*\)\s*$/, '')  // Remove trailing parentheses
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/\s*in progress\s*/i, '')  // Remove "in progress"
    .toLowerCase(); // Normalize case

  // Apply word mappings
  Object.entries(WORD_MAPPINGS).forEach(([base, variations]) => {
    variations.forEach(variant => {
      const regex = new RegExp(`\\b${variant}\\b`, 'g');
      normalized = normalized.replace(regex, base);
    });
  });

  // Remove common prefixes
  normalized = normalized
    .replace(/^(complete|add|implement|update|enhance)\s+/, '')
    .replace(/\s+(system|functionality|feature|tool)$/, '');

  return normalized;
}

export function detectStatus(text) {
  // Check for explicit status markers
  if (text.includes('✅') || text.includes('✓') || text.toLowerCase().includes('complete')) {
    return STATUS.COMPLETED;
  }
  if (text.includes('⚠️') || text.includes('⚠')) {
    return STATUS.IN_PROGRESS;
  }
  if (text.includes('❌') || text.includes('x')) {
    return STATUS.NOT_STARTED;
  }

  // Check for in-progress indicators
  const lowerText = text.toLowerCase();
  if (IN_PROGRESS_INDICATORS.some(indicator => lowerText.includes(indicator)) ||
      text.match(/^(implementing|updating|enhancing|fixing)/i)) {
    return STATUS.IN_PROGRESS;
  }

  // Default to not started
  return STATUS.NOT_STARTED;
}

export function formatStatus(status, text) {
  const color = STATUS_COLORS[status];
  return `${color}${status}${STATUS_COLORS.RESET} ${text}`;
}

export function shouldUpdateStatus(newStatus, existingStatus) {
  return STATUS_PRIORITY[newStatus] > STATUS_PRIORITY[existingStatus];
}

// Status summary utilities
export function calculateMetrics(tasks) {
  return tasks.reduce((metrics, task) => {
    metrics.total++;
    if (task.status === STATUS.COMPLETED) metrics.completed++;
    else if (task.status === STATUS.IN_PROGRESS) metrics.inProgress++;
    else if (task.status === STATUS.NOT_STARTED) metrics.notStarted++;
    return metrics;
  }, { total: 0, completed: 0, inProgress: 0, notStarted: 0 });
}

export function formatPercentage(value, total) {
  return Math.round((value / total) * 100);
}

export function printStatusLegend() {
  console.log('\nStatus Legend');
  console.log(formatStatus(STATUS.COMPLETED, 'Completed'));
  console.log(formatStatus(STATUS.IN_PROGRESS, 'In Progress'));
  console.log(formatStatus(STATUS.NOT_STARTED, 'Not Started'));
}

export function printMetrics(metrics) {
  console.log('\nSummary:');
  console.log(formatStatus(STATUS.COMPLETED, 
    `Completed: ${metrics.completed}/${metrics.total} (${formatPercentage(metrics.completed, metrics.total)}%)`));
  console.log(formatStatus(STATUS.IN_PROGRESS,
    `In Progress: ${metrics.inProgress}/${metrics.total} (${formatPercentage(metrics.inProgress, metrics.total)}%)`));
  console.log(formatStatus(STATUS.NOT_STARTED,
    `Not Started: ${metrics.notStarted}/${metrics.total} (${formatPercentage(metrics.notStarted, metrics.total)}%)`));
}