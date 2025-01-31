#!/bin/bash

# Enable debug output
set -x

echo "[DEBUG] Script starting" >&2
echo "[DEBUG] Current shell: $SHELL" >&2
echo "[DEBUG] Current directory: $(pwd)" >&2

# Print a separator for visibility
echo "=========================================="
echo "Starting Memory Bank Installation"
echo "=========================================="

# Show current directory and files
echo "[DEBUG] About to show directory contents" >&2
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Create directories
echo "[DEBUG] About to create directories" >&2
echo -e "\nCreating directories..."
mkdir -p docs/cline_docs tracking .vscode
echo "[DEBUG] Directories created" >&2

# Show created directories
echo "[DEBUG] About to verify directories" >&2
echo -e "\nVerifying directories:"
ls -la
echo "[DEBUG] Directory verification complete" >&2

echo -e "\nInstallation complete!"
echo "=========================================="
echo "[DEBUG] Script complete" >&2
