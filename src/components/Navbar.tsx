"use client";

import { useState, useEffect } from "react";

export default function Navbar({ hideNavLinks = false }: { hideNavLinks?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-orange-vivid/10 ${
        isScrolled ? "py-2 shadow-sm" : "py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="hover:opacity-80 transition-all duration-300"
          >
            <img
              src="/credit-hub-logo.svg"
              alt="The Credit Hub"
              className="h-12 md:h-15 w-auto"
            />
          </a>

          {/* Nav Links */}
          {!hideNavLinks && (
            <div className="hidden md:flex items-center gap-8">
              <a
                href="/#about"
                className="font-sans text-sm text-charcoal/60 hover:text-orange-vivid transition-colors"
              >
                About
              </a>
              <a
                href="/#whats-inside"
                className="font-sans text-sm text-charcoal/60 hover:text-orange-vivid transition-colors"
              >
                What&apos;s Inside
              </a>
              <a
                href="/#who-its-for"
                className="font-sans text-sm text-charcoal/60 hover:text-orange-vivid transition-colors"
              >
                Who It&apos;s For
              </a>
              <a
                href="/quiz"
                className="font-sans text-sm text-charcoal/60 hover:text-orange-vivid transition-colors"
              >
                Credit GPS
              </a>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/quiz"
              className="font-sans text-xs tracking-widest uppercase px-6 py-2 bg-orange-vivid text-white hover:bg-orange-deep transition-all duration-300 rounded-sm"
            >
              Credit GPS Quiz
            </a>
            <a
              href="https://www.skool.com/tch"
              className="hidden sm:inline-block font-sans text-xs tracking-widest uppercase px-6 py-2 border border-orange-vivid text-orange-vivid hover:bg-orange-vivid hover:text-white transition-all duration-300 rounded-sm"
            >
              Join The Credit Hub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
