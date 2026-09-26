'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for', email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface-main py-20 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4">
        <div className="relative px-4 py-10 bg-surface-main border border-border-light shadow-sm sm:rounded-2xl sm:p-20">
          <div className="max-w-md mx-auto">
            
            <Link href="/login" className="flex items-center text-sm text-text-secondary hover:text-brand-purple mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
            </Link>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-text-primary mb-2">Reset Password</h1>
              <p className="text-text-secondary text-sm">
                Enter your registered email address, and we'll send you a link to reset your password.
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-text-primary mb-2">Check your email</h3>
                <p className="text-sm text-text-secondary">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="divide-y divide-border-light">
                <div className="py-2 text-base leading-6 space-y-6 text-text-primary sm:text-lg sm:leading-7">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-main border border-border-light text-text-primary rounded-lg focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple" 
                      placeholder="Email Address" 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="w-full btn-primary py-3">
                      Send Reset Link
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
