import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

// plain, serializable data (Timestamps -> millis); never throws so the site still builds without data
const clean = (d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toMillis?.() ?? null });
const list = async (q) => { try { return (await getDocs(q)).docs.map(clean); } catch (e) { console.error(e); return []; } };

export const getSettings = async () => { try { return (await getDoc(doc(db, "settings", "site"))).data() || {}; } catch (e) { console.error(e); return {}; } };
export const getGallery = () => list(query(collection(db, "gallery"), orderBy("createdAt", "desc")));
export const getServices = () => list(query(collection(db, "services"), orderBy("createdAt", "desc")));
export const getReviews = async () => (await list(query(collection(db, "reviews"), where("approved", "==", true)))).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
// visitor review form -> hidden until approved in /admin/reviews
export const submitReview = ({ name, rating, comment }) =>
  addDoc(collection(db, "reviews"), { name, rating: Number(rating), comment, source: "Website", approved: false, createdAt: serverTimestamp() });
