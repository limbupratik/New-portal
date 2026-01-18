
// frontend/src/components/LeadCard.jsx
import React from "react";
import card from "./cards.module.css";

export default function LeadCard({ data }) {
  if (!data) return null;
  const { title, description, imageUrl, url, source, publishedAt } = data;
  const time = publishedAt ? new Date(publishedAt).toLocaleString() : "";

  return (
    <article className={card.lead}>
      <a href={url} target="_blank" rel="noopener noreferrer" className={card.leadLink} aria-label={title}>
        {imageUrl ? (
          <img className={card.leadImg} src={imageUrl} alt={title} loading="lazy"
               onError={(e)=>{ e.currentTarget.style.display="none"; const fb=e.currentTarget.nextSibling; if(fb) fb.style.display="block"; }} />
        ) : null}
        <div className={card.leadImgFallback} aria-hidden="true">📰</div>
        <div className={card.leadOverlay} />
        <div className={card.leadText}>
          <h2 className={card.leadTitle}>{title}</h2>
          {description ? <p className={card.leadDesc}>{description}</p> : null}
          <div className={card.meta}>
            {source ? <span className={card.source}>{source}</span> : null}
            {time ? <time className={card.time}>{time}</time> : null}
          </div>
        </div>
      </a>
    </article>
  );
}

