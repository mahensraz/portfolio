export type LocalizedString = string | { en: string; fr: string };
export type LocalizedStringArray = string[] | { en: string[]; fr: string[] };

export interface Project {
  id: string;
  title: LocalizedString;
  description: { en: string; fr: string };
  longDescription: { en: string; fr: string };
  tags: LocalizedStringArray;
  category: LocalizedString;
  github?: string;      // direct link to the git repository
  link?: string;        // live demo link
  images: string[];     // array of screenshot URLs (replace with real paths)
  featured: boolean;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: { en: string; fr: string };
  company: LocalizedString;
  period: { en: string; fr: string };
  description: { en: string; fr: string };
  tags: LocalizedStringArray;
  type: "work" | "education" | "project";
}
