import crypto from "crypto";

const canon = (s="") => s.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/$/, "");
export function dedupe(items) {
  const seen = new Set();
  return items.filter(a => {
    const key = canon(a.url) || (a.title ? crypto.createHash("md5").update(a.title).digest("hex") : "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
