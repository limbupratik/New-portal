
// frontend/src/components/NewsCard.jsx
import React from "react";
import card from "./cards.module.css";

export default function NewsCard({ data }) {
  if (!data) return null;
  const { title, description, url, imageUrl, source, publishedAt } = data;
  const time = publishedAt ? new Date(publishedAt).toLocaleString() : "";

  return (
    <article className={card.card}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={card.cardMedia} aria-label={title}>
        {imageUrl ? (
          <img className={card.cardImg} src={imageUrl} alt={title} loading="lazy"
               onError={(e)=>{ e.currentTarget.style.display="none"; const fb=e.currentTarget.nextSibling; if(fb) fb.style.display="block"; }} />
        ) : null}
        <div className={card.cardImgFallback} aria-hidden="true">🗞️</div>
      </a>
      <div className={card.cardBody}>
        <h3 className={card.cardTitle}>
          <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
        </h3>
        {description ? <p className={card.cardDesc}>{description}</p> : null}
        <div className={card.meta}>
          {source ? <span className={card.source}>{source}</span> : null}
          {time ? <time className={card.time}>{time}</time> : null}
        </div>
      </div>
    </article>
  );
}
