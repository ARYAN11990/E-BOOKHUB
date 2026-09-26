import Link from 'next/link';
import { 
  Megaphone, 
  Wallet, 
  Link as LinkIcon, 
  Code, 
  Share2, 
  Pin, 
  Package, 
  Briefcase, 
  PenTool, 
  Brain, 
  ShoppingBag, 
  UserCircle 
} from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    { 
      id: 'digital-marketing', 
      name: 'Digital Marketing', 
      count: 4, 
      icon: Megaphone,
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'online-earning', 
      name: 'Online Earning', 
      count: 1, 
      icon: Wallet,
      bgColor: 'bg-green-50'
    },
    { 
      id: 'affiliate-marketing', 
      name: 'Affiliate Marketing', 
      count: 1, 
      icon: LinkIcon,
      bgColor: 'bg-indigo-50'
    },
    { 
      id: 'web-development', 
      name: 'Web Development', 
      count: 2, 
      icon: Code,
      bgColor: 'bg-slate-100'
    },
    { 
      id: 'social-media', 
      name: 'Social Media Marketing', 
      count: 2, 
      icon: Share2,
      bgColor: 'bg-pink-50'
    },
    { 
      id: 'pinterest-marketing', 
      name: 'Pinterest Marketing', 
      count: 1, 
      icon: Pin,
      bgColor: 'bg-red-50'
    },
    { 
      id: 'dropshipping', 
      name: 'Dropshipping', 
      count: 1, 
      icon: Package,
      bgColor: 'bg-orange-50'
    },
    { 
      id: 'freelancing', 
      name: 'Freelancing', 
      count: 2, 
      icon: Briefcase,
      bgColor: 'bg-teal-50'
    },
    { 
      id: 'content-creation', 
      name: 'Content Creation', 
      count: 3, 
      icon: PenTool,
      bgColor: 'bg-purple-50'
    },
    { 
      id: 'ai', 
      name: 'Artificial Intelligence', 
      count: 2, 
      icon: Brain,
      bgColor: 'bg-violet-50'
    },
    { 
      id: 'e-commerce', 
      name: 'E-commerce', 
      count: 2, 
      icon: ShoppingBag,
      bgColor: 'bg-amber-50'
    },
    { 
      id: 'personal-branding', 
      name: 'Personal Branding', 
      count: 1, 
      icon: UserCircle,
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Course Categories</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Browse our wide selection of digital e-books and courses by category to find exactly what you want to learn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.id} 
                href={`/courses?category=${category.name.replace(/ /g, '+')}`}
                className="bg-surface-main p-8 rounded-[20px] border border-border-light shadow-sm hover:border-brand-purple hover:shadow-hover transition-all duration-300 text-center group flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-slate-800" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-brand-purple transition-colors duration-300">{category.name}</h3>
                <p className="text-text-muted text-sm font-medium">{category.count} Courses</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
