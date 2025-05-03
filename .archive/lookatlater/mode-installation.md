# Iris Mode Installation Guide

## Overview
This guide explains how to install the new Iris modes for Requirements Engineer (RE), Product Owner (PO), and Developer (Dev) roles.

## Global Settings Configuration

### System Settings
```bash
# Browser Configuration
viewport: 1280x800
screenshotQuality: 47
autoApprove: true

# API Settings
autoRetry: true
retryDelay: 5s
rateLimit: 2s

# System Limits
terminal: 5000 lines
openTabs: 500 files

# Performance
writeDelay: enabled
matchPrecision: 100%
```

### Auto-Approved Commands
```bash
# Development
npm test
npm install
npm run dev/build/start
tsc
node

# Git Operations
git log
git diff
git show

# System Commands
lsof
cd
pwd
cp
echo
```

### Experimental Features
```bash
# Active Features
unifiedDiffStrategy: true
checkpoints: true
searchAndReplace: true
insertContent: true
```

## Installation Steps

1. Copy Configuration Files
```bash
# Copy clinerules files to project root
cp .clinerules* /path/to/your/project/

# Copy custom modes configuration
cp custom_modes.json /path/to/your/project/
```

2. Configure Iris
- Open Iris settings
- Click the + button in Modes section
- For each mode in custom_modes.json:
  1. Name: Use name from config
  2. Slug: Use slug from config
  3. Role Definition: Copy roleDefinition
  4. Select Tools: Check tools listed in availableTools
  5. Custom Instructions: Copy customInstructions
  6. Click "Create Mode"

3. Verify Installation
- Check each new mode appears in Iris mode list
- Verify .clinerules files are loaded
- Test role switching commands:
  * "Switch to RE role"
  * "Switch to PO role"
  * "Switch to Dev role"

## Mode Details

### Requirements Engineer (RE)
- Purpose: Requirements and scope management
- Tools: Read Files, Browser, MCP
- Key Files: requirements/, constraints/, scope/
- Switch Command: "Switch to RE role"

### Product Owner (PO)
- Purpose: Pattern approval and decisions
- Tools: Read Files, Browser, MCP
- Key Files: patterns/, decisions/, direction/
- Switch Command: "Switch to PO role"

### Developer (Dev)
- Purpose: Implementation and basic debugging
- Tools: All development tools
- Key Files: implementation/, guides/, integration/
- Switch Command: "Switch to Dev role"

## Usage Notes

1. Role Switching
```
# Explicit switching
"Switch to [role] role"

# With mode combination
"Plan as [role]"
"Code as [role]"
```

2. File Access
- Each role has specific write access
- All roles have read access
- Follow role boundaries

3. Documentation
- Use role-specific directories
- Follow documentation standards
- Maintain memory bank integrity

## Troubleshooting

1. Mode Not Appearing
- Verify custom_modes.json copied correctly
- Check mode creation steps
- Restart Iris

2. Tools Not Available
- Check availableTools in config
- Verify tool permissions
- Review role restrictions

3. Role Switching Issues
- Verify clinerules files present
- Check role definitions
- Review switching commands

## Change Log 📝
- [Timestamp]: [Change description]
- [Timestamp]: [Change description]
