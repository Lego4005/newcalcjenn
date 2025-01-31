#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Initializing new project...${NC}"

# Install dependencies
echo -e "\n${BLUE}Installing dependencies...${NC}"
npm install

# Set up Supabase if needed
if [ -f "scripts/setup-supabase.sh" ]; then
  echo -e "\n${BLUE}Setting up Supabase...${NC}"
  bash scripts/setup-supabase.sh
fi

# Set up status tracking
echo -e "\n${BLUE}Setting up status tracking system...${NC}"
node scripts/setup-tracking.mjs

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
  echo -e "\n${BLUE}Initializing git repository...${NC}"
  git init
  git add .
  git commit -m "Initial commit"
fi

echo -e "\n${GREEN}Project initialization complete!${NC}"
echo -e "\nAvailable commands:"
echo -e "  npm run dev          - Start development server"
echo -e "  npm run status       - Show project status"
echo -e "  npm run status:incomplete - Show incomplete items"
