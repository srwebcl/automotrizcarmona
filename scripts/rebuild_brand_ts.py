#!/usr/bin/env python3
"""
rebuild_brand_ts.py
Genera o actualiza el archivo lib/models/{brand}.ts leyendo todos los archivos 
info.md (formato v2.0) dentro de public/images/{brand}/**/

Uso:
  python3 scripts/rebuild_brand_ts.py <brand_folder> <ts_file_name>
Ejemplo:
  python3 scripts/rebuild_brand_ts.py BMW bmw
"""

import sys
import re
import json
from pathlib import Path

BASE_IMG = Path("public/images")
MODELS_DIR = Path("lib/models")

def get_field(content: str, key: str) -> str:
    pattern = rf"^{re.escape(key)}\s*:\s*(.+)$"
    m = re.search(pattern, content, re.IGNORECASE | re.MULTILINE)
    return m.group(1).strip() if m else ""

def block_between(content: str, start_key: str, end_keys: list[str]) -> str:
    pattern = rf"{re.escape(start_key)}:?\s*\n([\s\S]*?)(?={'|'.join(re.escape(k) for k in end_keys)}|$)"
    m = re.search(pattern, content, re.IGNORECASE)
    return m.group(1).strip() if m else ""

def to_int(s: str) -> int:
    try:
        return int(re.sub(r"[^\d]", "", s))
    except:
        return 0

def parse_versions(content: str) -> list[dict]:
    m = re.search(r"VERSIONES?\s*:\s*\n([\s\S]+?)(?:={10,}|$)", content, re.IGNORECASE)
    if not m: return []
    block = m.group(1).split("VERSIÓN:")[1:]
    
    versions = []
    for v_block in block:
        lines = [l.strip() for l in v_block.strip().split("\n") if l.strip()]
        data = {}
        for line in lines:
            if ":" in line:
                k, v = line.split(":", 1)
                data[k.strip().lower()] = v.strip()
        
        name = data.get("nombre", "-")
        if name == "-": continue
            
        list_price = to_int(data.get("precio de lista", ""))
        brand_b = to_int(data.get("bono marca", ""))
        fin_b = to_int(data.get("bono financiamiento", ""))
        final_p = to_int(data.get("precio con financiamiento", ""))
        
        # fallback
        if final_p == 0 and list_price > 0:
            final_p = list_price - brand_b - fin_b
            
        doors = data.get("puertas", "-")
        seats = data.get("asientos", "-")
        airbags = data.get("airbags", "-")

        versions.append({
            "name": name,
            "motor": data.get("motor", "-"),
            "fuel": data.get("combustible", "-"),
            "transmission": data.get("transmisión", data.get("transmision", "-")),
            "consumptionMixed": data.get("rendimiento mixto", "-"),
            "electricRange": data.get("autonomía eléctrica", "-"),
            "power": data.get("potencia", "-"),
            "torque": data.get("torque", "-"),
            "traction": data.get("tracción", data.get("traccion", "-")),
            "doors": int(doors) if doors.isdigit() else None,
            "seats": int(seats) if seats.isdigit() else None,
            "airbags": int(airbags) if airbags.isdigit() else None,
            "listPrice": list_price,
            "brandBonus": brand_b,
            "financingBonus": fin_b,
            "bonusPrice": final_p
        })
    return versions

def run(brand_folder: str, ts_name: str):
    folder_path = BASE_IMG / brand_folder
    if not folder_path.exists():
        print(f"La carpeta {folder_path} no existe.")
        return

    info_files = list(folder_path.rglob("info.md"))
    if not info_files:
        print(f"No se encontraron archivos info.md en {folder_path}.")
        return

    print(f"Analizando {len(info_files)} archivos info.md en {brand_folder}...")
    
    models = []
    for path in sorted(info_files):
        content = path.read_text(encoding="utf-8")
        
        url_m = re.search(r"https?://[^\s]+", content)
        if url_m:
            slug = url_m.group(0).split("/")[-1]
        else:
            slug = path.parent.name.lower().replace(" ", "-")
            
        brand = get_field(content, "MARCA").lower()
        if not brand: brand = ts_name
            
        name = get_field(content, "MODELO")
        category = get_field(content, "CATEGORÍA")
        slogan = get_field(content, "SLOGAN")
        tipo = get_field(content, "TIPO")
        iva_str = get_field(content, "IVA INCLUIDO").lower()
        iva_inc = False if iva_str == "no" else True
        video = get_field(content, "VIDEO")

        # Parse characteristics
        char_block = block_between(content, "CARACTERÍSTICAS", ["VERSIONES", "======"])
        features = []
        for i in range(1, 5):
            t_m = re.search(rf"CARACTERÍSTICA {i}:[\s\S]*?Título:\s*(.+)", char_block)
            d_m = re.search(rf"CARACTERÍSTICA {i}:[\s\S]*?Descripción:\s*(.+)", char_block)
            if t_m and d_m:
                t = t_m.group(1).strip()
                d = d_m.group(1).strip()
                if t != "-" and d != "-":
                    # Intentar buscar la imagen local equivalente
                    # images/[brand]/[MODELO]/caracteristicas/[nombre].*
                    feat_img = ""
                    carac_dir = path.parent / "caracteristicas"
                    if carac_dir.exists():
                        imgs = list(carac_dir.glob("*.*"))
                        if i-1 < len(imgs):
                            feat_img = f"/{imgs[i-1].relative_to('public')}"
                            
                    features.append({
                        "title": t,
                        "desc": d,
                        "image": feat_img
                    })

        versions = parse_versions(content)
        
        # Find min price
        base_price = min((v["bonusPrice"] for v in versions if v["bonusPrice"] > 0), default=0)
        
        # Check hybrid/electric broadly
        is_hybrid = False
        is_electric = False
        for v in versions:
            f = v.get("fuel", "").lower()
            if "hibrido" in f or "híbrido" in f: is_hybrid = True
            if "electrico" in f or "eléctrico" in f: is_electric = True
            
        cat_lower = category.lower()
        if "híbrido" in cat_lower or "hibrido" in cat_lower: is_hybrid = True
        if "eléctrico" in cat_lower or "electrico" in cat_lower: is_electric = True

        # Find images
        img_min = ""
        for ext in [".png", ".jpg", ".jpeg", ".webp", ".avif"]:
            minf = path.parent / f"min{ext}"
            if not minf.exists():
                 # buscar min-algocosa
                alts = list(path.parent.glob(f"min-*{ext}"))
                if alts: minf = alts[0]
            if minf.exists():
                img_min = f"/{minf.relative_to('public')}"
                break
                
        # fallback img
        if not img_min:
            imgs = [i for i in path.parent.iterdir() if i.is_file() and i.suffix in [".png", ".jpg", ".webp", ".avif"] and not i.name.startswith("banner")]
            if imgs: img_min = f"/{imgs[0].relative_to('public')}"

        # Banner desktop
        desk_banner = ""
        banner_dir = path.parent / "banner"
        if banner_dir.exists():
            for b in banner_dir.iterdir():
                if "movil" not in b.name.lower() and b.suffix in [".png", ".jpg", ".webp", ".avif"]:
                    desk_banner = f"/{b.relative_to('public')}"
                    break
        elif path.parent.exists():
            # Buscar en raíz
            for b_file in path.parent.iterdir():
                 if b_file.is_file() and b_file.name.lower().startswith('banner') and "movil" not in b_file.name.lower():
                     if b_file.suffix in [".png", ".jpg", ".webp", ".avif"]:
                         desk_banner = f"/{b_file.relative_to('public')}"
                         break
                         
        gallery_imgs = []
        gal_dir = path.parent / "galeria"
        if gal_dir.exists():
            gallery_imgs = [f"/{g.relative_to('public')}" for g in sorted(gal_dir.glob("*.*")) if g.suffix in [".jpg",".png",".webp",".avif"]]

        model_dict = {
            "id": slug,
            "brand": ts_name,
            "name": name,
            "category": category,
            "price": base_price,
            "image": img_min,
            "vehicleType": tipo if tipo != "-" else "liviano",
            "ivaIncluded": iva_inc,
            "isHybrid": is_hybrid,
            "isElectric": is_electric,
            "isNew": False, # Por default
            "versions": versions
        }
        
        if slogan and slogan != "-": model_dict["slogan"] = slogan
        if video and video != "-": model_dict["videoUrl"] = video
        if features: model_dict["features"] = features
        if gallery_imgs: model_dict["gallery"] = gallery_imgs
        if desk_banner: model_dict["desktopBanner"] = desk_banner
        
        # Clean null values
        for v in versions:
            empty_keys = [k for k, val in v.items() if val is None]
            for k in empty_keys: del v[k]
        
        models.append(model_dict)

    # Escribir TS
    var_name = f"{ts_name.replace('-', '_').upper()}_MODELS"
    
    # Formateo manual dict a list de TS para evitar problemas con comillas
    import pprint
    
    class TSFormatter:
        def __repr__(self): return ""
        
    def format_val(v):
        if isinstance(v, bool): return "true" if v else "false"
        if isinstance(v, str): return json.dumps(v)
        if isinstance(v, list): 
            if not v: return "[]"
            res = "[\n"
            for item in v: res += f"            {format_val(item)},\n"
            res += "        ]"
            return res
        if isinstance(v, dict):
            res = "{\n"
            for k, val in v.items():
                if val == "-" or val == "" or val is None:
                    if k not in ["category", "fuel", "transmission", "traction"]:
                        continue
                res += f"            {k}: {format_val(val)},\n"
            res += "        }"
            return res
        return str(v)

    ts_code = f"import {{ Vehicle }} from './types';\n\nexport const {var_name}: Vehicle[] = [\n"
    for m in models:
        ts_code += "    {\n"
        for k, v in m.items():
            if v == "-" or v == "" or (isinstance(v, list) and not v):
                if k not in ["category"]:
                    continue
            
            # format values
            formatted = format_val(v)
            if formatted == "{}": continue
            
            ts_code += f"        {k}: {formatted},\n"
        ts_code += "    },\n"
    ts_code += "];\n"

    ts_path = MODELS_DIR / f"{ts_name}.ts"
    ts_path.write_text(ts_code, encoding="utf-8")
    print(f"✅ Generado: {ts_path} con {len(models)} modelos.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python3 rebuild_brand_ts.py <CARPETA_EN_PUBLIC> <NOMBRE_ARCHIVO_TS>")
        sys.exit(1)
    run(sys.argv[1], sys.argv[2])
