import os
import re
import json

BASE_PATH = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public/images/bmw"
OUTPUT_FILE = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models/bmw.ts"
REL_PATH_BRAND = "/images/bmw"

def format_currency(val):
    try:
        val = str(val).replace("$", "").replace(".", "").replace(",", "").replace(" ", "").replace("+IVA", "").replace("S/IVA", "").strip()
        return int(val)
    except: return 0

def normalize(name):
    if not name: return ""
    # Remove accents
    name = name.replace("Á", "A").replace("É", "E").replace("Í", "I").replace("Ó", "O").replace("Ú", "U")
    return re.sub(r'[^A-Z0-9]', '', name.upper())

def get_image_paths(folder_path, rel_prefix):
    images = []
    if os.path.exists(folder_path):
        try:
            for f in sorted(os.listdir(folder_path)):
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    images.append(f"{rel_prefix}/{f}")
        except: pass
    return images

def parse_bmw():
    with open(os.path.join(BASE_PATH, "info-modelos.md"), 'r', encoding='utf-8') as f:
        content = f.read()

    # Folders in BASE_PATH (excluding non-dir)
    folders = sorted([d for d in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, d))])
    
    # Split MD by URL
    sections = re.split(r'(https://www\.bmw\.cl/modelos/[a-zA-Z0-9\-_]+)', content)
    
    section_data = []
    for i in range(1, len(sections), 2):
        url = sections[i].strip()
        data = sections[i+1].strip()
        name_match = re.search(r"(?:MODELO|modelo):\s*(.*)", data)
        model_name = name_match.group(1).strip() if name_match else url.split("/")[-1].replace("-", " ").upper()
        section_data.append({"url": url, "name": model_name, "content": data})

    all_models = []
    
    for folder in folders:
        # Match section to folder
        matched_sec = None
        n_folder = normalize(folder)
        
        # Priority 1: Exact match folder name to MODELO in section
        for sec in section_data:
            if normalize(sec["name"]) == n_folder:
                matched_sec = sec
                break
        
        # Priority 2: Substring or URL part
        if not matched_sec:
            for sec in section_data:
                u_part = normalize(sec["url"].split("/")[-1])
                if u_part == n_folder:
                    matched_sec = sec
                    break
        
        if not matched_sec:
            # Fallback data if no section matches
            data = ""
            model_name = folder
            category = "SUV" if folder.startswith("X") or folder.startswith("iX") else "Gama BMW"
            slogan = "The Power of Choice"
            versions = [{"name": folder, "transmission": "Steptronic", "traction": "Trasera", "fuel": "Gasolina", "listPrice": 0, "bonusPrice": 0}]
            features_text = ""
        else:
            data = matched_sec["content"]
            model_name = matched_sec["name"]
            cat_match = re.search(r"(?:CATEGORÍA|CATEGORIA):\s*(.*)", data, re.I)
            category = cat_match.group(1).strip() if cat_match else ("SUV" if folder.startswith("X") else "Gama BMW")
            
            # Slogan: first line after MODELO/URL that isn't empty or metadata
            lines = [l.strip() for l in data.split('\n') if l.strip()]
            slogan = "Pure Driving Pleasure"
            for line in lines:
                if "HTTP" in line.upper() or "MODELO" in line.upper() or "CATEGOR" in line.upper() or "VERSIONES" in line.upper():
                    continue
                if any(x in line for x in ["$", ":", "==="]): continue
                slogan = line
                break

            # Versions
            versions = []
            v_sec = re.search(r"VERSIONES:?\n(.*?)(?=\n===|\nhttp|$)", data, re.DOTALL | re.I)
            if v_sec:
                v_blocks = re.split(r'\n\n+', v_sec.group(1).strip())
                for v_block in v_blocks:
                    v_lines = [l.strip() for l in v_block.split('\n') if l.strip()]
                    if not v_lines: continue
                    v_item = {"name": v_lines[0]}
                    for vl in v_lines[1:]:
                        if ":" in vl:
                            k, v = [x.strip() for x in vl.split(":", 1)]
                            kl = k.lower()
                            if "motor" in kl: v_item["motor"] = v
                            elif "transmisión" in kl: v_item["transmission"] = v
                            elif "potencia" in kl: v_item["power"] = v
                            elif "torque" in kl: v_item["torque"] = v
                            elif "tracción" in kl: v_item["traction"] = v
                            elif "consumo" in kl: v_item["fuel"] = v
                            elif "precio de lista" in kl: v_item["listPrice"] = format_currency(v)
                            elif "bono" in kl: v_item["bonus"] = format_currency(v)
                    v_item.setdefault("transmission", "Steptronic")
                    v_item.setdefault("traction", "Trasera")
                    v_item.setdefault("fuel", "Eléctrico" if "I" == folder[0] else "Gasolina")
                    v_item["bonus"] = v_item.get("bonus", 0)
                    v_item["listPrice"] = v_item.get("listPrice", 0)
                    v_item["bonusPrice"] = v_item["listPrice"] - v_item["bonus"]
                    versions.append(v_item)
            
            if not versions:
                versions = [{"name": model_name, "transmission": "Steptronic", "traction": "Trasera", "fuel": "Gasolina", "listPrice": 0, "bonusPrice": 0}]

        # Assets
        rel_root = f"{REL_PATH_BRAND}/{folder}"
        path_root = os.path.join(BASE_PATH, folder)
        files = os.listdir(path_root) if os.path.exists(path_root) else []
        miniature = next((f"{rel_root}/{f}" for f in files if f.lower().startswith("min") and f.lower().endswith(('.png', '.webp', '.jpg'))), "")
        if not miniature and files:
            miniature = next((f"{rel_root}/{f}" for f in files if f.lower().endswith(('.png', '.webp', '.jpg'))), "")
        
        gallery = get_image_paths(os.path.join(path_root, "galeria"), f"{rel_root}/galeria")
        feat_images = get_image_paths(os.path.join(path_root, "caracteristicas"), f"{rel_root}/caracteristicas")
        
        # Features from MD
        features = []
        feat_sec = re.search(r"CARACTER[IÍ]STICAS:?\n(.*?)(?=\nVERSIONES:|\n===|$)", data, re.DOTALL | re.I)
        if feat_sec:
            blocks = [b.strip() for b in feat_sec.group(1).split('\n\n') if b.strip()]
            for idx, block in enumerate(blocks):
                blines = [l.strip() for l in block.split('\n') if l.strip()]
                if not blines: continue
                title = blines[0]
                desc = " ".join(blines[1:])
                img = feat_images[idx] if idx < len(feat_images) else (miniature if miniature else "")
                features.append({"title": title, "desc": desc, "image": img})

        banners = get_image_paths(os.path.join(path_root, "banner"), f"{rel_root}/banner")
        
        all_models.append({
            "id": folder.replace(" ", "-").lower(),
            "brand": "bmw",
            "name": model_name,
            "category": category,
            "price": min(v["bonusPrice"] for v in versions) if versions else 0,
            "image": miniature,
            "slogan": slogan,
            "isHybrid": "HIBRIDO" in folder.upper() or "HÍBRIDO" in category.upper(),
            "isElectric": folder.upper().startswith("I") or "ELÉCTRICO" in category.upper(),
            "features": features,
            "gallery": gallery,
            "versions": versions,
            "desktopBanner": banners[0] if banners else f"{REL_PATH_BRAND}/banner-bmw.jpg",
            "mobileBanner": banners[0] if banners else f"{REL_PATH_BRAND}/banner-bmw.jpg",
            "videoUrl": f"https://www.youtube.com/embed/{re.search(r'youtu\.be/([A-Za-z0-9_-]+)', data).group(1)}" if re.search(r'youtu\.be/([A-Za-z0-9_-]+)', data) else ""
        })

    return all_models

models = parse_bmw()
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(f"import {{ Vehicle }} from './types';\n\n")
    f.write(f"export const BMW_MODELS: Vehicle[] = {json.dumps(models, indent=4, ensure_ascii=False)};\n")

print(f"Finished! Generated {len(models)} BMW models from {len(os.listdir(BASE_PATH))} entries.")
