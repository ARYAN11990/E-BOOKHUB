const fs = require('fs');
let data = fs.readFileSync('src/app/payment-success/page.tsx', 'utf-8');
data = data.replace(
  "href={`/pdfs/${course.id}.pdf`}",
  "href={course.pdfUrl || `/pdfs/${course.id}.pdf`}"
);
fs.writeFileSync('src/app/payment-success/page.tsx', data);
