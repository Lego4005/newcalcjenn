# Cursor Performance Fix Guide

## Issue: Computer Hanging Due to State Database Bloat

Cursor (and other Electron-based editors) can experience severe performance issues due to bloated state database files. This guide provides a comprehensive solution and maintenance plan.

## Symptoms

- Computer hangs or freezes during Cursor usage
- High CPU and memory consumption
- Slow performance, especially after extended use
- Unresponsiveness when switching between files
- Cursor using more than 2-3GB of RAM

## Root Cause

The primary culprit is Cursor's SQLite database files:
- `state.vscdb` and `state.vscdb.backup` (normal size: 20-50MB)
- These files can grow to several hundred MB or even GB
- Located in `~/.config/Cursor/User/globalStorage/` (Linux/Mac) or `%APPDATA%\Cursor\User\globalStorage\` (Windows)

This issue is exacerbated by:
1. AI features (Copilot++, context caching)
2. Long coding sessions (15-20MB/minute memory growth)
3. Cross-process communication memory leaks
4. Inefficient garbage collection

## Solution: Step-by-Step Guide

### 1. Check Current State Files Size

```bash
# Linux/Mac
du -h ~/.config/Cursor/User/globalStorage/state.vscdb*

# Windows (PowerShell)
Get-ChildItem "$env:APPDATA\Cursor\User\globalStorage\state.vscdb*" | Select-Object Name, @{Name="Size(MB)";Expression={$_.Length / 1MB}}
```

If the files are larger than 100MB, proceed with the cleanup.

### 2. Close Cursor Completely

Ensure Cursor is fully closed before proceeding:

```bash
# Linux
pkill -f cursor

# Mac
pkill -f Cursor

# Windows (PowerShell)
Stop-Process -Name "Cursor" -Force -ErrorAction SilentlyContinue
```

### 3. Backup State Files (Optional but Recommended)

Create a backup of your current state files in case you need to restore them:

```bash
# Linux/Mac
mkdir -p ~/cursor-backup
cp ~/.config/Cursor/User/globalStorage/state.vscdb* ~/cursor-backup/

# Windows (PowerShell)
New-Item -ItemType Directory -Path "$HOME\cursor-backup" -Force
Copy-Item "$env:APPDATA\Cursor\User\globalStorage\state.vscdb*" -Destination "$HOME\cursor-backup\"
```

### 4. Delete Bloated State Files

Remove the problematic state database files:

```bash
# Linux/Mac
rm ~/.config/Cursor/User/globalStorage/state.vscdb*

# Windows (PowerShell)
Remove-Item "$env:APPDATA\Cursor\User\globalStorage\state.vscdb*"
```

### 5. Clear Additional Cache Files (Optional)

For a more thorough cleanup:

```bash
# Linux/Mac
rm -rf ~/.config/Cursor/Cache/*
rm -rf ~/.config/Cursor/CachedData/*

# Windows (PowerShell)
Remove-Item "$env:APPDATA\Cursor\Cache\*" -Recurse -Force
Remove-Item "$env:APPDATA\Cursor\CachedData\*" -Recurse -Force
```

### 6. Restart Cursor

Start Cursor normally. It will automatically create new, optimized state files.

**Note:** Cursor will retain your projects, installed extensions, and most settings, but you may need to reconfigure some workspace-specific settings.

## What You'll Keep After Cleanup

- Installed extensions
- User settings (global)
- Themes and preferences
- Git credentials
- Project history

## What You Might Need to Reconfigure

- Open editors/tabs
- Workspace-specific settings
- Last cursor positions
- Terminal history
- Debug configurations

## Preventing Future Issues

### Opt 1: Regular Maintenance Schedule

Set up a monthly maintenance routine:

1. Check state file sizes regularly:
   ```bash
   # Linux/Mac
   du -h ~/.config/Cursor/User/globalStorage/state.vscdb*

   # Windows (PowerShell)
   Get-ChildItem "$env:APPDATA\Cursor\User\globalStorage\state.vscdb*" | Select-Object Name, @{Name="Size(MB)";Expression={$_.Length / 1MB}}
   ```

2. If files exceed 100MB, perform the cleanup procedure.

3. Create a calendar reminder for the first day of each month.

### Opt 2: Automated Maintenance Script

For Linux/Mac users, create an automated maintenance script:

1. Create a file named `cursor-maintenance.sh`:

```bash
#!/bin/bash

# Path to state files
STATE_FILES=~/.config/Cursor/User/globalStorage/state.vscdb*

# Check if any of the files are larger than 100MB
for file in $STATE_FILES; do
  if [ -f "$file" ]; then
    size=$(du -m "$file" | cut -f1)
    if [ $size -gt 100 ]; then
      echo "WARNING: $file is ${size}MB, which exceeds the recommended limit."
      echo "Consider running the cleanup procedure."
      exit 1
    fi
  fi
done

echo "All Cursor state files are within acceptable size limits."
exit 0
```

2. Make it executable:
```bash
chmod +x cursor-maintenance.sh
```

3. Add it to your crontab to run weekly:
```bash
crontab -e
```

Add this line:
```
0 9 * * 1 ~/cursor-maintenance.sh | mail -s "Cursor Maintenance Check" your_email@example.com
```

### Opt 3: Performance Optimizations

1. **Limit AI Features Usage**:
   - Disable Copilot++ temporarily when not needed (reduces memory by ~35%)
   - Limit real-time suggestions to specific projects

2. **Optimize Workflow**:
   - Restart Cursor every few hours during intensive work
   - Close Cursor when switching to other memory-intensive applications
   - Limit the number of projects open simultaneously

3. **Start with Memory Limits**:
   Create a startup script that launches Cursor with memory limits:

   ```bash
   # Linux/Mac
   cursor --max-memory=4096

   # Windows (create a shortcut with)
   "C:\Program Files\Cursor\Cursor.exe" --max-memory=4096
   ```

## Restoring from Backup (If Needed)

If you experience issues after cleanup and need to restore your previous state:

```bash
# Linux/Mac
cp ~/cursor-backup/state.vscdb* ~/.config/Cursor/User/globalStorage/

# Windows (PowerShell)
Copy-Item "$HOME\cursor-backup\state.vscdb*" -Destination "$env:APPDATA\Cursor\User\globalStorage\"
```

**Warning:** Only restore if absolutely necessary, as this will bring back the performance issues.

## Monitoring Performance

Check Cursor's resource usage:

```bash
# Linux
top -c | grep -i cursor

# Mac
top -stats pid,command,mem,cpu -o mem | grep -i Cursor

# Windows (PowerShell)
Get-Process Cursor | Select-Object CPU, WorkingSet, Id, ProcessName
```

## References

1. VS Code Issue #87172: "Storage bloat causing memory issues"
2. VS Code Issue #97299: "Performance: Large SQLite DB files"
3. Electron Issue #20396: "Memory leaks in large workspace state"
4. VS Code Issue #142589: "Clean up localStorage to avoid growing .vscdb files"

---

*Last updated: May 3, 2025*
