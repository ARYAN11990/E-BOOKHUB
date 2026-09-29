/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, BookOpen, Star, Clock, Loader2, FileArchive } from 'lucide-react';
import Link from 'next/link';
import { mockCourses } from '@/data/mockCourses';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [course, setCourse] = useState<any>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  useEffect(() => {
    if (courseId) {
      const found = mockCourses.find(c => c.id === courseId);
      if (found) setCourse(found);
    }
  }, [courseId]);

  const handleDownloadAll = async () => {
    setIsZipping(true);
    setZipProgress(0);
    try {
      const zip = new JSZip();
      const allCourses = mockCourses.filter(c => c.id !== 'bundle');
      
      let completed = 0;
      
      // Fetch all PDFs and add to zip
      for (const c of allCourses) {
        const pdfPath = c.pdfUrl || `/pdfs/${c.id}.pdf`;
        try {
          const response = await fetch(pdfPath);
          if (response.ok) {
            const blob = await response.blob();
            // Get filename from path or fallback
            const filename = pdfPath.split('/').pop() || `${c.title}.pdf`;
            zip.file(filename, blob);
          }
        } catch (err) {
          console.error("Failed to fetch", pdfPath);
        }
        completed++;
        setZipProgress(Math.round((completed / allCourses.length) * 100));
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'Ultimate_Creator_Bundle.zip');
    } catch (error) {
      console.error('Error creating zip:', error);
      alert('Failed to create zip file. You can try downloading individually.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl pt-8 pb-20">
      <div className="bg-surface-main rounded-2xl p-8 md:p-12 border border-border-light shadow-xl text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">Payment Successful!</h1>
        <p className="text-lg text-text-secondary mb-8">
          Thank you for your purchase. Your premium content is ready.
        </p>

        {course ? (
          <div className="bg-surface-soft p-6 rounded-xl border border-border-light inline-block text-left mb-8 w-full max-w-md">
            <p className="text-sm text-text-muted mb-1 font-medium uppercase tracking-wider">Purchased Item</p>
            <h2 className="text-lg font-bold text-brand-purple">{course.title}</h2>
          </div>
        ) : (
          <div className="h-20 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-brand-purple" />
          </div>
        )}

        <div className="space-y-4 max-w-md mx-auto">
          {course ? (
            course.id === 'bundle' ? (
              <div className="space-y-4">
                <button 
                  onClick={handleDownloadAll}
                  disabled={isZipping}
                  className="w-full btn-primary py-4 flex items-center justify-center text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isZipping ? (
                    <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> Zipping files... {zipProgress}%</>
                  ) : (
                    <><FileArchive className="w-6 h-6 mr-3" /> Download All E-books (ZIP)</>
                  )}
                </button>
                <p className="text-sm text-text-muted">This will download a single ZIP file containing all 24 premium E-books.</p>
              </div>
            ) : (
              <a 
                href={course.pdfUrl || `/pdfs/${course.id}.pdf`} 
                download
                className="w-full btn-primary py-4 flex items-center justify-center text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Your PDF
              </a>
            )
          ) : null}
          
          <Link href="/" className="w-full btn-secondary py-3 flex items-center justify-center text-text-secondary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen py-12">
      <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-purple" /></div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
