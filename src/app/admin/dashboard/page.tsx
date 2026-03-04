"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllSprintSubmissions, SprintSubmission } from '@/lib/supabase';
import { isAdmin, getStorageKey } from '@/lib/auth';
import { socialPosts, communityPosts, skoolPosts } from '@/app/content-library/data';
import { fullContentLibrary } from '@/app/content-library/bbc-content';
import { additionalSocialPosts } from '@/app/content-library/bbc-additional';

type AdminView = 'quiz' | 'content' | 'members';
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
  source: 'ppb' | 'bbc';
}

function normalizeBBCPost(post: typeof fullContentLibrary[0], prefix: string): NormalizedPost {
  return {
    id: `${prefix}-${post.id}`,
    title: post.title,
    short: post.versions.short,
    medium: post.versions.medium,
    long: post.versions.long,
    category: post.category,
    tab: post.tab === 'content' ? 'community' : post.tab as 'social' | 'community' | 'skool',
    source: 'bbc',
  };
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
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeVersion, setActiveVersion] = useState<VersionKey>('short');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [contentSource, setContentSource] = useState<'all' | 'ppb' | 'bbc'>('all');

  // Auth check
  useEffect(() => {
    const savedEmail = localStorage.getItem(getStorageKey('admin'));
    if (!savedEmail || !isAdmin(savedEmail)) {
      router.replace('/admin');
      return;
    }
    setCurrentUser(savedEmail);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (currentUser) loadSubmissions();
  }, [currentUser]);

  useEffect(() => {
    applyFilters();
  }, [submissions, searchTerm, selectedProfile, startDate, endDate]);

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

  const applyFilters = () => {
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

  // Merge all content sources
  const ppbPosts: NormalizedPost[] = [...socialPosts, ...communityPosts, ...skoolPosts].map(p => ({
    ...p, id: `ppb-${p.id}`, source: 'ppb' as const
  }));
  const bbcPosts: NormalizedPost[] = fullContentLibrary.map(p => normalizeBBCPost(p, 'bbc'));
  const bbcAdditionalPosts: NormalizedPost[] = additionalSocialPosts.map(p => normalizeBBCPost(p, 'bbc-add'));

  const allPosts = [...ppbPosts, ...bbcPosts, ...bbcAdditionalPosts];
  const filteredBySource = contentSource === 'all' ? allPosts : allPosts.filter(p => p.source === contentSource);
  const currentPosts = filteredBySource.filter(p => p.tab === activeTab);

  const handleCopy = (postId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Members list
  const members = [
    { name: 'David', slug: 'david', email: 'david@example.com' },
    { name: 'Cathy', slug: 'cathy', email: 'cathy@example.com' },
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
        <aside className="w-64 bg-dark-soft text-white flex flex-col fixed inset-y-0 left-0 z-40 border-r border-gold-vivid/10">
          <div className="p-6 border-b border-gold-vivid/10">
            <h1 className="text-lg font-bold text-gold-vivid">Purpose &amp; Profit Builders</h1>
            <p className="text-xs text-off-white/40 mt-1">Admin Dashboard</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {([
              { key: 'quiz' as AdminView, label: 'Sprint Results', count: stats.total,
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /> },
              { key: 'content' as AdminView, label: 'Content Library', count: allPosts.length,
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /> },
              { key: 'members' as AdminView, label: 'Members', count: members.length,
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> },
            ]).map(item => (
              <button key={item.key} onClick={() => setActiveView(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === item.key ? 'bg-gold-vivid text-black' : 'text-off-white/60 hover:bg-dark-gray hover:text-off-white'
                }`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">{item.icon}</svg>
                {item.label}
                {item.count > 0 && <span className="ml-auto bg-dark-gray text-off-white/60 text-xs px-2 py-0.5 rounded-full">{item.count}</span>}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gold-vivid/10">
            <p className="text-xs text-off-white/40 truncate mb-3">{currentUser}</p>
            <button onClick={handleLogout} className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {activeView === 'quiz' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-off-white mb-2">Sprint Results</h2>
                <p className="text-off-white/50">Manage and analyze Clarity Quiz submissions</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {[
                  { label: 'Total', value: stats.total, color: 'text-off-white' },
                  { label: 'Today', value: stats.todayCount, color: 'text-gold-vivid' },
                  { label: 'This Week', value: stats.thisWeekCount, color: 'text-gold-warm' },
                  { label: 'Kingdom Starter', value: stats.kingdomStarter, color: 'text-green-400' },
                  { label: 'Systems Builder', value: stats.systemsBuilder, color: 'text-gold-vivid' },
                  { label: 'Explorer', value: stats.explorer, color: 'text-blue-400' },
                ].map(stat => (
                  <div key={stat.label} className="bg-dark-gray rounded-lg border border-off-white/5 p-5">
                    <h3 className="text-xs font-medium text-off-white/40 uppercase">{stat.label}</h3>
                    <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="bg-dark-gray rounded-lg border border-off-white/5 p-6 mb-8">
                <h3 className="text-lg font-semibold text-off-white mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-off-white/50 mb-2">Search</label>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Name, email, or phone..."
                      className="w-full px-3 py-2 border border-off-white/10 rounded-md bg-dark-cream text-off-white placeholder-off-white/30 focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-off-white/50 mb-2">Profile</label>
                    <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}
                      className="w-full px-3 py-2 border border-off-white/10 rounded-md bg-dark-cream text-off-white focus:outline-none focus:ring-2 focus:ring-gold-vivid">
                      <option value="">All Profiles</option>
                      <option value="kingdom-starter">Kingdom Starter</option>
                      <option value="systems-builder">Systems Builder</option>
                      <option value="explorer">Explorer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-off-white/50 mb-2">Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-off-white/10 rounded-md bg-dark-cream text-off-white focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-off-white/50 mb-2">End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-off-white/10 rounded-md bg-dark-cream text-off-white focus:outline-none focus:ring-2 focus:ring-gold-vivid" />
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <button onClick={() => { setSearchTerm(''); setSelectedProfile(''); setStartDate(''); setEndDate(''); }}
                    className="px-4 py-2 text-sm text-off-white/50 hover:text-off-white">Clear Filters</button>
                  <button onClick={exportToCSV}
                    className="px-4 py-2 bg-gold-vivid text-black text-sm rounded font-medium hover:bg-gold-warm">
                    Export CSV ({filteredSubmissions.length})
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-vivid" />
                  <span className="ml-3 text-off-white/50">Loading submissions...</span>
                </div>
              ) : (
                <div className="bg-dark-gray rounded-lg border border-off-white/5 overflow-hidden">
                  <div className="px-6 py-4 border-b border-off-white/5">
                    <h3 className="text-lg font-semibold text-off-white">Submissions ({filteredSubmissions.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-off-white/5">
                      <thead className="bg-dark-cream">
                        <tr>
                          {['Name & Contact', 'Profile', 'Monthly Income', 'Challenge', 'Date', 'Actions'].map(h => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-off-white/40 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-off-white/5">
                        {filteredSubmissions.map((s) => (
                          <tr key={s.id} className="hover:bg-dark-cream/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-off-white">{s.full_name}</div>
                              <div className="text-sm text-off-white/40">{s.email}</div>
                              <div className="text-sm text-off-white/40">{s.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                s.profile === 'kingdom-starter' ? 'bg-green-900/30 text-green-400' :
                                s.profile === 'systems-builder' ? 'bg-gold-vivid/20 text-gold-vivid' :
                                'bg-blue-900/30 text-blue-400'
                              }`}>{s.profile_name}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-off-white">{s.monthly_income}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-off-white">{s.biggest_challenge}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-off-white/50">
                              {new Date(s.created_at).toLocaleDateString()}
                              <div className="text-xs text-off-white/30">{new Date(s.created_at).toLocaleTimeString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button onClick={() => { setSelectedSubmission(s); setShowModal(true); }}
                                className="text-gold-vivid hover:text-gold-warm">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-off-white/40 text-lg">No submissions found.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeView === 'content' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-off-white mb-2">Content Library</h2>
                <p className="text-off-white/50">All content from PPB and Business Builders Club</p>
              </div>

              {/* Source filter */}
              <div className="flex gap-2 mb-4">
                {([
                  { key: 'all' as const, label: 'All Sources' },
                  { key: 'ppb' as const, label: 'PPB Original' },
                  { key: 'bbc' as const, label: 'Business Builders Club' },
                ]).map(s => (
                  <button key={s.key} onClick={() => setContentSource(s.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      contentSource === s.key ? 'bg-gold-vivid/20 text-gold-vivid border border-gold-vivid/30' : 'bg-dark-gray text-off-white/60 border border-off-white/10 hover:bg-dark-cream'
                    }`}>{s.label}</button>
                ))}
              </div>

              {/* Tab navigation */}
              <div className="flex flex-wrap gap-3 mb-6">
                {(['social', 'community', 'skool'] as TabKey[]).map(tab => {
                  const count = filteredBySource.filter(p => p.tab === tab).length;
                  return (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors capitalize ${
                        activeTab === tab ? 'bg-gold-vivid text-black shadow-sm' : 'bg-dark-gray text-off-white/60 border border-off-white/10 hover:bg-dark-cream'
                      }`}>{tab === 'social' ? 'Social Media' : tab} ({count})</button>
                  );
                })}
              </div>

              {/* Version toggle */}
              <div className="flex gap-2 mb-6">
                {(['short', 'medium', 'long'] as VersionKey[]).map(v => (
                  <button key={v} onClick={() => setActiveVersion(v)}
                    className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-colors ${
                      activeVersion === v ? 'bg-gold-vivid text-black shadow-sm' : 'bg-dark-gray text-off-white/60 border border-off-white/10 hover:bg-dark-cream'
                    }`}>{v}</button>
                ))}
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {currentPosts.length === 0 ? (
                  <div className="bg-dark-gray rounded-lg border border-off-white/5 p-8 text-center">
                    <p className="text-off-white/40">No posts found.</p>
                  </div>
                ) : currentPosts.map(post => (
                  <div key={post.id} className="bg-dark-gray rounded-lg border border-off-white/5 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-off-white mb-2">{post.title}</h3>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-gold-vivid/10 text-gold-vivid rounded-full text-xs font-medium">{post.category}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.source === 'ppb' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'
                          }`}>{post.source === 'ppb' ? 'PPB' : 'BBC'}</span>
                        </div>
                      </div>
                      <button onClick={() => handleCopy(post.id, post[activeVersion])}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                          copiedId === post.id ? 'bg-green-900/30 text-green-400' : 'bg-gold-vivid hover:bg-gold-warm text-black'
                        }`}>{copiedId === post.id ? 'Copied!' : `Copy ${activeVersion}`}</button>
                    </div>
                    <pre className="whitespace-pre-wrap text-off-white/70 text-sm leading-relaxed bg-dark-cream rounded-lg p-4">{post[activeVersion]}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'members' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-off-white mb-2">Members</h2>
                <p className="text-off-white/50">Community members with content library access</p>
              </div>
              <div className="grid gap-4">
                {members.map(m => (
                  <div key={m.slug} className="bg-dark-gray rounded-lg border border-off-white/5 p-6 flex items-center justify-between">
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-gray border border-off-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-off-white">Submission Details</h2>
                  <p className="text-off-white/50">{selectedSubmission.full_name} - {selectedSubmission.email}</p>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedSubmission(null); }} className="text-off-white/40 hover:text-off-white text-2xl">&times;</button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-off-white mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ['Full Name', selectedSubmission.full_name],
                    ['Email', selectedSubmission.email],
                    ['Phone', selectedSubmission.phone],
                    ['Date', new Date(selectedSubmission.created_at).toLocaleString()],
                  ].map(([label, value]) => (
                    <div key={label}><label className="block text-sm font-medium text-off-white/40">{label}</label><p className="text-sm text-off-white">{value}</p></div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-off-white mb-3">Builder Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    ['Profile', selectedSubmission.profile_name],
                    ['Monthly Income', selectedSubmission.monthly_income],
                    ['Has Offer', selectedSubmission.has_offer ? 'Yes' : 'No'],
                    ['Offer Type', selectedSubmission.offer_type],
                    ['Uses AI', selectedSubmission.uses_ai ? 'Yes' : 'No'],
                    ['Has Systems', selectedSubmission.has_systems ? 'Yes' : 'No'],
                    ['Faith Alignment', selectedSubmission.faith_alignment],
                    ['Biggest Challenge', selectedSubmission.biggest_challenge],
                  ].map(([label, value]) => (
                    <div key={label}><label className="block text-sm font-medium text-off-white/40">{label}</label><p className="text-sm text-off-white">{value}</p></div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => { setShowModal(false); setSelectedSubmission(null); }}
                  className="px-6 py-2 bg-off-white/10 text-off-white rounded hover:bg-off-white/20">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
