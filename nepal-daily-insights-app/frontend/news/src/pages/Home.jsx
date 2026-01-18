
// frontend/src/pages/Home.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import LeadCard from "../components/LeadCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import BriefItem from "../components/BriefItem.jsx";
import styles from "./home.module.css";

const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  process.env.REACT_APP_API_BASE ||
  "http://localhost:5000";

const PAGE_SIZE = 24;

export default function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("top");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const abortRef = useRef(null);
  const categories = useMemo(
    () => [
      { id: "top", label: "Top" },
      { id: "nepal", label: "Nepal" },
      { id: "world", label: "World" },
      { id: "business", label: "Business" },
      { id: "technology", label: "Tech" },
      { id: "entertainment", label: "Entertainment" },
      { id: "sports", label: "Sports" },
      { id: "health", label: "Health" },
      { id: "science", label: "Science" }
    ],
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const params = { _limit: PAGE_SIZE };
        if (q.trim()) params.q = q.trim();
        // Map our custom "nepal" to a query; others to real categories
        if (category && category !== "top") {
          if (category === "nepal") {
            params.q = params.q ? `${params.q} AND Nepal` : "Nepal";
          } else {
            params.category = category;
          }
        }
        const { data } = await axios.get(`${API_BASE}/api/news`, { params, signal: controller.signal });
        setNews(Array.isArray(data?.data) ? data.data : []);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setErr(e?.response?.data?.message || e.message || "Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [category, q]);

  const dateStr = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  const lead = news[0];
  const secondary = news.slice(1, 7);
  const briefs = news.slice(7, 24);

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <header className={styles.topbar}>
        <div className={styles.brandBlock}>
          <div className={styles.brandDot} aria-hidden="true" />
          <h1 className={styles.brand}>Nepal Daily Insights</h1>
        </div>
        <div className={styles.dateline}>{dateStr}</div>
      </header>

      {/* Category nav + search */}
      <div className={styles.controls}>
        <nav className={styles.catNav} aria-label="Sections">
          {categories.map(c => (
            <button
              key={c.id}
              className={`${styles.catChip} ${category === c.id ? styles.catChipActive : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <div className={styles.searchWrap}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search headlines…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search news"
          />
        </div>
      </div>

      {/* Error */}
      {err ? (
        <div className={styles.error} role="alert">
          <span>Couldn’t load news. {err}</span>
          <button className={styles.retry} onClick={() => setCategory(prev => prev)}>Retry</button>
        </div>
      ) : null}

      {/* Layout */}
      <main className={styles.layout} aria-busy={loading ? "true" : "false"}>
        {/* Left: hero + grid */}
        <section className={styles.colMain}>
          {/* Hero */}
          {loading ? (
            <div className={styles.heroSkel} />
          ) : lead ? (
            <LeadCard data={lead} />
          ) : null}

          {/* Secondary grid */}
          <div className={styles.grid}>
            {(loading ? Array.from({ length: 6 }) : secondary).map((item, i) =>
              loading ? (
                <div key={i} className={styles.cardSkel} />
              ) : (
                <NewsCard key={item.id || item.url || i} data={item} />
              )
            )}
          </div>
        </section>

        {/* Right rail: In Brief */}
        <aside className={styles.colRail} aria-label="In Brief">
          <h2 className={styles.railTitle}>In Brief</h2>
          <ul className={styles.briefList}>
            {(loading ? Array.from({ length: 8 }) : briefs).map((item, i) =>
              loading ? (
                <li key={i} className={styles.briefSkel} />
              ) : (
                <BriefItem key={item.id || item.url || i} data={item} />
              )
            )}
          </ul>
        </aside>
      </main>
    </div>
  );
}
