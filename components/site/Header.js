"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [["/", "Home"], ["/services", "Services"], ["/gallery", "Gallery"], ["/reviews", "Reviews"], ["/about", "About"], ["/contact", "Contact"]];

export default function Header({ name, logo, wa }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="s-head">
      <div className="s-wrap s-headin">
        <Link href="/" className="s-logo" onClick={() => setOpen(false)}>
          {logo && <img src={logo} alt="" />}<span>{name}</span>
        </Link>
        <button className="s-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        <nav className={open ? "open" : ""}>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={path === href ? "on" : ""} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <a className="s-btn gold" href={wa} target="_blank" rel="noreferrer">Book on WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
