import Link from 'next/link';
import Image from 'next/image';
import CourseCard from '@/components/ui/CourseCard';
import { mockCourses } from '@/data/mockCourses';
import { BookOpen, Star, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  const featuredCourses = mockCourses.slice(0, 8);

  return (
    <div className="min-h-screen bg-surface-main">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-soft border-b border-border-light">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-brand-pink rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-brand-lavender text-brand-purple font-bold text-xs uppercase tracking-wider mb-6 shadow-sm border border-brand-purple/10">
            Learn Skills, Build Your Future
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-6 leading-tight tracking-tight">
            Master highly-paid skills and <span className="text-brand-purple">start earning online</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium e-books and comprehensive digital courses covering Freelancing, Digital Marketing, E-commerce, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/courses" className="btn-primary w-full sm:w-auto text-lg py-3 px-8">
              Explore All Courses
            </Link>
            <Link href="/categories" className="btn-secondary w-full sm:w-auto text-lg py-3 px-8">
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges Marquee */}
      <section className="py-10 bg-surface-main border-b border-border-light overflow-hidden relative">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-main to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-main to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-[200%] animate-marquee">
          {/* First set */}
          <div className="flex-1 flex justify-around text-text-primary font-bold text-lg px-4 space-x-8 md:space-x-0">
            <div className="flex items-center whitespace-nowrap"><Users className="w-8 h-8 mr-3 text-brand-purple" /> 10,000+ Students</div>
            <div className="flex items-center whitespace-nowrap"><Star className="w-8 h-8 mr-3 text-brand-pink" /> 4.9/5 Average Rating</div>
            <div className="flex items-center whitespace-nowrap"><BookOpen className="w-8 h-8 mr-3 text-brand-purple" /> Premium E-books</div>
            <div className="flex items-center whitespace-nowrap"><TrendingUp className="w-8 h-8 mr-3 text-brand-pink" /> Lifetime Access</div>
          </div>
          {/* Second set (duplicate for seamless loop) */}
          <div className="flex-1 flex justify-around text-text-primary font-bold text-lg px-4 space-x-8 md:space-x-0">
            <div className="flex items-center whitespace-nowrap"><Users className="w-8 h-8 mr-3 text-brand-purple" /> 10,000+ Students</div>
            <div className="flex items-center whitespace-nowrap"><Star className="w-8 h-8 mr-3 text-brand-pink" /> 4.9/5 Average Rating</div>
            <div className="flex items-center whitespace-nowrap"><BookOpen className="w-8 h-8 mr-3 text-brand-purple" /> Premium E-books</div>
            <div className="flex items-center whitespace-nowrap"><TrendingUp className="w-8 h-8 mr-3 text-brand-pink" /> Lifetime Access</div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-surface-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-text-primary mb-4 tracking-tight">Trending Courses</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Discover our most popular courses and start your journey today.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/courses" className="btn-secondary inline-block">
              View Entire Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Bundled Offer */}
      <section className="py-24 bg-surface-main">
        <div className="container mx-auto px-4">
          <div className="bg-surface-dark rounded-[24px] p-8 md:p-16 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple rounded-full filter blur-[100px] opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pinkDark rounded-full filter blur-[100px] opacity-20"></div>
            
            <div className="relative z-10">
              <span className="inline-block bg-brand-pink text-brand-pinkDark font-extrabold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-wider">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">The Ultimate Creator Bundle</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get ALL 24 premium courses (worth ₹11,000+) for a single one-time payment.
              </p>
              
              <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden mb-10 shadow-2xl border-4 border-surface-soft/20">
                <Image src="/course-thumbnails/bundle-image.jpg" alt="Ultimate Creator Bundle" fill className="object-cover" />
              </div>

              <div className="flex items-end justify-center space-x-4 mb-10">
                <span className="text-6xl font-extrabold text-white">₹999</span>
                <span className="text-2xl text-gray-500 line-through font-bold mb-2">₹11,176</span>
              </div>
              <Link href="/checkout?courseId=bundle" className="inline-block bg-white text-gray-900 font-extrabold text-lg py-4 px-10 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Unlock Everything Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
