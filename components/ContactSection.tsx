"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MessageSquare, Mail, Sparkles, MapPin, Clock, AlertCircle, Loader2, Phone } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Business / Company Website",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send project inquiry. Please try again.");
      }

      setSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        projectType: "Business / Company Website",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-4 backdrop-blur-md">
          <Mail className="h-3.5 w-3.5" />
          <span className="tracking-wide uppercase">Initiate Collaboration</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Let’s Build Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            Exceptional
          </span>
        </h2>

        <p className="mt-4 max-w-xl text-sm sm:text-base text-neutral-400 leading-relaxed">
          Have an ambitious project in mind, need architectural consulting, or want to modernize your web platform?
        </p>
      </motion.div>

      {/* Main Grid: Info + Contact Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-neutral-950/90 p-8 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-2">Project Inquiries</h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              I partner with innovative founders, agencies, and teams to build high-performance web products from zero to production.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">Direct Email</div>
                  <a
                    href="mailto:nirajsinghr07@gmail.com"
                    className="font-mono text-white hover:text-cyan-400 transition-colors"
                  >
                    nirajsinghr07@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">Call / WhatsApp</div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/919321194969"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-white hover:text-emerald-400 transition-colors"
                      title="Chat on WhatsApp"
                    >
                      +91 9321194969
                    </a>
                    <span className="text-neutral-600">/</span>
                    <a
                      href="tel:+919321194969"
                      className="text-xs text-neutral-400 hover:text-emerald-400 transition-colors"
                      title="Call directly"
                    >
                      (Call)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">Response Time</div>
                  <div className="text-neutral-200">Within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">Location & Availability</div>
                  <div className="text-neutral-200">Global Remote / Edge Deployments</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/90 via-neutral-950/95 to-black p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-3">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Delivered Successfully</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Thank you!</h4>
                <p className="text-sm text-neutral-300 max-w-md mb-6 leading-relaxed">
                  Thank you! Your brief has been sent and a confirmation email is in your inbox.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - hidden from human users to trap spam bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website_url">Company Website</label>
                  <input
                    type="text"
                    id="company_website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.honeypot}
                    onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      maxLength={100}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full rounded-xl bg-neutral-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      maxLength={254}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl bg-neutral-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Contact / Mobile Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Contact / Mobile Number <span className="text-neutral-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      maxLength={30}
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 9321194969"
                      className="w-full rounded-xl bg-neutral-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Project Type Dropdown */}
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full rounded-xl bg-neutral-950/80 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    >
                      <option value="Business / Company Website" className="bg-neutral-900 text-white">Business / Company Website</option>
                      <option value="E-Commerce / Online Store" className="bg-neutral-900 text-white">E-Commerce / Online Store</option>
                      <option value="Custom Web Application / SaaS" className="bg-neutral-900 text-white">Custom Web Application / SaaS</option>
                      <option value="High-Converting Landing Page" className="bg-neutral-900 text-white">High-Converting Landing Page</option>
                      <option value="Website Redesign & Maintenance" className="bg-neutral-900 text-white">Website Redesign & Maintenance</option>
                      <option value="Other / Custom Project" className="bg-neutral-900 text-white">Other / Custom Project</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Project Overview
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    maxLength={3000}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your timeline, tech stack needs, and key business goals..."
                    className="w-full rounded-xl bg-neutral-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to Send Message</p>
                      <p className="text-red-300/90 mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Brief</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
