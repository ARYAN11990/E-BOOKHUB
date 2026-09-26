import { mockCourses } from '@/data/mockCourses';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function MyCoursesPage() {
  // Mock purchased courses
  const purchasedCourses = [mockCourses[0], mockCourses[4]];

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-border-light pb-4">
        <h1 className="text-2xl font-bold text-text-primary">My Courses</h1>
        <Link href="/courses" className="text-sm text-brand-purple hover:underline">
          Browse more courses
        </Link>
      </div>

      {purchasedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchasedCourses.map((course) => (
            <div key={course.id} className="bg-surface-main rounded-2xl border border-border-light shadow-sm overflow-hidden flex flex-col">
              <img src={course.thumbnailUrl} alt={course.title} className="w-full h-40 object-cover border-b border-border-light" />
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-xs text-green-700 mb-4 bg-green-50 border border-green-200 w-max px-2 py-1 rounded">Lifetime Access</p>
                
                <div className="mt-auto pt-4 border-t border-border-light flex gap-3">
                  <button className="flex-grow btn-secondary py-2.5 flex items-center justify-center text-sm">
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </button>
                  <Link href={`/course/${course.id}`} className="px-4 py-2.5 btn-secondary text-sm font-medium transition-colors text-center flex items-center justify-center">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface-soft rounded-2xl border border-border-light border-dashed">
          <h3 className="text-xl font-bold text-text-primary mb-2">No courses yet</h3>
          <p className="text-text-secondary mb-6">You haven't purchased any courses yet. Start learning today!</p>
          <Link href="/courses" className="btn-primary inline-block">
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
}
