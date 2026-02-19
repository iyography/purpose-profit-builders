"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import FloatingDots from './FloatingDots';

interface AdminAuthProps {
  onAuthenticate: (email: string) => void;
}

const APPROVED_EMAILS = [
  'davidiya3@gmail.com',
  'inbillsmind@gmail.com',
  'rexloyer@gmail.com',
];

const DEFAULT_PASSWORDS: { [key: string]: string } = {
  'davidiya3@gmail.com': 'CreditHub2026!',
  'inbillsmind@gmail.com': 'CreditHub2026!',
  'rexloyer@gmail.com': 'CreditHub2026!',
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
      localStorage.setItem('creditHubAdminEmail', email);
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
        <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <img
                src="/credit-hub-logo.svg"
                alt="The Credit Hub"
                className="mx-auto h-16 w-auto"
              />
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Password Reset
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your authorized email to retrieve your password
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handlePasswordReset}>
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetForm(false);
                    setError('');
                  }}
                  className="flex-1 py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img
              src="/credit-hub-logo.svg"
              alt="The Credit Hub"
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Admin Portal Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your credentials to access the admin dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
                className="text-sm text-orange-600 hover:text-orange-500"
              >
                Forgot your password?
              </button>
              <p className="text-xs text-gray-500">
                Only authorized Credit Hub administrators can access this portal.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}