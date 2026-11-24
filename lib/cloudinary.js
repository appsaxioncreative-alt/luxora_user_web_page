import { auth } from "./firebase";

const post = (url, body) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((r) => r.json());

// signed direct upload: server signs, browser uploads to Cloudinary
export async function uploadImage(file, folder = "luxora") {
  const idToken = await auth.currentUser.getIdToken();
  const s = await post("/api/cloudinary/sign", { idToken, folder });
  if (s.error) throw new Error(s.error);
  const fd = new FormData();
  fd.append("file", file); fd.append("api_key", s.apiKey); fd.append("timestamp", s.timestamp);
  fd.append("signature", s.signature); fd.append("folder", folder);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`, { method: "POST", body: fd }).then((r) => r.json());
  if (r.error) throw new Error(r.error.message);
  return { url: r.secure_url, publicId: r.public_id };
}

export async function deleteImage(publicId) {
  if (!publicId) return;
  const idToken = await auth.currentUser.getIdToken();
  const r = await post("/api/cloudinary/delete", { idToken, publicId });
  if (r.error) throw new Error(r.error);
}
