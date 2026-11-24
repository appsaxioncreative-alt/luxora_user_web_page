import Link from "next/link";
import { getGallery, getReviews, getServices, getSettings } from "@/lib/public";
import { FALLBACK_SERVICES, img, waLink, withDefaults } from "@/lib/site";
import Review from "@/components/site/Review";
import Stars from "@/components/Stars";

export const revalidate = 60;

export default async function Home() {
  const [raw, gallery, services, reviews] = await Promise.all([getSettings(), getGallery(), getServices(), getReviews()]);
  const s = withDefaults(raw);
  const list = (services.length ? services : FALLBACK_SERVICES).slice(0, 3);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const wa = waLink(s, `Hello ${s.businessName}, I would like to book.`);

  return (<>
    <section className="s-hero">
      <div className="s-wrap s-herogrid">
        <div>
          <p className="s-tag">{s.tagline}</p>
          <h1>{s.heroTitle}</h1>
          <p className="s-lead">{s.heroSubtitle}</p>
          <div className="s-cta">
            <a className="s-btn gold" href={wa} target="_blank" rel="noreferrer">Book on WhatsApp</a>
            <Link className="s-btn ghost" href="/gallery">See our work</Link>
          </div>
        </div>
        <div className="s-arch">{s.heroImage ? <img src={img(s.heroImage, "c_fill,w_900,h_1100,q_auto,f_auto")} alt={s.businessName} /> : <span>{s.businessName[0]}</span>}</div>
      </div>
    </section>

    <section className="s-sec">
      <div className="s-wrap">
        <h2>What we do</h2>
        <div className="s-cards">{list.map((v) => (
          <article key={v.id} className="s-svc">
            {v.image && <div className="s-arch sm"><img src={img(v.image, "c_fill,w_600,h_750,q_auto,f_auto")} alt={v.title} loading="lazy" /></div>}
            <h3>{v.title}</h3><p>{v.description}</p>{v.price && <small>{v.price}</small>}
          </article>
        ))}</div>
        <p className="s-more"><Link href="/services">All services</Link></p>
      </div>
    </section>

    {gallery.length > 0 && (
      <section className="s-sec alt">
        <div className="s-wrap">
          <h2>Recent work</h2>
          <div className="s-strip">{gallery.slice(0, 6).map((g) => <img key={g.id} src={img(g.url, "c_fill,w_500,h_500,q_auto,f_auto")} alt={g.caption || g.category || ""} loading="lazy" />)}</div>
          <p className="s-more"><Link href="/gallery">Open the full gallery</Link></p>
        </div>
      </section>
    )}

    {reviews.length > 0 && (
      <section className="s-sec">
        <div className="s-wrap">
          <h2>Kind words from our clients</h2>
          <p className="s-avg"><Stars value={Math.round(avg)} /> {avg.toFixed(1)} from {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
          <div className="s-cards">{reviews.slice(0, 3).map((r) => <Review key={r.id} r={r} />)}</div>
          <p className="s-more"><Link href="/reviews">Read all reviews</Link></p>
        </div>
      </section>
    )}

    <section className="s-band">
      <div className="s-wrap">
        <h2>Planning a wedding?</h2>
        <p>Tell us your date and venue. We will reply with availability.</p>
        <a className="s-btn gold" href={wa} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
      </div>
    </section>
  </>);
}
