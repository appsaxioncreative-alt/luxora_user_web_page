import Link from "next/link";
import "./site.css";
import Header from "@/components/site/Header";
import { getSettings } from "@/lib/public";
import { img, waLink, withDefaults } from "@/lib/site";

export const revalidate = 60; // pages refresh within a minute of an admin change

export async function generateMetadata() {
  const s = withDefaults(await getSettings());
  return { title: s.seoTitle || `${s.businessName} | ${s.tagline}`, description: s.seoDescription || s.heroSubtitle };
}

export default async function SiteLayout({ children }) {
  const s = withDefaults(await getSettings());
  const wa = waLink(s, `Hello ${s.businessName}, I would like to know more.`);
  return (<>
    {s.announcement && <div className="s-announce">{s.announcement}</div>}
    <Header name={s.businessName} logo={img(s.logo, "c_limit,h_100,q_auto,f_auto")} wa={wa} />
    <main>{children}</main>
    <footer className="s-foot">
      <div className="s-wrap s-footgrid">
        <div><div className="s-flogo">{s.businessName}</div><p>{s.tagline}</p></div>
        <div>
          <b>Explore</b>
          {[["/services", "Services"], ["/gallery", "Gallery"], ["/reviews", "Reviews"], ["/about", "About"], ["/contact", "Contact"]].map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}
        </div>
        <div>
          <b>Contact</b>
          {s.phone && <a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>}
          {s.email && <a href={`mailto:${s.email}`}>{s.email}</a>}
          {s.instagram && <a href={s.instagram} target="_blank" rel="noreferrer">Instagram</a>}
          {s.facebook && <a href={s.facebook} target="_blank" rel="noreferrer">Facebook</a>}
        </div>
      </div>
      <div className="s-wrap s-copy">© {new Date().getFullYear()} {s.businessName}</div>
    </footer>
    <a className="s-wafloat" href={wa} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>
  </>);
}
