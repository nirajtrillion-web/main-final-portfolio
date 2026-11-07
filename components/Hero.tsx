"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Terminal } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-ambient-grid opacity-30 pointer-events-none -z-10" />

      {/* Live availability / Ownership badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-300 backdrop-blur-md shadow-lg shadow-black/40 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-neutral-200">100% Ownership & Zero Lock-in</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
      >
        Custom High-Performance Websites{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
          You Actually Own.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-neutral-400 leading-relaxed font-normal"
      >
        Stop paying for websites you never truly control. I build production-grade web systems and transfer complete ownership of the code, database, and hosting credentials directly to you on day one. Zero recurring agency hostage fees.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <a
          href="#work"
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
        >
          <span>Explore Selected Work</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <a
          href="#contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
        >
          <Mail className="h-4 w-4 text-neutral-400" />
          <span>Initiate Project</span>
        </a>
      </motion.div>

      {/* Bottom Tech pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mt-16 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-neutral-500"
      >
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" /> Next.js 14 App Router
        </span>
        <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5">
          Supabase Postgres & RLS
        </span>
        <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5">
          Tailwind CSS
        </span>
        <span className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5">
          Edge Optimized
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
