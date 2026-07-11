export type PostSection = { h: string; p: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO, z.B. "2026-05-12"
  category:
    | "Inkasso-Wissen"
    | "Digitales Inkasso"
    | "Recht & Urteile"
    | "Forderungsmanagement"
    | "Für Schuldner"
    | "Branchen-Inkasso";
  keywords: string[];
  intro: string;
  sections: PostSection[];
};
