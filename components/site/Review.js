import Stars from "@/components/Stars";
export default function Review({ r }) {
  return (
    <blockquote className="s-review">
      <Stars value={r.rating} />
      <p>{r.comment}</p>
      <footer><b>{r.name}</b>{r.source && r.source !== "Website" ? ` · via ${r.source}` : ""}</footer>
    </blockquote>
  );
}
