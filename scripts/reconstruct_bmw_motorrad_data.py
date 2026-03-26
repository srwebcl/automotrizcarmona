import os
import re
import json
import unicodedata

# Paths
BASE_PATH = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/public/images/bmw-motorrad"
OUTPUT_FILE = "/Users/sebastianrodriguezmilla/proyectos-web/automotrizcarmona/lib/models/bmw-motorrad.ts"
REL_PATH_BRAND = "/images/bmw-motorrad"

def normalize_nfc(text):
    return unicodedata.normalize('NFC', text)

def safe_id(name):
    n_text = unicodedata.normalize('NFKD', name)
    only_ascii = "".join([c for c in n_text if not unicodedata.combining(c)])
    return only_ascii.replace(" ", "-").lower().replace("/", "-")

def get_image_paths(folder_path, rel_prefix):
    images = []
    if os.path.exists(folder_path):
        for f in sorted(os.listdir(folder_path)):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.avif')):
                images.append(normalize_nfc(f"{rel_prefix}/{f}"))
    return images

def parse_info_md(file_path, folder_name):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    data = {
        "id": safe_id(folder_name),
        "brand": "bmw-motorrad",
        "name": "",
        "category": "Motos",
        "price": 0,
        "image": "",
        "slogan": "Make Life a Ride",
        "features": [],
        "gallery": [],
        "versions": [],
        "isHybrid": False,
        "isElectric": False
    }

    # Basic Info
    name_match = re.search(r'modelo:\s*"(.*?)"', content)
    if name_match: data["name"] = name_match.group(1)
    
    cat_match = re.search(r'categoria:\s*"(.*?)"', content)
    if cat_match: data["category"] = cat_match.group(1)

    fuel_match = re.search(r'combustible:\s*"(.*?)"', content)
    if fuel_match:
        fuel = fuel_match.group(1).lower()
        if "eléctrico" in fuel or "electric" in fuel:
            data["isElectric"] = True

    # Slogan
    lines = content.split('\n')
    for l in lines[1:8]:
        l_strip = l.strip()
        if ":" not in l_strip and len(l_strip.split()) > 3 and "archivo" not in l_strip.lower() and "metadata" not in l_strip.lower():
            data["slogan"] = l_strip
            break

    # Features
    feat_section = re.search(r'caracteristicas_destacadas:(.*?)(?:2\.|$)', content, re.DOTALL)
    if feat_section:
        feats_raw = re.findall(r'-\s*nombre:\s*"(.*?)"\s*descripcion:\s*"(.*?)"', feat_section.group(1), re.DOTALL)
        for name, desc in feats_raw:
            data["features"].append({
                "title": name.strip(),
                "desc": desc.strip()
            })

    # Versions & Prices
    version_section = re.search(r'versiones:(.*?)(?:3\.|$)', content, re.DOTALL)
    if version_section:
        v_blocks = re.split(r'-\s*version:', version_section.group(1))[1:]
        for block in v_blocks:
            v_name_match = re.match(r'\s*"(.*?)"', block)
            if v_name_match:
                v_name = v_name_match.group(1)
                
                # Prices
                price_match = re.search(r'precio_final_con_bono:\s*(\d+)', block)
                list_price_match = re.search(r'precio_lista:\s*(\d+)', block)
                
                final_p = int(price_match.group(1)) if price_match else 0
                list_p = int(list_price_match.group(1)) if list_price_match else final_p
                
                if data["price"] == 0 or (final_p > 0 and final_p < data["price"]):
                    data["price"] = final_p

                # Specs
                motor = re.search(r'motor:\s*"(.*?)"', block)
                caja = re.search(r'caja:\s*"(.*?)"', block)
                traccion = re.search(r'traccion:\s*"(.*?)"', block)
                hp = re.search(r'hp:\s*(\d+)', block)
                hp_eq = re.search(r'hp_equivalente:\s*(\d+)', block)

                actual_hp = hp.group(1) if hp else (hp_eq.group(1) if hp_eq else "")

                data["versions"].append({
                    "name": v_name,
                    "transmission": caja.group(1) if caja else "Manual",
                    "traction": traccion.group(1) if traccion else "Cadena",
                    "fuel": "Eléctrico" if data["isElectric"] else "Gasolina",
                    "motor": motor.group(1) if motor else "",
                    "power": f"{actual_hp} CV" if actual_hp else "",
                    "listPrice": list_p,
                    "bonus": list_p - final_p,
                    "bonusPrice": final_p
                })

    return data

def main():
    all_models = []
    folders = [f for f in sorted(os.listdir(BASE_PATH)) if os.path.isdir(os.path.join(BASE_PATH, f))]
    
    for folder in folders:
        folder_path = os.path.join(BASE_PATH, folder)
        info_path = os.path.join(folder_path, "info.md")
        
        if os.path.exists(info_path):
            model_data = parse_info_md(info_path, folder)
            rel_root = f"{REL_PATH_BRAND}/{folder}"
            
            # Look for main image
            files = os.listdir(folder_path)
            # Prioritize min- or main-
            main_img = next((f for f in files if (f.lower().startswith('min-') or f.lower().startswith('main-')) and f.lower().endswith(('.png', '.webp', '.jpg', '.avif'))), "")
            if not main_img:
                main_img = next((f for f in files if f.lower().endswith(('.png', '.webp', '.jpg', '.avif')) and "info.md" not in f.lower() and os.path.isfile(os.path.join(folder_path, f))), "")
            
            model_data["image"] = normalize_nfc(f"{rel_root}/{main_img}") if main_img else ""
            
            # Gallery
            model_data["gallery"] = get_image_paths(os.path.join(folder_path, "galeria"), f"{rel_root}/galeria")
            
            # Features Images
            feat_imgs = get_image_paths(os.path.join(folder_path, "caracteristicas"), f"{rel_root}/caracteristicas")
            for i, feat in enumerate(model_data["features"]):
                if i < len(feat_imgs):
                    feat["image"] = feat_imgs[i]
            
            # Banners
            banners = get_image_paths(os.path.join(folder_path, "banner"), f"{rel_root}/banner")
            if banners:
                model_data["desktopBanner"] = banners[0]
                model_data["mobileBanner"] = banners[0]
            
            # Video
            with open(info_path, 'r', encoding='utf-8') as f:
                c = f.read()
                vid_match = re.search(r'youtu\.be/([a-zA-Z0-9_-]+)', c)
                if vid_match:
                    model_data["videoUrl"] = f"https://www.youtube.com/embed/{vid_match.group(1)}"

            all_models.append(model_data)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("import { Vehicle } from './types';\n\n")
        f.write(f"export const BMW_MOTORRAD_MODELS: Vehicle[] = {json.dumps(all_models, indent=4, ensure_ascii=False)};\n")

    print(f"Finished! Processed {len(all_models)} models.")

if __name__ == "__main__":
    main()
