#!/usr/bin/env python3
import os
import re
import glob

# Pattern to match double-path imports
pattern = re.compile(r"from '@/components/(atoms|molecules|organisms)/([^/]+)/[^']+")

def fix_imports_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace the pattern
        new_content = pattern.sub(r"from '@/components/\1/\2", content)
        
        if content != new_content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

# Find all .tsx and .ts files
files = []
for ext in ['*.tsx', '*.ts']:
    files.extend(glob.glob(f'**/{ext}', recursive=True))

# Fix imports
fixed_count = 0
for filepath in files:
    if fix_imports_in_file(filepath):
        fixed_count += 1
        print(f"Fixed: {os.path.basename(filepath)}")

print(f"\nTotal files fixed: {fixed_count}")