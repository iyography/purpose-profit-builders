"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ hideNavLinks = false }: { hideNavLinks?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/95 backdrop-blur-md border-b border-gold-vivid/10 ${
        isScrolled ? "py-2 shadow-sm shadow-gold-vivid/5" : "py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo — text-only for compactness */}
          <a href="/" className="shrink-0 font-display font-bold text-lg sm:text-xl text-gold-vivid hover:opacity-80 transition-opacity">
            PPB
          </a>

          {/* Desktop Nav Links */}
          {!hideNavLinks && (
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="/#about" className="font-sans text-sm text-off-white/60 hover:text-gold-vivid transition-colors whitespace-nowrap">
                About
              </a>
              <a href="/#whats-inside" className="font-sans text-sm text-off-white/60 hover:text-gold-vivid transition-colors whitespace-nowrap">
                System
              </a>
              <a href="/#who-its-for" className="font-sans text-sm text-off-white/60 hover:text-gold-vivid transition-colors whitespace-nowrap">
                Audience
              </a>
              <a href="/quiz" className="font-sans text-sm text-off-white/60 hover:text-gold-vivid transition-colors whitespace-nowrap">
                Quiz
              </a>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="/quiz"
              className="font-sans text-xs tracking-wider uppercase px-4 lg:px-6 py-2 bg-gold-vivid text-black hover:bg-gold-warm transition-all duration-300 rounded-sm font-semibold whitespace-nowrap"
            >
              Quiz
            </a>
            <a
              href="https://www.skool.com/thezoexway/about"
              className="font-sans text-xs tracking-wider uppercase px-4 lg:px-6 py-2 border border-gold-vivid text-gold-vivid hover:bg-gold-vivid hover:text-black transition-all duration-300 rounded-sm whitespace-nowrap"
            >
              Join
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 text-off-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-black/95 border-t border-gold-vivid/10 px-6 py-4 space-y-3">
          {!hideNavLinks && (
            <>
              <a href="/#about" onClick={() => setMobileOpen(false)} className="block text-sm text-off-white/70 hover:text-gold-vivid">About</a>
              <a href="/#whats-inside" onClick={() => setMobileOpen(false)} className="block text-sm text-off-white/70 hover:text-gold-vivid">System</a>
              <a href="/#who-its-for" onClick={() => setMobileOpen(false)} className="block text-sm text-off-white/70 hover:text-gold-vivid">Audience</a>
              <a href="/quiz" onClick={() => setMobileOpen(false)} className="block text-sm text-off-white/70 hover:text-gold-vivid">Quiz</a>
            </>
          )}
          <a href="/quiz" className="block text-center text-xs tracking-wider uppercase px-4 py-2 bg-gold-vivid text-black rounded-sm font-semibold">
            Quiz
          </a>
          <a href="https://www.skool.com/thezoexway/about" className="block text-center text-xs tracking-wider uppercase px-4 py-2 border border-gold-vivid text-gold-vivid rounded-sm">
            Join
          </a>
        </div>
      )}
    </nav>
  );
}
