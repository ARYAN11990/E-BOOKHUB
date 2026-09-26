'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase Auth
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="min-h-screen bg-surface-main py-20 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <div className="relative px-4 py-10 bg-surface-main border border-border-light shadow-sm sm:rounded-2xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
              <p className="text-text-secondary text-sm">Login to access your purchased courses</p>
            </div>
            
            <form onSubmit={handleSubmit} className="divide-y divide-border-light">
              <div className="py-8 text-base leading-6 space-y-6 text-text-primary sm:text-lg sm:leading-7">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Email Address" 
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Password" 
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-border-light bg-surface-main focus:ring-brand-purple text-brand-purple" />
                    <label htmlFor="remember" className="ml-2 text-sm text-text-secondary">Remember me</label>
                  </div>
                  <Link href="/forgot-password" className="text-sm font-medium text-brand-purple hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                
                <div className="pt-4 flex items-center justify-between">
                  <button type="submit" className="w-full btn-primary py-3">
                    Login securely
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-brand-purple hover:underline">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
