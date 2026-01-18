
// providers/guardian.js
import axios from "axios";
import { normalizeItem } from "../utils/normalize.js";

const BASE = "https://content.guardianapis.com/search"; // Open Platform search endpoint. [11](https://open-platform.theguardian.com/)

export async function fetchGuardian({ key, q, category, page, pageSize }) {
  if (!key) return [];
  const params = {
    "api-key": key,
    q: q || undefined,
    section: category || undefined,
    "order-by": "newest",
    "show-fields": "thumbnail,trailText,byline,shortUrl",
    page: page || 1,
    "page-size": pageSize || 10
  };
  const { data } = await axios.get(BASE, { params });
  const results = data?.response?.results || [];
  return results.map(a =>
    normalizeItem({
      id: a.id,
      title: a.webTitle,
      description: a.fields?.trailText,
      url: a.webUrl,
      imageUrl: a.fields?.thumbnail,
      source: "The Guardian",
      author: a.fields?.byline,
      publishedAt: a.webPublicationDate
    })
  );
}
