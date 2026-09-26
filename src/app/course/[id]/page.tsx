'use client';

import { mockCourses } from '@/data/mockCourses';
import { notFound } from 'next/navigation';
import { CheckCircle, Shield, PlayCircle, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CourseDetails({ params }: { params: { id: string } }) {
  const course = mockCourses.find(c => c.id === params.id);
  const { addToCart } = useCart();
  
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface-main pb-20">
      {/* Course Header */}
      <div className="bg-surface-soft border-b border-border-light py-12 md:py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="flex gap-3 mb-4">
              <span className="text-xs font-semibold bg-brand-purple/10 text-brand-purple px-2.5 py-1 rounded-full border border-brand-purple/20">
                {course.difficulty}
              </span>
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full border border-green-200">
                PDF E-book
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-text-secondary mb-8 max-w-xl">
              {course.shortDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-8">
              <div className="flex items-center"><Clock className="w-4 h-4 mr-1 text-brand-purple" /> Self-paced</div>
              <div className="flex items-center"><Shield className="w-4 h-4 mr-1 text-brand-purple" /> Lifetime Access</div>
              <div className="flex items-center"><BookOpen className="w-4 h-4 mr-1 text-brand-purple" /> PDF Format</div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full max-w-md">
            <div className="bg-surface-main rounded-2xl shadow-sm border border-border-light relative overflow-hidden group flex flex-col">
              <div className="relative w-full aspect-video">
                <Image 
                  src={course.thumbnailUrl} 
                  alt={course.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6 flex flex-col">
                <div className="text-text-muted line-through text-sm">Original Price: ₹{course.originalPrice}</div>
                <div className="text-4xl font-extrabold text-text-primary flex items-center gap-4">
                  ₹{course.currentPrice}
                  {course.discountPercentage > 0 && (
                    <span className="text-sm font-bold bg-brand-purple text-white px-2 py-1 rounded">
                      {course.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  <Link href="/checkout" className="w-full btn-primary py-3.5 block text-center">
                    Buy Now
                  </Link>
                  <button 
                    onClick={() => addToCart(course)}
                    className="w-full btn-secondary py-3.5"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <p className="text-center text-xs text-text-muted mt-4">
                  *This is a digital product. No physical item will be delivered. The PDF download becomes available after successful payment verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Course Description</h2>
          <div className="prose prose-lg max-w-none text-text-secondary mb-12">
            <p>{course.shortDescription} This comprehensive PDF guide is designed to take you step-by-step through the process, ensuring you build a solid foundation and practical skills.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-6">What You'll Learn</h3>
              <ul className="space-y-3">
                {[1,2,3,4,5].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-brand-purple mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">Practical skill and strategy #{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm">
              <h3 className="text-xl font-bold text-text-primary mb-4">Who is this for?</h3>
              <ul className="space-y-2 text-text-secondary list-disc list-inside">
                <li>Beginners starting from scratch</li>
                <li>Students and Job Seekers</li>
                <li>Freelancers looking to upscale</li>
                <li>Small business owners</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
