
// providers/thenewsapi.js
import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

const BASE = "https://api.thenewsapi.com/v1/news"; // docs show /v1/news/... endpoints with api_token. [8](https://www.thenewsapi.com/documentation)[7](https://www.thenewsapi.com/)

export async function fetchTheNewsAPI({ key, q, category, lang, country, page, pageSize }) {
  if (!key) return [];
  const endpoint = q ? "all" : "headlines";
  const params = {
    api_token: key,
    language: lang || "en",
    locale: country || undefined,
    categories: category || undefined,
    page: page || 1,
    limit: pageSize || 10,
    search: q || undefined
  };
  const { data } = await axios.get(`${BASE}/${endpoint}`, { params });
  const items = data?.data || [];
  return items.map(a =>
    normalizeItem({
      id: a.uuid,
      title: a.title,
      description: a.description || a.snippet,
      url: a.url,
      imageUrl: a.image_url,
      source: a.source,
      publishedAt: a.published_at,
      language: a.language,
      country: a.locale
    })
  );
}
