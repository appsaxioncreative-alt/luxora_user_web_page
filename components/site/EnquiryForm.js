"use client";
import { useState } from "react";
import { waLink } from "@/lib/site";

// opens WhatsApp with the details filled in, so enquiries reach the owner's phone directly
export default function EnquiryForm({ settings }) {
  const [f, setF] = useState({ name: "", date: "", venue: "", message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  function send(e) {
    e.preventDefault();
    const text = `Hello ${settings.businessName}, I am ${f.name}.\nEvent date: ${f.date || "not decided"}\nVenue: ${f.venue || "not decided"}\n${f.message}`;
    window.open(waLink(settings, text), "_blank");
  }
  return (
    <form className="s-form" onSubmit={send}>
      <h3>Check your date</h3>
      <label>Your name<input required value={f.name} onChange={set("name")} /></label>
      <div className="s-two">
        <label>Event date<input type="date" value={f.date} onChange={set("date")} /></label>
        <label>Venue<input value={f.venue} onChange={set("venue")} placeholder="Hall or town" /></label>
      </div>
      <label>What do you need?<textarea rows={4} value={f.message} onChange={set("message")} placeholder="Buffet counters, stage décor, hire items…" /></label>
      <button className="s-btn">Send on WhatsApp</button>
    </form>
  );
}
