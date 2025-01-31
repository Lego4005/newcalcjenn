#!/usr/bin/env node

// Parse markdown checklist items with status emojis
export function parseMarkdownChecklist(markdown) {
  const tasks = new Map(); // Use Map to handle duplicates better
  const lines = markdown.split('\n');
  
  // Status emoji mapping with priorities
  const STATUS = {
    '✅': { symbol: '✅', priority: 3 },
    '⚠️': { symbol: '⚠️', priority: 2 },
    '⚠': { symbol: '⚠️', priority: 2 },
    '❌': { symbol: '❌', priority: 1 },
    '✓': { symbol: '✅', priority: 3 },
    'x': { symbol: '❌', priority: 1 },
    '-': { symbol: '❌', priority: 1 },
    ' ': { symbol: '❌', priority: 1 } // For empty checkboxes
  };

  // Memory Bank specific patterns
  const patterns = [
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

  // Common word variations to normalize
  const wordMappings = {
    'migration': ['migrate', 'migrating'],
    'implementation': ['implement', 'implementing'],
    'development': ['develop', 'developing'],
    'enhancement': ['enhance', 'enhancing'],
    'completion': ['complete', 'completing'],
    'configuration': ['configure', 'configuring'],
    'optimization': ['optimize', 'optimizing'],
    'documentation': ['document', 'documenting']
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

  function normalizeStatus(status) {
    return STATUS[status]?.symbol || '❌';
  }

  function getStatusPriority(status) {
    return STATUS[status]?.priority || 1;
  }

  function normalizeText(text) {
    let normalized = text.trim()
      .replace(/^\s*-\s*/, '')  // Remove leading dash
      .replace(/\s*\([^)]*\)\s*$/, '')  // Remove trailing parentheses
      .replace(/\s+/g, ' ')  // Normalize whitespace
      .replace(/\s*in progress\s*/i, '')  // Remove "in progress"
      .toLowerCase(); // Normalize case

    // Apply word mappings
    Object.entries(wordMappings).forEach(([base, variations]) => {
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

  function shouldUpdateStatus(newStatus, existingStatus) {
    const newPriority = getStatusPriority(newStatus);
    const existingPriority = getStatusPriority(existingStatus);
    return newPriority > existingPriority;
  }

  function processTask(text, status = '❌') {
    // Skip empty lines and section markers
    if (!text.trim() || text.trim().startsWith('#')) {
      return;
    }

    // Check for in-progress indicators in text first
    if (IN_PROGRESS_INDICATORS.some(indicator => text.toLowerCase().includes(indicator))) {
      status = '⚠️';
    }

    // Also check for verbs indicating work in progress
    if (text.match(/^(implementing|updating|enhancing|fixing)/i)) {
      status = '⚠️';
    }

    const normalizedText = normalizeText(text);
    
    // Skip if text is empty or just status markers
    if (!normalizedText || Object.keys(STATUS).includes(normalizedText)) {
      return;
    }

    const normalizedStatus = normalizeStatus(status);
    const existing = tasks.get(normalizedText);

    if (!existing) {
      tasks.set(normalizedText, {
        text: text.trim(), // Keep original case
        status: normalizedStatus
      });
    } else if (shouldUpdateStatus(status, existing.status)) {
      tasks.set(normalizedText, {
        text: existing.text, // Keep existing text to maintain case
        status: normalizedStatus
      });
    }
  }

  let inStatusLegend = false;
  lines.forEach(line => {
    // Skip empty lines, headers, and code blocks
    if (!line.trim() || line.trim().startsWith('```')) {
      return;
    }

    // Check for status legend section
    if (line.toLowerCase().includes('status legend')) {
      inStatusLegend = true;
      return;
    }

    // Skip status legend entries
    if (inStatusLegend) {
      if (line.startsWith('#')) {
        inStatusLegend = false;
      } else {
        return;
      }
    }

    // Try each pattern
    let matched = false;
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        matched = true;
        if (match.length === 2) {
          // Handle simple list item
          processTask(match[1]);
        } else {
          // Handle status + text
          const [status, text] = match[1].length === 1 ? 
            [match[1], match[2]] : 
            [match[2], match[1]];
          processTask(text, status);
        }
        break;
      }
    }

    // If no pattern matched, treat as plain text
    if (!matched && line.trim()) {
      processTask(line.trim());
    }
  });

  return Array.from(tasks.values());
}

// If run directly, test the parser
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const testMarkdown = `
# Test Checklist

## Section 1
- ✅ Completed task
- ⚠️ Task in progress
- ❌ Not started task

## Section 2
- Task 1: ✅
- Task 2: ⚠️
- Task 3: ❌

## Memory Bank Format
- ✅ Feature implemented
Feature in progress: ⚠️
Not started feature: ❌

## Variations
- ⚠️ Implementing feature
- ⚠️ Feature implementation
- ⚠️ Complete feature
- ⚠️ Feature completion

## Plain Text
- Working on this feature
- In progress task
- Just a regular task

## Status Legend
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started
`;

  console.log('Parsed tasks:', parseMarkdownChecklist(testMarkdown));
}
