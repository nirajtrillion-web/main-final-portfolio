import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProjectSection from "../components/ProjectSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { GitBranch, Cloud, ShieldCheck, Unlock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#070709] text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Top Floating Pill Dock */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Selected Work Projects Section */}
      <ProjectSection />

      {/* Philosophy / The Ownership Standard Section */}
      <section id="about" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-8 sm:p-12 backdrop-blur-xl">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3 block">
              THE OWNERSHIP STANDARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built with precision. Delivered with 100% client autonomy.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Every project is engineered for long-term independence. You get clean architecture, modern React server components, and total sovereign control over your code and hosting from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <GitBranch className="h-6 w-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Complete Code Handover</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Full intellectual property transfer. All source code is committed directly to your private repository.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <Cloud className="h-6 w-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Independent Cloud Accounts</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hosted on your own Vercel and Supabase accounts. No agency middleman controlling your servers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <ShieldCheck className="h-6 w-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Enterprise Security</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Role-based access, encrypted databases, and clean admin credentials set up before launch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <Unlock className="h-6 w-6 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Zero Hostage Retainers</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No mandatory monthly fees just to keep your lights on. You receive a fully self-sufficient web platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
