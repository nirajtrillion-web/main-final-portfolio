"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ExternalLink, Github, Sparkles, CheckCircle2 } from "lucide-react";
import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  // Fix: Framer Motion template for dynamic radial gradient
  const background = useMotionTemplate`radial-gradient(600px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.06), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d" as const,
        }}
        className="group relative flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/90 via-neutral-950/95 to-black p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] overflow-hidden"
      >
        {/* Dynamic Sheen Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{ background }}
        />

        {/* Ambient Top Glow Accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

        {/* 16:9 Image Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/80 mb-6 shadow-inner">
          {project.imagePath ? (
            <>
              <Image
                src={project.imagePath}
                alt={`${project.title} screenshot preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index === 0}
              />
              {/* Subtle gradient vignette over the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-neutral-950 to-indigo-950/30" />

              {/* Fallback Graphic */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg mb-3 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                  <Sparkles className="h-6 w-6 text-cyan-400" />
                </div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400/90 font-semibold mb-1">
                  {project.title}
                </p>
                <p className="text-xs font-medium text-neutral-400 max-w-xs">
                  Live Production Deployment
                </p>
              </div>

              {/* Grid pattern aesthetic */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            </>
          )}

          {/* Slot ID watermark badge */}
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/70 border border-white/15 backdrop-blur-md text-[11px] font-mono font-medium text-neutral-200 shadow-md">
            {project.id.toUpperCase()}
          </div>
        </div>

        {/* Card Content Header */}
        <div className="flex flex-col gap-2 mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
            {project.subtitle}
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            {project.description}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="my-3 flex flex-col gap-2 rounded-xl bg-white/[0.02] border border-white/5 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            Key Architectural Highlights
          </div>
          <ul className="space-y-1.5">
            {project.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-neutral-300"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400/80 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Badges */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-neutral-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/10">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95"
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <Github className="h-3.5 w-3.5" />
            <span>Source</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};