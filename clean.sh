#!/bin/bash

# Ensure a directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

TARGET_DIR="$1"

# Ensure the provided argument is a directory
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: '$TARGET_DIR' is not a directory."
  exit 1
fi

# Safety confirmation before running
echo "WARNING: This script will delete files in all subdirectories of: $TARGET_DIR"
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM
if [[ "$CONFIRM" != "yes" ]]; then
  echo "Operation canceled."
  exit 0
fi

# Loop through all subdirectories
find "$TARGET_DIR" -mindepth 1 -maxdepth 1 -type d | while read -r dir; do
  echo "Processing directory: $dir"

  # List files to be deleted
  find "$dir" -type f ! -name "README.md" ! -name "template.ts" ! -name "test-cases.ts" | while read -r file; do
    echo "Deleting: $file"
    rm "$file"
  done
done

echo "Cleanup complete."
