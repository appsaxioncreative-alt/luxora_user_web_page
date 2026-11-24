"use client";
import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteImage } from "@/lib/cloudinary";
import { useCollection } from "@/lib/hooks";
import Uploader from "@/components/Uploader";

const blank = { title: "", description: "", price: "", image: "", publicId: "" };

export default function Services() {
  const items = useCollection("services");
  const [f, setF] = useState(blank);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function add(e) {
    e.preventDefault();
    await addDoc(collection(db, "services"), { ...f, createdAt: serverTimestamp() });
    setF(blank);
  }
  async function remove(s) {
    if (!confirm(`Delete "${s.title}"?`)) return;
    try { await deleteImage(s.publicId); } catch (e) { console.error(e); }
    await deleteDoc(doc(db, "services", s.id));
  }
  return (<>
    <h1>Services</h1>
    <form className="card form" onSubmit={add}>
      <h2>Add a service</h2>
      <div className="row">
        <label>Name<input required value={f.title} onChange={set("title")} placeholder="Buffet counters" /></label>
        <label>Price note (optional)<input value={f.price} onChange={set("price")} placeholder="Starting at ₹5,000" /></label>
      </div>
      <label>Description<textarea rows={3} value={f.description} onChange={set("description")} /></label>
      <div className="row">
        <Uploader label={f.image ? "Change photo" : "Add photo"} folder="luxora/services" onDone={({ url, publicId }) => setF((p) => ({ ...p, image: url, publicId }))} />
        {f.image && <img className="thumb" src={f.image} alt="" />}
      </div>
      <button className="btn primary">Save service</button>
    </form>
    {items?.map((s) => (
      <article key={s.id} className="card review">
        <div className="row">
          {s.image && <img className="thumb" src={s.image} alt="" />}
          <div><b>{s.title}</b> <span className="muted">{s.price}</span><p>{s.description}</p></div>
        </div>
        <div className="actions"><button className="btn danger" onClick={() => remove(s)}>Delete</button></div>
      </article>
    ))}
    {items && !items.length && <p className="muted">No services yet.</p>}
  </>);
}
