const DEFAULTS = {
  businessName: "Luxora Makers",
  tagline: "Turning Wedding Dreams Into Reality",
  heroTitle: "Elegant counters and décor for your wedding day",
  heroSubtitle: "Buffet counters, stage decorations and hire services, set up with care for your special day.",
  about: "Luxora Makers turns wedding dreams into reality with elegant counters, decorations and hire services.",
};
export const withDefaults = (s = {}) => {
  const out = { ...s };
  for (const k in DEFAULTS) out[k] = s[k] || DEFAULTS[k];
  return out;
};
// Cloudinary on-the-fly resize/optimise
export const img = (url, t = "c_limit,w_900,q_auto,f_auto") => (url ? url.replace("/upload/", `/upload/${t}/`) : "");
export const waLink = (s, text = "") => {
  const n = (s.whatsapp || s.phone || "").replace(/\D/g, "");
  return n ? `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "/contact";
};
export const FALLBACK_SERVICES = [
  { id: "a", title: "Buffet counters", description: "Illuminated, beautifully finished counters that make every dish look its best." },
  { id: "b", title: "Wedding decorations", description: "Stage, entrance and hall décor planned around your theme and venue." },
  { id: "c", title: "Hire service", description: "Chafing dishes, counters and equipment delivered and set up on time." },
];
