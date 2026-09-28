const fs = require('fs');

let header = fs.readFileSync('src/components/layout/Header.tsx', 'utf-8');
header = header.replace(/\/logo\.jpg/g, '/logo.png');
header = header.replace(/className="h-9 w-auto/g, 'className="h-12 w-auto');
fs.writeFileSync('src/components/layout/Header.tsx', header);

let footer = fs.readFileSync('src/components/layout/Footer.tsx', 'utf-8');
footer = footer.replace(/\/logo\.jpg/g, '/logo.png');
footer = footer.replace(/className="h-10 w-auto/g, 'className="h-12 w-auto');
fs.writeFileSync('src/components/layout/Footer.tsx', footer);
