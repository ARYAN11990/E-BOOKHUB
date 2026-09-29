const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');
data = data.replace("router.push('/payment-success');", "router.push('/payment-success?courseId=' + course.id);");
fs.writeFileSync('src/app/checkout/page.tsx', data);
