"use client";

import Navbar from "@/components/Navbar";
import FloatingDots from "@/components/FloatingDots";

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingDots />
      <div className="bg-white text-charcoal relative">

        {/* Hero */}
        <section className="mesh-gradient-hero min-h-screen relative flex items-center">
          <div className="relative z-10 max-w-5xl mx-auto px-8 py-32 text-center">
            <div className="text-orange-deep text-sm font-semibold uppercase tracking-[0.3em] mb-6">
              YOUR CREDIT. YOUR FUNDING. YOUR FUTURE.
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-8xl leading-tight mb-8 bg-gradient-to-r from-orange-vivid via-orange-deep to-orange-hot bg-clip-text text-transparent">
              The Credit Hub
            </h1>
            <p className="font-sans text-xl md:text-2xl lg:text-3xl text-charcoal/80 max-w-3xl mx-auto mb-6 leading-relaxed">
              Fix your credit. Secure $50K&ndash;$250K in funding. Build a business that creates real wealth.
            </p>
            <p className="font-sans text-lg md:text-xl text-charcoal/50 max-w-2xl mx-auto mb-12">
              Proven framework behind $30M+ funded for clients. 200+ credit transformations. 50+ automated credit businesses launched.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="https://www.skool.com/tch" className="inline-block font-sans font-semibold mesh-gradient-bg text-white px-12 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                Join The Credit Hub
              </a>
              <a href="/quiz" className="inline-block font-sans font-semibold bg-white hover:bg-orange-50 text-orange-deep border-2 border-orange-vivid/40 px-12 py-4 rounded-full transition-all hover:border-orange-vivid shadow-sm">
                Take the Credit GPS Quiz
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
            <span className="font-sans text-xs tracking-widest text-orange-deep/40">EST. 2025</span>
            <span className="font-sans text-xs tracking-widest text-orange-deep/40">CREDIT &amp; FUNDING COMMUNITY</span>
          </div>
        </section>

        {/* What Is The Credit Hub */}
        <section id="about" className="mesh-gradient-section">
          <div className="grid lg:grid-cols-2 relative z-10">
            {/* Animated gradient panel */}
            <div className="aspect-square lg:aspect-auto lg:min-h-[600px] relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient-bg opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-8xl md:text-9xl font-bold text-white/20 font-display">TCH</div>
                  <div className="text-lg tracking-[0.5em] uppercase text-white/60 mt-4">Credit &bull; Funding &bull; Freedom</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-12 lg:p-24 bg-soft-white">
              <div className="max-w-lg">
                <span className="font-sans text-sm tracking-[0.3em] uppercase text-orange-vivid block mb-6">What Is The Credit Hub?</span>
                <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-8 text-charcoal font-bold">
                  A community built for entrepreneurs who want financial leverage.
                </h2>
                <p className="font-sans text-lg text-charcoal/70 leading-relaxed mb-6">
                  The Credit Hub is where entrepreneurs fix their credit, access real capital, and build scalable funding businesses. No fluff. No theory. Just the exact blueprint behind $30M+ in approvals.
                </p>
                <p className="font-sans text-lg text-charcoal/70 leading-relaxed mb-6">
                  Whether you need funding for YOUR business or want to BUILD a funding business &mdash; this is the system that gets it done.
                </p>
                <p className="font-sans text-2xl text-orange-vivid italic font-medium">
                  Real results. Real capital. Real community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Inside */}
        <section id="whats-inside" className="py-24 px-8 bg-white relative mesh-gradient-section">
          <div className="max-w-6xl mx-auto relative z-10">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-orange-vivid block mb-4 text-center">What&apos;s Inside</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-charcoal mb-4">Everything You Need to Win</h2>
            <p className="text-center text-charcoal/50 text-lg mb-16 max-w-2xl mx-auto">The proven framework to secure $50K&ndash;$250K in funding and build a scalable credit business in 90 days.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300 bg-white">
                <span className="text-4xl mb-4 block">&#x1f527;</span>
                <h3 className="font-display text-2xl mb-4 text-charcoal font-bold">Rapid Repair</h3>
                <p className="font-sans text-lg text-charcoal/60 leading-relaxed">
                  Dispute strategies that move scores 100+ points in weeks, not months. Remove collections, late payments, and negative items with proven letter templates.
                </p>
              </div>
              <div className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300 bg-white">
                <span className="text-4xl mb-4 block">&#x1f4bc;</span>
                <h3 className="font-display text-2xl mb-4 text-charcoal font-bold">Funding Fast Track</h3>
                <p className="font-sans text-lg text-charcoal/60 leading-relaxed">
                  Templates and lender connections for $250K+ approvals. Business credit cards, lines of credit, and SBA loan strategies that actually work.
                </p>
              </div>
              <div className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300 bg-white">
                <span className="text-4xl mb-4 block">&#x1f680;</span>
                <h3 className="font-display text-2xl mb-4 text-charcoal font-bold">Business Launch System</h3>
                <p className="font-sans text-lg text-charcoal/60 leading-relaxed">
                  Turn credit repair into recurring income with a done-for-you portal. LLC setup, EIN registration, and business credit building from zero.
                </p>
              </div>
              <div className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300 bg-white">
                <span className="text-4xl mb-4 block">&#x1f4de;</span>
                <h3 className="font-display text-2xl mb-4 text-charcoal font-bold">Live War Rooms</h3>
                <p className="font-sans text-lg text-charcoal/60 leading-relaxed">
                  Weekly calls to troubleshoot denials, live funding sessions, credit audits, and real-time strategy. Never feel stuck again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bonuses */}
        <section className="py-20 px-8 bg-soft-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-orange-vivid block mb-6">Bonuses Included</span>
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              <div className="p-8 rounded-xl border border-orange-vivid/15 bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">&#x1f4e8;</span>
                <h4 className="font-display text-lg font-bold text-charcoal mb-2">Dispute Letter Library</h4>
                <p className="text-sm text-charcoal/50">Proven templates for every negative item type</p>
              </div>
              <div className="p-8 rounded-xl border border-orange-vivid/15 bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">&#x1f4cb;</span>
                <h4 className="font-display text-lg font-bold text-charcoal mb-2">Client Onboarding Templates</h4>
                <p className="text-sm text-charcoal/50">Ready-to-use systems for your credit business</p>
              </div>
              <div className="p-8 rounded-xl border border-orange-vivid/15 bg-white shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">&#x1f504;</span>
                <h4 className="font-display text-lg font-bold text-charcoal mb-2">Automated Follow-Ups</h4>
                <p className="text-sm text-charcoal/50">Sequences that close clients on autopilot</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-bg"></div>
          <div className="relative z-10 text-center px-8">
            <p className="font-display font-bold text-4xl md:text-6xl text-white mb-4">
              Take control of your credit.
            </p>
            <p className="text-xl md:text-2xl text-white/80 font-semibold mb-8">
              Find out exactly where you stand in 2 minutes.
            </p>
            <a href="/quiz" className="inline-block font-sans font-semibold bg-white text-orange-vivid px-14 py-5 rounded-full transition-all hover:scale-105 hover:shadow-lg text-xl">
              Take the Credit GPS Quiz
            </a>
          </div>
        </section>

        {/* Who It's For */}
        <section id="who-its-for" className="py-24 px-8 bg-white mesh-gradient-section">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-orange-vivid block mb-6">Who It&apos;s For</span>
            <p className="font-sans text-2xl lg:text-3xl leading-relaxed mb-8 text-charcoal font-medium">
              Whether you&apos;re rebuilding from collections or scaling to $100K+ funding lines. Whether you&apos;re starting your first business or expanding an empire.
            </p>
            <p className="font-sans text-xl text-charcoal/50 italic mb-8">
              If you want better credit and more capital, you belong here.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto text-left">
              <div className="flex items-start gap-3 p-4">
                <span className="text-orange-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-charcoal/70">Entrepreneurs needing funding</span>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="text-orange-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-charcoal/70">Anyone rebuilding their credit</span>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="text-orange-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-charcoal/70">Credit repair professionals</span>
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="text-orange-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-charcoal/70">Business owners seeking capital</span>
              </div>
            </div>
          </div>
        </section>

        {/* What This Isn't */}
        <section className="py-24 px-8 bg-soft-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-orange-vivid block mb-8">What This Isn&apos;t</span>
            <p className="font-sans text-xl text-charcoal/70 mb-8">
              Not another course. Not generic financial advice. Not a place that asks you to &ldquo;just wait and see.&rdquo;
            </p>
            <p className="font-display text-3xl lg:text-4xl text-charcoal italic font-medium">
              This is a proven system. This is real community. This is The Credit Hub.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-orange-vivid/10 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <img
              src="/credit-hub-logo.svg"
              alt="The Credit Hub"
              className="h-12 w-auto"
            />
            <span className="font-sans text-xs text-charcoal/40">&copy; 2026 The Credit Hub. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
