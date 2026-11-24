import { getServices } from "@/lib/public";
import { FALLBACK_SERVICES, img } from "@/lib/site";

export const revalidate = 60;
export const metadata = { title: "Services" };

export default async function Services() {
  const items = await getServices();
  const list = items.length ? items : FALLBACK_SERVICES;
  return (
    <section className="s-page"><div className="s-wrap">
      <h1>Our services</h1>
      <p className="s-intro">Everything for your wedding counters and décor, from the first plan to the final setup.</p>
      <div className="s-cards">{list.map((v) => (
        <article key={v.id} className="s-svc">
          {v.image && <div className="s-arch sm"><img src={img(v.image, "c_fill,w_600,h_750,q_auto,f_auto")} alt={v.title} loading="lazy" /></div>}
          <h3>{v.title}</h3><p>{v.description}</p>{v.price && <small>{v.price}</small>}
        </article>
      ))}</div>
    </div></section>
  );
}
