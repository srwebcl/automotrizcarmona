#!/usr/bin/env python3
"""
migrate_info_md.py
Migra todos los info.md existentes al formato unificado v2.0.
Los campos nuevos que no existen en el archivo original se agregan con valor "-".
Ejecutar desde la raíz del proyecto.
"""

import os
import re
from pathlib import Path

BASE = Path("public/images")

# ──────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────

def get_field(content: str, key: str) -> str:
    """Extrae el valor de un campo 'KEY: valor' del contenido."""
    pattern = rf"^{re.escape(key)}\s*:\s*(.+)$"
    m = re.search(pattern, content, re.IGNORECASE | re.MULTILINE)
    return m.group(1).strip() if m else "-"

def block_between(content: str, start_key: str, end_keys: list[str]) -> str:
    """Extrae el bloque de texto entre start_key y la primera ocurrencia de cualquier end_key."""
    pattern = rf"{re.escape(start_key)}:?\s*\n([\s\S]*?)(?={'|'.join(re.escape(k) for k in end_keys)}|$)"
    m = re.search(pattern, content, re.IGNORECASE)
    return m.group(1).strip() if m else ""

def parse_price(text: str) -> str:
    """Limpia y devuelve el precio como texto plano."""
    cleaned = re.sub(r"[\$\s,]", "", text).strip()
    # normaliza puntos como separadores de miles
    cleaned = cleaned.replace(".", "")
    if cleaned.isdigit() and int(cleaned) > 0:
        return f"${int(cleaned):,}".replace(",", ".")
    return "-"

def guess_vehicle_type(brand_folder: str, category: str, iva: str) -> str:
    if "motorrad" in brand_folder.lower():
        return "moto"
    camiones_brands = ["iveco", "man", "foton", "vw-camiones", "foton-camiones"]
    if any(b in brand_folder.lower() for b in camiones_brands):
        return "camion-bus"
    cat_lower = category.lower()
    if any(k in cat_lower for k in ["bus", "camion", "camión", "truck"]):
        return "camion-bus"
    return "liviano"

def guess_iva(brand_folder: str, content: str, model_name: str, category: str) -> str:
    commercial_brands = ["iveco", "man", "foton"]
    if any(b in brand_folder.lower() for b in commercial_brands):
        return "No"
    # pick-up en categoría comercial
    cat_lower = category.lower()
    model_lower = model_name.lower()
    if any(k in cat_lower for k in ["pick-up", "pickup"]) and "doble cabina carga" in model_lower:
        return "No"
    return "Sí"

def parse_versions_block(content: str) -> list[dict]:
    """
    Intenta extraer las versiones del bloque VERSIONES: del info.md viejo.
    Devuelve lista de dicts con los campos del nuevo formato.
    """
    # Find the VERSIONES block
    m = re.search(r"VERSIONES?\s*:\s*\n([\s\S]+?)(?:={10,}|$)", content, re.IGNORECASE)
    if not m:
        return []
    block = m.group(1)

    # Split versions by looking for lines that don't have a colon and are not empty
    # (version names are lines without colon)
    lines = block.split("\n")
    versions = []
    current = None

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        # Check if it's a key: value pair
        kv = re.match(r"^([A-Za-záéíóúÁÉÍÓÚñÑ\s/]+?)\s*:\s*(.*)$", stripped)
        if kv:
            k = kv.group(1).strip().lower()
            v = kv.group(2).strip()
            if current is not None:
                current[k] = v
        elif not stripped.startswith("http") and not stripped.startswith("=="):
            # Likely a version name
            if current is not None:
                versions.append(current)
            current = {"_name": stripped}
    if current is not None:
        versions.append(current)

    result = []
    for v in versions:
        name = v.get("_name", "-")
        if not name or name == "-":
            continue

        # Normalize price fields
        precio_lista_raw = v.get("precio de lista", v.get("precio lista", "0")).replace("$", "").replace(",", "").replace(".", "").strip()
        bono_raw = v.get("bono del mes", v.get("bono financiamiento", v.get("bono autofin", "0"))).replace("$", "").replace(",", "").replace(".", "").strip()
        bono_fin_raw = v.get("precio con financiamiento", v.get("precio final con bono", v.get("bono_financiamiento", "0"))).replace("$", "").replace(",", "").replace(".", "").strip()

        def to_num(s):
            try:
                return int(re.sub(r"[^\d]", "", s))
            except:
                return 0

        lista_num = to_num(precio_lista_raw)
        bono_num = to_num(bono_raw)
        fin_raw_num = to_num(bono_fin_raw)
        # If "precio con financiamiento" was parsed as bonus, recalculate
        if fin_raw_num > 0 and fin_raw_num < lista_num:
            precio_final = fin_raw_num
        elif lista_num > 0 and bono_num > 0:
            precio_final = lista_num - bono_num
        else:
            precio_final = lista_num

        def fmt(n):
            return f"${n:,}".replace(",", ".") if n > 0 else "-"

        result.append({
            "name": name,
            "motor": v.get("motor", "-"),
            "combustible": v.get("combustible", v.get("fuel", "-")),
            "transmision": v.get("transmisión", v.get("transmision", v.get("transmission", "-"))),
            "rendimiento": v.get("consumo", v.get("rendimiento", v.get("rendimiento mixto", v.get("consumo_wmtc", "-")))),
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

def build_new_info_md(brand_folder: str, model_folder: str, content: str) -> str:
    """Genera el nuevo info.md en formato v2.0."""

    # URL / slug
    url_m = re.search(r"https?://[^\n]+", content)
    url = url_m.group(0).strip() if url_m else f"https://automotrizcarmona.cl/modelos/{model_folder.lower().replace(' ', '-')}"
    slug_m = re.search(r"https?://[^\s]+/([^\s/]+)$", url)
    slug = slug_m.group(1) if slug_m else model_folder.lower().replace(" ", "-")

    # Basic fields
    modelo = get_field(content, "modelo")
    if modelo == "-":
        modelo = model_folder
    categoria = get_field(content, "categoría") or get_field(content, "categoria") or get_field(content, "CATEGORÍA")
    if categoria == "-":
        categoria = get_field(content, "categoria")

    slogan_m = re.search(r"^(?!MODELO|MARCA|CATEGORÍA|CATEGORIA|TIPO|IVA|VERSION|VERSIONES|CARACTERISTICA|PRECIO|BONO)([A-ZÁÉÍÓÚÑ][^\n]{5,60})\s*$", content, re.MULTILINE)
    slogan = slogan_m.group(1).strip() if slogan_m else "-"

    tipo = guess_vehicle_type(brand_folder, categoria, "")
    iva = guess_iva(brand_folder, content, modelo, categoria)

    # Video
    video_m = re.search(r"https?://(?:youtu\.be|www\.youtube\.com)[^\s]+", content)
    video = video_m.group(0).strip() if video_m else "-"

    # Characteristics block
    char_block = block_between(content, "CARACTERÍSTICAS", ["VERSIONES", "======"])
    if not char_block:
        char_block = block_between(content, "CARACTERISTICAS", ["VERSIONES", "======"])

    # Parse characteristics into title/description pairs
    char_lines = [l.strip() for l in char_block.split("\n") if l.strip()]
    characteristics = []
    i = 0
    while i < len(char_lines):
        title = char_lines[i]
        desc = char_lines[i+1] if i+1 < len(char_lines) else "-"
        if not re.match(r"^[A-Z]{2,}:", title):  # skip field-like lines
            characteristics.append((title, desc))
            i += 2
        else:
            i += 1
    if not characteristics:
        characteristics = [("-", "-"), ("-", "-"), ("-", "-")]

    # Versions
    versions = parse_versions_block(content)
    if not versions:
        versions = [{
            "name": f"{modelo} Base",
            "motor": "-", "combustible": "-", "transmision": "-",
            "rendimiento": "-", "autonomia": "-", "potencia": "-",
            "torque": "-", "traccion": "-", "puertas": "-",
            "asientos": "-", "airbags": "-",
            "precio_lista": "-", "bono_marca": "-",
            "bono_financiamiento": "-", "precio_final": "-",
        }]

    lines = [
        f"# PLANTILLA v2.0 — Automotriz Carmona",
        f"# Migrado automáticamente. Revisar y completar campos con \"-\".",
        f"",
        f"https://automotrizcarmona.cl/nuevos/{brand_folder.lower()}/{slug}",
        f"",
        f"MARCA: {brand_folder}",
        f"MODELO: {modelo}",
        f"TIPO: {tipo}",
        f"CATEGORÍA: {categoria}",
        f"SLOGAN: {slogan}",
        f"IVA INCLUIDO: {iva}",
        f"",
        f"VIDEO: {video}",
        f"",
        f"CARACTERÍSTICAS:",
    ]
    for idx, (title, desc) in enumerate(characteristics[:4], 1):
        lines += [
            f"",
            f"CARACTERÍSTICA {idx}:",
            f"Título: {title}",
            f"Descripción: {desc}",
        ]
    lines += ["", "VERSIONES:"]
    for v in versions:
        lines += [
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

    lines += ["", "=================================================="]
    return "\n".join(lines) + "\n"


def migrate_all():
    info_files = list(BASE.rglob("info.md"))
    print(f"Encontrados {len(info_files)} archivos info.md\n")
    ok = 0
    skip = 0
    for path in sorted(info_files):
        content = path.read_text(encoding="utf-8")
        # Skip already migrated
        if "PLANTILLA v2.0" in content:
            skip += 1
            print(f"  [YA MIGRADO]  {path}")
            continue
        # Determine brand folder (first dir under public/images/)
        rel = path.relative_to(BASE)
        brand_folder = rel.parts[0]
        model_folder = rel.parts[1] if len(rel.parts) > 2 else rel.parts[0]

        # Keep a backup
        backup = path.with_suffix(".md.bak")
        backup.write_text(content, encoding="utf-8")

        new_content = build_new_info_md(brand_folder, model_folder, content)
        path.write_text(new_content, encoding="utf-8")
        ok += 1
        print(f"  [OK]  {path}")

    print(f"\n✅ Migrados: {ok} | Ya migrados: {skip}")


if __name__ == "__main__":
    migrate_all()
