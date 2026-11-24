"use client";
import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCollection } from "@/lib/hooks";
import Stars from "@/components/Stars";

const blank = { name: "", rating: 5, comment: "", source: "Instagram" };

export default function Reviews() {
  const items = useCollection("reviews");
  const [f, setF] = useState(blank);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function add(e) {
    e.preventDefault();
    await addDoc(collection(db, "reviews"), { ...f, approved: true, createdAt: serverTimestamp() });
    setF(blank);
  }
  return (<>
    <h1>Reviews & ratings</h1>
    <form className="card form" onSubmit={add}>
      <h2>Add a review</h2>
      <div className="row">
        <label>Customer name<input required value={f.name} onChange={set("name")} /></label>
        <label>Where it came from<select value={f.source} onChange={set("source")}>{["Instagram", "WhatsApp", "Google", "Phone call", "Website"].map((s) => <option key={s}>{s}</option>)}</select></label>
      </div>
      <label>Rating<Stars value={f.rating} onChange={(n) => setF({ ...f, rating: n })} /></label>
      <label>Comment<textarea required rows={3} value={f.comment} onChange={set("comment")} /></label>
      <button className="btn primary">Add review</button>
    </form>

    {items === null && <p className="loading">Loading…</p>}
    {items && !items.length && <p className="muted">No reviews yet.</p>}
    {items?.map((r) => (
      <article key={r.id} className="card review">
        <div>
          <b>{r.name}</b> <span className="muted">via {r.source}</span> <Stars value={r.rating} />
          <p>{r.comment}</p>
        </div>
        <div className="actions">
          <span className={`badge ${r.approved ? "ok" : "wait"}`}>{r.approved ? "Showing" : "Waiting"}</span>
          <button className="btn" onClick={() => updateDoc(doc(db, "reviews", r.id), { approved: !r.approved })}>{r.approved ? "Hide" : "Approve"}</button>
          <button className="btn danger" onClick={() => confirm("Delete this review?") && deleteDoc(doc(db, "reviews", r.id))}>Delete</button>
        </div>
      </article>
    ))}
  </>);
}
