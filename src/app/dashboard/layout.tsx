'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ShoppingBag, Settings, LogOut, User } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: 'My Courses', href: '/dashboard', icon: BookOpen },
    { name: 'Order History', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-main py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-surface-main rounded-2xl border border-border-light shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b border-border-light text-center">
                <div className="w-20 h-20 bg-surface-soft text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4 border border-border-light">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-lg font-bold text-text-primary">Student Name</h2>
                <p className="text-xs text-text-secondary">student@example.com</p>
              </div>
              
              <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-brand-purple/10 text-brand-purple font-medium' 
                          : 'text-text-secondary hover:bg-surface-soft hover:text-text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
                
                <hr className="border-border-light my-4" />
                
                <button className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="bg-surface-main rounded-2xl border border-border-light shadow-sm p-6 md:p-8 min-h-[600px]">
              {children}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
