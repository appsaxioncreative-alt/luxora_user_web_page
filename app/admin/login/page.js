"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, ADMINS } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState(""), [password, setPassword] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!ADMINS.includes(user.email.toLowerCase())) { await signOut(auth); throw new Error("This account is not an admin."); }
      router.replace("/admin");
    } catch (e) { setErr(e.message.includes("auth/") ? "Email or password is wrong." : e.message); }
    setBusy(false);
  }
  return (
    <div className="login">
      <form onSubmit={submit} className="card">
        <h1>Luxora admin</h1>
        <p className="muted">Sign in to manage the website.</p>
        <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {err && <p className="err">{err}</p>}
        <button className="btn primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
}
