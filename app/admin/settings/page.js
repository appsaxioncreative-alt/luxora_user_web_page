"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Uploader from "@/components/Uploader";

const TEXT = [
  ["businessName", "Business name"], ["tagline", "Tagline"], ["phone", "Phone"], ["whatsapp", "WhatsApp number"],
  ["email", "Email"], ["address", "Address"], ["mapLink", "Google Maps link"], ["instagram", "Instagram link"],
  ["facebook", "Facebook link"], ["hours", "Working hours"],
];
const LONG = [["heroTitle", "Home page headline"], ["heroSubtitle", "Home page sub-text"], ["about", "About us"], ["announcement", "Announcement bar (leave empty to hide)"], ["seoTitle", "Search title"], ["seoDescription", "Search description"]];

export default function Settings() {
  const [f, setF] = useState(null), [msg, setMsg] = useState("");
  useEffect(() => { getDoc(doc(db, "settings", "site")).then((s) => setF(s.data() || {})); }, []);
  if (!f) return <p className="loading">Loading…</p>;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function save(e) {
    e.preventDefault(); setMsg("Saving…");
    await setDoc(doc(db, "settings", "site"), f, { merge: true });
    setMsg("Saved. The website now shows these details.");
  }
  const img = (k, label) => (
    <div className="row" key={k}>
      <Uploader label={f[k] ? `Change ${label}` : `Add ${label}`} folder="luxora/site" onDone={({ url }) => setF((p) => ({ ...p, [k]: url }))} />
      {f[k] && <img className="thumb" src={f[k]} alt={label} />}
    </div>
  );
  return (<>
    <h1>Business details</h1>
    <form className="card form" onSubmit={save}>
      <div className="grid2">{TEXT.map(([k, l]) => <label key={k}>{l}<input value={f[k] || ""} onChange={set(k)} /></label>)}</div>
      {LONG.map(([k, l]) => <label key={k}>{l}<textarea rows={k === "about" ? 5 : 2} value={f[k] || ""} onChange={set(k)} /></label>)}
      {img("logo", "logo")}
      {img("heroImage", "home page photo")}
      <div className="row"><button className="btn primary">Save changes</button><span className="muted">{msg}</span></div>
    </form>
  </>);
}
