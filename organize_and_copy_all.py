import os
import shutil

source_dir = "/Users/tjarkschool/Desktop/continued work/sorted papers/website_compressed/past_papers"
dest_root = "/Users/tjarkschool/Desktop/continued work/ibdp-guide/public/pastpapers"

def get_prefix(filename):
    # Assuming format "131-01..." -> "131"
    parts = filename.split('-')
    if parts and len(parts[0]) == 3 and parts[0].isdigit():
        return parts[0]
    return "misc"

def ensure_folder(path):
    if not os.path.exists(path):
        os.makedirs(path)

print("Starting reorganization and copy process...")

# Phase 1: Organize existing local files (the ones currently in root)
print("Phase 1: Moving existing root files to subdirectories...")
try:
    local_files = [f for f in os.listdir(dest_root) if os.path.isfile(os.path.join(dest_root, f))]
except FileNotFoundError:
    print("Destination root not found.")
    local_files = []

for filename in local_files:
    if filename == "papers_data.json" or filename.startswith("."):
        continue
        
    prefix = get_prefix(filename)
    target_folder = os.path.join(dest_root, prefix)
    ensure_folder(target_folder)
    
    src_path = os.path.join(dest_root, filename)
    dst_path = os.path.join(target_folder, filename)
    
    # Move file
    shutil.move(src_path, dst_path)

print("Phase 1 complete.")

# Phase 2: Copy ALL files from source, putting them into subdirectories
print("Phase 2: Copying remaining files from source...")
try:
    source_files = [f for f in os.listdir(source_dir) if f.lower().endswith('.pdf')]
except FileNotFoundError:
    print(f"Source directory not found: {source_dir}")
    exit(1)

count_new = 0
count_existing = 0
skipped_large = 0

for filename in source_files:
    prefix = get_prefix(filename)
    target_folder = os.path.join(dest_root, prefix)
    ensure_folder(target_folder)
    
    dest_path = os.path.join(target_folder, filename)
    
    # Check if exists
    if os.path.exists(dest_path):
        count_existing += 1
        continue
        
    src_path = os.path.join(source_dir, filename)
    
    # Check size
    size_mb = os.path.getsize(src_path) / (1024 * 1024)
    if size_mb > 95:
        print(f"Skipping Large File: {filename} ({size_mb:.2f} MB)")
        skipped_large += 1
        continue
        
    # Copy
    shutil.copy2(src_path, dest_path)
    count_new += 1
    if count_new % 500 == 0:
        print(f"Copied {count_new} new files...")

print(f"Phase 2 complete.")
print(f"Summary:")
print(f"  - Existing files checked: {count_existing}")
print(f"  - New files copied: {count_new}")
print(f"  - Large files skipped: {skipped_large}")
