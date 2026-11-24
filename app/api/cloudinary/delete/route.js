import { NextResponse } from "next/server";
import { sign, verifyAdmin } from "@/lib/serverAuth";

export async function POST(req) {
  const { idToken, publicId } = await req.json();
  if (!(await verifyAdmin(idToken))) return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  const timestamp = Math.floor(Date.now() / 1000);
  const fd = new FormData();
  fd.append("public_id", publicId); fd.append("timestamp", timestamp);
  fd.append("api_key", process.env.CLOUDINARY_API_KEY);
  fd.append("signature", sign({ public_id: publicId, timestamp }));
  const r = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`, { method: "POST", body: fd }).then((r) => r.json());
  return NextResponse.json(r.error ? { error: r.error.message } : { ok: true });
}
