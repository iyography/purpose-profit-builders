"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Real reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    business: "Small Business Owner",
    review: "The Credit Hub changed everything for me. I had 7 collections dragging my score down to 480. Within 3 months, 5 were removed and my score jumped to 680. The dispute letter templates and step-by-step guidance made it so easy!",
    rating: 5,
    highlight: "Score jumped from 480 to 680 in 3 months!"
  },
  {
    id: 2,
    name: "Marcus T.",
    business: "Real Estate Investor",
    review: "I was stuck in a cycle of high-interest loans because of my credit score. The Credit Hub taught me exactly how to rebuild strategically. Now I'm approved for prime rates and just closed on my second investment property.",
    rating: 5,
    highlight: "Approved for prime rates on investment properties"
  },
  {
    id: 3,
    name: "Jessica L.",
    business: "E-commerce Store",
    review: "Bad credit was killing my business growth - I couldn't get funding anywhere. The Credit Hub gave me a clear credit repair roadmap and business funding strategies. Got approved for $35K in business credit within 6 months.",
    rating: 5,
    highlight: "Approved for $35K in business credit"
  },
  {
    id: 4,
    name: "David K.",
    business: "Marketing Agency",
    review: "Late payments and charge-offs had my credit wrecked for years. The dispute strategies from The Credit Hub actually worked - got 4 late payments removed and my score went from 540 to 710. Now I have the credit to scale my agency.",
    rating: 5,
    highlight: "Score went from 540 to 710"
  },
  {
    id: 5,
    name: "Rachel P.",
    business: "Online Coach",
    review: "I used to think my credit was beyond repair. The Credit Hub showed me that anyone can rebuild. The credit stacking strategies helped me build a $50K funding portfolio for my business in under a year.",
    rating: 5,
    highlight: "Built a $50K funding portfolio"
  },
  {
    id: 6,
    name: "Mike R.",
    business: "Contractor",
    review: "Collections and medical debt had me at a 490 score. The Credit Hub walked me through every dispute, every goodwill letter, every strategy. 8 months later I'm at 730 and just got approved for a business loan to buy new equipment.",
    rating: 5,
    highlight: "From 490 to 730 in 8 months"
  }
];

export default function WinsOrange() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-orange-800">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-orange-900/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/"
              className="font-bold text-2xl md:text-3xl text-white hover:opacity-80 transition-all duration-300"
            >
              The Credit Hub
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#why" className="text-sm text-white/70 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/#features" className="text-sm text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/quiz" className="text-sm text-white/70 hover:text-white transition-colors">
                Quiz
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/quiz"
                className="text-xs tracking-widest uppercase px-6 py-2 bg-orange-500 text-black hover:bg-orange-400 transition-all duration-300 rounded-sm"
              >
                Take Quiz
              </Link>
              <Link
                href="https://www.skool.com/tch"
                className="text-xs tracking-widest uppercase px-6 py-2 bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300 rounded-sm"
              >
                Join Free
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-white"
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
            <h1 className="font-black text-5xl lg:text-7xl text-white mb-8">
              🎉 Member Wins
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Real stories from members who took control of their credit, repaired their scores, and unlocked the funding they needed to transform their financial futures.
            </p>
            <div className="bg-orange-500/20 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-white">
                These are actual reviews from The Credit Hub members who transformed their credit scores and unlocked real funding for their futures.
              </p>
            </div>
          </motion.div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-orange-500/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <blockquote className="text-white/90 text-lg leading-relaxed mb-6">
                  "{review.review}"
                </blockquote>
                
                <div className="border-t border-orange-500/20 pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-semibold">{review.name}</h4>
                      <p className="text-orange-300 text-sm">{review.business}</p>
                    </div>
                    <div className="text-orange-400 text-2xl">🚀</div>
                  </div>
                  <div className="mt-3 bg-orange-500/20 rounded-lg p-3">
                    <p className="text-sm text-white font-medium">
                      💡 "{review.highlight}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-orange-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of members who've taken control of their credit and started building real wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link 
                href="https://www.skool.com/tch"
                className="inline-block font-sans font-semibold bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-4 rounded-full transition-colors text-lg"
              >
                Join The Credit Hub
              </Link>
              <Link
                href="/quiz"
                className="inline-block font-sans font-semibold bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 px-12 py-4 rounded-full transition-colors text-lg"
              >
                Take Credit GPS Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}