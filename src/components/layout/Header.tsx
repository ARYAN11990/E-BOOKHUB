'use client';

import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth state
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Courses', href: '/courses' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-main/90 backdrop-blur-md border-b border-border-light shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="bg-surface-main rounded p-1 flex items-center justify-center">
            <img src="/logo.jpg" alt="EBookHub Logo" className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
          </div>
          
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="px-3 py-2 rounded-md text-text-secondary hover:text-brand-purple hover:bg-surface-subtle transition-all">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-5">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <Link href="/dashboard" className="flex items-center space-x-2 text-text-primary hover:text-brand-purple font-semibold transition-colors">
              <User className="w-4 h-4" />
              <span>My Courses</span>
            </Link>
          ) : (
            <Link href="/login" className="btn-primary py-2 px-5 text-sm">
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-text-secondary hover:text-brand-purple"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface-main border-t border-border-light absolute w-full shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-text-secondary hover:text-brand-purple hover:bg-surface-subtle font-semibold px-4 py-3 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-border-light pt-4 mt-2 flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-text-secondary font-semibold">Dark Mode</span>
                <ThemeToggle />
              </div>

              <div className="flex items-center justify-between px-2">
                
              
                {isLoggedIn ? (
                  <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm" onClick={() => setIsMenuOpen(false)}>
                    My Courses
                  </Link>
                ) : (
                  <Link href="/login" className="btn-primary py-2 px-4 text-sm" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
