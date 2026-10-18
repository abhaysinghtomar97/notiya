export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://notiya.in").replace(/\/+$/, "");
export const SITE_NAME = "Notiya";
export const UPDATES_CATEGORIES = [
  "Jobs & Internships",
  "University",
  "Skills & Certifications",
  "Scholarships",
  "Career Guides",
];

export function absoluteUrl(path = "/") {
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}
