const fs = require('fs');

let data = fs.readFileSync('src/app/admin/courses/page.tsx', 'utf-8');

// 1. Add isUploadingPdf state
data = data.replace(
  `const [isUploading, setIsUploading] = useState(false);`,
  `const [isUploading, setIsUploading] = useState(false);\n  const [isUploadingPdf, setIsUploadingPdf] = useState(false);`
);

// 2. Modify handleFileUpload to accept field parameter
data = data.replace(
  `const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, thumbnailUrl: result.url }));
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };`,
  `const handleFileUpload = async (file: File, field: 'thumbnailUrl' | 'pdfUrl' = 'thumbnailUrl') => {
    if (!file) return;
    
    if (field === 'pdfUrl') setIsUploadingPdf(true);
    else setIsUploading(true);

    try {
      const data = new FormData();
      data.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, [field]: result.url }));
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload failed');
    } finally {
      if (field === 'pdfUrl') setIsUploadingPdf(false);
      else setIsUploading(false);
    }
  };`
);

// 3. Fix the existing handleFileUpload calls in Thumbnail section
data = data.replace(
  `onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0])}`,
  `onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0], 'thumbnailUrl')}`
);
data = data.replace(
  `onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0])}`,
  `onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0], 'thumbnailUrl')}`
);
data = data.replace(
  `handleFileUpload(e.dataTransfer.files[0]);`,
  `handleFileUpload(e.dataTransfer.files[0], 'thumbnailUrl');`
);

// 4. Add the PDF upload UI next to Category ID
const oldCategoryHtml = `<div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category ID</label>
                  <input required type="text" value={formData.categoryId || ''} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary" />
                </div>`;

const newPdfAndCategoryHtml = `<div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category ID</label>
                  <input required type="text" value={formData.categoryId || ''} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary mb-4" />
                  
                  <label className="block text-sm font-medium text-text-secondary mb-1">E-Book PDF File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors border-border-light bg-surface-main hover:bg-surface-soft">
                    <div className="space-y-1 text-center w-full">
                      {isUploadingPdf ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="mx-auto h-12 w-12 text-brand-purple animate-spin" />
                          <p className="mt-2 text-sm text-text-secondary">Uploading PDF...</p>
                        </div>
                      ) : formData.pdfUrl ? (
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <p className="text-sm text-text-primary font-medium truncate w-full max-w-[200px] mb-2">{formData.pdfUrl.split('/').pop()}</p>
                          <div className="flex text-sm text-text-secondary">
                            <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-purple hover:text-brand-purpleDark">
                              <span>Change PDF</span>
                              <input type="file" className="sr-only" accept=".pdf" onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0], 'pdfUrl')} />
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-text-muted" />
                          <div className="flex text-sm text-text-secondary mt-2">
                            <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-purple hover:text-brand-purpleDark">
                              <span>Upload PDF</span>
                              <input type="file" className="sr-only" accept=".pdf" onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0], 'pdfUrl')} />
                            </label>
                          </div>
                          <p className="text-xs text-text-muted mt-1">PDF file only</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>`;

data = data.replace(oldCategoryHtml, newPdfAndCategoryHtml);

// Make sure CheckCircle is imported from lucide-react if not already
if (!data.includes('CheckCircle')) {
  data = data.replace('UploadCloud', 'UploadCloud, CheckCircle');
}

fs.writeFileSync('src/app/admin/courses/page.tsx', data);
