const fs = require('fs');

let layout = fs.readFileSync('src/app/layout.tsx', 'utf-8');
layout = layout.replace(/import \{ CartProvider \} from ["']@\/context\/CartContext["'];?\n?/g, '');
fs.writeFileSync('src/app/layout.tsx', layout);

let header = fs.readFileSync('src/components/layout/Header.tsx', 'utf-8');
header = header.replace(/import \{ useCart \} from ["']@\/context\/CartContext["'];?\n?/g, '');
fs.writeFileSync('src/components/layout/Header.tsx', header);
