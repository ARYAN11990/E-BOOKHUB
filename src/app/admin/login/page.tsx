'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('learnora_admin_auth', 'admin_logged_in');
      router.push('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-soft p-4">
      <div className="bg-surface-main p-8 rounded-2xl border border-border-light shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-brand-purple/10 p-4 rounded-full">
            <Lock className="w-8 h-8 text-brand-purple" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-text-primary text-center mb-8">Admin Access</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-surface-main border border-border-light text-text-primary rounded-lg focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-surface-main border border-border-light text-text-primary rounded-lg focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="w-full btn-primary py-3 mt-4">
            Login to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
