"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FloatingDots from '@/components/FloatingDots';
import { authenticate, isAdmin, getStorageKey } from '@/lib/auth';

export default function AdminSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem(getStorageKey('admin'));
    if (savedEmail && isAdmin(savedEmail)) {
      router.replace('/admin/dashboard');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = authenticate(email, password);
    if (!user) {
      setError('Invalid email or password.');
      return;
    }
    if (user.role !== 'admin') {
      setError('Access denied. Admin credentials required.');
      return;
    }

    localStorage.setItem(getStorageKey('admin'), user.email);
    router.push('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-vivid" />
      </div>
    );
  }

  return (
    <>
      <FloatingDots />
      <div className="min-h-screen bg-pure-black flex items-center justify-center py-12 px-4 relative z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src="/ppb-logo.svg" alt="Purpose & Profit Builders" className="mx-auto h-16 w-auto" />
            <h2 className="mt-6 text-3xl font-bold text-off-white">Admin Portal</h2>
            <p className="mt-2 text-sm text-off-white/60">Sign in to access the admin dashboard</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-off-white/70">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-md focus:outline-none focus:ring-gold-vivid focus:border-gold-vivid sm:text-sm"
                  placeholder="admin@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-off-white/70">Password</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-md focus:outline-none focus:ring-gold-vivid focus:border-gold-vivid sm:text-sm"
                  placeholder="Enter your password" />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-md p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold-vivid hover:bg-gold-warm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-vivid">
              Sign In
            </button>

            <p className="text-center text-xs text-off-white/40">
              Only authorized administrators can access this portal.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
