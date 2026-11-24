"use client";
import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteImage } from "@/lib/cloudinary";
import { useCollection } from "@/lib/hooks";
import Uploader from "@/components/Uploader";

export const CATEGORIES = ["Counters", "Decorations", "Stage", "Hire service", "Weddings", "Other"];

export default function Gallery() {
  const items = useCollection("gallery");
  const [category, setCategory] = useState(CATEGORIES[0]), [filter, setFilter] = useState("All");
  const shown = (items || []).filter((i) => filter === "All" || i.category === filter);

  const add = ({ url, publicId }) => addDoc(collection(db, "gallery"), { url, publicId, category, caption: "", createdAt: serverTimestamp() });
  async function remove(i) {
    if (!confirm("Delete this photo from the website?")) return;
    try { await deleteImage(i.publicId); } catch (e) { console.error(e); }
    await deleteDoc(doc(db, "gallery", i.id));
  }
  return (<>
    <h1>Gallery</h1>
    <div className="card row">
      <label>Add photos to<select value={category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
      <Uploader multiple label="Choose photos" onDone={add} folder="luxora/gallery" />
    </div>
    <div className="chips">{["All", ...CATEGORIES].map((c) => <button key={c} className={filter === c ? "on" : ""} onClick={() => setFilter(c)}>{c}</button>)}</div>
    {items === null && <p className="loading">Loading…</p>}
    {items && !shown.length && <p className="muted">No photos here yet. Choose photos above to add some.</p>}
    <div className="gallery">{shown.map((i) => (
      <figure key={i.id} className="card tile">
        <img src={i.url.replace("/upload/", "/upload/c_fill,w_400,h_400,q_auto,f_auto/")} alt={i.caption || i.category} />
        <figcaption>
          <input defaultValue={i.caption} placeholder="Caption (optional)" onBlur={(e) => e.target.value !== i.caption && updateDoc(doc(db, "gallery", i.id), { caption: e.target.value })} />
          <select value={i.category} onChange={(e) => updateDoc(doc(db, "gallery", i.id), { category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <button className="btn danger" onClick={() => remove(i)}>Delete</button>
        </figcaption>
      </figure>
    ))}</div>
  </>);
}
