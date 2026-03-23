import os
import re
import json

BASE_PATH = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public/images/volkswagen"
OUTPUT_FILE = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models/volkswagen.ts"

def format_currency(val):
    try:
        if isinstance(val, str):
            val = val.replace("$", "").replace(".", "").replace(" ", "").replace("+IVA", "").replace("S/IVA", "").strip()
            return int(val)
        return int(val)
    except:
        return 0

def get_image_paths(folder_path, rel_prefix):
    images = []
    if os.path.exists(folder_path):
        for f in sorted(os.listdir(folder_path)):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                images.append(f"{rel_prefix}/{f}")
    return images

def parse_info_md(md_path, subdir):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    model_id = subdir
    
    # Extract headers
    model_match = re.search(r"MODELO:\s*(.*)", content)
    category_match = re.search(r"CATEGORÍA:\s*(.*)", content)
    model_name = model_match.group(1).strip() if model_match else subdir.replace("-", " ").title()
    category = category_match.group(1).strip() if category_match else "SUV"

    # Extract price desde
    price_match = re.search(r"Precio de Lista Desde:\s*(.*)", content)
    initial_price = 0
    if price_match:
        p_match = re.search(r"\$([0-9\.]+)", price_match.group(1))
        if p_match:
            initial_price = format_currency(p_match.group(1))

    # Extract Slogan 
    lines = content.split('\n')
    slogan = ""
    for i, line in enumerate(lines):
        clean = line.strip()
        if not clean or any(h in clean for h in ["http", "MODELO", "CATEGORÍA", "Precio de Lista"]):
            continue
        if "CARACTERÍSTICAS" in clean:
            break
        slogan = clean
        break

    # Characteristics
    features = []
    feat_section = re.search(r"CARACTERÍSTICAS:\n(.*?)(?=\nVERSIONES:|\n===|$)", content, re.DOTALL)
    if feat_section:
        feat_text = feat_section.group(1).strip()
        blocks = [b.strip() for b in feat_text.split('\n\n') if b.strip()]
        for block in blocks:
            b_lines = block.split('\n')
            if not b_lines: continue
            title = b_lines[0].strip()
            desc = " ".join(b_lines[1:]).strip()
            features.append({"title": title, "desc": desc})

    # Versions
    versions = []
    vers_section = re.search(r"VERSIONES:\n(.*?)(?=\n===|\nNotas|$)", content, re.DOTALL)
    if vers_section:
        vers_text = vers_section.group(1).strip()
        v_blocks = re.split(r'\n\n+(?=[A-Z0-9])', vers_text)
        for v_block in v_blocks:
            v_lines = [l.strip() for l in v_block.split('\n') if l.strip()]
            if not v_lines: continue
            
            v_name = v_lines[0]
            v_data = {"name": v_name}
            
            for vl in v_lines[1:]:
                if ":" in vl:
                    parts = vl.split(":", 1)
                    if len(parts) < 2: continue
                    key, val = [x.strip() for x in parts]
                    k_lower = key.lower()
                    if "motor" in k_lower: v_data["motor"] = val
                    elif "transmisión" in k_lower: v_data["transmission"] = val
                    elif "potencia" in k_lower: v_data["power"] = val
                    elif "torque" in k_lower: v_data["torque"] = val
                    elif "tracción" in k_lower: v_data["traction"] = val
                    elif "consumo" in k_lower: v_data["fuel"] = val
                    elif "precio de lista" in k_lower: v_data["listPrice"] = format_currency(val)
                    elif "bono" in k_lower: v_data["bonus"] = format_currency(val)
                    elif "precio con financiamiento" in k_lower: v_data["bonusPrice"] = format_currency(val)

            if "listPrice" not in v_data: v_data["listPrice"] = initial_price
            if "bonus" not in v_data: v_data["bonus"] = 0
            if "bonusPrice" not in v_data: v_data["bonusPrice"] = v_data["listPrice"] - v_data.get("bonus", 0)
            
            v_data.setdefault("transmission", "N/A")
            v_data.setdefault("traction", "4x2")
            v_data.setdefault("fuel", "N/A")
            
            versions.append(v_data)

    # Determine Display Price (Minimum bonus price)
    min_bonus_price = initial_price
    if versions:
        min_bonus_price = min(v["bonusPrice"] for v in versions if v.get("bonusPrice", 0) > 0)

    # Assets
    rel_root = f"/images/volkswagen/{subdir}"
    path_root = os.path.join(BASE_PATH, subdir)
    
    miniature = f"/images/volkswagen/polo-track.webp" 
    img_exts = ('.png', '.jpg', '.jpeg', '.webp')
    
    if os.path.exists(path_root):
        root_files = os.listdir(path_root)
        for rf in root_files:
            if rf.lower().startswith("miniatura.") and rf.lower().endswith(img_exts):
                miniature = f"{rel_root}/{rf}"
                break
        
        if "polo-track.webp" in miniature:
            for rf in root_files:
                if "min" in rf.lower() and rf.lower().endswith(img_exts):
                    miniature = f"{rel_root}/{rf}"
                    break
        
        if "polo-track.webp" in miniature:
            for rf in root_files:
                if rf.lower().endswith(img_exts):
                    miniature = f"{rel_root}/{rf}"
                    break

    if "polo-track.webp" in miniature:
        parent_files = os.listdir(BASE_PATH)
        for pf in parent_files:
            clean_pf = pf.lower().replace("nuevo ", "").replace("nueva ", "")
            if clean_pf.startswith(subdir.lower()) and pf.lower().endswith(img_exts):
                miniature = f"/images/volkswagen/{pf}"
                break

    banners = get_image_paths(os.path.join(path_root, "banner"), f"{rel_root}/banner")
    gallery = get_image_paths(os.path.join(path_root, "galeria"), f"{rel_root}/galeria")
    feat_images = get_image_paths(os.path.join(path_root, "caracteristicas"), f"{rel_root}/caracteristicas")

    for idx, feat in enumerate(features):
        if idx < len(feat_images):
            feat["image"] = feat_images[idx]
        else:
            feat["image"] = miniature

    cat_low = category.lower()
    is_electric = "eléctrico" in cat_low or "electrico" in cat_low or "ID" in model_name or "ID" in model_id
    is_hybrid = "híbrido" in cat_low or "hibrido" in cat_low or "hybrid" in cat_low

    return {
        "id": model_id,
        "brand": "volkswagen",
        "name": model_name,
        "category": category,
        "price": min_bonus_price, # Use the minimum price with bonus as the primary price
        "image": miniature,
        "slogan": slogan,
        "isHybrid": is_hybrid,
        "isElectric": is_electric,
        "features": features,
        "gallery": gallery,
        "versions": versions,
        "desktopBanner": banners[0] if banners else (gallery[0] if gallery else (miniature if miniature else "")),
        "mobileBanner": banners[1] if len(banners) > 1 else (banners[0] if banners else (gallery[0] if gallery else (miniature if miniature else "")))
    }

all_models = []
subdirs = [d for d in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, d))]

for item in sorted(subdirs):
    item_path = os.path.join(BASE_PATH, item)
    md_file = os.path.join(item_path, "info.md")
    if os.path.exists(md_file):
        print(f"Parsing {item}...")
        model_data = parse_info_md(md_file, item)
        all_models.append(model_data)

ts_content = f"""import {{ Vehicle }} from './types';

export const VOLKSWAGEN_MODELS: Vehicle[] = {json.dumps(all_models, indent=4, ensure_ascii=False)};
"""

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Finished! Updated /lib/models/volkswagen.ts with minimum bonus prices.")
