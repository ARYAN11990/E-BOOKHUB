const fs = require('fs');

let data = fs.readFileSync('src/app/admin/courses/page.tsx', 'utf-8');

// 1. Add isPdfDragOver state
data = data.replace(
  `const [isDragOver, setIsDragOver] = useState(false);`,
  `const [isDragOver, setIsDragOver] = useState(false);\n  const [isPdfDragOver, setIsPdfDragOver] = useState(false);`
);

// 2. Add handlers for PDF drag and drop
const oldHandlers = `  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], 'thumbnailUrl');
    }
  };`;

const newHandlers = `  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], 'thumbnailUrl');
    }
  };

  const onPdfDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPdfDragOver(true);
  };
  
  const onPdfDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPdfDragOver(false);
  };
  
  const onPdfDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPdfDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], 'pdfUrl');
    }
  };`;

data = data.replace(oldHandlers, newHandlers);

// 3. Attach handlers to the PDF div and dynamic styling
const oldPdfDiv = `                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors border-border-light bg-surface-main hover:bg-surface-soft">`;

const newPdfDiv = `                  <div 
                    onDragOver={onPdfDragOver}
                    onDragLeave={onPdfDragLeave}
                    onDrop={onPdfDrop}
                    className={\`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors \${isPdfDragOver ? 'border-brand-purple bg-brand-purple/5' : 'border-border-light bg-surface-main hover:bg-surface-soft'}\`}
                  >`;

data = data.replace(oldPdfDiv, newPdfDiv);

fs.writeFileSync('src/app/admin/courses/page.tsx', data);
