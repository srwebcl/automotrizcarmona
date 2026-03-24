import os
import re
import json

BASE_PATH = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public/images/BMW"
OUTPUT_FILE = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models/bmw.ts"

def format_currency(val):
    try:
        if isinstance(val, str):
            val = val.replace("$", "").replace(".", "").replace(",", "").replace(" ", "").replace("+IVA", "").replace("S/IVA", "").strip()
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

def match_folder(model_name):
    # Try to find a folder in BASE_PATH that matches the model name
    folders = [d for d in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, d))]
    
    # Normalize model_name for matching
    norm_name = model_name.upper().replace("NUEVO ", "").replace("EL ", "").replace("NUEVA ", "").strip()
    
    # Direct match first
    for f in folders:
        if f.upper() == norm_name:
            return f
            
    # Substring match
    for f in folders:
        if f.upper() in norm_name or norm_name in f.upper():
            return f
            
    # Fuzzy match fallback (remove accents, etc.)
    # For now just return None or a sensible guess
    return None

def parse_bmw_md():
    with open(os.path.join(BASE_PATH, "info-modelos.md"), 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by URL since each model starts with a URL
    sections = re.split(r'(https://www\.bmw\.cl/modelos/.*)', content)
    
    all_models = []
    
    # Sections will be [irrelevant, url1, content1, url2, content2, ...]
    for i in range(1, len(sections), 2):
        url = sections[i].strip()
        data = sections[i+1].strip()
        
        # Extract name
        name_match = re.search(r"MODELO:\s*(.*)", data, re.I)
        if not name_match: continue
        model_name = name_match.group(1).strip()
        
        # Extract category
        cat_match = re.search(r"CATEGOR[IÍ]A:\s*(.*)", data, re.I)
        category = cat_match.group(1).strip() if cat_match else "SUV"
        
        # Slogan
        lines = data.split('\n')
        slogan = ""
        found_model = False
        for line in lines:
            if "MODELO:" in line:
                found_model = True
                continue
            if found_model and line.strip() and "CATEGOR" not in line and "Precio de Lista" not in line:
                slogan = line.strip()
                break
        
        # Features
        features = []
        feat_section = re.search(r"CARACTER[IÍ]STICAS:?\n(.*?)(?=\nVERSIONES:|\n===|$)", data, re.DOTALL | re.I)
        if feat_section:
            feat_text = feat_section.group(1).strip()
            blocks = [b.strip() for b in feat_text.split('\n\n') if b.strip()]
            for block in blocks:
                b_lines = block.split('\n')
                if len(b_lines) >= 1:
                    title = b_lines[0].strip()
                    desc = " ".join(b_lines[1:]).strip()
                    features.append({"title": title, "desc": desc})

        # Versions
        versions = []
        vers_section = re.search(r"VERSIONES:?\n(.*?)(?=\n===|\nhttp|$)", data, re.DOTALL | re.I)
        if vers_section:
            vers_text = vers_section.group(1).strip()
            # Split versions by empty lines or lines that look like a version name
            v_blocks = re.split(r'\n\n+', vers_text)
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
                        elif "bono del mes" in k_lower or "bono" in k_lower: v_data["bonus"] = format_currency(val)
                
                # Default values for mandatory fields
                v_data.setdefault("transmission", "N/A")
                v_data.setdefault("traction", "Trasera")
                
                # Smart fuel detection
                fuel_type = "Gasolina"
                cat_low = category.lower()
                name_low = model_name.lower()
                if "híbrido" in cat_low or "hibrido" in cat_low or "hibrido" in name_low:
                    fuel_type = "Híbrido"
                elif "eléctrico" in cat_low or "electrico" in cat_low or "eléctrico" in name_low or model_name.startswith("i"):
                    fuel_type = "Eléctrico"
                elif "diésel" in name_low or "diesel" in name_low:
                    fuel_type = "Diésel"
                
                v_data.setdefault("fuel", fuel_type)
                
                if "bonus" in v_data and "listPrice" in v_data:
                    v_data["bonusPrice"] = v_data["listPrice"] - v_data["bonus"]
                elif "listPrice" in v_data:
                    v_data["bonusPrice"] = v_data["listPrice"]
                    v_data["bonus"] = 0
                
                if v_data.get("listPrice"):
                    versions.append(v_data)

        if not versions: continue
        
        # Match folder for assets
        folder = match_folder(model_name)
        if not folder:
            # Try to extract from URL
            url_part = url.split("/")[-1]
            folder = match_folder(url_part)
            
        if not folder:
            print(f"Warning: Could not match folder for {model_name}")
            continue

        rel_root = f"/images/BMW/{folder}"
        path_root = os.path.join(BASE_PATH, folder)
        
        # Miniature
        miniature = ""
        if os.path.exists(path_root):
            files = os.listdir(path_root)
            for f in files:
                if f.lower().startswith("min") and f.lower().endswith(('.png', '.webp', '.jpg')):
                    miniature = f"{rel_root}/{f}"
                    break
            if not miniature:
                for f in files:
                    if f.lower().endswith(('.png', '.webp', '.jpg')):
                        miniature = f"{rel_root}/{f}"
                        break
        
        # Gallery and Features
        gallery = get_image_paths(os.path.join(path_root, "galeria"), f"{rel_root}/galeria")
        feat_images = get_image_paths(os.path.join(path_root, "caracteristicas"), f"{rel_root}/caracteristicas")
        banners = get_image_paths(os.path.join(path_root, "banner"), f"{rel_root}/banner")

        for idx, feat in enumerate(features):
            if idx < len(feat_images):
                feat["image"] = feat_images[idx]
            else:
                feat["image"] = miniature

        min_price = min(v.get("bonusPrice", 99999999) for v in versions)
        
        # Video
        video_match = re.search(r"https://(www\.)?youtu\.be/([A-Za-z0-9_-]+)", data)
        video_url = f"https://www.youtube.com/embed/{video_match.group(2)}" if video_match else ""

        cat_low = category.lower()
        model_data = {
            "id": folder.replace(" ", "-").lower(),
            "brand": "bmw",
            "name": model_name,
            "category": category,
            "price": min_price,
            "image": miniature,
            "slogan": slogan,
            "isHybrid": "híbrido" in cat_low or "hibrido" in cat_low,
            "isElectric": "eléctrico" in cat_low or "electrico" in cat_low or model_name.startswith("i"),
            "features": features,
            "gallery": gallery,
            "versions": versions,
            "desktopBanner": banners[0] if banners else "/images/BMW/banner-bmw.jpg",
            "mobileBanner": banners[0] if banners else "/images/BMW/banner-bmw.jpg",
            "videoUrl": video_url
        }
        all_models.append(model_data)
        
    return all_models

models = parse_bmw_md()

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(f"import {{ Vehicle }} from './types';\n\n")
    f.write(f"export const BMW_MODELS: Vehicle[] = {json.dumps(models, indent=4, ensure_ascii=False)};\n")

print(f"Finished! Generated {len(models)} BMW models.")
