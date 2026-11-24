import crypto from "crypto";

// checks the Firebase ID token and that the email is on the admin list
export async function verifyAdmin(idToken) {
  if (!idToken) return false;
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }),
  });
  if (!r.ok) return false;
  const u = (await r.json()).users?.[0];
  const admins = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase());
  return !!u?.email && admins.includes(u.email.toLowerCase());
}

export const sign = (params) =>
  crypto.createHash("sha1").update(Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&") + process.env.CLOUDINARY_API_SECRET).digest("hex");
