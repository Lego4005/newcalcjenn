# Memory Bank Commands

## Quick Commands (Aliases)

### Terminal Commands
```bash
mb   # Open Memory Bank documentation (activeContext.md)
mbs  # Show full status with all tasks and progress
mbi  # Show incomplete tasks only
mbv  # View all Memory Bank files in VS Code
```

### VS Code Tasks
Press `Ctrl/Cmd + Shift + P`, type "Tasks: Run Task", then choose:
- `Check Project Status` - Show all tasks
- `Show Incomplete Tasks` - Show remaining work
- `Update Memory Bank` - Open documentation
- `Memory Bank: Start Session` - Open all docs

## NPM Scripts
```bash
# Show all tasks and progress
npm run status

# Show only incomplete tasks
npm run status:incomplete

# Open Memory Bank documentation
npm run memory-bank
```

## Documentation Files

### Core Documentation
- `activeContext.md` - Current state and recent changes
- `productContext.md` - Project purpose and goals
- `systemPatterns.md` - Architecture and patterns
- `techContext.md` - Technical setup and details
- `progress.md` - Progress tracking and metrics

### Status Files
- `Implementation-Status.md` - Feature implementation status
- `tasks.md` - Project tasks and progress

## Status Indicators
- ✅ Completed
- ⚠️ In Progress/Blocked
- ❌ Not Started

## Installation
To install Memory Bank in another project:
```bash
cd /path/to/your/project
~/templates/memory-bank-system/install.sh .
```

## Tips
1. Start your day with `mbs` to check project status
2. Use `mbi` to focus on incomplete tasks
3. Update `activeContext.md` when making changes
4. Run status check after major updates
5. Keep documentation current for team sync