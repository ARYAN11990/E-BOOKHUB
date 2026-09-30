const fs = require('fs');
let data = fs.readFileSync('src/app/page.tsx', 'utf-8');
data = data.replace('18,000+', '4,500+');
data = data.replace('18,000</span>', '4,576</span>');
fs.writeFileSync('src/app/page.tsx', data);
