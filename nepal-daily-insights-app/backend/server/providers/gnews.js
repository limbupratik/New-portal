
// providers/gnews.js
import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

const BASE = "https://gnews.io/api/v4"; // official docs use /api/v4 and 'apikey' param. [4](https://docs.gnews.io/)

export async function fetchGNews({ key, q, category, lang, country, page, pageSize }) {
  if (!key) return [];
  const endpoint = q ? "search" : "top-headlines";
  const params = {
    q: q || "",
    category: category || undefined,
    lang: lang || "en",
    country: country || undefined,
    page: page || 1,
    max: pageSize || 10,
    apikey: key,
  };
  const { data } = await axios.get(`${BASE}/${endpoint}`, { params });
  const items = data?.articles || [];
  return items.map(a =>
    normalizeItem({
      id: a.id || a.url,
      title: a.title,
      description: a.description || a.content,
      url: a.url,
      imageUrl: a.image,
      source: a.source?.name || "GNews",
      publishedAt: a.publishedAt,
      language: a.lang
    })
  );
}

