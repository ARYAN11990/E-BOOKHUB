'use client';

import { useState } from 'react';
import { mockCourses } from '@/data/mockCourses';
import CourseCard from '@/components/ui/CourseCard';
import { Search, Filter } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const categories = ['All', 'Digital Marketing', 'Online Earning', 'Web Development', 'Freelancing', 'Content Creation', 'AI'];
  const prices = ['All', '₹299', '₹399', '₹499'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.categoryId.includes(selectedCategory.toLowerCase().replace(' ', '-'));
    const matchesPrice = selectedPrice === 'All' || `₹${course.currentPrice}` === selectedPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-surface-main py-12 border-t border-border-light">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 text-center">All Digital Courses</h1>
        
        {/* Search & Filters */}
        <div className="bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm mb-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple"
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-surface-soft border border-border-light rounded-lg text-text-primary px-4 py-2.5 focus:outline-none focus:border-brand-purple"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat} Categories</option>)}
            </select>
            
            <select 
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="bg-surface-soft border border-border-light rounded-lg text-text-primary px-4 py-2.5 focus:outline-none focus:border-brand-purple"
            >
              {prices.map(price => <option key={price} value={price}>{price}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 text-text-secondary">
          Showing {filteredCourses.length} result(s)
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-main rounded-2xl border border-border-light shadow-sm text-text-muted">
            No courses found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
