'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { Course } from '@/data/mockCourses';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {

  return (
    <div className="card-container flex flex-col group h-full cursor-pointer relative">
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-soft border-b border-border-light">
        <Image 
          src={course.thumbnailUrl} 
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3">
          <span className="bg-brand-successLight text-brand-success text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {course.difficulty}
          </span>
          <span className="bg-brand-lavender text-brand-purple text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            PDF E-book
          </span>
        </div>

        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2 leading-tight group-hover:text-brand-purple transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-grow">
          {course.shortDescription}
        </p>

        {/* Features list */}
        <div className="flex items-center space-x-4 text-xs text-text-muted mb-4 font-medium">
          <div className="flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1 text-brand-success" />
            Lifetime Access
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1 text-brand-success" />
            Certificate
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="border-t border-border-light pt-4 mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-extrabold text-text-primary">
                ₹{course.currentPrice}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-text-muted line-through ml-2 font-medium">
                  ₹{course.originalPrice}
                </span>
              )}
            </div>
            {course.discountPercentage > 0 && (
              <span className="bg-brand-pink text-brand-pinkDark text-xs font-bold px-2 py-1 rounded-md">
                {course.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="flex mt-2">
            <Link href={`/course/${course.id}`} className="btn-primary w-full text-center py-2.5 text-sm font-semibold">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
