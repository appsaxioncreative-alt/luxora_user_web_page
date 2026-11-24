import { getReviews } from "@/lib/public";
import Review from "@/components/site/Review";
import ReviewForm from "@/components/site/ReviewForm";
import Stars from "@/components/Stars";

export const revalidate = 60;
export const metadata = { title: "Reviews" };

export default async function Reviews() {
  const reviews = await getReviews();
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  return (
    <section className="s-page"><div className="s-wrap">
      <h1>Client reviews</h1>
      {reviews.length > 0 && <p className="s-avg"><Stars value={Math.round(avg)} /> {avg.toFixed(1)} from {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>}
      <div className="s-cards">{reviews.map((r) => <Review key={r.id} r={r} />)}</div>
      {!reviews.length && <p className="s-empty">No reviews yet. Be the first to share yours.</p>}
      <div className="s-narrow"><ReviewForm /></div>
    </div></section>
  );
}
