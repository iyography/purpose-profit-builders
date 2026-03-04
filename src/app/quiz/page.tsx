"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingDots from "@/components/FloatingDots";
import { sprintQuestions } from "../../lib/quiz/questions";
import { SprintAnswers, ContactInfo } from "../../lib/quiz/types";
import { determineProfile, generateResult } from "../../lib/quiz/routing";
import { submitSprintResult } from "../../lib/supabase";

type Step = 'intro' | 'questions' | 'contact' | 'results';

export default function Quiz() {
  const [step, setStep] = useState<Step>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [textInput, setTextInput] = useState('');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    full_name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof generateResult> | null>(null);

  const currentQuestion = sprintQuestions[currentIndex];
  const progress = ((currentIndex + 1) / sprintQuestions.length) * 100;

  const handleSingleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);
    if (currentIndex < sprintQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('contact');
    }
  };

  const handleMultiSelect = (optionId: string) => {
    const current = (answers[currentQuestion.id] as string[]) || [];
    let updated: string[];
    if (updated = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId]) {
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    }
  };

  const handleMultiSelectNext = () => {
    const selected = (answers[currentQuestion.id] as string[]) || [];
    if (selected.length === 0) return;
    if (currentIndex < sprintQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('contact');
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    const newAnswers = { ...answers, [currentQuestion.id]: textInput.trim() };
    setAnswers(newAnswers);
    setTextInput('');
    if (currentIndex < sprintQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep('contact');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setStep('intro');
    }
  };

  const resetQuiz = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers({});
    setTextInput('');
    setContactInfo({ full_name: '', email: '', phone: '' });
    setResult(null);
  };

  const submitContactForm = async () => {
    if (!contactInfo.full_name || !contactInfo.email || !contactInfo.phone) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const sprintAnswers: SprintAnswers = {
        q1_goal: (answers.q1_goal as string) || '',
        q2_income: (answers.q2_income as string) || '',
        q3_offer: (answers.q3_offer as string) || '',
        q4_ai_usage: (answers.q4_ai_usage as string) || '',
        q5_systems: (answers.q5_systems as string) || '',
        q6_faith_alignment: (answers.q6_faith_alignment as string) || '',
        q7_time_spent: (answers.q7_time_spent as string) || '',
        q8_description: (answers.q8_description as string) || '',
        q9_challenge: (answers.q9_challenge as string) || '',
        q10_fix_one_thing: (answers.q10_fix_one_thing as string) || '',
      };

      const profile = determineProfile(sprintAnswers);
      const sprintResult = generateResult(profile, sprintAnswers);
      setResult(sprintResult);

      try {
        await submitSprintResult({
          full_name: contactInfo.full_name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          profile: sprintResult.profile,
          profile_name: sprintResult.profileName,
          monthly_income: sprintAnswers.q2_income,
          has_offer: ['yes-selling', 'yes-not-selling'].includes(sprintAnswers.q3_offer),
          offer_type: sprintAnswers.q3_offer,
          uses_ai: ['daily', 'sometimes'].includes(sprintAnswers.q4_ai_usage),
          has_systems: sprintAnswers.q5_systems === 'yes',
          faith_alignment: sprintAnswers.q6_faith_alignment,
          biggest_challenge: sprintAnswers.q9_challenge,
          answers: sprintAnswers as unknown as Record<string, unknown>,
          user_agent: navigator.userAgent,
        });
      } catch (dbError) {
        console.warn('Database submission failed, continuing to results:', dbError);
      }

      setStep('results');
    } catch (error) {
      console.error('Error processing assessment:', error);
      alert('There was an error processing your assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // =================== INTRO ===================
  if (step === 'intro') {
    return (
      <>
        <Navbar hideNavLinks={true} />
        <FloatingDots />
        <div className="min-h-screen mesh-gradient-hero pt-24 flex items-center justify-center">
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center">
            <div className="bg-dark-gray/80 backdrop-blur-md rounded-2xl p-10 border border-gold-vivid/15 shadow-xl">
              <div className="text-gold-vivid text-sm font-semibold uppercase tracking-[0.3em] mb-4">
                FREE ASSESSMENT
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold-vivid to-gold-deep bg-clip-text text-transparent">
                Clarity Quiz
              </h1>
              <p className="text-xl text-off-white/70 mb-8">
                Discover where you are on your faith-driven business journey and get a personalized action plan in 2 minutes.
              </p>
              <div className="bg-gold-vivid/5 rounded-xl p-6 mb-8 border border-gold-vivid/10">
                <h2 className="text-xl font-semibold mb-4 text-gold-vivid">What You&apos;ll Get:</h2>
                <ul className="space-y-3 text-lg text-left max-w-md mx-auto">
                  <li className="flex items-start gap-3">
                    <span className="text-gold-vivid mt-1">&#x2713;</span>
                    <span className="text-off-white/70">Your Builder Profile (Kingdom Starter, Systems Builder, or Explorer)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-vivid mt-1">&#x2713;</span>
                    <span className="text-off-white/70">Personalized summary of what&apos;s working &amp; what needs attention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold-vivid mt-1">&#x2713;</span>
                    <span className="text-off-white/70">Clear next steps based on your exact situation</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => { setStep('questions'); setCurrentIndex(0); }}
                className="mesh-gradient-bg text-black px-12 py-4 rounded-full font-semibold text-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-vivid/25"
              >
                Start Assessment
              </button>
              <p className="text-off-white/40 text-sm mt-4">10 questions &bull; Takes about 2 minutes</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // =================== QUESTIONS ===================
  if (step === 'questions') {
    return (
      <>
        <Navbar hideNavLinks={true} />
        <FloatingDots />
        <div className="min-h-screen mesh-gradient-hero pt-24 flex items-center justify-center">
          <div className="relative z-10 max-w-3xl w-full mx-auto px-6 py-12">
            <div className="bg-dark-gray/80 backdrop-blur-md rounded-2xl p-8 border border-gold-vivid/15 shadow-xl">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-off-white/50 font-medium">Clarity Quiz</span>
                  <span className="text-sm text-gold-vivid font-semibold">
                    {currentIndex + 1} of {sprintQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-off-white/5 rounded-full h-2">
                  <div
                    className="mesh-gradient-bg h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Back button */}
              <button
                onClick={goBack}
                className="mb-6 text-off-white/40 hover:text-off-white/70 flex items-center text-sm font-medium transition-colors"
              >
                &larr; Back
              </button>

              {/* Question */}
              <h2 className="text-2xl font-bold mb-8 text-off-white">
                {currentQuestion.question}
              </h2>

              {/* Single select */}
              {currentQuestion.type === 'single' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSingleSelect(option.id)}
                      className={`w-full text-left p-5 rounded-xl transition-all duration-200 border ${
                        answers[currentQuestion.id] === option.id
                          ? 'bg-gold-vivid/10 border-gold-vivid/50 text-off-white'
                          : 'bg-dark-cream/50 border-off-white/10 text-off-white/70 hover:bg-gold-vivid/5 hover:border-gold-vivid/20'
                      }`}
                    >
                      <span className="text-lg">{option.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Multi-select */}
              {currentQuestion.type === 'multi-select' && currentQuestion.options && (
                <>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const selected = ((answers[currentQuestion.id] as string[]) || []).includes(option.id);
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleMultiSelect(option.id)}
                          className={`w-full text-left p-5 rounded-xl transition-all duration-200 border flex items-center gap-3 ${
                            selected
                              ? 'bg-gold-vivid/10 border-gold-vivid/50 text-off-white'
                              : 'bg-dark-cream/50 border-off-white/10 text-off-white/70 hover:bg-gold-vivid/5 hover:border-gold-vivid/20'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            selected ? 'bg-gold-vivid border-gold-vivid' : 'border-off-white/20'
                          }`}>
                            {selected && <span className="text-black text-xs">&#x2713;</span>}
                          </div>
                          <span className="text-lg">{option.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleMultiSelectNext}
                    disabled={!answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0}
                    className="mt-6 w-full mesh-gradient-bg text-black py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Continue
                  </button>
                </>
              )}

              {/* Text input */}
              {currentQuestion.type === 'text' && (
                <div className="space-y-4">
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={3}
                    className="w-full px-5 py-4 bg-dark-cream/50 border border-off-white/10 rounded-xl text-off-white placeholder-off-white/30 focus:outline-none focus:border-gold-vivid/50 focus:ring-2 focus:ring-gold-vivid/10 transition-all text-lg resize-none"
                  />
                  <button
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim()}
                    className="w-full mesh-gradient-bg text-black py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // =================== CONTACT ===================
  if (step === 'contact') {
    return (
      <>
        <Navbar hideNavLinks={true} />
        <FloatingDots />
        <div className="min-h-screen mesh-gradient-hero pt-24 flex items-center justify-center">
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
            <div className="bg-dark-gray/80 backdrop-blur-md rounded-2xl p-8 border border-gold-vivid/15 shadow-xl">
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold mb-4 text-off-white">Almost Done!</h1>
                <p className="text-lg text-off-white/60">
                  Enter your info to get your personalized Sprint results.
                </p>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-off-white/70 font-medium mb-2 text-sm">Full Name *</label>
                  <input
                    type="text"
                    value={contactInfo.full_name}
                    onChange={(e) => setContactInfo({ ...contactInfo, full_name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 bg-dark-cream/50 border border-off-white/10 rounded-xl text-off-white placeholder-off-white/30 focus:outline-none focus:border-gold-vivid/50 focus:ring-2 focus:ring-gold-vivid/10 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-off-white/70 font-medium mb-2 text-sm">Email Address *</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-4 bg-dark-cream/50 border border-off-white/10 rounded-xl text-off-white placeholder-off-white/30 focus:outline-none focus:border-gold-vivid/50 focus:ring-2 focus:ring-gold-vivid/10 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-off-white/70 font-medium mb-2 text-sm">Phone Number *</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full px-5 py-4 bg-dark-cream/50 border border-off-white/10 rounded-xl text-off-white placeholder-off-white/30 focus:outline-none focus:border-gold-vivid/50 focus:ring-2 focus:ring-gold-vivid/10 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="bg-gold-vivid/5 rounded-lg p-4 mb-6 border border-gold-vivid/10">
                <p className="text-sm text-off-white/50">
                  Your information is secure and will only be used to deliver your personalized results. We never spam or share your data.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={submitContactForm}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-full font-bold text-lg transition-all ${
                    isSubmitting
                      ? 'bg-off-white/20 cursor-not-allowed text-off-white/40'
                      : 'mesh-gradient-bg text-black hover:scale-[1.02] hover:shadow-lg hover:shadow-gold-vivid/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold-vivid mr-3"></div>
                      Generating Your Results...
                    </span>
                  ) : (
                    'Get My Sprint Results'
                  )}
                </button>
                <button
                  onClick={() => setStep('questions')}
                  className="w-full text-off-white/40 hover:text-off-white/60 text-sm transition-colors"
                  disabled={isSubmitting}
                >
                  &larr; Back to Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // =================== RESULTS ===================
  if (step === 'results' && result) {
    return (
      <>
        <Navbar hideNavLinks={true} />
        <FloatingDots />
        <div className="min-h-screen mesh-gradient-hero pt-24 pb-16">
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
            <div className="bg-dark-gray/80 backdrop-blur-md rounded-2xl p-8 border border-gold-vivid/15 shadow-xl">

              {/* Profile Header */}
              <div className="text-center mb-10">
                <div className="text-6xl mb-4">{result.profileEmoji}</div>
                <div className="text-sm uppercase tracking-[0.3em] text-gold-vivid mb-2">Your Builder Profile</div>
                <h1 className="font-display text-4xl font-bold mb-3 bg-gradient-to-r from-gold-vivid to-gold-deep bg-clip-text text-transparent">
                  {result.profileName}
                </h1>
                <p className="text-lg text-off-white/60">{result.primaryChallenge}</p>
              </div>

              {/* What's Working */}
              <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">What&apos;s Working</h3>
                <ul className="space-y-3">
                  {result.summary.whatsWorking.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 mt-0.5">&#x2713;</span>
                      <span className="text-off-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Needs Attention */}
              <div className="bg-gold-vivid/5 border border-gold-vivid/15 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gold-vivid mb-4">Needs Attention</h3>
                <ul className="space-y-3">
                  {result.summary.needsAttention.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold-vivid mt-0.5">&#x25cf;</span>
                      <span className="text-off-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div className="bg-dark-cream/50 border border-off-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-off-white mb-4">Your Next Steps</h3>
                <div className="space-y-4">
                  {result.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mesh-gradient-bg text-black rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-off-white/70">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="text-center space-y-4">
                <a
                  href={result.cta.primary.url}
                  className="block w-full mesh-gradient-bg text-black py-4 rounded-full font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-gold-vivid/25"
                >
                  {result.cta.primary.label}
                </a>
                {result.cta.secondary && (
                  <a
                    href={result.cta.secondary.url}
                    className="block w-full bg-dark-cream border-2 border-gold-vivid/30 text-gold-vivid py-4 rounded-full font-semibold text-lg transition-all hover:bg-gold-vivid/10"
                  >
                    {result.cta.secondary.label}
                  </a>
                )}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 text-off-white/40 hover:text-off-white/60 text-sm transition-colors py-2"
                  >
                    Retake Assessment
                  </button>
                  <a
                    href="https://www.skool.com/thezoexway/about"
                    className="flex-1 text-gold-vivid/60 hover:text-gold-vivid text-sm transition-colors py-2"
                  >
                    Join Purpose &amp; Profit Builders
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
