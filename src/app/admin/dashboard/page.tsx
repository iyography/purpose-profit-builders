"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getAllSprintSubmissions, SprintSubmission } from '@/lib/supabase';
import { isAdmin, getStorageKey } from '@/lib/auth';
import { socialPosts, communityPosts, skoolPosts } from '@/app/content-library/data';
import { fullContentLibrary } from '@/app/content-library/bbc-content';
import { additionalSocialPosts } from '@/app/content-library/bbc-additional';

type AdminView = 'quiz' | 'content' | 'members';
type ContentTab = 'social' | 'community' | 'skool' | 'posted';
type VersionKey = 'short' | 'medium' | 'long';

interface ContentPost {
  id: string;
  title: string;
  short: string;
  medium: string;
  long: string;
  category: string;
  tab: 'social' | 'community' | 'skool';
}

function normalizeBBCPost(post: typeof fullContentLibrary[0], prefix: string): ContentPost {
  return {
    id: `${prefix}-${post.id}`,
    title: post.title,
    short: post.versions.short,
    medium: post.versions.medium,
    long: post.versions.long,
    category: post.category,
    tab: post.tab === 'content' ? 'community' : post.tab as 'social' | 'community' | 'skool',
  };
}

const POSTED_STORAGE_KEY = 'ppb_posted_ids';

function getPostedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = localStorage.getItem(POSTED_STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch { return new Set(); }
}

function savePostedIds(ids: Set<string>) {
  localStorage.setItem(POSTED_STORAGE_KEY, JSON.stringify([...ids]));
}

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<AdminView>('quiz');

  // Sprint state
  const [submissions, setSubmissions] = useState<SprintSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<SprintSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<SprintSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stats, setStats] = useState({
    total: 0, kingdomStarter: 0, systemsBuilder: 0,
    explorer: 0, todayCount: 0, thisWeekCount: 0
  });

  // Content library state
  const [activeContentTab, setActiveContentTab] = useState<ContentTab>('social');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedVersion, setCopiedVersion] = useState<VersionKey | null>(null);
  const [postedIds, setPostedIds] = useState<Set<string>>(new Set());
  const [contentSearch, setContentSearch] = useState('');

  // Auth check
  useEffect(() => {
    const savedEmail = localStorage.getItem(getStorageKey('admin'));
    if (!savedEmail || !isAdmin(savedEmail)) {
      router.replace('/admin');
      return;
    }
    setCurrentUser(savedEmail);
    setPostedIds(getPostedIds());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (currentUser) loadSubmissions();
  }, [currentUser]);

  const applyFilters = useCallback(() => {
    let filtered = [...submissions];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.full_name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.phone.includes(term)
      );
    }
    if (selectedProfile) filtered = filtered.filter(s => s.profile === selectedProfile);
    if (startDate && endDate) {
      filtered = filtered.filter(s => {
        const d = new Date(s.created_at).toISOString().split('T')[0];
        return d >= startDate && d <= endDate;
      });
    }
    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, selectedProfile, startDate, endDate]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleLogout = () => {
    localStorage.removeItem(getStorageKey('admin'));
    router.replace('/admin');
  };

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllSprintSubmissions();
      setSubmissions(data);
      calculateStats(data);
    } catch {
      setError('Failed to load sprint submissions.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: SprintSubmission[]) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    setStats({
      total: data.length,
      kingdomStarter: data.filter(s => s.profile === 'kingdom-starter').length,
      systemsBuilder: data.filter(s => s.profile === 'systems-builder').length,
      explorer: data.filter(s => s.profile === 'explorer').length,
      todayCount: data.filter(s => new Date(s.created_at) >= todayStart).length,
      thisWeekCount: data.filter(s => new Date(s.created_at) >= weekAgo).length
    });
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Profile', 'Monthly Income', 'Has Offer', 'Uses AI', 'Has Systems', 'Faith Alignment', 'Challenge', 'Date'];
    const csvData = filteredSubmissions.map(s => [
      s.full_name, s.email, s.phone, s.profile_name, s.monthly_income,
      s.has_offer ? 'Yes' : 'No', s.uses_ai ? 'Yes' : 'No', s.has_systems ? 'Yes' : 'No',
      s.faith_alignment, s.biggest_challenge,
      new Date(s.created_at).toLocaleDateString()
    ]);
    const csvContent = [headers, ...csvData].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ppb_sprint_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Build unified content library (no BBC branding)
  const ppbPosts: ContentPost[] = [...socialPosts, ...communityPosts, ...skoolPosts].map(p => ({
    ...p, id: `ppb-${p.id}`
  }));
  const bbcPosts: ContentPost[] = fullContentLibrary.map(p => normalizeBBCPost(p, 'bbc'));
  const bbcAddPosts: ContentPost[] = additionalSocialPosts.map(p => normalizeBBCPost(p, 'bbc-add'));
  const allPosts: ContentPost[] = [...ppbPosts, ...bbcPosts, ...bbcAddPosts];

  // Filter by search
  const searchFiltered = contentSearch
    ? allPosts.filter(p => p.title.toLowerCase().includes(contentSearch.toLowerCase()) || p.category.toLowerCase().includes(contentSearch.toLowerCase()))
    : allPosts;

  // Split into posted vs not-posted
  const postedPosts = searchFiltered.filter(p => postedIds.has(p.id));
  const unpostedByTab = (tab: 'social' | 'community' | 'skool') =>
    searchFiltered.filter(p => p.tab === tab && !postedIds.has(p.id));

  const currentPosts = activeContentTab === 'posted'
    ? postedPosts
    : unpostedByTab(activeContentTab as 'social' | 'community' | 'skool');

  const handleCopy = (postId: string, version: VersionKey, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(postId);
    setCopiedVersion(version);
    setTimeout(() => { setCopiedId(null); setCopiedVersion(null); }, 2000);
  };

  const togglePosted = (postId: string) => {
    const next = new Set(postedIds);
    if (next.has(postId)) next.delete(postId);
    else next.add(postId);
    setPostedIds(next);
    savePostedIds(next);
  };

  // Members
  const members = [
    { name: 'Theodore', slug: 'theodore', email: 'theodore@ppbuilders.com' },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-pure-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-vivid" />
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="fixed top-6 right-6 max-w-md bg-red-900/30 border border-red-500/30 rounded-lg p-4 shadow-lg z-50">
          <div className="flex justify-between items-start">
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-300 text-xl">&times;</button>
          </div>
        </div>
      )}

      <div className="min-h-screen flex bg-pure-black">
        {/* Sidebar */}
        <aside className="w-56 bg-dark-soft text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-gold-vivid/10">
          <div className="p-5 border-b border-gold-vivid/10">
            <h1 className="text-base font-bold text-gold-vivid leading-tight">Purpose &amp; Profit Builders</h1>
            <p className="text-[10px] text-off-white/40 mt-1">Admin Dashboard</p>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {([
              { key: 'quiz' as AdminView, label: 'Sprint Results', icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z' },
              { key: 'content' as AdminView, label: 'Content Library', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
              { key: 'members' as AdminView, label: 'Members', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
            ]).map(item => (
              <button key={item.key} onClick={() => setActiveView(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === item.key ? 'bg-gold-vivid text-black' : 'text-off-white/60 hover:bg-dark-gray hover:text-off-white'
                }`}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gold-vivid/10">
            <p className="text-[10px] text-off-white/40 truncate mb-2">{currentUser}</p>
            <button onClick={handleLogout} className="w-full px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-56 p-6">

          {/* ═══════════ SPRINT RESULTS ═══════════ */}
          {activeView === 'quiz' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-off-white mb-1">Sprint Results</h2>
                <p className="text-sm text-off-white/50">Clarity Quiz submissions</p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { label: 'Total', value: stats.total, color: 'text-off-white' },
                  { label: 'Today', value: stats.todayCount, color: 'text-gold-vivid' },
                  { label: 'This Week', value: stats.thisWeekCount, color: 'text-gold-warm' },
                  { label: 'Kingdom Starter', value: stats.kingdomStarter, color: 'text-green-400' },
                  { label: 'Systems Builder', value: stats.systemsBuilder, color: 'text-gold-vivid' },
                  { label: 'Explorer', value: stats.explorer, color: 'text-blue-400' },
                ].map(stat => (
                  <div key={stat.label} className="bg-dark-gray rounded-lg border border-off-white/5 p-4">
                    <h3 className="text-[10px] font-medium text-off-white/40 uppercase">{stat.label}</h3>
                    <p className={`text-xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="bg-dark-gray rounded-lg border border-off-white/5 p-4 mb-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, email, phone..."
                    className="px-3 py-2 text-sm border border-off-white/10 rounded-md bg-dark-cream text-off-white placeholder-off-white/30 focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
                  <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}
                    className="px-3 py-2 text-sm border border-off-white/10 rounded-md bg-dark-cream text-off-white focus:outline-none focus:ring-2 focus:ring-gold-vivid">
                    <option value="">All Profiles</option>
                    <option value="kingdom-starter">Kingdom Starter</option>
                    <option value="systems-builder">Systems Builder</option>
                    <option value="explorer">Explorer</option>
                  </select>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 text-sm border border-off-white/10 rounded-md bg-dark-cream text-off-white focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 text-sm border border-off-white/10 rounded-md bg-dark-cream text-off-white focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
                </div>
                <div className="mt-3 flex gap-3">
                  <button onClick={() => { setSearchTerm(''); setSelectedProfile(''); setStartDate(''); setEndDate(''); }}
                    className="px-3 py-1.5 text-xs text-off-white/50 hover:text-off-white">Clear</button>
                  <button onClick={exportToCSV}
                    className="px-3 py-1.5 bg-gold-vivid text-black text-xs rounded font-medium hover:bg-gold-warm">
                    Export CSV ({filteredSubmissions.length})
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-vivid" />
                  <span className="ml-3 text-off-white/50">Loading...</span>
                </div>
              ) : (
                <div className="bg-dark-gray rounded-lg border border-off-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-off-white/5">
                      <thead className="bg-dark-cream">
                        <tr>
                          {['Name & Contact', 'Profile', 'Income', 'Challenge', 'Date', ''].map(h => (
                            <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium text-off-white/40 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-off-white/5">
                        {filteredSubmissions.map((s) => (
                          <tr key={s.id} className="hover:bg-dark-cream/50">
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-off-white">{s.full_name}</div>
                              <div className="text-xs text-off-white/40">{s.email}</div>
                              <div className="text-xs text-off-white/40">{s.phone}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                                s.profile === 'kingdom-starter' ? 'bg-green-900/30 text-green-400' :
                                s.profile === 'systems-builder' ? 'bg-gold-vivid/20 text-gold-vivid' :
                                'bg-blue-900/30 text-blue-400'
                              }`}>{s.profile_name}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-off-white">{s.monthly_income}</td>
                            <td className="px-4 py-3 text-xs text-off-white max-w-[200px] truncate">{s.biggest_challenge}</td>
                            <td className="px-4 py-3 text-xs text-off-white/50">
                              {new Date(s.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <button onClick={() => { setSelectedSubmission(s); setShowModal(true); }}
                                className="text-gold-vivid hover:text-gold-warm">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredSubmissions.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <p className="text-off-white/40">No submissions found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ═══════════ CONTENT LIBRARY ═══════════ */}
          {activeView === 'content' && (
            <div>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-off-white mb-1">Content Library</h2>
                <p className="text-sm text-off-white/50">Purpose &amp; Profit Builders content ready to copy and share</p>
              </div>

              {/* Tabs - all on one line */}
              <div className="flex items-center gap-2 mb-5">
                {([
                  { key: 'social' as ContentTab, label: 'Social Media', count: unpostedByTab('social').length },
                  { key: 'community' as ContentTab, label: 'Community', count: unpostedByTab('community').length },
                  { key: 'skool' as ContentTab, label: 'Skool', count: unpostedByTab('skool').length },
                  { key: 'posted' as ContentTab, label: 'Posted', count: postedPosts.length },
                ]).map(tab => (
                  <button key={tab.key} onClick={() => setActiveContentTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      activeContentTab === tab.key
                        ? tab.key === 'posted' ? 'bg-green-600 text-white' : 'bg-gold-vivid text-black'
                        : 'bg-dark-gray text-off-white/60 border border-off-white/10 hover:bg-dark-cream'
                    }`}>
                    {tab.label} ({tab.count})
                  </button>
                ))}

                {/* Search on the right */}
                <div className="ml-auto">
                  <input type="text" value={contentSearch} onChange={(e) => setContentSearch(e.target.value)}
                    placeholder="Search posts..."
                    className="px-3 py-2 text-sm border border-off-white/10 rounded-lg bg-dark-gray text-off-white placeholder-off-white/30 focus:outline-none focus:ring-2 focus:ring-gold-vivid w-56" />
                </div>
              </div>

              {/* Posts Grid - 3 per row */}
              {currentPosts.length === 0 ? (
                <div className="bg-dark-gray rounded-lg border border-off-white/5 p-12 text-center">
                  <p className="text-off-white/40">{activeContentTab === 'posted' ? 'No posted content yet. Check posts to mark them as posted.' : 'No posts found.'}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {currentPosts.map(post => {
                    const isPosted = postedIds.has(post.id);
                    return (
                      <div key={post.id} className={`bg-dark-gray rounded-lg border p-4 flex flex-col ${isPosted ? 'border-green-500/20 opacity-70' : 'border-off-white/5'}`}>
                        {/* Header row: checkbox + title */}
                        <div className="flex items-start gap-3 mb-3">
                          <button
                            onClick={() => togglePosted(post.id)}
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isPosted ? 'bg-green-600 border-green-600' : 'border-off-white/30 hover:border-gold-vivid'
                            }`}>
                            {isPosted && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-semibold text-off-white leading-tight mb-1.5 ${isPosted ? 'line-through opacity-60' : ''}`}>
                              {post.title}
                            </h3>
                            <span className="px-2 py-0.5 bg-gold-vivid/10 text-gold-vivid rounded-full text-[10px] font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Version buttons row */}
                        <div className="flex gap-1.5 mt-auto pt-3 border-t border-off-white/5">
                          {(['short', 'medium', 'long'] as VersionKey[]).map(v => {
                            const isCopied = copiedId === post.id && copiedVersion === v;
                            return (
                              <button key={v} onClick={() => handleCopy(post.id, v, post[v])}
                                className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors capitalize ${
                                  isCopied
                                    ? 'bg-green-900/40 text-green-400'
                                    : 'bg-dark-cream text-off-white/70 hover:bg-gold-vivid hover:text-black'
                                }`}>
                                {isCopied ? 'Copied!' : v}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ═══════════ MEMBERS ═══════════ */}
          {activeView === 'members' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-off-white mb-1">Members</h2>
                <p className="text-sm text-off-white/50">Community members with content library access</p>
              </div>
              <div className="grid gap-4">
                {members.map(m => (
                  <div key={m.slug} className="bg-dark-gray rounded-lg border border-off-white/5 p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-off-white">{m.name}</h3>
                      <p className="text-sm text-off-white/40">{m.email}</p>
                      <p className="text-xs text-off-white/30 mt-1">Dashboard: /{m.slug}</p>
                    </div>
                    <a href={`/${m.slug}`} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-gold-vivid text-black text-sm rounded-lg font-medium hover:bg-gold-warm">
                      View Dashboard
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Sprint Details Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-gray border border-off-white/10 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-off-white">{selectedSubmission.full_name}</h2>
                  <p className="text-sm text-off-white/50">{selectedSubmission.email} | {selectedSubmission.phone}</p>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedSubmission(null); }} className="text-off-white/40 hover:text-off-white text-2xl">&times;</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Profile', selectedSubmission.profile_name],
                  ['Monthly Income', selectedSubmission.monthly_income],
                  ['Has Offer', selectedSubmission.has_offer ? 'Yes' : 'No'],
                  ['Offer Type', selectedSubmission.offer_type || 'N/A'],
                  ['Uses AI', selectedSubmission.uses_ai ? 'Yes' : 'No'],
                  ['Has Systems', selectedSubmission.has_systems ? 'Yes' : 'No'],
                  ['Faith Alignment', selectedSubmission.faith_alignment],
                  ['Date', new Date(selectedSubmission.created_at).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className="bg-dark-cream rounded-lg p-3">
                    <p className="text-[10px] font-medium text-off-white/40 uppercase">{label}</p>
                    <p className="text-sm text-off-white mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {selectedSubmission.biggest_challenge && (
                <div className="mt-4 bg-dark-cream rounded-lg p-3">
                  <p className="text-[10px] font-medium text-off-white/40 uppercase">Biggest Challenge</p>
                  <p className="text-sm text-off-white mt-0.5">{selectedSubmission.biggest_challenge}</p>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button onClick={() => { setShowModal(false); setSelectedSubmission(null); }}
                  className="px-5 py-2 bg-off-white/10 text-off-white text-sm rounded-lg hover:bg-off-white/20">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
