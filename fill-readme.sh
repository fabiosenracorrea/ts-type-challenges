#!/bin/bash

# Function to append template content to README.md
process_template() {
  TEMPLATE_FILE="$1/template.ts"
  README_FILE="$1/README.md"

  # Check if template.ts exists in the directory
  if [ -f "$TEMPLATE_FILE" ]; then
    echo "Appending contents of $TEMPLATE_FILE to $README_FILE"

    # Ensure README.md exists, create if necessary
    if [ ! -f "$README_FILE" ]; then
      echo "# Template Output" > "$README_FILE"
    fi

    # Append formatted content to README.md
    {
      echo -e " "
      echo -e " "
      echo -e "### Solution"
      echo -e " "
      echo -e " "
      echo '```ts'
      cat "$TEMPLATE_FILE"
      echo '```'
    } >> "$README_FILE"
  else
    echo "No template.ts found in $1, skipping."
  fi
}

# Check if user provided arguments
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 [-f path-list.txt] <directory> [<directory> ...]"
  exit 1
fi

# If using a file to provide paths
if [ "$1" == "-f" ]; then
  if [ -z "$2" ] || [ ! -f "$2" ]; then
    echo "Error: Path list file not provided or does not exist."
    exit 1
  fi

  while IFS= read -r line; do
    process_template "$line"
  done < "$2"
else
  # Process paths provided as arguments
  for dir in "$@"; do
    process_template "$dir"
  done
fi

echo "Processing complete."
