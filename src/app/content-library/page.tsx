'use client';

import { useState } from 'react';
import { socialPosts, communityPosts, skoolPosts } from './data';

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

export default function ContentLibrary() {
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeVersion, setActiveVersion] = useState<VersionKey>('short');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const posts = [...socialPosts, ...communityPosts, ...skoolPosts];

  const socialPostsFiltered = posts.filter(post => post.tab === 'social');
  const communityPostsFiltered = posts.filter(post => post.tab === 'community');
  const skoolPostsFiltered = posts.filter(post => post.tab === 'skool');

  const currentPosts = activeTab === 'social' ? socialPostsFiltered :
                      activeTab === 'community' ? communityPostsFiltered : skoolPostsFiltered;

  const handleCopy = (post: Post) => {
    navigator.clipboard.writeText(post[activeVersion]);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-pure-black text-off-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 pt-4">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gold-vivid to-gold-deep bg-clip-text text-transparent">
            Purpose &amp; Profit Builders Content Library
          </h1>
          <p className="text-off-white/60">Faith-driven business content ready to copy and share</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTab('social')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'social'
                ? 'bg-gold-vivid text-black shadow-md shadow-gold-vivid/20'
                : 'bg-dark-gray text-off-white/60 hover:bg-dark-cream border border-gold-vivid/15'
            }`}
          >
            Social Media ({socialPostsFiltered.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'community'
                ? 'bg-gold-deep text-white shadow-md shadow-gold-deep/20'
                : 'bg-dark-gray text-off-white/60 hover:bg-dark-cream border border-gold-vivid/15'
            }`}
          >
            Community ({communityPostsFiltered.length})
          </button>
          <button
            onClick={() => setActiveTab('skool')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'skool'
                ? 'bg-gold-warm text-black shadow-md shadow-gold-warm/20'
                : 'bg-dark-gray text-off-white/60 hover:bg-dark-cream border border-gold-vivid/15'
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
                  ? 'bg-gold-vivid text-black'
                  : 'bg-dark-gray text-off-white/60 hover:bg-dark-cream border border-gold-vivid/10'
              }`}
            >
              {version}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {currentPosts.length === 0 ? (
            <div className="bg-dark-gray rounded-xl p-8 text-center border border-gold-vivid/10">
              <p className="text-off-white/50">No posts found for {activeTab} tab.</p>
            </div>
          ) : (
            currentPosts.map(post => (
              <div key={post.id} className="bg-dark-gray rounded-xl p-6 border border-gold-vivid/10 shadow-sm hover:shadow-md hover:shadow-gold-vivid/5 transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-off-white">{post.title}</h3>
                    <span className="px-3 py-1 bg-gold-vivid/10 text-gold-vivid rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(post)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      copiedId === post.id
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-gold-vivid text-black hover:bg-gold-warm'
                    }`}
                  >
                    {copiedId === post.id ? 'Copied!' : `Copy ${activeVersion}`}
                  </button>
                </div>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-off-white/70 text-sm bg-dark-cream p-4 rounded-lg">
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
