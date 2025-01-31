# VS Code Automation Guide

## Quick Reference

### VS Code Tasks (Ctrl/Cmd + Shift + P, then "Tasks: Run Task")

- `Check Project Status`: View all task statuses
- `Show Incomplete Tasks`: View only incomplete tasks
- `Update Memory Bank`: Reminder to update project documentation
- `Format All Files`: Run Prettier on all files
- `Initialize New Project`: Create new project structure

### Status Indicators

- ✅ Completed task
- ⚠️ In progress
- ❌ Not started

## Available Tools

### 1. Status Tracking

```bash
# View all tasks
node tracking/checklist-status.js

# View only incomplete tasks
node tracking/checklist-status.js --incomplete

# Specify custom docs path
node tracking/checklist-status.js --docs-path=/path/to/docs
```

### 2. Memory Bank

Located in `docs/cline_docs/`:

- `productContext.md`: Project purpose and goals
- `activeContext.md`: Current state and changes
- `systemPatterns.md`: Architecture patterns
- `techContext.md`: Technical setup
- `progress.md`: Build progress

### 3. VS Code Settings

`.vscode/settings.json` includes:

- Format on save
- Code actions on save
- Git integration
- Editor preferences
- Language-specific settings

## Code Actions

### JavaScript/TypeScript

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.prettier": true,
    "source.organizeImports": true
  }
}
```

### Formatting

- Auto-format on save enabled
- Prettier as default formatter
- 80/100 character rulers
- 2-space indentation
- Trailing whitespace removal
- Final newline insertion

## Best Practices

### 1. Task Management

- Keep tasks.md updated with current status
- Use appropriate status emojis
- Organize tasks by priority
- Include clear descriptions

### 2. Memory Bank Usage

- Update after significant changes
- Document technical decisions
- Track progress regularly
- Maintain clear context

### 3. Code Organization

- Follow consistent formatting
- Use auto-imports
- Keep documentation current
- Commit regularly

## Keyboard Shortcuts

### Task Running

- Open Command Palette: `Ctrl/Cmd + Shift + P`
- Run Task: Type "Tasks: Run Task"
- Quick Open: `Ctrl/Cmd + P`

### Code Actions

- Format Document: `Shift + Alt + F`
- Organize Imports: `Shift + Alt + O`
- Command Palette: `Ctrl/Cmd + Shift + P`

## Customization

### Adding New Tasks

Edit `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Task Name",
      "type": "shell",
      "command": "your-command-here",
      "problemMatcher": []
    }
  ]
}
```

### Modifying Settings

Edit `.vscode/settings.json`:

```json
{
  "setting.name": "value",
  "category.setting": {
    "specific.option": true
  }
}
```

## Troubleshooting

### Common Issues

1. Status tracking not working

   - Ensure Node.js is installed
   - Check file permissions
   - Verify file paths

2. VS Code tasks not appearing

   - Reload VS Code window
   - Check task configuration
   - Verify file locations

3. Memory Bank issues
   - Confirm directory structure
   - Check file permissions
   - Validate markdown syntax

### Getting Help

1. Check documentation in:

   - README.md
   - docs/VSCode-Automation-Guide.md
   - Individual tool documentation

2. Use VS Code's:
   - Command Palette help
   - Extension documentation
   - Settings UI

## Version History

### v1.0.0

- Initial automation setup
- Basic task tracking
- Memory Bank integration
- VS Code tasks and settings
