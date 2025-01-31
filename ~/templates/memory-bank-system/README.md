# Memory Bank System

A comprehensive project tracking and documentation system that helps maintain perfect context across development sessions.

## Quick Installation

1. Copy the installation script to your project:
```bash
cp ~/templates/memory-bank-system/scripts/install-memory-bank.sh .
chmod +x install-memory-bank.sh
./install-memory-bank.sh
```

## Features

### 1. Memory Bank Documentation
- Project purpose and goals (productContext.md)
- Current state and changes (activeContext.md)
- Architecture patterns (systemPatterns.md)
- Technical setup (techContext.md)
- Progress tracking (progress.md)

### 2. Status Tracking
- Implementation status tracking
- Task management
- Progress visualization
- Status statistics

### 3. VS Code Integration
Available tasks (Ctrl/Cmd + Shift + P, then "Tasks: Run Task"):
- Check Project Status
- Show Incomplete Tasks
- Update Memory Bank
- Memory Bank: Start Session

## File Structure

```
project/
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
│   └── checklist-status.js
├── .vscode/            # VS Code integration
│   └── tasks.json      # Custom tasks
└── tasks.md            # Task tracking
```

## Usage Guide

### Starting a Session

1. Run VS Code task "Memory Bank: Start Session"
2. Review all Memory Bank files
3. Check current status with `npm run status`
4. Plan work based on activeContext.md

### During Development

1. Make code changes
2. Update relevant documentation
3. Track progress with status emojis
4. Run `npm run status` to verify

### Ending a Session

1. Update activeContext.md with:
   - What was completed
   - Current state
   - Next steps
2. Update progress.md with new status
3. Update Implementation-Status.md
4. Commit all changes

## Available Commands

```bash
# Check all tasks
npm run status

# Show only incomplete tasks
npm run status:incomplete

# Open Memory Bank
npm run memory-bank
```

## Status Indicators

Use these emojis in markdown files to track status:
- ✅ Completed
- ⚠️ In Progress
- ❌ Not Started

## Best Practices

1. Documentation
   - Keep descriptions clear and concise
   - Use consistent formatting
   - Include code examples when relevant
   - Link to external resources when needed

2. Status Tracking
   - Use correct status emojis
   - Keep statuses up to date
   - Include brief descriptions
   - Group related items

3. Memory Bank Updates
   - Update after significant changes
   - Document technical decisions
   - Track progress regularly
   - Maintain clear context

## Contributing

Feel free to customize the templates and scripts for your needs. The system is designed to be flexible and adaptable to different project requirements.

## License

MIT License - feel free to use and modify for your projects.