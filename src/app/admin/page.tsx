"use client";

import { useState, useEffect } from 'react';
import { getAllQuizSubmissions, getQuizSubmissionsByDateRange, getQuizSubmissionsByArchetype, QuizSubmission } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import AdminAuth from '@/components/AdminAuth';
import FloatingDots from '@/components/FloatingDots';
import { getQuestionsForPath } from '@/lib/quiz/questions';
import { QuizQuestion } from '@/lib/quiz/types';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<QuizSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<QuizSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    foundationSeeker: 0,
    systemBuilder: 0,
    visionaryLeader: 0,
    todayCount: 0,
    thisWeekCount: 0
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated && typeof window !== 'undefined') {
      loadSubmissions();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    applyFilters();
  }, [submissions, searchTerm, selectedArchetype, startDate, endDate]);

  const checkAuthentication = () => {
    const savedEmail = localStorage.getItem('focusFoundersAdminEmail');
    if (savedEmail) {
      setIsAuthenticated(true);
      setCurrentUser(savedEmail);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleAuthenticate = (email: string) => {
    setIsAuthenticated(true);
    setCurrentUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('focusFoundersAdminEmail');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleViewDetails = (submission: QuizSubmission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const getQuestionAndAnswerForSubmission = (submission: QuizSubmission) => {
    // Check if we have detailed answers (new format)
    if (submission.answers.detailedAnswers && Array.isArray(submission.answers.detailedAnswers)) {
      return submission.answers.detailedAnswers.map((qa: any) => ({
        question: qa.questionText,
        answer: qa.selectedAnswer
      }));
    }
    
    // Fallback to old format for backwards compatibility
    const growthStageMap: { [key: string]: string } = {
      'Starting Up': 'startup',
      'Growing': 'growing', 
      'Established': 'established',
      'Scaling': 'scaling'
    };
    
    const growthStage = growthStageMap[submission.track] || 'startup';
    const questions = getQuestionsForPath('service', growthStage as any);
    
    // Match answers to questions
    const questionAnswerPairs: Array<{ question: string; answer: string }> = [];
    
    Object.entries(submission.answers).forEach(([key, answer]) => {
      if (key === 'detailedAnswers' || key === 'businessType' || key === 'growthStage' || key === 'questionAnswers' || key === 'totalScore' || key === 'questions') {
        return; // Skip metadata fields
      }
      
      // Find the question by ID
      const question = questions.find(q => q.id.includes(key.replace('q', '')));
      if (question) {
        // Find the selected option text
        const selectedOption = question.options.find(opt => opt.text === answer);
        questionAnswerPairs.push({
          question: question.question,
          answer: selectedOption ? selectedOption.text : String(answer)
        });
      } else {
        // Fallback for questions not found
        questionAnswerPairs.push({
          question: `Question ${key.toUpperCase()}`,
          answer: String(answer)
        });
      }
    });
    
    return questionAnswerPairs;
  };

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllQuizSubmissions();
      setSubmissions(data);
      calculateStats(data);
    } catch (err) {
      setError('Failed to load quiz submissions. Please check your Supabase connection.');
      console.error('Error loading submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: QuizSubmission[]) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const stats = {
      total: data.length,
      foundationSeeker: data.filter(s => s.archetype === 'low').length,
      systemBuilder: data.filter(s => s.archetype === 'mid').length,
      visionaryLeader: data.filter(s => s.archetype === 'high').length,
      todayCount: data.filter(s => new Date(s.created_at) >= todayStart).length,
      thisWeekCount: data.filter(s => new Date(s.created_at) >= weekAgo).length
    };

    setStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...submissions];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s => 
        s.full_name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.phone.includes(term)
      );
    }

    // Archetype filter
    if (selectedArchetype) {
      filtered = filtered.filter(s => s.archetype === selectedArchetype);
    }

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(s => {
        const submitDate = new Date(s.created_at).toISOString().split('T')[0];
        return submitDate >= startDate && submitDate <= endDate;
      });
    }

    setFilteredSubmissions(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'Name', 'Email', 'Phone', 'Track', 'Archetype', 'Archetype Name', 
      'Recommended Tier', 'Strike Zone', 'Submission Date'
    ];

    const csvData = filteredSubmissions.map(submission => [
      submission.full_name,
      submission.email,
      submission.phone,
      submission.track,
      submission.archetype,
      submission.archetype_name,
      submission.recommended_tier,
      submission.strike_zone,
      new Date(submission.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
      <FloatingDots />
      <Navbar hideNavLinks={true} />
      <div className="min-h-screen bg-gray-50 pt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Error Popup */}
          {error && (
            <div className="fixed top-24 right-6 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50">
              <div className="flex justify-between items-start">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                    <div className="mt-1 text-sm text-red-600">
                      <p>{error}</p>
                      <p className="mt-1 text-xs text-red-500">Please check your Supabase connection.</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="ml-4 inline-flex text-red-400 hover:text-red-600 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Focus Founders - Quiz Results Admin Portal
              </h1>
              <p className="text-gray-600">
                Manage and analyze ADHD entrepreneur quiz submissions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Logged in as: {currentUser}
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 shadow-sm"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Submissions</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Today</h3>
              <p className="text-2xl font-bold text-orange-600">{stats.todayCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">This Week</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.thisWeekCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Foundation Seekers</h3>
              <p className="text-2xl font-bold text-green-600">{stats.foundationSeeker}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">System Builders</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.systemBuilder}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Visionary Leaders</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.visionaryLeader}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, email, or phone..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Archetype
                </label>
                <select
                  value={selectedArchetype}
                  onChange={(e) => setSelectedArchetype(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Archetypes</option>
                  <option value="low">Foundation Seeker</option>
                  <option value="mid">System Builder</option>
                  <option value="high">Visionary Leader</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedArchetype('');
                  setStartDate('');
                  setEndDate('');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
              >
                Export to CSV ({filteredSubmissions.length} results)
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Quiz Submissions ({filteredSubmissions.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Archetype
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Track
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommended Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
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
                        <div className="text-sm text-gray-900">{submission.archetype_name}</div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          submission.archetype === 'low' ? 'bg-green-100 text-green-800' :
                          submission.archetype === 'mid' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {submission.archetype === 'low' ? 'Foundation' : 
                           submission.archetype === 'mid' ? 'System Builder' : 'Visionary'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.track}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {submission.recommended_tier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.created_at).toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {new Date(submission.created_at).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(submission)}
                          className="text-orange-600 hover:text-orange-900 mr-3"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredSubmissions.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No submissions found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Quiz Submission Details
                  </h2>
                  <p className="text-gray-600">
                    {selectedSubmission.full_name} - {selectedSubmission.email}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.full_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedSubmission.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quiz Results */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quiz Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Track</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.track}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Archetype</label>
                    <p className="text-sm text-gray-900">
                      {selectedSubmission.archetype_name} ({selectedSubmission.archetype})
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recommended Tier</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.recommended_tier}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Strike Zone</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.strike_zone}</p>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.focus.map((item, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ignore List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Ignore</h3>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {selectedSubmission.ignore_list}
                </p>
              </div>

              {/* 60-Day Path */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">60-Day Path</h3>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {selectedSubmission.sixty_day_path}
                </p>
              </div>

              {/* Quiz Answers */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quiz Questions & Answers</h3>
                <div className="space-y-4">
                  {getQuestionAndAnswerForSubmission(selectedSubmission).map((qa, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-2">
                        <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                          Question {index + 1}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question:
                        </label>
                        <p className="text-sm text-gray-900 font-medium">{qa.question}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Answer:
                        </label>
                        <p className="text-sm text-gray-900 bg-white p-2 rounded border-l-4 border-orange-500">
                          {qa.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}