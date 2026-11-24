"use client";
import Link from "next/link";
import { useCollection } from "@/lib/hooks";
import Stars from "@/components/Stars";

export default function Overview() {
  const gallery = useCollection("gallery"), reviews = useCollection("reviews"), services = useCollection("services");
  const approved = (reviews || []).filter((r) => r.approved);
  const pending = (reviews || []).filter((r) => !r.approved).length;
  const avg = approved.length ? approved.reduce((a, r) => a + r.rating, 0) / approved.length : 0;
  const stat = (n, l, href) => <Link href={href} className="card stat"><b>{n ?? "…"}</b><span>{l}</span></Link>;
  return (<>
    <h1>Overview</h1>
    <div className="grid4">
      {stat(gallery?.length, "Gallery photos", "/admin/gallery")}
      {stat(services?.length, "Services", "/admin/services")}
      {stat(pending, "Reviews waiting for approval", "/admin/reviews")}
      <div className="card stat"><b>{avg ? avg.toFixed(1) : "–"}</b><Stars value={Math.round(avg)} /><span>Average rating ({approved.length})</span></div>
    </div>
    <p className="muted">Update phone numbers, address and the home page text under <Link href="/admin/settings">Business details</Link>.</p>
  </>);
}
