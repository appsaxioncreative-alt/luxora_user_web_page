import { getGallery } from "@/lib/public";
import Gallery from "@/components/site/Gallery";

export const revalidate = 60;
export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <section className="s-page"><div className="s-wrap">
      <h1>Gallery</h1>
      <p className="s-intro">Counters, décor and setups from our recent events.</p>
      <Gallery items={items} />
    </div></section>
  );
}
