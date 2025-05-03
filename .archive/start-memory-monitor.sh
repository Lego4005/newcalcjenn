#!/bin/bash

# Define colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if monitor is already running
if [ -f "memory-bank/monitor-status.json" ]; then
  echo -e "${YELLOW}Memory bank monitor appears to be already running.${NC}"
  echo -e "Status file exists: memory-bank/monitor-status.json"
  
  # Show status info
  if [ -r "memory-bank/monitor-status.json" ]; then
    echo -e "${BLUE}Status information:${NC}"
    cat memory-bank/monitor-status.json
    echo
    
    # Check if process is still running
    PID=$(grep -oP '"pid": \K\d+' memory-bank/monitor-status.json)
    if [ -n "$PID" ] && ps -p $PID > /dev/null; then
      echo -e "${GREEN}✅ Monitor process is active (PID: $PID)${NC}"
      echo -e "When the AI assistant responds, it will show a ${GREEN}📡+${NC} indicator."
      exit 0
    else
      echo -e "${YELLOW}⚠️ Process not found but status file exists.${NC}"
      echo -e "Would you like to remove the stale status file and start a new monitor? (y/n)"
      read -n 1 -r
      echo
      if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Operation cancelled.${NC}"
        exit 1
      fi
      rm -f memory-bank/monitor-status.json
      echo -e "${GREEN}Removed stale status file.${NC}"
    fi
  fi
fi

# Start the monitor
echo -e "${BLUE}Starting memory bank monitor...${NC}"
# Use the correct path to update-monitor.sh, accounting for both possible structures
if [ -f "memory-bank/update-monitor.sh" ]; then
  MONITOR_SCRIPT="memory-bank/update-monitor.sh"
elif [ -f "memory-bank-system/update-monitor.sh" ]; then
  MONITOR_SCRIPT="memory-bank-system/update-monitor.sh"
else
  echo -e "${RED}Error: Cannot find update-monitor.sh${NC}"
  echo -e "Please ensure either memory-bank/update-monitor.sh or memory-bank-system/update-monitor.sh exists"
  exit 1
fi

nohup bash "$MONITOR_SCRIPT" $(pwd) > memory-bank/monitor.log 2>&1 &
MONITOR_PID=$!

# Verify it started
if ps -p $MONITOR_PID > /dev/null; then
  echo -e "${GREEN}✅ Memory bank monitor started successfully!${NC}"
  echo -e "Process ID: ${BLUE}$MONITOR_PID${NC}"
  echo -e "Log file: ${BLUE}memory-bank/monitor.log${NC}"
  echo -e "Status file: ${BLUE}memory-bank/monitor-status.json${NC}"
  echo -e "When the AI assistant responds, it will show a ${GREEN}📡+${NC} indicator."
else
  echo -e "${RED}❌ Failed to start memory bank monitor.${NC}"
  echo -e "Please check memory-bank/monitor.log for errors."
fi
