"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, ADMINS } from "@/lib/firebase";

const NAV = [
  ["/admin", "Overview"], ["/admin/gallery", "Gallery"], ["/admin/reviews", "Reviews"],
  ["/admin/services", "Services"], ["/admin/settings", "Business details"],
];

export default function AdminLayout({ children }) {
  const path = usePathname(), router = useRouter();
  const [user, setUser] = useState(undefined);
  const isLogin = path === "/admin/login";

  useEffect(() => onAuthStateChanged(auth, (u) => {
    const ok = u && ADMINS.includes(u.email.toLowerCase());
    setUser(ok ? u : null);
    if (!ok && !isLogin) router.replace("/admin/login");
  }), [isLogin, router]);

  if (isLogin) return children;
  if (!user) return <p className="loading">Checking sign-in…</p>;

  return (
    <div className="shell">
      <aside className="side">
        <div className="brand">Luxora<small>Admin</small></div>
        <nav>{NAV.map(([href, label]) => (
          <Link key={href} href={href} className={path === href ? "active" : ""}>{label}</Link>
        ))}</nav>
        <button className="link" onClick={() => signOut(auth)}>Sign out</button>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
