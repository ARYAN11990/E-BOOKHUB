'use client';

import { useState, useEffect } from 'react';
import { Course } from '@/data/mockCourses';
import { Plus, Edit2, Trash2, X, Search, Loader2, UploadCloud, CheckCircle } from 'lucide-react';

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPdfDragOver, setIsPdfDragOver] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({
      id: 'c' + Date.now(),
      title: '',
      shortDescription: '',
      difficulty: 'Beginner',
      originalPrice: 0,
      currentPrice: 0,
      discountPercentage: 0,
      thumbnailUrl: '',
      categoryId: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setFormData({ ...course });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (file: File, field: 'thumbnailUrl' | 'pdfUrl' = 'thumbnailUrl') => {
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
  };

  const onDragOver = (e: React.DragEvent) => {
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
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await fetch(`/api/courses?id=${id}`, { method: 'DELETE' });
      setCourses(courses.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (isEditing) {
        await fetch('/api/courses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setCourses(courses.map(c => c.id === formData.id ? formData as Course : c));
      } else {
        await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setCourses([...courses, formData as Course]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save', error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Manage Courses</h1>
        <div className="flex w-full md:w-auto space-x-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface-main border border-border-light rounded-lg text-sm focus:border-brand-purple outline-none"
            />
          </div>
          <button onClick={openAddModal} className="btn-primary flex items-center whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
        </div>
      ) : (
        <div className="bg-surface-main rounded-2xl border border-border-light shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-text-secondary text-sm">
                  <th className="px-6 py-4 font-medium">Course</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-secondary divide-y divide-border-light">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-surface-soft transition-colors">
                    <td className="px-6 py-4 flex items-center">
                      <img src={course.thumbnailUrl || 'https://placehold.co/100x60'} alt="" className="w-16 h-10 object-cover rounded mr-4 bg-surface-subtle" />
                      <div>
                        <div className="font-bold text-text-primary line-clamp-1">{course.title}</div>
                        <div className="text-xs text-text-muted">{course.difficulty}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{course.categoryId}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">₹{course.currentPrice}</div>
                      {course.originalPrice > course.currentPrice && (
                        <div className="text-xs line-through text-text-muted">₹{course.originalPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openEditModal(course)} className="p-2 text-brand-purple hover:bg-brand-purple/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-text-muted">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-surface-main rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-border-light flex justify-between items-center bg-surface-soft sticky top-0 z-10">
              <h2 className="text-xl font-bold text-text-primary">{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
                <input required type="text" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Short Description</label>
                <textarea required value={formData.shortDescription || ''} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary h-20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Thumbnail</label>
                  <div 
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${isDragOver ? 'border-brand-purple bg-brand-purple/5' : 'border-border-light bg-surface-main hover:bg-surface-soft'}`}
                  >
                    <div className="space-y-1 text-center">
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="mx-auto h-12 w-12 text-brand-purple animate-spin" />
                          <p className="mt-2 text-sm text-text-secondary">Uploading...</p>
                        </div>
                      ) : formData.thumbnailUrl ? (
                        <div className="flex flex-col items-center">
                          <img src={formData.thumbnailUrl} alt="Thumbnail preview" className="h-24 w-auto object-cover rounded mb-3" />
                          <div className="flex text-sm text-text-secondary">
                            <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-purple hover:text-brand-purpleDark">
                              <span>Change thumbnail</span>
                              <input type="file" className="sr-only" accept="image/*" onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0], 'thumbnailUrl')} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="mx-auto h-12 w-12 text-text-muted" />
                          <div className="flex text-sm text-text-secondary mt-2">
                            <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-purple hover:text-brand-purpleDark">
                              <span>Upload a file</span>
                              <input type="file" className="sr-only" accept="image/*" onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0], 'thumbnailUrl')} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-text-muted mt-1">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category ID</label>
                  <input required type="text" value={formData.categoryId || ''} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary mb-4" />
                  
                  <label className="block text-sm font-medium text-text-secondary mb-1">E-Book PDF File</label>
                  <div 
                    onDragOver={onPdfDragOver}
                    onDragLeave={onPdfDragLeave}
                    onDrop={onPdfDrop}
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${isPdfDragOver ? 'border-brand-purple bg-brand-purple/5' : 'border-border-light bg-surface-main hover:bg-surface-soft'}`}
                  >
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
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Current Price</label>
                  <input required type="number" value={formData.currentPrice || 0} onChange={(e) => setFormData({...formData, currentPrice: Number(e.target.value)})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Original Price</label>
                  <input required type="number" value={formData.originalPrice || 0} onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Difficulty</label>
                  <select value={formData.difficulty || 'Beginner'} onChange={(e) => setFormData({...formData, difficulty: e.target.value})} className="w-full px-4 py-2 bg-surface-main border border-border-light rounded-lg text-text-primary">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-border-light rounded-lg text-text-secondary font-medium">Cancel</button>
                <button type="submit" disabled={isSaving} className="btn-primary py-2 px-6">
                  {isSaving ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
