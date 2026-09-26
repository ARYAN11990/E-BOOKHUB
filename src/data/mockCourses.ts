import courses from './courses.json';

export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  thumbnailUrl: string;
  categoryId: string;
}

export const mockCourses: Course[] = courses as Course[];
