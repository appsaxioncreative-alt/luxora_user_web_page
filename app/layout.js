import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--sans" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--serif" });

export const metadata = { title: "Luxora Makers" };

export default function RootLayout({ children }) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
