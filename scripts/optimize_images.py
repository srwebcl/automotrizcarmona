import os
import subprocess
from pathlib import Path

def optimize_images(directory):
    count = 0
    total_reduction = 0
    
    # Supported extensions
    extensions = ['.jpg', '.jpeg', '.png', '.webp']
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            path = Path(root) / file
            if path.suffix.lower() in extensions:
                try:
                    # Get original size
                    original_size = path.stat().st_size
                    
                    # Skip if already small (less than 500KB)
                    if original_size < 500 * 1024:
                        continue
                    
                    print(f"Optimizing: {path} ({original_size / 1024:.1f} KB)")
                    
                    # Use ImageMagick to resize and optimize in-place
                    # -resize "1920x1080>" means resize only if larger than 1920x1080
                    # -quality 80 for reasonable compression
                    subprocess.run([
                        "magick", str(path),
                        "-resize", "1920x1080>",
                        "-quality", "80",
                        str(path)
                    ], check=True)
                    
                    new_size = path.stat().st_size
                    reduction = original_size - new_size
                    total_reduction += reduction
                    count += 1
                    
                    print(f"  New size: {new_size / 1024:.1f} KB (Reduced {reduction / 1024:.1f} KB)")
                    
                except Exception as e:
                    print(f"  Error optimizing {path}: {e}")

    print(f"\nTotal images optimized: {count}")
    print(f"Total space saved: {total_reduction / (1024*1024):.1f} MB")

if __name__ == "__main__":
    optimize_images("public/images")
