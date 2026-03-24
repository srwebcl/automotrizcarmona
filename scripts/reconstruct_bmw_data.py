import os
import re
import json
import unicodedata

BASE_PATH = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public/images/bmw"
OUTPUT_FILE = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models/bmw.ts"
REL_PATH_BRAND = "/images/bmw"

CATEGORY_MAP = {
    'BMW M': 'BMW M',
    'CONVERTIBLE': 'Convertible',
    'CONVERTIBLES': 'Convertible',
    'COUPE': 'Coupé',
    'COUPÉ': 'Coupé',
    'COUPPE': 'Coupé',
    'COUPÉ': 'Coupé',
    'ELÉCTRICO': 'Eléctrico',
    'ELECTRICO': 'Eléctrico',
    'ELÉCTRICOS': 'Eléctrico',
    'ELECTRICOS': 'Eléctrico',
    'HATCHBACK': 'Hatchback',
    'HIBRIDO': 'Híbrido',
    'HÍBRIDO': 'Híbrido',
    'HÍBRIDOS': 'Híbrido',
    'SEDAN': 'Sedán',
    'SEDÁN': 'Sedán',
    'SUV': 'SUV'
}

def format_currency(val):
    try:
        val = str(val).replace("$", "").replace(".", "").replace(",", "").replace(" ", "").replace("+IVA", "").replace("S/IVA", "").strip()
        return int(val)
    except: return 0

def normalize_text(text):
    if not text: return ""
    # Strip accents for matching and IDs
    nfkd_form = unicodedata.normalize('NFKD', text)
    return "".join([c for c in nfkd_form if not unicodedata.combining(c)]).upper()

def safe_id(name):
    # IDs should be ASCII and no accents
    n_text = normalize_text(name)
    return n_text.replace(" ", "-").lower()

def safe_path(text):
    # Crucial for Vercel: enforce NFC normalization for paths
    return unicodedata.normalize('NFC', text)

def clean_category(cat_str):
    parts = [p.strip() for p in cat_str.split(',') if p.strip()]
    cleaned = []
    for p in parts:
        search_key = normalize_text(p)
        found = False
        for k, v in CATEGORY_MAP.items():
            if normalize_text(k) == search_key:
                cleaned.append(v)
                found = True
                break
        if not found:
            cleaned.append(p.capitalize())
    # Remove duplicates and sort canoniacally
    return ", ".join(sorted(list(set(cleaned))))

def get_image_paths(folder_path, rel_prefix):
    images = []
    if os.path.exists(folder_path):
        try:
            for f in sorted(os.listdir(folder_path)):
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    # Folder and filename must be NFC for Linux/Vercel
                    images.append(safe_path(f"{rel_prefix}/{f}"))
        except: pass
    return images

def match_folder_to_section(folder_name, sections):
    nf = normalize_text(folder_name)
    # Exact Match
    for sec in sections:
        if normalize_text(sec["name"]) == nf: return sec
    # URL Part Match
    for sec in sections:
        if normalize_text(sec["url"].split("/")[-1]) == nf: return sec
    # Substring
    for sec in sections:
        ns = normalize_text(sec["name"])
        nu = normalize_text(sec["url"].split("/")[-1])
        if nf in ns or ns in nf or nf in nu or nu in nf:
            if nf == "X1" and "IX1" in nu: continue
            if nf == "X2" and "IX2" in nu: continue
            if nf == "X" and "IX" in nu: continue
            return sec
    return None

def parse_bmw():
    with open(os.path.join(BASE_PATH, "info-modelos.md"), 'r', encoding='utf-8') as f:
        content = f.read()

    # Folders in BASE_PATH (excluding non-dir)
    folders = sorted([d for d in os.listdir(BASE_PATH) if os.path.isdir(os.path.join(BASE_PATH, d))])
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
        folder_nfc = safe_path(folder)
        rel_root = f"{REL_PATH_BRAND}/{folder_nfc}"
        path_root = os.path.join(BASE_PATH, folder)
        
        if not sec:
            model_name = folder
            category = "SUV" if (folder.startswith("X") or folder.startswith("iX")) else "Sedán"
            slogan = "The Power of Choice"
            content = ""
            versions = [{"name": folder, "transmission": "Steptronic", "traction": "Trasera", "fuel": "Gasolina", "listPrice": 0, "bonusPrice": 0}]
        else:
            model_name = sec["name"]
            content = sec["content"]
            cat_match = re.search(r"(?:CATEGORÍA|CATEGORIA):\s*(.*)", content, re.I)
            if cat_match:
                category = clean_category(cat_match.group(1))
            else:
                # Fallback based on name/folder
                if folder.startswith("X") or folder.startswith("iX"): category = "SUV"
                elif "CONVERTIBLE" in folder.upper() or "CABRIO" in folder.upper(): category = "Convertible"
                elif "COUP" in folder.upper(): category = "Coupé"
                elif "HATCH" in folder.upper() or "SERIE 1" in folder.upper(): category = "Hatchback"
                else: category = "Sedán"
            
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
            v_match = re.search(r"VERSIONES:?\n(.*?)(?=\n===|\nhttp|$)", data, re.DOTALL | re.I)
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
                    f_type = "Gasolina"
                    if "Híbrido" in category: f_type = "Híbrido"
                    elif "Eléctrico" in category or folder.upper().startswith("I"): f_type = "Eléctrico"
                    v_item.setdefault("fuel", f_type)
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

        # Features
        features = []
        f_match = re.search(r"CARACTER[IÍ]STICAS:?\n(.*?)(?=\nVERSIONES:|\n===|$)", data, re.DOTALL | re.I)
        if f_match:
            blocks = [b.strip() for b in f_match.group(1).split('\n\n') if b.strip()]
            for idx, block in enumerate(blocks):
                blines = [l.strip() for l in block.split('\n') if l.strip()]
                if not blines: continue
                features.append({
                    "title": blines[0], "desc": " ".join(blines[1:]),
                    "image": feat_images[idx] if idx < len(feat_images) else miniature
                })

        all_models.append({
            "id": safe_id(folder),
            "brand": "bmw",
            "name": model_name,
            "category": category,
            "price": min(v["bonusPrice"] for v in versions) if versions else 0,
            "image": safe_path(miniature),
            "slogan": slogan,
            "isHybrid": "Híbrido" in category,
            "isElectric": "Eléctrico" in category or folder.upper().startswith("I"),
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

print(f"Finished! Total folders: {len(models)}")
