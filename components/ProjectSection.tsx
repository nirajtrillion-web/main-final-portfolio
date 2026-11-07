"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export const ProjectSection: React.FC = () => {
  return (
    <section id="work" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header with Framer Motion Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col items-center text-center mb-16 sm:mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-4 backdrop-blur-md">
          <Layers className="h-3.5 w-3.5" />
          <span className="tracking-wide uppercase">Portfolio Showcase</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Work</span>
        </h2>

        <p className="mt-4 max-w-2xl text-sm sm:text-base text-neutral-400 leading-relaxed">
          Production-grade applications engineered for performance, scalability, and seamless user experiences.
        </p>
      </motion.div>

      {/* Grid Layout for Projects (Optimized 2-Column Responsive for 2 Projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
