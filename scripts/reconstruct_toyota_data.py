import os
import re
import json
import subprocess

BASE_PATH = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public/images/toyota"
OUTPUT_FILE = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models/toyota.ts"

def format_currency(val):
    try:
        if isinstance(val, str):
            val = val.replace("$", "").replace(".", "").replace(",", "").replace(" ", "").replace("+IVA", "").replace("S/IVA", "").strip()
            return int(val)
        return int(val)
    except:
        return 0

def get_dimensions(path):
    try:
        # Using identify command from ImageMagick
        res = subprocess.check_output(["identify", "-format", "%w %h", path]).decode().split()
        return int(res[0]), int(res[1])
    except:
        return 0, 0

def get_image_paths(folder_path, rel_prefix):
    images = []
    if os.path.exists(folder_path):
        for f in sorted(os.listdir(folder_path)):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                images.append(f"{rel_prefix}/{f}")
    return images

def parse_info_md(md_path, subdir_name, abspath):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    model_id = subdir_name
    
    # Extract headers
    model_match = re.search(r"MODELO:\s*(.*)", content)
    category_match = re.search(r"CATEGORÍA:\s*(.*)", content)
    model_name = model_match.group(1).strip() if model_match else subdir_name.replace("-", " ").title()
    category_str = category_match.group(1).strip() if category_match else "SUV"
    
    # Priority for Gazoo Racing category
    if "gazoo racing" in category_str.lower():
        category = "Gazoo Racing"
    else:
        category = category_str.split(',')[0].strip()

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
        if not clean or any(h in clean for h in ["===", "http", "MODELO", "CATEGORÍA", "Precio de Lista"]):
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
    vers_section = re.search(r"VERSIONES:\n(.*?)(?=\n===|\nDetalles|\nNotas|$)", content, re.DOTALL)
    if vers_section:
        vers_text = vers_section.group(1).strip()
        # Find version blocks (Each block starts with name, then attributes)
        # We assume empty lines between version blocks
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
            if "bonus" not in v_data: v_data["bonus"] = (v_data.get("listPrice", 0) - v_data.get("bonusPrice", 0)) if "bonusPrice" in v_data else 0
            if "bonusPrice" not in v_data: v_data["bonusPrice"] = v_data["listPrice"] - v_data.get("bonus", 0)
            
            v_data.setdefault("transmission", "N/A")
            v_data.setdefault("traction", "4x2")
            v_data.setdefault("fuel", "N/A")
            
            versions.append(v_data)

    # Determine Display Price (Minimum bonus price)
    min_bonus_price = initial_price
    if versions:
        min_bonus_price = min(v["bonusPrice"] for v in versions if v.get("bonusPrice", 0) > 0) or initial_price

    # Assets
    rel_root = abspath.replace("/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public", "")
    path_root = abspath
    
    miniature = "" 
    img_exts = ('.png', '.jpg', '.jpeg', '.webp')
    
    if os.path.exists(path_root):
        root_files = os.listdir(path_root)
        found_mini = False
        
        # Priority 1: miniatura.*
        for rf in root_files:
            if rf.lower().startswith("miniatura.") and rf.lower().endswith(img_exts):
                miniature = f"{rel_root}/{rf}"
                found_mini = True
                break
        
        # Priority 2: Contains 'min' and is an image
        if not found_mini:
            for rf in sorted(root_files):
                if "min" in rf.lower() and rf.lower().endswith(img_exts):
                    miniature = f"{rel_root}/{rf}"
                    found_mini = True
                    break
        
        # Priority 3: Any image in root
        if not found_mini:
            for rf in sorted(root_files):
                if rf.lower().endswith(img_exts):
                    miniature = f"{rel_root}/{rf}"
                    found_mini = True
                    break

    # If still empty, use a placeholder
    if not miniature:
        miniature = "/images/autos-nuevos.webp"

    banners = get_image_paths(os.path.join(path_root, "banner"), f"{rel_root}/banner")
    desktop_banner = ""
    mobile_banner = ""
    
    if banners:
        # Try to find by dimensions first
        potential_mobile = []
        potential_desktop = []
        
        for b in banners:
            w, h = get_dimensions(os.path.join(path_root, "banner", os.path.basename(b)))
            if w > h and w >= 1000:
                potential_desktop.append(b)
            elif w < h or w < 1000:
                potential_mobile.append(b)
        
        if potential_desktop:
            desktop_banner = potential_desktop[0]
        if potential_mobile:
            mobile_banner = potential_mobile[0]
            
        # Try words if still empty
        if not desktop_banner or not mobile_banner:
            for b in banners:
                b_low = b.lower()
                if not desktop_banner and any(k in b_low for k in ["desktop", "web", "pc"]): 
                    desktop_banner = b
                if not mobile_banner and any(k in b_low for k in ["mobile", "movil", "cell", "mov"]):
                    mobile_banner = b
        
        # Absolute fallbacks
        if not desktop_banner:
            desktop_banner = banners[0]
        if not mobile_banner:
            mobile_banner = banners[1] if len(banners) > 1 else banners[0]
    else:
        # Gallery or miniature as fallback
        gallery = get_image_paths(os.path.join(path_root, "galeria"), f"{rel_root}/galeria")
        fallback = gallery[0] if gallery else (miniature if miniature else "")
        desktop_banner = fallback
        mobile_banner = fallback

    gallery = get_image_paths(os.path.join(path_root, "galeria"), f"{rel_root}/galeria")
    
    # Features
    feature_match = re.search(r"CARACTERÍSTICAS:(.*?)VERSIONES:", content, re.DOTALL)
    features = []
    if feature_match:
        feats_raw = feature_match.group(1).strip().split('\n\n')
        feature_titles = []
        feature_descs = []
        for fr in feats_raw:
            lines = [l.strip() for l in fr.strip().split('\n') if l.strip()]
            if len(lines) >= 2:
                feature_titles.append(lines[0])
                feature_descs.append(" ".join(lines[1:]))

        # Smart matching features with images
        feat_images = get_image_paths(os.path.join(path_root, "caracteristicas"), f"{rel_root}/caracteristicas")
        used_images = set()
        
        for i, title in enumerate(feature_titles):
            title_low = title.lower()
            matched_img = None
            
            # Try to match by keywords
            for img in feat_images:
                img_name = os.path.basename(img).lower()
                # Keywords to match
                keywords = ["seguridad", "caracteristica", "interior", "exterior", "carga", "robusto", "motor", "tecnologia", "confort", "performance", "diseno"]
                for kw in keywords:
                    if kw in title_low and kw in img_name and img not in used_images:
                        matched_img = img
                        break
                if matched_img: break
            
            # Fallback to next available if no match
            if not matched_img:
                for img in feat_images:
                    if img not in used_images:
                        matched_img = img
                        break
            
            if matched_img:
                used_images.add(matched_img)
                features.append({
                    "title": title,
                    "desc": feature_descs[i],
                    "image": matched_img
                })
            else:
                # If no image found at all, use miniature
                features.append({
                    "title": title,
                    "desc": feature_descs[i],
                    "image": miniature
                })

    cat_low = category_str.lower()
    is_electric = "eléctrico" in cat_low or "electrico" in cat_low or "bz4x" in model_id.lower()
    is_hybrid = "híbrido" in cat_low or "hibrido" in cat_low or "hybrid" in cat_low or "corolla-cross" in model_id.lower()

    # Extract Video URL
    video_match = re.search(r"https://(www\.)?youtu\.be/([A-Za-z0-9_-]+)", content)
    video_url = ""
    if video_match:
        video_id = video_match.group(2)
        video_url = f"https://www.youtube.com/embed/{video_id}"
    elif "https://youtu.be/" in content:
        # Fallback for broken regex
        v_parts = content.split("https://youtu.be/")
        if len(v_parts) > 1:
            v_id = v_parts[1].split()[0].strip()
            if v_id:
                video_url = f"https://www.youtube.com/embed/{v_id}"

    return {
        "id": model_id,
        "brand": "toyota",
        "name": model_name,
        "category": category,
        "price": min_bonus_price,
        "image": miniature,
        "slogan": slogan,
        "isHybrid": is_hybrid,
        "isElectric": is_electric,
        "features": features,
        "gallery": gallery,
        "versions": versions,
        "desktopBanner": desktop_banner,
        "mobileBanner": mobile_banner,
        "videoUrl": video_url
    }

all_models = []

# Walk through all Toyota directories to find info.md
for root, dirs, files in os.walk(BASE_PATH):
    if "info.md" in files:
        subdir_name = os.path.basename(root)
        md_file = os.path.join(root, "info.md")
        print(f"Parsing Toyota {subdir_name}...")
        model_data = parse_info_md(md_file, subdir_name, root)
        all_models.append(model_data)

ts_content = f"""import {{ Vehicle }} from './types';

export const TOYOTA_MODELS: Vehicle[] = {json.dumps(all_models, indent=4, ensure_ascii=False)};
"""

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Finished! Updated /lib/models/toyota.ts")
