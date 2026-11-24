import { getSettings } from "@/lib/public";
import { waLink, withDefaults } from "@/lib/site";
import EnquiryForm from "@/components/site/EnquiryForm";

export const revalidate = 60;
export const metadata = { title: "Contact" };

export default async function Contact() {
  const s = withDefaults(await getSettings());
  const row = (label, node) => node && <div className="s-row"><span>{label}</span><div>{node}</div></div>;
  return (
    <section className="s-page"><div className="s-wrap">
      <h1>Contact us</h1>
      <p className="s-intro">The quickest way to reach us is WhatsApp.</p>
      <div className="s-contactgrid">
        <div className="s-info">
          {row("Phone", s.phone && <a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>)}
          {row("WhatsApp", <a href={waLink(s)} target="_blank" rel="noreferrer">Chat now</a>)}
          {row("Email", s.email && <a href={`mailto:${s.email}`}>{s.email}</a>)}
          {row("Address", s.address && <>{s.address}{s.mapLink && <> <a href={s.mapLink} target="_blank" rel="noreferrer">Open in Maps</a></>}</>)}
          {row("Hours", s.hours)}
          {row("Instagram", s.instagram && <a href={s.instagram} target="_blank" rel="noreferrer">@luxora.makers</a>)}
        </div>
        <EnquiryForm settings={s} />
      </div>
    </div></section>
  );
}
