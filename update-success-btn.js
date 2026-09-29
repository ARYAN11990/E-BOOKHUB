const fs = require('fs');
let data = fs.readFileSync('src/app/payment-success/page.tsx', 'utf-8');

const regex = /<button[\\s\\S]*?<\\/button>/;
const replacement = `{course ? (
          <a 
            href={\`/pdfs/\${course.id}.pdf\`} 
            download
            className="w-full btn-primary py-4 flex items-center justify-center text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Your PDF
          </a>
        ) : null}`;

data = data.replace(regex, replacement);
fs.writeFileSync('src/app/payment-success/page.tsx', data);
