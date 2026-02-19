"use client";

import { useState, useEffect } from 'react';
import { getAllQuizSubmissions, QuizSubmission } from '@/lib/supabase';
import AdminAuth from '@/components/AdminAuth';
import { socialPosts, communityPosts, skoolPosts } from '@/app/content-library/data';

type AdminView = 'quiz' | 'content';
type TabKey = 'social' | 'community' | 'skool';
type VersionKey = 'short' | 'medium' | 'long';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<AdminView>('quiz');

  // Quiz state
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<QuizSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stats, setStats] = useState({
    total: 0, creditBuilder: 0, fundingSeeker: 0,
    explorer: 0, todayCount: 0, thisWeekCount: 0
  });

  // Content library state
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeVersion, setActiveVersion] = useState<VersionKey>('short');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('creditHubAdminEmail');
    if (savedEmail) {
      setIsAuthenticated(true);
      setCurrentUser(savedEmail);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && typeof window !== 'undefined') {
      loadSubmissions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    applyFilters();
  }, [submissions, searchTerm, selectedProfile, startDate, endDate]);

  const handleAuthenticate = (email: string) => {
    setIsAuthenticated(true);
    setCurrentUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('creditHubAdminEmail');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllQuizSubmissions();
      setSubmissions(data);
      calculateStats(data);
    } catch {
      setError('Failed to load quiz submissions. Please check your Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: QuizSubmission[]) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    setStats({
      total: data.length,
      creditBuilder: data.filter(s => s.profile === 'credit-builder').length,
      fundingSeeker: data.filter(s => s.profile === 'funding-seeker').length,
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
    if (selectedProfile) {
      filtered = filtered.filter(s => s.profile === selectedProfile);
    }
    if (startDate && endDate) {
      filtered = filtered.filter(s => {
        const submitDate = new Date(s.created_at).toISOString().split('T')[0];
        return submitDate >= startDate && submitDate <= endDate;
      });
    }
    setFilteredSubmissions(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Profile', 'FICO Range', 'Has Negatives', 'Utilization', 'In Business', 'Revenue', 'Challenge', 'Date'];
    const csvData = filteredSubmissions.map(s => [
      s.full_name, s.email, s.phone, s.profile_name, s.fico_range,
      s.has_negatives ? 'Yes' : 'No', s.utilization, s.in_business ? 'Yes' : 'No',
      s.monthly_revenue, s.biggest_challenge,
      new Date(s.created_at).toLocaleDateString()
    ]);
    const csvContent = [headers, ...csvData].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credit_hub_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Content library helpers
  const allPosts = [...socialPosts, ...communityPosts, ...skoolPosts];
  const socialPostsFiltered = allPosts.filter(p => p.tab === 'social');
  const communityPostsFiltered = allPosts.filter(p => p.tab === 'community');
  const skoolPostsFiltered = allPosts.filter(p => p.tab === 'skool');
  const currentPosts = activeTab === 'social' ? socialPostsFiltered :
                       activeTab === 'community' ? communityPostsFiltered : skoolPostsFiltered;

  const handleCopy = (postId: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
          <span className="ml-3 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticate={handleAuthenticate} />;
  }

  return (
    <>
      {error && (
        <div className="fixed top-6 right-6 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50">
          <div className="flex justify-between items-start">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <p className="mt-1 text-sm text-red-600">{error}</p>
              </div>
            </div>
            <button onClick={() => setError(null)} className="ml-4 text-red-400 hover:text-red-600">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-40">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-lg font-bold text-orange-400">The Credit Hub</h1>
            <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveView('quiz')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'quiz' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              Quiz Results
              {stats.total > 0 && <span className="ml-auto bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{stats.total}</span>}
            </button>
            <button
              onClick={() => setActiveView('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'content' ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Content Library
              <span className="ml-auto bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{allPosts.length}</span>
            </button>
          </nav>
          <div className="p-4 border-t border-gray-800">
            <p className="text-xs text-gray-400 truncate mb-3">{currentUser}</p>
            <button onClick={handleLogout} className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {activeView === 'quiz' ? (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h2>
                <p className="text-gray-600">Manage and analyze Credit GPS quiz submissions</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-5">
                  <h3 className="text-xs font-medium text-gray-500 uppercase">Total</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <h3 className="text-xs font-medium text-gray-500 uppercase">Today</h3>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{stats.todayCount}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <h3 className="text-xs font-medium text-gray-500 uppercase">This Week</h3>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{stats.thisWeekCount}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <h3 className="text-xs font-medium text-gray-500 uppercase">Credit Builder</h3>
                  <p className="text-2xl font-bold text-orange-600 mt-1">{stats.creditBuilder}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <h3 className="text-xs font-medium text-gray-500 uppercase">Funding Ready</h3>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.fundingSeeker}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-5">
                  <h3 className="text-xs font-medium text-gray-500 uppercase">Explorer</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{stats.explorer}</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Name, email, or phone..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile</label>
                    <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option value="">All Profiles</option>
                      <option value="credit-builder">Credit Builder</option>
                      <option value="funding-seeker">Funding Ready</option>
                      <option value="explorer">Explorer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <button onClick={() => { setSearchTerm(''); setSelectedProfile(''); setStartDate(''); setEndDate(''); }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">Clear Filters</button>
                  <button onClick={exportToCSV}
                    className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">
                    Export CSV ({filteredSubmissions.length})
                  </button>
                </div>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
                  <span className="ml-3 text-gray-500">Loading submissions...</span>
                </div>
              )}

              {!loading && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Quiz Submissions ({filteredSubmissions.length})</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name &amp; Contact</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FICO Range</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Challenge</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSubmissions.map((submission) => (
                          <tr key={submission.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{submission.full_name}</div>
                              <div className="text-sm text-gray-500">{submission.email}</div>
                              <div className="text-sm text-gray-500">{submission.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                submission.profile === 'credit-builder' ? 'bg-orange-100 text-orange-800' :
                                submission.profile === 'funding-seeker' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {submission.profile_name}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.fico_range}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.biggest_challenge}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(submission.created_at).toLocaleDateString()}
                              <div className="text-xs text-gray-400">{new Date(submission.created_at).toLocaleTimeString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button onClick={() => { setSelectedSubmission(submission); setShowModal(true); }}
                                className="text-orange-600 hover:text-orange-900">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No submissions found matching your filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h2>
                <p className="text-gray-600">Credit &amp; funding content ready to copy and share</p>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => setActiveTab('social')}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${activeTab === 'social' ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}>
                  Social Media ({socialPostsFiltered.length})
                </button>
                <button onClick={() => setActiveTab('community')}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${activeTab === 'community' ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}>
                  Community ({communityPostsFiltered.length})
                </button>
                <button onClick={() => setActiveTab('skool')}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${activeTab === 'skool' ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}>
                  Skool Posts ({skoolPostsFiltered.length})
                </button>
              </div>
              <div className="flex gap-2 mb-6">
                {(['short', 'medium', 'long'] as VersionKey[]).map(version => (
                  <button key={version} onClick={() => setActiveVersion(version)}
                    className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-colors ${activeVersion === version ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}>
                    {version}
                  </button>
                ))}
              </div>
              <div className="space-y-6">
                {currentPosts.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500">No posts found for {activeTab} tab.</p>
                  </div>
                ) : (
                  currentPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                          <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">{post.category}</span>
                        </div>
                        <button onClick={() => handleCopy(post.id, post[activeVersion])}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${copiedId === post.id ? 'bg-green-100 text-green-700' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>
                          {copiedId === post.id ? 'Copied!' : `Copy ${activeVersion}`}
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-lg p-4">{post[activeVersion]}</pre>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quiz Details Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Quiz Submission Details</h2>
                  <p className="text-gray-600">{selectedSubmission.full_name} - {selectedSubmission.email}</p>
                </div>
                <button onClick={() => { setShowModal(false); setSelectedSubmission(null); }} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700">Full Name</label><p className="text-sm text-gray-900">{selectedSubmission.full_name}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Email</label><p className="text-sm text-gray-900">{selectedSubmission.email}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Phone</label><p className="text-sm text-gray-900">{selectedSubmission.phone}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Date</label><p className="text-sm text-gray-900">{new Date(selectedSubmission.created_at).toLocaleString()}</p></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Credit Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700">Profile</label><p className="text-sm text-gray-900">{selectedSubmission.profile_name}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">FICO Range</label><p className="text-sm text-gray-900">{selectedSubmission.fico_range}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Has Negatives</label><p className="text-sm text-gray-900">{selectedSubmission.has_negatives ? 'Yes' : 'No'}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Utilization</label><p className="text-sm text-gray-900">{selectedSubmission.utilization}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Two Cards $2,500+</label><p className="text-sm text-gray-900">{selectedSubmission.has_two_cards ? 'Yes' : 'No'}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">In Business</label><p className="text-sm text-gray-900">{selectedSubmission.in_business ? 'Yes' : 'No'}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Monthly Revenue</label><p className="text-sm text-gray-900">{selectedSubmission.monthly_revenue}</p></div>
                  <div><label className="block text-sm font-medium text-gray-700">Biggest Challenge</label><p className="text-sm text-gray-900">{selectedSubmission.biggest_challenge}</p></div>
                </div>
              </div>

              {selectedSubmission.negative_items && selectedSubmission.negative_items.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Negative Items</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.negative_items.map((item, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubmission.occupation && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Occupation</h3>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{selectedSubmission.occupation}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={() => { setShowModal(false); setSelectedSubmission(null); }}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
