"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    business: "Online Coach",
    review: "Purpose & Profit Builders completely changed my approach to business. I was hustling 60+ hours a week and barely making $2K/mo. Theodore's systems helped me simplify everything. Within 3 months, I hit my first $7K month working half the hours. The Kingdom alignment piece was the game-changer.",
    rating: 5,
    highlight: "From $2K to $7K/mo working half the hours!"
  },
  {
    id: 2,
    name: "Marcus T.",
    business: "Faith-Based Consultant",
    review: "I was stuck between my calling and my need for income. PPB showed me they're not separate. The AI systems saved me 20+ hours a week on content and follow-ups. Now I'm consistently at $5K/mo and growing. This community gets it.",
    rating: 5,
    highlight: "Consistent $5K/mo using AI systems"
  },
  {
    id: 3,
    name: "Jessica L.",
    business: "Service Provider",
    review: "I had an idea but no clue how to turn it into income. The 7-Day Focus Sprint gave me the clarity I needed, and the Kingdom Business Blueprint helped me build a real offer. Got my first 3 paying clients in the first month. God is good!",
    rating: 5,
    highlight: "First 3 paying clients in month one"
  },
  {
    id: 4,
    name: "David K.",
    business: "Digital Marketer",
    review: "The weekly Kingdom Calls alone are worth it. Real strategy, real accountability, and prayer over our businesses. I went from scattered and overwhelmed to focused and profitable. Hit $8K last month for the first time ever. Theodore's 20+ years of systems experience shows.",
    rating: 5,
    highlight: "First $8K month ever"
  },
  {
    id: 5,
    name: "Rachel P.",
    business: "Virtual Assistant",
    review: "I was trading time for money and burning out. PPB taught me to build systems and use AI to scale. Now I have repeatable processes for client acquisition, and I'm not doing everything manually. Went from $1K to $6K/mo in 90 days.",
    rating: 5,
    highlight: "From $1K to $6K/mo in 90 days"
  },
  {
    id: 6,
    name: "Mike R.",
    business: "Creative Entrepreneur",
    review: "Most business communities feel like hustle culture wrapped in motivation. PPB is different. It's purpose first, systems second, profit third. And somehow that order actually makes you MORE profitable. Best decision I made this year.",
    rating: 5,
    highlight: "Purpose first, profit follows"
  }
];

export default function WinsOrange() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-soft to-black">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold-vivid/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="font-bold text-2xl md:text-3xl text-gold-vivid hover:opacity-80 transition-all duration-300"
            >
              PPB
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#about" className="text-sm text-off-white/70 hover:text-gold-vivid transition-colors">
                About
              </Link>
              <Link href="/#whats-inside" className="text-sm text-off-white/70 hover:text-gold-vivid transition-colors">
                The System
              </Link>
              <Link href="/quiz" className="text-sm text-off-white/70 hover:text-gold-vivid transition-colors">
                Assessment
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/quiz"
                className="text-xs tracking-widest uppercase px-6 py-2 bg-gold-vivid text-black hover:bg-gold-warm transition-all duration-300 rounded-sm font-semibold"
              >
                Clarity Quiz
              </Link>
              <Link
                href="https://www.skool.com/thezoexway/about"
                className="text-xs tracking-widest uppercase px-6 py-2 bg-gold-deep text-white hover:bg-gold-warm transition-all duration-300 rounded-sm"
              >
                Join Free
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-off-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="pb-16 px-4 sm:px-6 lg:px-8" style={{ paddingTop: '120px' }}>
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-black text-5xl lg:text-7xl text-off-white mb-8">
              Member Wins
            </h1>
            <p className="text-xl text-off-white/80 max-w-3xl mx-auto mb-8">
              Real stories from faith-driven entrepreneurs who aligned their purpose, built simple systems, and started generating consistent income.
            </p>
            <div className="bg-gold-vivid/10 rounded-xl p-6 max-w-2xl mx-auto border border-gold-vivid/20">
              <p className="text-lg font-semibold text-off-white">
                These are actual results from Purpose &amp; Profit Builders members who chose purpose over hustle and built with integrity.
              </p>
            </div>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-dark-gray/80 backdrop-blur-md rounded-2xl p-8 border border-gold-vivid/15"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-gold-vivid text-xl">&#x2B50;</span>
                  ))}
                </div>

                <blockquote className="text-off-white/90 text-lg leading-relaxed mb-6">
                  &ldquo;{review.review}&rdquo;
                </blockquote>

                <div className="border-t border-gold-vivid/15 pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-off-white font-semibold">{review.name}</h4>
                      <p className="text-gold-vivid/70 text-sm">{review.business}</p>
                    </div>
                    <div className="text-gold-vivid text-2xl">&#x1f451;</div>
                  </div>
                  <div className="mt-3 bg-gold-vivid/10 rounded-lg p-3 border border-gold-vivid/10">
                    <p className="text-sm text-off-white font-medium">
                      &#x1f31f; &ldquo;{review.highlight}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16 bg-dark-gray/80 backdrop-blur-md rounded-2xl p-12 border border-gold-vivid/15"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-off-white mb-6">
              Ready to Build Your Own Success Story?
            </h2>
            <p className="text-xl text-off-white/80 mb-8 max-w-2xl mx-auto">
              Join faith-driven entrepreneurs who are building consistent income with purpose, peace, and profit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="https://www.skool.com/thezoexway/about"
                className="inline-block font-sans font-semibold bg-gold-vivid hover:bg-gold-warm text-black px-12 py-4 rounded-full transition-colors text-lg"
              >
                Join Purpose &amp; Profit Builders
              </Link>
              <Link
                href="/quiz"
                className="inline-block font-sans font-semibold bg-off-white/10 hover:bg-off-white/20 text-off-white border-2 border-off-white/20 px-12 py-4 rounded-full transition-colors text-lg"
              >
                Clarity Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
