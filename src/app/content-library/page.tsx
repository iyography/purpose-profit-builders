'use client';

import { useState } from 'react';
import { socialPosts, communityPosts, skoolPosts } from './data';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */
interface Post {
  id: number;
  title: string;
  short: string;
  medium: string;
  long: string;
  category: string;
  tab: 'social' | 'community' | 'skool';
}

type TabKey = 'social' | 'community' | 'skool';
type VersionKey = 'short' | 'medium' | 'long';

/* ──────────────────────────────────────────────
   CONTENT LIBRARY COMPONENT
   ────────────────────────────────────────────── */
export default function ContentLibrary() {
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeVersion, setActiveVersion] = useState<VersionKey>('short');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Combine all posts from imported data
  const posts = [...socialPosts, ...communityPosts, ...skoolPosts];

  // Filter posts by tab
  const socialPostsFiltered = posts.filter(post => post.tab === 'social');
  const communityPostsFiltered = posts.filter(post => post.tab === 'community');
  const skoolPostsFiltered = posts.filter(post => post.tab === 'skool');

  // Get posts for current tab
  const currentPosts = activeTab === 'social' ? socialPostsFiltered :
                      activeTab === 'community' ? communityPostsFiltered : skoolPostsFiltered;

  const handleCopy = (post: Post) => {
    navigator.clipboard.writeText(post[activeVersion]);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-soft-white text-charcoal p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 pt-4">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-vivid to-orange-deep bg-clip-text text-transparent">
            The Credit Hub Content Library
          </h1>
          <p className="text-charcoal/60">Credit &amp; funding content ready to copy and share</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTab('social')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'social'
                ? 'bg-orange-vivid text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-charcoal/60 hover:bg-orange-50 border border-orange-vivid/15'
            }`}
          >
            Social Media ({socialPostsFiltered.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'community'
                ? 'bg-orange-deep text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-charcoal/60 hover:bg-orange-50 border border-orange-vivid/15'
            }`}
          >
            Community ({communityPostsFiltered.length})
          </button>
          <button
            onClick={() => setActiveTab('skool')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'skool'
                ? 'bg-amber-gold text-white shadow-md shadow-amber-500/20'
                : 'bg-white text-charcoal/60 hover:bg-orange-50 border border-orange-vivid/15'
            }`}
          >
            Skool Posts ({skoolPostsFiltered.length})
          </button>
        </div>

        {/* Version Toggle */}
        <div className="flex gap-2 mb-6">
          {(['short', 'medium', 'long'] as VersionKey[]).map(version => (
            <button
              key={version}
              onClick={() => setActiveVersion(version)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                activeVersion === version
                  ? 'bg-orange-vivid text-white'
                  : 'bg-white text-charcoal/60 hover:bg-orange-50 border border-orange-vivid/10'
              }`}
            >
              {version}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {currentPosts.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-orange-vivid/10">
              <p className="text-charcoal/50">No posts found for {activeTab} tab.</p>
            </div>
          ) : (
            currentPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl p-6 border border-orange-vivid/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-charcoal">{post.title}</h3>
                    <span className="px-3 py-1 bg-orange-vivid/10 text-orange-deep rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(post)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      copiedId === post.id
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-vivid text-white hover:bg-orange-deep'
                    }`}
                  >
                    {copiedId === post.id ? 'Copied!' : `Copy ${activeVersion}`}
                  </button>
                </div>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-charcoal/70 text-sm bg-soft-white p-4 rounded-lg">
                    {post[activeVersion]}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
