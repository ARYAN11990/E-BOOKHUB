const fs = require('fs');

let data = fs.readFileSync('src/app/payment-success/page.tsx', 'utf-8');

const targetStr = `{course ? (
          <a 
            href={course.pdfUrl || \`/pdfs/\${course.id}.pdf\`} 
            download
            className="w-full btn-primary py-4 flex items-center justify-center text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Download className="w-6 h-6 mr-3" />
            Download Your PDF
          </a>
        ) : null}`;

const newStr = `{course ? (
          course.id === 'bundle' ? (
            <div className="space-y-3">
              <h3 className="font-bold text-text-primary text-center mb-4">Download Your 24 E-books:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2 border border-border-light rounded-xl">
                {mockCourses.filter(c => c.id !== 'bundle').map(c => (
                  <a 
                    key={c.id}
                    href={c.pdfUrl || \`/pdfs/\${c.id}.pdf\`} 
                    download
                    className="w-full btn-primary py-3 px-4 flex items-center justify-between text-sm shadow-sm hover:shadow-md transition-all rounded-lg"
                  >
                    <span className="truncate pr-2">{c.title}</span>
                    <Download className="w-4 h-4 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a 
              href={course.pdfUrl || \`/pdfs/\${course.id}.pdf\`} 
              download
              className="w-full btn-primary py-4 flex items-center justify-center text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <Download className="w-6 h-6 mr-3" />
              Download Your PDF
            </a>
          )
        ) : null}`;

data = data.replace(targetStr, newStr);

fs.writeFileSync('src/app/payment-success/page.tsx', data);
