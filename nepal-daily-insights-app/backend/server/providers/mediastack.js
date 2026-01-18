
// providers/mediastack.js
import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

// mediastack docs show /v1/news with access_key and note plan-based HTTPS restrictions. [12](https://mediastack.com/documentation)[13](https://github.com/apilayer/mediastack/blob/master/README.md)
const BASE = "http://api.mediastack.com/v1/news"; // keep http to be safe on free; we're server-side anyway

export async function fetchMediastack({ key, q, category, lang, country, page, pageSize }) {
  if (!key) return [];
  const params = {
    access_key: key,
    keywords: q || undefined,
    categories: category || undefined,
    languages: lang || undefined,
    countries: country || undefined,
    offset: page && pageSize ? (page - 1) * pageSize : undefined,
    limit: pageSize || 10,
    sort: "published_desc"
  };
  const { data } = await axios.get(BASE, { params });
  const items = data?.data || [];
  return items.map(a =>
    normalizeItem({
      id: a.url,
      title: a.title,
      description: a.description,
      url: a.url,
      imageUrl: a.image,
      source: a.source || "mediastack",
      publishedAt: a.published_at,
      language: a.language,
      country: a.country,
      category: a.category
    })
  );
}
