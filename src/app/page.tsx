"use client";

import Navbar from "@/components/Navbar";
import AnimatedHeroBg from "@/components/AnimatedHeroBg";
import { motion } from "framer-motion";

const heroFade = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const heroStagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-pure-black text-off-white relative">

        {/* Hero */}
        <section className="min-h-screen relative flex items-center overflow-hidden bg-black">
          <AnimatedHeroBg />
          <div className="relative z-10 max-w-5xl mx-auto px-8 py-32 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroStagger}
            >
              <motion.div variants={heroFade} custom={0} className="text-gold-vivid text-sm font-semibold uppercase tracking-[0.3em] mb-8">
                PURPOSE. PEACE. PROFIT.
              </motion.div>
              <motion.h1 variants={heroFade} custom={1} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-8 gold-shimmer whitespace-nowrap">
                Purpose &amp; Profit
              </motion.h1>
              <motion.h1 variants={heroFade} custom={2} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-10 gold-shimmer">
                Builders
              </motion.h1>
              <motion.p variants={heroFade} custom={3} className="font-sans text-lg md:text-xl lg:text-2xl text-off-white/80 max-w-3xl mx-auto mb-5 leading-relaxed">
                Build consistent income from $0&ndash;$10K/mo using Kingdom economics and simple AI systems.
              </motion.p>
              <motion.p variants={heroFade} custom={4} className="font-sans text-base md:text-lg text-off-white/45 max-w-2xl mx-auto mb-14">
                No hustle. No burnout. Just Purpose &rarr; Peace &rarr; Profit (in that order).
              </motion.p>
              <motion.div variants={heroFade} custom={5} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a href="https://www.skool.com/thezoexway/about" className="inline-block font-sans font-semibold mesh-gradient-bg text-black px-12 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-vivid/25">
                  Join Purpose &amp; Profit Builders
                </a>
                <a href="/quiz" className="inline-block font-sans font-semibold bg-dark-gray hover:bg-dark-cream text-gold-vivid border-2 border-gold-vivid/40 px-12 py-4 rounded-full transition-all hover:border-gold-vivid shadow-sm">
                  Clarity Quiz
                </a>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
            <span className="font-sans text-xs tracking-widest text-gold-vivid/40">EST. 2025</span>
            <span className="font-sans text-xs tracking-widest text-gold-vivid/40">FAITH-DRIVEN ENTREPRENEUR COMMUNITY</span>
          </div>
        </section>

        {/* What Is Purpose & Profit Builders */}
        <section id="about" className="mesh-gradient-section">
          <div className="grid lg:grid-cols-2 relative z-10">
            {/* Animated gradient panel */}
            <div className="aspect-square lg:aspect-auto lg:min-h-[600px] relative overflow-hidden">
              <div className="absolute inset-0 mesh-gradient-bg opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="text-8xl md:text-9xl font-bold text-black/20 font-display">PPB</div>
                  <div className="text-lg tracking-[0.5em] uppercase text-black/60 mt-4">Purpose &bull; Peace &bull; Profit</div>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center p-12 lg:p-24 bg-dark-soft"
            >
              <div className="max-w-lg">
                <span className="font-sans text-sm tracking-[0.3em] uppercase text-gold-vivid block mb-6">What Is Purpose &amp; Profit Builders?</span>
                <h2 className="font-display text-4xl lg:text-5xl leading-tight mb-8 text-off-white font-bold">
                  A private community for faith-driven entrepreneurs ready to build with integrity.
                </h2>
                <p className="font-sans text-lg text-off-white/70 leading-relaxed mb-6">
                  I&apos;m Theodore. With 20+ years in IT leadership and systems strategy, I help founders simplify, align, and build with integrity instead of overwhelm.
                </p>
                <p className="font-sans text-lg text-off-white/70 leading-relaxed mb-6">
                  Purpose &amp; Profit Builders guides faith-driven entrepreneurs from $0&ndash;$10K toward consistent income using Kingdom economics and simple AI systems.
                </p>
                <p className="font-sans text-2xl text-gold-vivid italic font-medium">
                  Align your calling. Build your systems. Scale your income.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What's Inside */}
        <section id="whats-inside" className="py-24 px-8 bg-pure-black relative mesh-gradient-section">
          <div className="max-w-6xl mx-auto relative z-10">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-gold-vivid block mb-4 text-center">What&apos;s Inside</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-off-white mb-4">Everything You Need to Build</h2>
            <p className="text-center text-off-white/50 text-lg mb-16 max-w-2xl mx-auto">The proven framework to go from scattered and underpaid to consistent $5K&ndash;$10K months with purpose and peace.</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid md:grid-cols-2 gap-8"
            >
              <motion.div variants={fadeUp} custom={0} className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300">
                <span className="text-4xl mb-4 block">&#x1f3af;</span>
                <h3 className="font-display text-2xl mb-4 text-off-white font-bold">Kingdom Alignment</h3>
                <p className="font-sans text-lg text-off-white/60 leading-relaxed">
                  Clarity before tactics. Align your God-given purpose with a profitable business model so every step feels intentional, not forced.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300">
                <span className="text-4xl mb-4 block">&#x26a1;</span>
                <h3 className="font-display text-2xl mb-4 text-off-white font-bold">7-Day Focus Sprint</h3>
                <p className="font-sans text-lg text-off-white/60 leading-relaxed">
                  Just 15 minutes a day to build momentum, eliminate distractions, and take the right actions. Designed for busy entrepreneurs who need clarity fast.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={2} className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300">
                <span className="text-4xl mb-4 block">&#x1f916;</span>
                <h3 className="font-display text-2xl mb-4 text-off-white font-bold">AI Systems &amp; Templates</h3>
                <p className="font-sans text-lg text-off-white/60 leading-relaxed">
                  Simple AI workflows that save you 20+ hours per week. Content creation, client acquisition, and follow-up systems that run on autopilot.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="mesh-gradient-card p-10 rounded-2xl transition-all duration-300">
                <span className="text-4xl mb-4 block">&#x1f4de;</span>
                <h3 className="font-display text-2xl mb-4 text-off-white font-bold">Weekly Kingdom Calls</h3>
                <p className="font-sans text-lg text-off-white/60 leading-relaxed">
                  Live guidance, accountability, and prayer over your business. Real strategy sessions with entrepreneurs who share your values.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Bonuses */}
        <section className="py-20 px-8 bg-dark-soft">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-gold-vivid block mb-6">Bonuses Included</span>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid sm:grid-cols-3 gap-6 mt-10"
            >
              <motion.div variants={fadeUp} custom={0} className="p-8 rounded-xl border border-gold-vivid/15 bg-dark-gray shadow-sm hover:shadow-md hover:shadow-gold-vivid/5 transition-shadow">
                <span className="text-3xl mb-3 block">&#x1f4a1;</span>
                <h4 className="font-display text-lg font-bold text-off-white mb-2">AI Prompt Library</h4>
                <p className="text-sm text-off-white/50">50+ business prompts for content, sales, and client acquisition</p>
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="p-8 rounded-xl border border-gold-vivid/15 bg-dark-gray shadow-sm hover:shadow-md hover:shadow-gold-vivid/5 transition-shadow">
                <span className="text-3xl mb-3 block">&#x1f4cb;</span>
                <h4 className="font-display text-lg font-bold text-off-white mb-2">Kingdom Business Templates</h4>
                <p className="text-sm text-off-white/50">Offer creation, pricing, launch checklists, and planning tools</p>
              </motion.div>
              <motion.div variants={fadeUp} custom={2} className="p-8 rounded-xl border border-gold-vivid/15 bg-dark-gray shadow-sm hover:shadow-md hover:shadow-gold-vivid/5 transition-shadow">
                <span className="text-3xl mb-3 block">&#x1f64f;</span>
                <h4 className="font-display text-lg font-bold text-off-white mb-2">Faith-Based Frameworks</h4>
                <p className="text-sm text-off-white/50">Conversations that convert without being pushy or salesy</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-bg"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center px-8"
          >
            <p className="font-display font-bold text-4xl md:text-6xl text-black mb-4">
              Take control of your income.
            </p>
            <p className="text-xl md:text-2xl text-black/80 font-semibold mb-8">
              Find out exactly where you stand in 2 minutes.
            </p>
            <a href="/quiz" className="inline-block font-sans font-semibold bg-black text-gold-vivid px-14 py-5 rounded-full transition-all hover:scale-105 hover:shadow-lg text-xl">
              Clarity Quiz
            </a>
          </motion.div>
        </section>

        {/* Who It's For */}
        <section id="who-its-for" className="py-24 px-8 bg-pure-black mesh-gradient-section">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-gold-vivid block mb-6">Who It&apos;s For</span>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-2xl lg:text-3xl leading-relaxed mb-8 text-off-white font-medium"
            >
              Whether you&apos;re a faith-driven entrepreneur feeling busy, unclear, or underpaid. Whether you&apos;re just starting out or building something bigger.
            </motion.p>
            <p className="font-sans text-xl text-off-white/50 italic mb-8">
              If you want clients aligned with your values and income that honors your calling, you belong here.
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto text-left"
            >
              <motion.div variants={fadeUp} custom={0} className="flex items-start gap-3 p-4">
                <span className="text-gold-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-off-white/70">Faith-driven entrepreneurs under $10K/mo</span>
              </motion.div>
              <motion.div variants={fadeUp} custom={1} className="flex items-start gap-3 p-4">
                <span className="text-gold-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-off-white/70">Want clients aligned with your values</span>
              </motion.div>
              <motion.div variants={fadeUp} custom={2} className="flex items-start gap-3 p-4">
                <span className="text-gold-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-off-white/70">Open to simple AI systems for consistency</span>
              </motion.div>
              <motion.div variants={fadeUp} custom={3} className="flex items-start gap-3 p-4">
                <span className="text-gold-vivid text-xl mt-0.5">&#x2713;</span>
                <span className="text-off-white/70">Ready to build with purpose, not pressure</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What This Isn't */}
        <section className="py-24 px-8 bg-dark-soft">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-gold-vivid block mb-8">What This Isn&apos;t</span>
            <p className="font-sans text-xl text-off-white/70 mb-8">
              Not another hustle-culture course. Not generic business advice. Not a place that asks you to choose between God and money.
            </p>
            <p className="font-display text-3xl lg:text-4xl text-off-white italic font-medium gold-glow">
              This is Purpose &amp; Profit Builders.
            </p>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 border-t border-gold-vivid/10 bg-pure-black">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <img
              src="/ppb-logo.svg"
              alt="Purpose & Profit Builders"
              className="h-12 w-auto"
            />
            <span className="font-sans text-xs text-off-white/40">&copy; 2026 Purpose &amp; Profit Builders. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
