
// providers/rss.js
import Parser from "rss-parser";
import { normalizeItem } from "../utils/normalize.js";

// Examples: OnlineKhabar & The Kathmandu Post RSS feeds
// (OnlineKhabar public RSS is commonly at /feed; Kathmandu Post provides RSS pages.) [17](https://rss.feedspot.com/nepal_news_rss_feeds/)[18](https://app.folo.is/share/feeds/162063218992598086)
const FEEDS = [
  { name: "OnlineKhabar", url: "https://www.onlinekhabar.com/feed" },
  { name: "Kathmandu Post", url: "https://kathmandupost.com/rss" },
];

const parser = new Parser({ timeout: 10000 });

export async function fetchRSS({ q, pageSize }) {
  if (!process.env.ENABLE_RSS) return [];
  const all = [];
  for (const f of FEEDS) {
    try {
      const feed = await parser.parseURL(f.url);
      const items = (feed.items || []).slice(0, pageSize || 10).map(a =>
        normalizeItem({
          id: a.link,
          title: a.title,
          description: a.contentSnippet || a.content,
          url: a.link,
          imageUrl: a.enclosure?.url || "",
          source: f.name,
          publishedAt: a.isoDate || a.pubDate
        })
      );
      all.push(...items);
    } catch { /* ignore feed errors */ }
  }
  return all;
}
``
