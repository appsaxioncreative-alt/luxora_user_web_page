"use client";
import { useEffect, useState } from "react";
import { img } from "@/lib/site";

export default function Gallery({ items }) {
  const cats = ["All", ...new Set(items.map((i) => i.category).filter(Boolean))];
  const [f, setF] = useState("All"), [open, setOpen] = useState(-1);
  const shown = items.filter((i) => f === "All" || i.category === f);

  useEffect(() => {
    if (open < 0) return;
    const k = (e) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") setOpen((o) => (o + 1) % shown.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o - 1 + shown.length) % shown.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, shown.length]);

  if (!items.length) return <p className="s-empty">Photos are coming soon.</p>;
  return (<>
    <div className="s-chips">{cats.map((c) => <button key={c} className={f === c ? "on" : ""} onClick={() => { setF(c); setOpen(-1); }}>{c}</button>)}</div>
    <div className="s-masonry">
      {shown.map((i, n) => (
        <button key={i.id} className="s-ph" onClick={() => setOpen(n)} aria-label={`Open photo: ${i.caption || i.category}`}>
          <img src={img(i.url, "c_limit,w_700,q_auto,f_auto")} alt={i.caption || i.category || "Luxora work"} loading="lazy" />
        </button>
      ))}
    </div>
    {open >= 0 && shown[open] && (
      <div className="s-lightbox" onClick={() => setOpen(-1)}>
        <button className="x" aria-label="Close">✕</button>
        <button className="nav l" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + shown.length) % shown.length); }}>‹</button>
        <figure onClick={(e) => e.stopPropagation()}>
          <img src={img(shown[open].url, "c_limit,w_1600,q_auto,f_auto")} alt={shown[open].caption || ""} />
          {shown[open].caption && <figcaption>{shown[open].caption}</figcaption>}
        </figure>
        <button className="nav r" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % shown.length); }}>›</button>
      </div>
    )}
  </>);
}
