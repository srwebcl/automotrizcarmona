import os
import re
import json

MODELS_DIR = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models"

def normalize_file(file_path):
    if not file_path.endswith('.ts') or 'index.ts' in file_path or 'types.ts' in file_path:
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the JSON-like array. It starts after 'export const BRAND_MODELS: Vehicle[] = '
    # We use regex to find where the array starts and ends.
    match = re.search(r"export const \w+: Vehicle\[\] = (\[.*\]);", content, re.DOTALL)
    if not match:
        return

    json_str = match.group(1)
    try:
        models = json.loads(json_str)
    except json.JSONDecodeError:
        print(f"Error decoding JSON in {file_path}")
        return

    updated = False
    for model in models:
        versions = model.get('versions', [])
        if versions:
            # Find minimum bonusPrice
            bonus_prices = [v.get('bonusPrice', 0) for v in versions if v.get('bonusPrice', 0) > 0]
            if bonus_prices:
                min_price = min(bonus_prices)
                if model.get('price') != min_price:
                    model['price'] = min_price
                    updated = True
        elif 'price' in model:
            # If no versions, price stays as is or ensure it's a number
            pass

    if updated:
        # Reconstruct the file content
        prefix = content[:match.start(1)]
        suffix = content[match.end(1):]
        new_json = json.dumps(models, indent=4, ensure_ascii=False)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(prefix + new_json + suffix)
        print(f"Updated prices for {os.path.basename(file_path)}")

for filename in os.listdir(MODELS_DIR):
    normalize_file(os.path.join(MODELS_DIR, filename))
