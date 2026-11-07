import React from "react";
import { Github, Linkedin, ArrowUp, Code2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-neutral-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide">
            <Code2 className="h-4 w-4 text-cyan-400" />
            <span>Developer Bhai</span>
          </div>
          <span className="hidden sm:inline-block text-neutral-600">•</span>
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} All rights reserved. Crafted with Next.js & Tailwind.
          </p>
        </div>

        {/* Links & Back to top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/nirajtrillion-web"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* LinkedIn Profile (uncomment and add your direct profile URL when ready) */}
          {/* <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
          >
            <Linkedin className="h-4 w-4" />
          </a> */}

          <a
            href="#"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-white/10 transition-all ml-2"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
