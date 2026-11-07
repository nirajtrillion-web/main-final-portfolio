export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  imagePath: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "project-01",
    title: "Apex Dental",
    subtitle: "High-Conversion Dental Clinic Platform",
    description: "Multi-doctor practice management platform featuring interactive smile transformation sliders, location routing, and patient booking pipelines.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    liveUrl: "https://apex-dental-studio-eight.vercel.app/",
    githubUrl: "https://github.com/nirajtrillion-web/apex-dental-studio",
    imagePath: "/images/apex-dental.png",
    highlights: [
      "Interactive Before/After smile transformation slider",
      "Multi-doctor schedule & booking management",
      "Direct click-to-call and clinic location mapping"
    ]
  },
  {
    id: "project-02",
    title: "BakerBliss",
    subtitle: "Artisanal Storefront & Ordering Engine",
    description: "Interactive storefront with a real-time product catalog, custom item ordering, and automated Supabase database ingestion.",
    tags: ["Next.js", "React", "Tailwind CSS", "Supabase DB", "Vercel"],
    liveUrl: "https://baker-shop-backend-8yd8.vercel.app/",
    githubUrl: "https://github.com/nirajtrillion-web/apex-dental-studio",
    imagePath: "/images/baker-bliss.png",
    highlights: [
      "Independent Supabase backend & secure owner admin portal",
      "Real-time order intake pipeline directly to Supabase",
      "Dynamic product catalog and category filters"
    ]
  }
];