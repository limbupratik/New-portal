
// providers/newsdata.js
import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

const BASE = "https://newsdata.io/api/1/news"; // typical call: ?apikey=...&q=... [9](https://publicapis.io/newsdata-api)

export async function fetchNewsData({ key, q, category, lang, country, page, pageSize }) {
  if (!key) return [];
  const params = {
    apikey: key,
    q: q || undefined,
    language: lang || undefined,
    country: country || undefined,
    category: category || undefined,
    page: page || 1,
    pageSize: pageSize || undefined
  };
  const { data } = await axios.get(BASE, { params });
  const items = data?.results || data?.data || [];
  return items.map(a =>
    normalizeItem({
      id: a.link,
      title: a.title,
      description: a.description,
      url: a.link,
      imageUrl: a.image_url,
      source: a.source_id || a.source || "NewsData.io",
      publishedAt: a.pubDate || a.pub_date,
      language: a.language,
      country: a.country
    })
  );
}
