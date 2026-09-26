'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Book, Users, ShoppingCart, Settings, LogOut, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }
    const token = localStorage.getItem('learnora_admin_auth');
    if (token === 'admin_logged_in') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-main">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('learnora_admin_auth');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Courses', href: '/admin/courses', icon: Book },
    { name: 'Orders & Payments', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface-main flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-soft border-r border-border-light hidden md:flex flex-col">
        <div className="p-6 border-b border-border-light">
          <h2 className="text-xl font-bold text-text-primary flex items-center">
            <span className="text-brand-purple mr-2">Admin</span>Panel
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors text-sm ${
                  isActive 
                    ? 'bg-brand-purple text-white font-medium shadow-lg' 
                    : 'text-text-secondary hover:bg-surface-subtle hover:text-text-primary'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border-light">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 hover:dark:bg-red-900/20 transition-colors text-sm">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-surface-soft border-b border-border-light p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-text-primary">Admin Panel</h2>
          <button className="text-text-secondary">Menu</button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
