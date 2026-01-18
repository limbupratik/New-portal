
// frontend/src/components/BriefItem.jsx
import React from "react";
import card from "./cards.module.css";

export default function BriefItem({ data }) {
  if (!data) return null;
  const { title, url, imageUrl, source } = data;

  return (
    <li className={card.briefItem}>
      <div className={card.briefText}>
        <a href={url} target="_blank" rel="noopener noreferrer" className={card.briefLink}>
          {title}
        </a>
        {source ? <span className={card.briefSource}>{source}</span> : null}
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className={card.briefThumbLink} aria-label={title}>
        {imageUrl ? (
          <img className={card.briefThumb} src={imageUrl} alt="" loading="lazy"
               onError={(e)=>{ e.currentTarget.style.visibility="hidden"; }} />
        ) : <div className={card.briefThumbFallback} aria-hidden="true" />}
      </a>
    </li>
  );
}
