export interface Project {
  id: string;
  title: string;
  description: { en: string; fr: string };
  longDescription: { en: string; fr: string };
  tags: string[];
  category: string;
  github?: string;      // direct link to the git repository
  link?: string;        // live demo link
  images: string[];     // array of screenshot URLs (replace with real paths)
  featured: boolean;
  gradient: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: { en: string; fr: string };
  company: string;
  period: string;
  description: { en: string; fr: string };
  tags: string[];
  type: "work" | "education" | "project";
}

export interface NavLink {
  label: string;
  href: string;
}
