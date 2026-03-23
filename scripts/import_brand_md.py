import os
import sys
import re
import json

def parse_markdown_to_models(md_path, brand_id):
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Find all starts of models
    lines_all = text.split('\n')
    models_parsed = []
    
    idx = 0
    while idx < len(lines_all):
        l = lines_all[idx].strip()
        # A model block starts with a URL and has 'MODELO:' within the next 5 lines
        if l.startswith('http') and idx + 1 < len(lines_all) and any('MODELO:' in x.upper() for x in lines_all[idx:idx+8]):
            url = l
            slug = url.split('/')[-1].split('#')[0].split('?')[0] # Clean URL id
            idx += 1
            
            # Gather lines for this model body
            body_start = idx
            while idx < len(lines_all):
                next_l = lines_all[idx].strip()
                if next_l.startswith('http') and idx + 1 < len(lines_all) and any('MODELO:' in x.upper() for x in lines_all[idx:idx+8]):
                    break
                idx += 1
                
            lines = [x.strip() for x in lines_all[body_start:idx]]
            
            model_data = {
                'id': slug,
                'name': slug.replace('-', ' ').title(),
                'category': 'Varios',
                'features': [],
                'versions': []
            }
            
            i = 0
            
            # 1. Parse Header
            while i < len(lines):
                ll = lines[i]
                if not ll:
                    i += 1
                    continue
                    
                if ll.upper().startswith('MODELO:'):
                    model_data['name'] = ll.split(':', 1)[1].strip()
                elif ll.upper().startswith('CATEGOR'):
                    model_data['category'] = ll.split(':', 1)[1].strip()
                elif 'PRECIO DE LISTA DESDE' in ll.upper():
                    price_str = re.sub(r'[^\d]', '', ll)
                    if price_str:
                        model_data['price'] = int(price_str)
                elif 'https://' in ll and ('youtube.com' in ll or 'youtu.be' in ll or '.mp4' in ll or 'volkswagen.cl' in ll):
                    # It's the video URL!
                    model_data['videoUrl'] = ll
                elif ll.upper().startswith('CARACTER'):
                    i += 1
                    break
                else:
                    if len(ll) > 3 and ':' not in ll and 'PRECIO' not in ll.upper() and 'HTTP' not in ll.upper() and '==' not in ll:
                        if 'slogan' not in model_data:
                            model_data['slogan'] = ll
                i += 1
                
            # 2. Parse Features
            while i < len(lines):
                if lines[i].upper() == 'VERSIONES:' or lines[i].upper() == 'VERSIONES':
                    break
                    
                if not lines[i] or '==' in lines[i]:
                    i += 1
                    continue
                    
                title = lines[i]
                i += 1
                desc = []
                while i < len(lines) and lines[i] and lines[i].upper() != 'VERSIONES:' and lines[i].upper() != 'VERSIONES' and '==' not in lines[i]:
                    desc.append(lines[i])
                    i += 1
                if title:
                    model_data['features'].append({'title': title, 'desc': ' '.join(desc)})
            
            # 3. Parse Versions
            while i < len(lines):
                if lines[i].upper().startswith('VERSIONES'):
                    i += 1
                    break
                i += 1
                
            curr_version = None
            while i < len(lines):
                ll = lines[i]
                if not ll:
                    i += 1
                    continue
                if 'HTTPS://' in ll.upper() or '==' in ll:
                    break
                    
                if ':' not in ll or ll.upper().startswith('PRECIO') or ll.upper().startswith('BONO'):
                    if ':' in ll:
                        k = ll.split(':')[0].strip().upper()
                        v = ll.split(':', 1)[1].strip()
                        price_val = int(re.sub(r'[^\d]', '', v)) if re.sub(r'[^\d]', '', v) else 0
                        if k == 'PRECIO DE LISTA' and curr_version: 
                            curr_version['listPrice'] = price_val
                        elif 'BONO' in k and curr_version:
                            curr_version['bonus'] = price_val
                    else:
                        if curr_version: 
                            model_data['versions'].append(curr_version)
                        curr_version = {
                            'name': ll, 'listPrice': 0, 'bonus': 0, 
                            'transmission': 'N/A', 'traction': 'N/A', 
                            'fuel': 'N/A', 'motor': 'N/A', 'power': 'N/A', 'torque': 'N/A'
                        }
                else:
                    k = ll.split(':')[0].strip().upper()
                    v = ll.split(':', 1)[1].strip() if len(ll.split(':', 1)) > 1 else ''
                    if curr_version:
                        if k == 'MOTOR': curr_version['motor'] = v
                        elif 'TRANSMISI' in k: curr_version['transmission'] = v
                        elif 'TRACCI' in k: curr_version['traction'] = v
                        elif 'CONSUMO' in k: curr_version['fuel'] = v
                        elif 'POTENCIA' in k: curr_version['power'] = v
                        elif 'TORQUE' in k: curr_version['torque'] = v

                i += 1
                
            if curr_version:
                model_data['versions'].append(curr_version)
                
            for v in model_data['versions']:
                v['bonusPrice'] = v['listPrice'] - v.get('bonus', 0)
                
            models_parsed.append(model_data)
        else:
            idx += 1
        
    # Phase 2: Open target TS Registry file and inject data
    registry_path = 'lib/models/MODELS.json' # Let's save output purely to be copied to TS, or rewrite the TS
    # Since modifying TS AST via python is complex generically, we will just output a JSON block that the user can paste, OR update a JSON file directly.
    # To keep your existing structure, let's output a valid TS array strictly
    
    ts_content = f"import {{ Vehicle }} from './types';\n\nexport const {brand_id.upper()}_MODELS: Vehicle[] = "
    ts_content += json.dumps(models_parsed, indent=4, ensure_ascii=False)
    ts_content += ";\n"
    
    out_file = f"lib/models/{brand_id.lower()}.ts"
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
        
    print(f"SUCCESS: Escribió {len(models_parsed)} modelos procesados de {brand_id} en {out_file}.")
    print("Recuerda exportarlos en lib/models/index.ts y lib/models/registry.ts!")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Uso: python scripts/import_brand_md.py <ruta_del_markdown.md> <id_de_la_marca>")
        print("Ej: python scripts/import_brand_md.py public/images/Toyota/info.md toyota")
        sys.exit(1)
        
    parse_markdown_to_models(sys.argv[1], sys.argv[2])
