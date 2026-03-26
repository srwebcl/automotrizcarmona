#!/usr/bin/env python3
"""
migrate_bmw_to_v2.py
Convierte el único archivo "info-modelos.md" de BMW en archivos individuales 
info.md (formato v2.0) dentro de cada carpeta bajo public/images/BMW/.

"""

import re
import unicodedata
from pathlib import Path

BASE_DIR = Path("public/images/BMW")
INFO_FILE = BASE_DIR / "info-modelos.md"

def normalize_name(name):
    # Eliminar acentos, comillas y espacios para matchear fácil
    name = unicodedata.normalize('NFKD', name).encode('ASCII', 'ignore').decode('utf-8')
    return re.sub(r'[\s\-]+', '', name.lower())

def guess_vehicle_type(brand_folder, category, iva):
    if "motorrad" in brand_folder.lower(): return "moto"
    commercial_brands = ["iveco", "man", "foton", "vw-camiones", "foton-camiones"]
    if any(b in brand_folder.lower() for b in commercial_brands): return "camion-bus"
    if any(k in category.lower() for k in ["bus", "camion", "camión", "truck"]): return "camion-bus"
    return "liviano"

def block_between(content, start_key, end_keys):
    pattern = rf"{re.escape(start_key)}:?\s*\n([\s\S]*?)(?={'|'.join(re.escape(k) for k in end_keys)}|$)"
    m = re.search(pattern, content, re.IGNORECASE)
    return m.group(1).strip() if m else ""

def parse_versions_block(content):
    m = re.search(r"VERSIONES?\s*:\s*\n([\s\S]+?)(?:={10,}|$)", content, re.IGNORECASE)
    if not m: return []
    block = m.group(1)
    
    lines = block.split("\n")
    versions = []
    current = None
    
    for line in lines:
        stripped = line.strip()
        if not stripped: continue
        
        kv = re.match(r"^([A-Za-záéíóúÁÉÍÓÚñÑ\s/]+?)\s*:\s*(.*)$", stripped)
        if kv:
            # check the key
            k = kv.group(1).strip().lower()
            if "hace rato" not in k and "si hay" not in k:  # anti false positive
                v = kv.group(2).strip()
                if current is not None:
                    current[k] = v
        elif not stripped.startswith("http") and not stripped.startswith("==") and not stripped.startswith("-"):
            if current is not None:
                versions.append(current)
            current = {"_name": stripped}
            
    if current is not None:
        versions.append(current)

    result = []
    for v in versions:
        name = v.get("_name", "-")
        if not name or name == "-": continue

        precio_lista_raw = v.get("precio de lista", v.get("precio lista", "0")).replace("$", "").replace(".", "").replace(",", "").strip()
        bono_raw = v.get("bono del mes", v.get("bono financiamiento", "0")).replace("$", "").replace(".", "").replace(",", "").strip()

        def to_num(s):
            try: return int(re.sub(r"[^\d]", "", s))
            except: return 0

        lista_num = to_num(precio_lista_raw)
        bono_num = to_num(bono_raw)
        precio_final = lista_num - bono_num if lista_num > 0 and bono_num > 0 else lista_num

        def fmt(n):
            return f"${n:,}".replace(",", ".") if n > 0 else "-"

        result.append({
            "name": name,
            "motor": v.get("motor", "-"),
            "combustible": v.get("combustible", v.get("fuel", "-")),
            "transmision": v.get("transmisión", v.get("transmision", v.get("transmission", "-"))),
            "rendimiento": v.get("consumo", v.get("rendimiento", v.get("rendimiento mixto", "-"))),
            "autonomia": v.get("autonomía eléctrica", v.get("autonomia", "-")),
            "potencia": v.get("potencia", v.get("hp", "-")),
            "torque": v.get("par_motor", v.get("torque", "-")),
            "traccion": v.get("tracción", v.get("traccion", "-")),
            "puertas": v.get("puertas", "-"),
            "asientos": v.get("asientos", "-"),
            "airbags": v.get("airbags", "-"),
            "precio_lista": fmt(lista_num),
            "bono_marca": "-",
            "bono_financiamiento": fmt(bono_num) if bono_num > 0 else "-",
            "precio_final": fmt(precio_final),
        })
    return result

def run():
    if not INFO_FILE.exists():
        print(f"No se encontró {INFO_FILE}")
        return

    content = INFO_FILE.read_text(encoding='utf-8')
    blocks = re.split(r'(?=https?://(?:www\.)?bmw\.cl/modelos/)', content)
    
    # Map physical folders
    folder_map = {}
    for d in BASE_DIR.iterdir():
        if d.is_dir() and d.name.lower() not in ['banner', 'galeria', 'caracteristicas']:
            folder_map[normalize_name(d.name)] = d.name

    # Agregamos manualmente la corrección de SERIE 7 -> SERIE 7 HIBRIDO
    folder_map[normalize_name("SERIE 7")] = "SERIE 7 HIBRIDO"

    ok = 0
    
    for block in blocks:
        if not block.strip(): continue
        
        url_m = re.search(r'(https?://(?:www\.)?bmw\.cl/modelos/\S+)', block)
        url = url_m.group(1).strip() if url_m else "-"
        slug_m = re.search(r"https?://[^\s]+/([^\s/]+)", url)
        slug = slug_m.group(1) if slug_m else "-"

        m_model = re.search(r'MODELO:\s*(.+)$', block, re.MULTILINE|re.IGNORECASE)
        m_cat = re.search(r'CATEGOR(?:Í|I)A:\s*(.+)$', block, re.MULTILINE|re.IGNORECASE)
        
        if not m_model: continue
        model_name = m_model.group(1).strip()
        categoria = m_cat.group(1).strip() if m_cat else "-"
        
        norm_model = normalize_name(model_name)
        if norm_model not in folder_map:
            print(f"⚠️ No se encontró carpeta para: {model_name}")
            continue

        folder_name = folder_map[norm_model]
        
        # Slogan is the 1-line text right after the CATEGORIA line but before precio
        # we can just grab lines not matching keywords
        slogan = "-"
        lines = block.split('\n')
        for i, line in enumerate(lines):
            l = line.strip()
            if l.startswith("CATEGOR") and i+1 < len(lines):
                nxt = lines[i+1].strip()
                if nxt and not nxt.startswith("Precio de Lista") and not nxt.startswith("https:"):
                    slogan = nxt
                elif i+2 < len(lines):
                    nxt2 = lines[i+2].strip()
                    if nxt2 and not nxt2.startswith("Precio de Lista") and not nxt2.startswith("https:"):
                        slogan = nxt2
                break

        video_m = re.search(r'(https?://(?:youtu\.be|www\.youtube\.com)\S+)', block)
        video = video_m.group(1).strip() if video_m else "-"

        char_block = block_between(block, "CARACTERISTICAS", ["VERSIONES", "====="]) or \
                     block_between(block, "CARACTERÍSTICAS", ["VERSIONES", "====="])
        char_lines = [l.strip() for l in char_block.split('\n') if l.strip()]
        
        characteristics = []
        i = 0
        while i < len(char_lines):
            title = char_lines[i]
            desc = char_lines[i+1] if i+1 < len(char_lines) else "-"
            characteristics.append((title, desc))
            i += 2
        
        if not characteristics:
            characteristics = [("-", "-"), ("-", "-"), ("-", "-")]

        versions = parse_versions_block(block)
        if not versions:
            versions = [{
                "name": f"{model_name} Base",
                "motor": "-", "combustible": "-", "transmision": "-",
                "rendimiento": "-", "autonomia": "-", "potencia": "-",
                "torque": "-", "traccion": "-", "puertas": "-",
                "asientos": "-", "airbags": "-",
                "precio_lista": "-", "bono_marca": "-",
                "bono_financiamiento": "-", "precio_final": "-",
            }]

        tipo = guess_vehicle_type("BMW", categoria, "Sí")

        # Compose v2.0 markdown
        md_lines = [
            f"# PLANTILLA v2.0 — Automotriz Carmona",
            f"# Migrado automáticamente (BMW Split Script).",
            f"",
            f"{url}",
            f"",
            f"MARCA: BMW",
            f"MODELO: {model_name}",
            f"TIPO: {tipo}",
            f"CATEGORÍA: {categoria}",
            f"SLOGAN: {slogan}",
            f"IVA INCLUIDO: Sí",
            f"",
            f"VIDEO: {video}",
            f"",
            f"CARACTERÍSTICAS:",
        ]
        
        for idx, (t, d) in enumerate(characteristics[:4], 1):
            md_lines += [
                f"",
                f"CARACTERÍSTICA {idx}:",
                f"Título: {t}",
                f"Descripción: {d}",
            ]
            
        md_lines += ["", "VERSIONES:"]
        for v in versions:
            md_lines += [
                f"",
                f"VERSIÓN:",
                f"Nombre: {v['name']}",
                f"Motor: {v['motor']}",
                f"Combustible: {v['combustible']}",
                f"Transmisión: {v['transmision']}",
                f"Rendimiento Mixto: {v['rendimiento']}",
                f"Autonomía Eléctrica: {v['autonomia']}",
                f"Potencia: {v['potencia']}",
                f"Torque: {v['torque']}",
                f"Tracción: {v['traccion']}",
                f"Puertas: {v['puertas']}",
                f"Asientos: {v['asientos']}",
                f"Airbags: {v['airbags']}",
                f"PRECIO DE LISTA: {v['precio_lista']}",
                f"BONO MARCA: {v['bono_marca']}",
                f"BONO FINANCIAMIENTO: {v['bono_financiamiento']}",
                f"PRECIO CON FINANCIAMIENTO: {v['precio_final']}",
            ]

        md_lines += ["", "=================================================="]
        
        out_file = BASE_DIR / folder_name / "info.md"
        out_file.write_text("\n".join(md_lines) + "\n", encoding='utf-8')
        print(f"  [CREADO] -> {folder_name}/info.md")
        ok += 1

    # Optional: rename original file to avoid parsing it again in the future
    INFO_FILE.rename(BASE_DIR / "info-modelos.md.bak")
    print(f"\nFinalizado. {ok} modelos divididos correctamente. Archivo general backupeado.")

if __name__ == '__main__':
    run()
