import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

const BASE = "https://newsapi.org/v2";

export async function fetchNewsAPI({ key, q, category, lang, country, page, pageSize }) {
  if (!key) return [];
  const params = q
    ? { q, language: lang || "en", sortBy: "publishedAt", page, pageSize }
    : { category: category || "general", country: country || "us", page, pageSize };
  const endpoint = q ? "everything" : "top-headlines";
  const { data } = await axios.get(`${BASE}/${endpoint}`, { headers: { "X-Api-Key": key }, params });
  const articles = data?.articles || [];
  return articles.map(a =>
    normalizeItem({
      id: a.url,
      title: a.title,
      description: a.description,
      url: a.url,
      imageUrl: a.urlToImage,
      source: a.source?.name || "NewsAPI",
      author: a.author,
      publishedAt: a.publishedAt,
      language: params.language,
      country: params.country
    })
  );
}
