const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

data = data.replace(/\/\/ @ts-ignore/g, '// eslint-disable-next-line @typescript-eslint/no-explicit-any');

fs.writeFileSync('src/app/checkout/page.tsx', data);
