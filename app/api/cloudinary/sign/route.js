import { NextResponse } from "next/server";
import { sign, verifyAdmin } from "@/lib/serverAuth";

export async function POST(req) {
  const { idToken, folder = "luxora" } = await req.json();
  if (!(await verifyAdmin(idToken))) return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  const timestamp = Math.floor(Date.now() / 1000);
  return NextResponse.json({
    timestamp, signature: sign({ folder, timestamp }),
    apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
