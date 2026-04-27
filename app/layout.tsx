import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovatedCalc - Compare Novated Lease Providers",
  description:
    "Estimate novated lease take-home impact, compare providers in Australia, and request matched quotes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <header className="glass-card">
            <strong>NovatedCalc</strong>
            <nav className="grid-two" style={{ marginTop: "0.75rem" }}>
              <Link href="/">Home</Link>
              <Link href="/novated-lease-calculator">Calculator</Link>
              <Link href="/novated-lease-comparison">Comparison</Link>
              <Link href="/providers/alpha-fleet-australia">Providers</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
