"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import FloatingDots from './FloatingDots';

interface AdminAuthProps {
  onAuthenticate: (email: string) => void;
}

const APPROVED_EMAILS = [
  'davidiya3@gmail.com',
];

const DEFAULT_PASSWORDS: { [key: string]: string } = {
  'davidiya3@gmail.com': 'PPBuilders2026!',
};

export default function AdminAuth({ onAuthenticate }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }

    if (!APPROVED_EMAILS.includes(email.toLowerCase())) {
      setError('Access denied. This email is not authorized to access the admin portal.');
      setLoading(false);
      return;
    }

    const correctPassword = DEFAULT_PASSWORDS[email.toLowerCase()];
    if (password !== correctPassword) {
      setError('Invalid password. Please try again or use the password reset option.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      localStorage.setItem('ppbAdminEmail', email);
      onAuthenticate(email);
      setLoading(false);
    }, 1000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!APPROVED_EMAILS.includes(resetEmail.toLowerCase())) {
      setError('This email is not authorized for admin access.');
      return;
    }

    const resetPassword = DEFAULT_PASSWORDS[resetEmail.toLowerCase()];
    alert(`Password reset for ${resetEmail}:\n\nYour password is: ${resetPassword}\n\nPlease save this password securely.`);
    setShowResetForm(false);
    setResetEmail('');
    setError('');
  };

  if (showResetForm) {
    return (
      <>
        <FloatingDots />
        <Navbar hideNavLinks={true} />
        <div className="min-h-screen bg-pure-black pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <img
                src="/ppb-logo.svg"
                alt="Purpose & Profit Builders"
                className="mx-auto h-16 w-auto"
              />
              <h2 className="mt-6 text-3xl font-bold text-off-white">
                Password Reset
              </h2>
              <p className="mt-2 text-sm text-off-white/60">
                Enter your authorized email to retrieve your password
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-off-white/70">
                  Email address
                </label>
                <input
                  id="resetEmail"
                  name="resetEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-md focus:outline-none focus:ring-gold-vivid focus:border-gold-vivid focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-md p-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetForm(false);
                    setError('');
                  }}
                  className="flex-1 py-3 px-4 border border-off-white/20 text-sm font-medium rounded-md text-off-white bg-dark-gray hover:bg-dark-cream focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-vivid"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold-vivid hover:bg-gold-warm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-vivid"
                >
                  Get Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FloatingDots />
      <Navbar hideNavLinks={true} />
      <div className="min-h-screen bg-pure-black pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img
              src="/ppb-logo.svg"
              alt="Purpose & Profit Builders"
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-6 text-3xl font-bold text-off-white">
              Admin Portal Access
            </h2>
            <p className="mt-2 text-sm text-off-white/60">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-off-white/70">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-md focus:outline-none focus:ring-gold-vivid focus:border-gold-vivid focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-off-white/70">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-md focus:outline-none focus:ring-gold-vivid focus:border-gold-vivid focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 rounded-md p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold-vivid hover:bg-gold-warm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-vivid disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Verifying access...
                  </>
                ) : (
                  'Access Admin Portal'
                )}
              </button>
            </div>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="text-sm text-gold-vivid hover:text-gold-warm"
              >
                Forgot your password?
              </button>
              <p className="text-xs text-off-white/40">
                Only authorized Purpose &amp; Profit Builders administrators can access this portal.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
