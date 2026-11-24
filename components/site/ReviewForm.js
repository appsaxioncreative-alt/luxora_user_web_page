"use client";
import { useState } from "react";
import { submitReview } from "@/lib/public";
import Stars from "@/components/Stars";

export default function ReviewForm() {
  const [f, setF] = useState({ name: "", rating: 5, comment: "" }), [state, setState] = useState("idle");
  async function submit(e) {
    e.preventDefault(); setState("busy");
    try { await submitReview(f); setState("done"); setF({ name: "", rating: 5, comment: "" }); } catch { setState("error"); }
  }
  if (state === "done") return <div className="s-form"><h3>Thank you!</h3><p>Your review will appear on the site once we have approved it.</p></div>;
  return (
    <form className="s-form" onSubmit={submit}>
      <h3>Share your experience</h3>
      <label>Your name<input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
      <label>Rating<Stars value={f.rating} onChange={(n) => setF({ ...f, rating: n })} /></label>
      <label>Your review<textarea required rows={4} value={f.comment} onChange={(e) => setF({ ...f, comment: e.target.value })} /></label>
      {state === "error" && <p className="s-err">Could not send your review. Please try again.</p>}
      <button className="s-btn" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Send review"}</button>
    </form>
  );
}
