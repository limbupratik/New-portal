
// providers/currents.js
import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

const BASE = "https://api.currentsapi.services/v1"; // getting-started shows /v1/latest-news & /v1/search with Authorization header. [15](https://www.currentsapi.services/en/docs/)

export async function fetchCurrents({ key, q, category, lang, country, page, pageSize }) {
  if (!key) return [];
  const endpoint = q ? "search" : "latest-news";
  const params = {
    keywords: q || undefined,
    category: category || undefined,
    language: lang || undefined,
    country: country || undefined,
    page_number: page || 1,
    page_size: pageSize || 10
  };
  const { data } = await axios.get(`${BASE}/${endpoint}`, {
    params,
    headers: { Authorization: key }
  });
  const news = data?.news || [];
  return news.map(a =>
    normalizeItem({
      id: a.id || a.url,
      title: a.title,
      description: a.description,
      url: a.url,
      imageUrl: a.image,
      source: a.source || "Currents",
      author: a.author,
      publishedAt: a.published
    })
  );
}
