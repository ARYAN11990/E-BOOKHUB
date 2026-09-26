'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase Auth Sign Up
    console.log('Register attempt', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-surface-main py-12 flex flex-col justify-center sm:py-20">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <div className="relative px-4 py-10 bg-surface-main border border-border-light shadow-sm sm:rounded-2xl sm:p-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text-primary mb-2">Create an Account</h1>
              <p className="text-text-secondary text-sm">Join Learnora and start your digital learning journey.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="divide-y divide-border-light">
              <div className="py-4 text-base leading-6 space-y-5 text-text-primary sm:text-lg sm:leading-7">
                
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Full Name" 
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Email Address" 
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="tel" 
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Mobile Number" 
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Password" 
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                    placeholder="Confirm Password" 
                  />
                </div>

                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input 
                      type="checkbox" 
                      name="acceptTerms"
                      required
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-border-light bg-surface-main focus:ring-brand-purple text-brand-purple" 
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-text-secondary">
                      I accept the <Link href="/terms" className="text-brand-purple hover:underline">Terms and Conditions</Link> and <Link href="/privacy-policy" className="text-brand-purple hover:underline">Privacy Policy</Link>.
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-between">
                  <button type="submit" className="w-full btn-primary py-3">
                    Create Account
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-text-secondary">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-brand-purple hover:underline">
                      Login here
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
