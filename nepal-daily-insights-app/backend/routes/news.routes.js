
import { withCache } from "../server/utils/cache.js";
import { dedupe } from "../server/utils/dedupe.js";

import { fetchNewsAPI }    from "../server/providers/newsapi.js";
import { fetchGNews }      from "../server/providers/gnews.js";
import { fetchTheNewsAPI } from "../server/providers/thenewsapi.js";
import { fetchNewsData }   from "../server/providers/newsdata.js";
import { fetchGuardian }   from "../server/providers/guardian.js";
import { fetchMediastack } from "../server/providers/mediastack.js";
import { fetchCurrents }   from "../server/providers/currents.js";
import { fetchRSS }        from "../server/providers/rss.js"; // optional

import { Router } from "express";


const router = Router();
const PAGE_SIZE_DEFAULT = 12;

router.get("/", async (req, res) => {
  const q        = (req.query.q || "").toString().trim();
  const category = (req.query.category || "").toString().trim() || undefined;
  const lang     = (req.query.lang || "en").toString().trim();
  const country  = (req.query.country || "").toString().trim() || undefined;
  const page     = parseInt(req.query._page || req.query.page || "1", 10);
  const pageSize = parseInt(req.query._limit || req.query.pageSize || PAGE_SIZE_DEFAULT, 10);

  const cacheKey = `newsapi:${q}:${category}:${lang}:${country}:${page}:${pageSize}`;

  try {
    const payload = await withCache(cacheKey, async () => {
      const items = await fetchNewsAPI({
        key: process.env.NEWSAPI_KEY, q, category, lang, country, page, pageSize
      });

      const merged = dedupe(
        items.sort((a, b) => (new Date(b.publishedAt || 0)) - (new Date(a.publishedAt || 0)))
      );

      return {
        data: merged.slice(0, pageSize),
        hasMore: merged.length > pageSize,
        total: merged.length
      };
    });

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: err?.message || "Failed to fetch news" });
  }
});

export default router;
