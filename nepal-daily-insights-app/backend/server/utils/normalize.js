
// utils/normalize.js
export function normalizeItem({
  id, title, description, url, imageUrl, source, author, publishedAt, category, language, country
}) {
  return {
    id: id || url,              // fallback to URL
    title: title || "",
    description: description || "",
    url,
    imageUrl: imageUrl || "",
    source: source || "",
    author: author || "",
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
    category: category || null,
    language: language || null,
    country: country || null,
  };
}
