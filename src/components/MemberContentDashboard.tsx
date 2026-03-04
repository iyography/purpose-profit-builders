"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate, getStorageKey, getUserByEmail } from '@/lib/auth';
import { socialPosts, communityPosts, skoolPosts } from '@/app/content-library/data';
import { fullContentLibrary } from '@/app/content-library/bbc-content';
import { additionalSocialPosts } from '@/app/content-library/bbc-additional';
import FloatingDots from './FloatingDots';

type TabKey = 'social' | 'community' | 'skool';
type VersionKey = 'short' | 'medium' | 'long';

interface NormalizedPost {
  id: string;
  title: string;
  short: string;
  medium: string;
  long: string;
  category: string;
  tab: 'social' | 'community' | 'skool';
}

interface MemberContentDashboardProps {
  memberSlug: string;
  memberName: string;
}

export default function MemberContentDashboard({ memberSlug, memberName }: MemberContentDashboardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Content state
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeVersion, setActiveVersion] = useState<VersionKey>('short');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const storageKey = getStorageKey(memberSlug);

  useEffect(() => {
    const savedEmail = localStorage.getItem(storageKey);
    if (savedEmail) {
      const user = getUserByEmail(savedEmail);
      if (user && user.slug === memberSlug) {
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, [storageKey, memberSlug]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = authenticate(email, password);
    if (!user || user.slug !== memberSlug) {
      setError('Invalid credentials or not authorized for this dashboard.');
      return;
    }
    localStorage.setItem(storageKey, user.email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(storageKey);
    setIsAuthenticated(false);
  };

  // Merge all content
  const ppbPosts: NormalizedPost[] = [...socialPosts, ...communityPosts, ...skoolPosts].map(p => ({
    ...p, id: `ppb-${p.id}`
  }));
  const bbcPosts: NormalizedPost[] = fullContentLibrary.map(p => ({
    id: `bbc-${p.id}`,
    title: p.title,
    short: p.versions.short,
    medium: p.versions.medium,
    long: p.versions.long,
    category: p.category,
    tab: (p.tab === 'content' ? 'community' : p.tab) as TabKey,
  }));
  const bbcAddPosts: NormalizedPost[] = additionalSocialPosts.map(p => ({
    id: `bbc-add-${p.id}`,
    title: p.title,
    short: p.versions.short,
    medium: p.versions.medium,
    long: p.versions.long,
    category: p.category,
    tab: (p.tab === 'content' ? 'community' : p.tab) as TabKey,
  }));

  const allPosts = [...ppbPosts, ...bbcPosts, ...bbcAddPosts];
  const filteredBySearch = searchTerm
    ? allPosts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    : allPosts;
  const currentPosts = filteredBySearch.filter(p => p.tab === activeTab);

  const handleCopy = (postId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-vivid" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <FloatingDots />
        <div className="min-h-screen bg-pure-black flex items-center justify-center py-12 px-4 relative z-10">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <img src="/ppb-logo.svg" alt="Purpose & Profit Builders" className="mx-auto h-16 w-auto" />
              <h2 className="mt-6 text-3xl font-bold text-off-white">Welcome, {memberName}</h2>
              <p className="mt-2 text-sm text-off-white/60">Sign in to access your content library</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-off-white/70">Email</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-3 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-md focus:outline-none focus:ring-gold-vivid focus:border-gold-vivid sm:text-sm"
                    placeholder="Enter your email" />
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
                className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold-vivid hover:bg-gold-warm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-vivid">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-pure-black text-off-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-soft/95 backdrop-blur-sm border-b border-gold-vivid/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/ppb-logo.svg" alt="PPB" className="h-8 w-auto" />
            <div>
              <h1 className="text-lg font-bold text-gold-vivid">{memberName}&apos;s Content Library</h1>
              <p className="text-xs text-off-white/40">Purpose &amp; Profit Builders</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-off-white/60 hover:text-off-white border border-off-white/10 rounded-lg hover:bg-dark-gray transition-colors">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-6">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts by title or category..."
            className="w-full max-w-md px-4 py-3 border border-gold-vivid/20 placeholder-off-white/30 text-off-white bg-dark-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {(['social', 'community', 'skool'] as TabKey[]).map(tab => {
            const count = filteredBySearch.filter(p => p.tab === tab).length;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gold-vivid text-black shadow-md shadow-gold-vivid/20'
                    : 'bg-dark-gray text-off-white/60 hover:bg-dark-cream border border-gold-vivid/15'
                }`}>
                {tab === 'social' ? 'Social Media' : tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Version toggle */}
        <div className="flex gap-2 mb-8">
          {(['short', 'medium', 'long'] as VersionKey[]).map(v => (
            <button key={v} onClick={() => setActiveVersion(v)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                activeVersion === v
                  ? 'bg-gold-vivid text-black'
                  : 'bg-dark-gray text-off-white/60 hover:bg-dark-cream border border-gold-vivid/10'
              }`}>{v}</button>
          ))}
        </div>

        {/* Posts */}
        <div className="grid gap-6">
          {currentPosts.length === 0 ? (
            <div className="bg-dark-gray rounded-xl p-8 text-center border border-gold-vivid/10">
              <p className="text-off-white/50">No posts found.</p>
            </div>
          ) : currentPosts.map(post => (
            <div key={post.id} className="bg-dark-gray rounded-xl p-6 border border-gold-vivid/10 shadow-sm hover:shadow-md hover:shadow-gold-vivid/5 transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-off-white">{post.title}</h3>
                  <span className="px-3 py-1 bg-gold-vivid/10 text-gold-vivid rounded-full text-sm font-medium">{post.category}</span>
                </div>
                <button onClick={() => handleCopy(post.id, post[activeVersion])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                    copiedId === post.id
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-gold-vivid text-black hover:bg-gold-warm'
                  }`}>{copiedId === post.id ? 'Copied!' : `Copy ${activeVersion}`}</button>
              </div>
              <pre className="whitespace-pre-wrap text-off-white/70 text-sm bg-dark-cream p-4 rounded-lg">{post[activeVersion]}</pre>
            </div>
          ))}
        </div>

        {/* Post count footer */}
        <div className="mt-8 text-center text-sm text-off-white/30">
          {allPosts.length} total posts available
        </div>
      </div>
    </div>
  );
}
