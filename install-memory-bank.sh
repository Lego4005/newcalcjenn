#!/bin/bash

# Enable debug output and error handling
set -ex

# Check if we're in a project directory
if [ ! -f "package.json" ] && [ ! -d ".git" ]; then
    echo "Error: This doesn't appear to be a project directory (no package.json or .git found)."
    echo "Please run this script in a project directory."
    exit 1
fi

# Set default npm install flags if not set
INSTALL_FLAGS=${INSTALL_FLAGS:-""}

echo "=========================================="
echo "Starting Memory Bank Installation"
echo "=========================================="

# Show current directory and files
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Create directories
echo -e "\nCreating directories..."
mkdir -p docs/cline_docs tracking .vscode
echo "✓ Directories created"

# Create tracking files
echo -e "\nCreating tracking files..."
cat > tracking/checklist-parser.mjs << 'EOL'
export function parseMarkdownChecklist(markdown) {
  const tasks = [];
  const lines = markdown.split('\n');

  // Define status mappings
  const STATUS_MAP = {
    '✅': '✅',
    '⚠️': '⚠️',
    '❌': '❌',
    'x': '✅',
    ' ': '❌'
  };

  // Define regex patterns
  const EMOJI_PATTERN = /^[#\s]*[-*]\s+(✅|⚠️|❌)\s+(.+)$/;
  const CHECKBOX_PATTERN = /^[#\s]*[-*]\s+\[([ x])\]\s+(.+)$/;

  for (const line of lines) {
    const emojiMatch = line.match(EMOJI_PATTERN);
    const checkboxMatch = line.match(CHECKBOX_PATTERN);
    const match = emojiMatch || checkboxMatch;

    if (match) {
      const statusKey = match[1];
      const text = match[2] || match[4];
      
      if (text) {
        const status = STATUS_MAP[statusKey] || '❌';
        tasks.push({ status, text });
      }
    }
  }

  return tasks;
}
EOL
echo "✓ Created checklist-parser.mjs"

cat > tracking/checklist-status.mjs << 'EOL'
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
EOL
echo "✓ Created checklist-status.mjs"

chmod +x tracking/*.mjs
echo "✓ Made tracking files executable"

# Create VS Code tasks
echo -e "\nCreating VS Code tasks..."
cat > .vscode/tasks.json << 'EOL'
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Check Project Status",
      "type": "shell",
      "command": "npm run status",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Show Incomplete Tasks",
      "type": "shell",
      "command": "npm run status:incomplete",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "Update Memory Bank",
      "type": "shell",
      "command": "npm run memory-bank",
      "presentation": {
        "reveal": "never"
      },
      "problemMatcher": []
    },
    {
      "label": "Memory Bank: Start Session",
      "type": "shell",
      "command": "code -r docs/cline_docs/{productContext,activeContext,systemPatterns,techContext,progress}.md docs/Implementation-Status.md tasks.md",
      "presentation": {
        "reveal": "never"
      },
      "problemMatcher": []
    }
  ]
}
EOL
echo "✓ Created VS Code tasks"

# Update package.json
echo -e "\nUpdating package.json..."
node -e '
const fs = require("fs");
const package = JSON.parse(fs.readFileSync("package.json"));

// Add type module
package.type = "module";

// Add scripts
package.scripts = {
    ...package.scripts,
    "status": "node tracking/checklist-status.mjs",
    "status:incomplete": "node tracking/checklist-status.mjs --incomplete",
    "memory-bank": "code docs/cline_docs/activeContext.md"
};

// Add dependencies
package.dependencies = {
    ...package.dependencies,
    "chalk": "^5.3.0"
};

// Write back to file
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'
echo "✓ Updated package.json"

# Install dependencies
echo -e "\nInstalling dependencies..."
npm install $INSTALL_FLAGS
echo "✓ Installed dependencies"

echo -e "\nMemory Bank system installed successfully!"
echo "=========================================="

echo "
Added components:
├── docs/                 # Documentation
│   ├── cline_docs/      # Memory Bank
│   │   ├── activeContext.md    # Current state
│   │   ├── productContext.md   # Project purpose
│   │   ├── systemPatterns.md   # Architecture
│   │   ├── techContext.md      # Tech setup
│   │   └── progress.md         # Progress tracking
│   └── Implementation-Status.md # Feature status
├── tracking/            # Status tracking
│   ├── checklist-parser.mjs
│   └── checklist-status.mjs
├── .vscode/            # VS Code integration
│   └── tasks.json      # Custom tasks
└── tasks.md            # Task tracking

Available commands:
- npm run status         # Check all tasks
- npm run status:incomplete # Show incomplete tasks
- npm run memory-bank    # Open Memory Bank

VS Code Tasks (Ctrl/Cmd + Shift + P, then 'Tasks: Run Task'):
- Check Project Status
- Show Incomplete Tasks
- Update Memory Bank
"