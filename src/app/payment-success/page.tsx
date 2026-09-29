/* eslint-disable */
'use client';

import Link from 'next/link';
import { CheckCircle, Download, FileText } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { mockCourses } from '@/data/mockCourses';

function SuccessContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    if (courseId) {
      const found = mockCourses.find(c => c.id === courseId);
      if (found) setCourse(found);
    }
  }, [courseId]);

  return (
    <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm text-center max-w-lg w-full">
      <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-bold text-text-primary mb-4">Payment Successful!</h1>
      
      {course ? (
        <div className="mb-6 bg-surface-soft p-4 rounded-lg border border-border-light">
          <p className="text-text-secondary mb-1 text-sm font-medium">You successfully purchased:</p>
          <h2 className="text-lg font-bold text-brand-purple">{course.title}</h2>
        </div>
      ) : (
        <p className="text-text-secondary mb-6">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
      )}

      <p className="text-sm text-text-muted mb-8">
        Your payment receipt and lifetime access details have been automatically sent to your registered email address.
      </p>
      
      <div className="space-y-4">
        {/* Real download link to public/pdfs/courseId.pdf */}
        {course ? (
          course.id === 'bundle' ? (
            <div className="space-y-3">
              <h3 className="font-bold text-text-primary text-center mb-4">Download Your 24 E-books:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2 border border-border-light rounded-xl">
                {mockCourses.filter(c => c.id !== 'bundle').map(c => (
                  <a 
                    key={c.id}
                    href={c.pdfUrl || `/pdfs/${c.id}.pdf`} 
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
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-surface-main flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-surface-main p-12 rounded-2xl border border-border-light shadow-sm text-center flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-secondary">Verifying your order...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
