#!/bin/bash

# Check if we're in a project directory
if [ ! -f "package.json" ]; then
    echo "Error: No package.json found. Please run this script in a project directory."
    exit 1
fi

TEMPLATE_DIR="/home/iris/templates/project-template"
MEMORY_BANK_FILES="docs tracking tasks.md"

# Step 1: Copy Memory Bank files
echo "Adding Memory Bank system..."
for item in $MEMORY_BANK_FILES; do
    cp -r "$TEMPLATE_DIR/$item" .
done

# Step 2: Update package.json to include status scripts using Node.js
node -e '
const fs = require("fs");
const package = JSON.parse(fs.readFileSync("package.json"));
package.scripts = {
    ...package.scripts,
    "status": "node tracking/checklist-status.js",
    "status:incomplete": "node tracking/checklist-status.js --incomplete"
};
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));
'

# Step 3: Add to git if git is initialized
if [ -d ".git" ]; then
    git add .
    git commit -m "Add Memory Bank system to project"
fi

echo "
✅ Memory Bank system added successfully!

Added components:
├── docs/                 # Documentation
│   ├── cline_docs/      # Memory Bank
│   └── *.md             # Project docs
└── tracking/            # Status tracking

Next steps:
1. Edit docs/cline_docs/projectbrief.md with your project requirements
2. Use available commands:
   - npm run status      # Check all tasks
   - npm run status:incomplete # Show incomplete tasks
"
