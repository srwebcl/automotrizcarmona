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

import unicodedata

def normalize(name):
    if not name: return ""
    # Normalize unicode to decomposed form then filter out combining marks
    nfkd_form = unicodedata.normalize('NFKD', name)
    only_ascii = nfkd_form.encode('ASCII', 'ignore').decode('ASCII')
    return re.sub(r'[^A-Z0-9]', '', only_ascii.upper())

def safe_id(name):
    nfkd_form = unicodedata.normalize('NFKD', name)
    only_ascii = nfkd_form.encode('ASCII', 'ignore').decode('ASCII')
    return only_ascii.replace(" ", "-").lower()

def get_image_paths(folder_path, rel_prefix):
    images = []
    if os.path.exists(folder_path):
        try:
            for f in sorted(os.listdir(folder_path)):
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    images.append(f"{rel_prefix}/{f}")
        except: pass
    return images

def match_folder_to_section(folder_name, sections):
    nf = normalize(folder_name)
    
    # Priority 1: Exact Match MODELO
    for sec in sections:
        if normalize(sec["name"]) == nf: return sec
        
    # Priority 2: Exact Match URL part
    for sec in sections:
        if normalize(sec["url"].split("/")[-1]) == nf: return sec
        
    # Priority 3: Substring
    for sec in sections:
        ns = normalize(sec["name"])
        nu = normalize(sec["url"].split("/")[-1])
        if nf in ns or ns in nf or nf in nu or nu in nf:
            # Special case avoidance
            if nf == "X1" and "IX1" in nu: continue
            if nf == "X2" and "IX2" in nu: continue
            if nf == "X" and "IX" in nu: continue
            return sec
            
    return None

def parse_bmw():
    with open(os.path.join(BASE_PATH, "info-modelos.md"), 'r', encoding='utf-8') as f:
        content = f.read()

    folders = sorted([d for d in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, d))])
    
    # Exclude certain folders if needed
    folders = [f for f in folders if f.upper() != "ANTIGUO"]

    # Split MD by URL
    sections_raw = re.split(r'(https://www\.bmw\.cl/modelos/[a-zA-Z0-9\-_]+)', content)
    sections = []
    for i in range(1, len(sections_raw), 2):
        url = sections_raw[i].strip()
        data = sections_raw[i+1].strip()
        name_match = re.search(r"(?:MODELO|modelo):\s*(.*)", data)
        model_name = name_match.group(1).strip() if name_match else url.split("/")[-1].replace("-", " ").upper()
        sections.append({"url": url, "name": model_name, "content": data})

    all_models = []
    for folder in folders:
        sec = match_folder_to_section(folder, sections)
        
        rel_root = f"{REL_PATH_BRAND}/{folder}"
        path_root = os.path.join(BASE_PATH, folder)
        
        if not sec:
            model_name = folder
            category = "Gama BMW"
            slogan = "The Power of Choice"
            content = ""
            versions = [{"name": folder, "transmission": "Steptronic", "traction": "Trasera", "fuel": "Gasolina", "listPrice": 0, "bonusPrice": 0}]
        else:
            model_name = sec["name"]
            content = sec["content"]
            cat_match = re.search(r"(?:CATEGORÍA|CATEGORIA):\s*(.*)", content, re.I)
            category = cat_match.group(1).strip() if cat_match else ("SUV" if folder.startswith("X") else "Gama BMW")
            
            # Slogan
            lines = [l.strip() for l in content.split('\n') if l.strip()]
            slogan = "Pure Driving Pleasure"
            for line in lines:
                if any(x in line.upper() for x in ["HTTP", "MODELO", "CATEGOR", "VERSIONES", "==="]): continue
                if ":" in line or "$" in line: continue
                slogan = line
                break

            # Versions
            versions = []
            v_match = re.search(r"VERSIONES:?\n(.*?)(?=\n===|\nhttp|$)", content, re.DOTALL | re.I)
            if v_match:
                blocks = re.split(r'\n\n+', v_match.group(1).strip())
                for block in blocks:
                    v_lines = [l.strip() for l in block.split('\n') if l.strip()]
                    if not v_lines: continue
                    v_item = {"name": v_lines[0]}
                    for vl in v_lines[1:]:
                        if ":" in vl:
                            parts = vl.split(":", 1)
                            if len(parts) < 2: continue
                            k, v = [x.strip() for x in parts]
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
                    
                    # Fuel logic
                    fuel = "Gasolina"
                    if "HÍBRIDO" in category.upper() or "HIBRIDO" in category.upper(): fuel = "Híbrido"
                    elif "ELÉCTRICO" in category.upper() or "ELECTRICO" in category.upper() or folder.upper().startswith("I"): fuel = "Eléctrico"
                    v_item.setdefault("fuel", fuel)
                    
                    v_item["bonus"] = v_item.get("bonus", 0)
                    v_item["listPrice"] = v_item.get("listPrice", 0)
                    v_item["bonusPrice"] = v_item["listPrice"] - v_item["bonus"]
                    versions.append(v_item)

            if not versions:
                versions = [{"name": model_name, "transmission": "Steptronic", "traction": "Trasera", "fuel": "Gasolina", "listPrice": 0, "bonusPrice": 0}]

        # Assets
        files = os.listdir(path_root) if os.path.exists(path_root) else []
        miniature = next((f"{rel_root}/{f}" for f in files if f.lower().startswith("min") and f.lower().endswith(('.png', '.webp', '.jpg'))), "")
        if not miniature and files:
            miniature = next((f"{rel_root}/{f}" for f in files if f.lower().endswith(('.png', '.webp', '.jpg'))), "")
        
        gallery = get_image_paths(os.path.join(path_root, "galeria"), f"{rel_root}/galeria")
        feat_images = get_image_paths(os.path.join(path_root, "caracteristicas"), f"{rel_root}/caracteristicas")
        banners = get_image_paths(os.path.join(path_root, "banner"), f"{rel_root}/banner")

        # Features from MD
        features = []
        f_match = re.search(r"CARACTER[IÍ]STICAS:?\n(.*?)(?=\nVERSIONES:|\n===|$)", content, re.DOTALL | re.I)
        if f_match:
            blocks = [b.strip() for b in f_match.group(1).split('\n\n') if b.strip()]
            for idx, block in enumerate(blocks):
                blines = [l.strip() for l in block.split('\n') if l.strip()]
                if not blines: continue
                features.append({
                    "title": blines[0],
                    "desc": " ".join(blines[1:]),
                    "image": feat_images[idx] if idx < len(feat_images) else miniature
                })

        all_models.append({
            "id": safe_id(folder),
            "brand": "bmw",
            "name": model_name,
            "category": category,
            "price": min(v["bonusPrice"] for v in versions) if versions else 0,
            "image": miniature,
            "slogan": slogan,
            "isHybrid": "HÍBRIDO" in category.upper() or "HIBRIDO" in category.upper() or "HIBRIDO" in folder.upper(),
            "isElectric": "ELÉCTRICO" in category.upper() or "ELECTRICO" in category.upper() or folder.upper().startswith("I"),
            "features": features,
            "gallery": gallery,
            "versions": versions,
            "desktopBanner": banners[0] if banners else f"{REL_PATH_BRAND}/banner-bmw.jpg",
            "mobileBanner": banners[0] if banners else f"{REL_PATH_BRAND}/banner-bmw.jpg",
            "videoUrl": f"https://www.youtube.com/embed/{re.search(r'youtu\.be/([A-Za-z0-9_-]+)', content).group(1)}" if re.search(r'youtu\.be/([A-Za-z0-9_-]+)', content) else ""
        })

    return all_models

models = parse_bmw()
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(f"import {{ Vehicle }} from './types';\n\n")
    f.write(f"export const BMW_MODELS: Vehicle[] = {json.dumps(models, indent=4, ensure_ascii=False)};\n")

print(f"Finished! Total folders processed: {len(models)}")
