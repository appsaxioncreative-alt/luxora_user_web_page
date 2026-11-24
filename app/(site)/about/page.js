import Link from "next/link";
import { getSettings } from "@/lib/public";
import { img, waLink, withDefaults } from "@/lib/site";

export const revalidate = 60;
export const metadata = { title: "About us" };

export default async function About() {
  const s = withDefaults(await getSettings());
  return (
    <section className="s-page"><div className="s-wrap s-aboutgrid">
      <div>
        <h1>About {s.businessName}</h1>
        {s.about.split("\n").filter(Boolean).map((p, i) => <p key={i} className="s-body">{p}</p>)}
        <div className="s-cta">
          <a className="s-btn" href={waLink(s, "Hello, I would like to book.")} target="_blank" rel="noreferrer">Book on WhatsApp</a>
          <Link className="s-btn ghost dark" href="/gallery">See our work</Link>
        </div>
      </div>
      {s.heroImage && <div className="s-arch"><img src={img(s.heroImage, "c_fill,w_800,h_1000,q_auto,f_auto")} alt="" /></div>}
    </div></section>
  );
}
