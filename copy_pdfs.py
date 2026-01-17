import os
import shutil
import math

source_dir = "/Users/tjarkschool/Desktop/continued work/sorted papers/website_compressed/past_papers"
# dest_dir is relative to where we run the script, which will be the root of ibdp-guide
dest_dir = "/Users/tjarkschool/Desktop/continued work/ibdp-guide/public/pastpapers"

# Ensure destination exists
os.makedirs(dest_dir, exist_ok=True)

# List all PDF files
try:
    files = [f for f in os.listdir(source_dir) if f.lower().endswith('.pdf')]
except FileNotFoundError:
    print(f"Source directory not found: {source_dir}")
    exit(1)

files.sort() # Sort to ensure deterministic order

total_files = len(files)
print(f"Total PDF files found: {total_files}")

if total_files == 0:
    print("No PDFs found!")
    exit(1)

# Calculate 1/3
limit = math.ceil(total_files / 3)
files_to_copy = files[:limit]
print(f"Copying {len(files_to_copy)} files (approx 1/3)...")

copied_count = 0
skipped_large = 0

for filename in files_to_copy:
    src = os.path.join(source_dir, filename)
    dst = os.path.join(dest_dir, filename)
    
    # Check if already exists to save time? 
    # User asked to "push", implying they might not be there or we need to ensure they are there.
    # We will overwrite to be safe.
    
    # Check size < 100MB
    size_bytes = os.path.getsize(src)
    size_mb = size_bytes / (1024 * 1024)
    
    if size_mb > 95: # Safety margin
        print(f"Skipping {filename} (Size: {size_mb:.2f} MB)")
        skipped_large += 1
        continue
        
    shutil.copy2(src, dst)
    copied_count += 1
    if copied_count % 100 == 0:
        print(f"Copied {copied_count} files...")

print(f"Finished. Copied {copied_count} files. Skipped {skipped_large} large files.")
