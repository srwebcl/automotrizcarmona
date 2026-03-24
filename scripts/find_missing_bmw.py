import os
import re
import json

BASE_PATH = "public/images/bmw"
folders = sorted([d for d in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, d))])

with open("lib/models/bmw.ts", "r") as f:
    content = f.read()
    start = content.find("[")
    end = content.rfind("]") + 1
    # Remove any unwanted chars before/after if needed
    json_text = content[start:end]
    models = json.loads(json_text)

registered_folders = set()
for m in models:
    # m['image'] is like "/images/bmw/SERIE 1/MIN-SERIE1.png"
    parts = m['image'].split('/')
    if len(parts) >= 4:
        registered_folders.add(parts[3])

print(f"Total Folders: {len(folders)}")
print(f"Registered in TS: {len(registered_folders)}")
missing = [f for f in folders if f not in registered_folders]
print(f"Missing Folders ({len(missing)}):")
for f in missing:
    print(f" - {f}")
