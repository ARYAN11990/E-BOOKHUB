const fs = require('fs');
let data = fs.readFileSync('src/components/layout/Footer.tsx', 'utf-8');

data = data.replace(/<span className="text-2xl font-extrabold text-white tracking-tight">\s*Learnora\s*<\/span>/, '');
data = data.replace(/className="h-8 w-auto/g, 'className="h-12 w-auto');

fs.writeFileSync('src/components/layout/Footer.tsx', data);
