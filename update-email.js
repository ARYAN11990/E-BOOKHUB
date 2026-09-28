const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

data = data.replace('Email Address *', 'Email Address (Optional)');
data = data.replace('<input type="email" name="email" required', '<input type="email" name="email"');

fs.writeFileSync('src/app/checkout/page.tsx', data);
