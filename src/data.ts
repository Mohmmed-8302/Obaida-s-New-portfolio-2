/* ───────────────  Obaida portfolio content (ported 1:1) ─────────────── */

export const CONTACT = {
  email: "technecal23@gmail.com",
  phone: "+966 56 620 7480",
  phoneHref: "tel:+966566207480",
  youtube: "https://youtube.com/@festeara-24",
  youtubeLabel: "@festeara-24 / Obaida",
};

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "videos", label: "Reel" },
  { id: "services", label: "Services" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export const HERO_STATS = [
  { value: "2024", label: "First Edit" },
  { value: "2026", label: "Went Viral" },
  { value: "3", label: "Core Niches" },
  { value: "<3min", label: "Sweet Spot" },
];

export const MARQUEE_ITEMS = [
  "Gaming Edits",
  "Motion Graphics",
  "Portfolio Design",
  "Awareness Content",
  "Education Content",
  "Viral Hooks",
];

export type Portfolio = {
  tag: string;
  title: string;
  meta: string;
  desc: string;
  url: string;
  screenshot: string;
};

export const PORTFOLIOS: Portfolio[] = [
  {
    tag: "Corporate",
    title: "IES-BIM",
    meta: "Web Design · Development · Branding",
    desc: "A professional corporate website for IES-BIM. Clean layout, modern structure, built to convert.",
    url: "https://www.ies-bim.com/",
    screenshot: "/assets/screenshots/ies-bim.jpg",
  },
];

export type VideoItem = { src: string; title: string; tag: string };

export const VIDEOS: VideoItem[] = [
  { src: "/assets/videos/lost-hadiths.mp4", title: "أحاديث ضيعة", tag: "Awareness" },
  { src: "/assets/videos/rich-buy-poor-sell.mp4", title: "حاجة بيشتريها الأغنياء", tag: "Education" },
  { src: "/assets/videos/major-minor-sins.mp4", title: "الكبائر و الصغائر", tag: "Awareness" },
  { src: "/assets/videos/spiderman-yemen.mp4", title: "سبيدرمان اليمن", tag: "Entertainment" },
];

export const CAPABILITIES = [
  { label: "Video Editing", value: 90 },
  { label: "Motion Graphics", value: 82 },
  { label: "Portfolio Design", value: 88 },
  { label: "Social Strategy", value: 70 },
];

export const SERVICES = [
  { n: "01", label: "Short-Form Editing", note: "Reels · Shorts · TikTok" },
  { n: "02", label: "Motion Graphics & VFX", note: "Titles · Transitions · FX" },
  { n: "03", label: "Portfolio & Web Design", note: "Brand · Layout · Polish" },
  { n: "04", label: "Hook & Thumbnail Design", note: "Stop-the-scroll first frames" },
];

export const JOURNEY = [
  { year: "2022", title: "Started Learning", desc: "Self-taught editing journey begins. Discovered the power of short-form." },
  { year: "2024", title: "First Publish", desc: "Released first professional edits. Built a growing reel of viral-ready clips." },
  { year: "2026", title: "The Breakthrough", desc: "Content went viral. Portfolio design services launched. No looking back." },
];

export const STUDIO_INFO = [
  { k: "Name", v: "Obaida" },
  { k: "Role", v: "Video Editor" },
  { k: "Since", v: "2024" },
  { k: "Status", v: "Available", accent: true },
];
