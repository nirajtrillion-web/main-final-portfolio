"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("work");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ["work", "about", "contact"];
          const scrollPosition = window.scrollY + 200;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work", id: "work" },
    { label: "About", href: "#about", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-1 sm:gap-2 backdrop-blur-md bg-[#0a0a0e]/95 border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 shadow-2xl shadow-black/80 ring-1 ring-white/5"
      >
        <a
          href="#"
          className="flex items-center gap-2 pr-3 border-r border-white/10 text-white font-semibold text-xs tracking-wider uppercase group"
          aria-label="Home"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="hidden sm:inline-block font-mono text-cyan-400 font-bold tracking-tight">DEVELOPER BHAI</span>
        </a>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
