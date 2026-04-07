const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'CONSILIDADO-LIVIANOS - carmona.csv');
const content = fs.readFileSync(csvPath, 'utf-8');
const lines = content.split('\n');

const dbFallback = {};

function cleanAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function toSlug(str) {
    if (!str) return '';
    return cleanAccents(str).replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV parser ignoring quotes for simple cases
    let cols = [];
    let inQuotes = false;
    let current = '';
    for (let c = 0; c < line.length; c++) {
        if (line[c] === '"') {
            inQuotes = !inQuotes;
        } else if (line[c] === ',' && !inQuotes) {
            cols.push(current);
            current = '';
        } else {
            current += line[c];
        }
    }
    cols.push(current);

    if (cols.length < 18) continue;

    const brand = toSlug(cols[0]);
    const model = toSlug(cols[1]);
    const version = toSlug(cols[2]);
    
    if (!dbFallback[brand]) dbFallback[brand] = {};
    if (!dbFallback[brand][model]) dbFallback[brand][model] = {};
    
    const cleanPrice = (p) => {
        if (!p) return 0;
        // Remove everything that's not a digit
        return parseInt(p.replace(/[^\d]/g, '')) || 0;
    };

    const engine = cols[10] === '-' ? '' : cols[10];
    const mixedPerf = cols[15] === '-' ? '' : cols[15];
    const powerHp = cols[17] === '-' ? '' : cols[17];
    const torqueNm = cols[18] === '-' ? '' : cols[18];
    const includesIva = cols[9]?.trim().toUpperCase() !== 'NO';

    dbFallback[brand][model][version] = {
        motor: engine,
        consumptionMixed: mixedPerf,
        power: powerHp,
        torque: torqueNm,
        brandBonus: cleanPrice(cols[4]),
        financingBonus: cleanPrice(cols[5]),
        listPrice: cleanPrice(cols[3]),
        bonusPrice: cleanPrice(cols[6]),
        ivaIncluded: includesIva
    };
}

fs.writeFileSync(path.join(__dirname, 'lib', 'csvFallback.json'), JSON.stringify(dbFallback, null, 2));
console.log("Generado csvFallback.json");
