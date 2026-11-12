"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/how-novated-leasing-works", label: "How it works" },
  { href: "/novated-lease-calculator", label: "Calculator" },
  { href: "/novated-lease-comparison", label: "Compare providers" },
  { href: "/guides", label: "Guides" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const links = NAV.map((item) => (
    <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
      {item.label}
    </Link>
  ));

  return (
    <header className="site-header">
      <div className="page site-header-inner">
        <Link href="/" className="brand">
          <span className="brand-dot" aria-hidden />
          <span>
            <b>novated</b>
            <span className="brand-suffix">.calc</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {links}
        </nav>
        {/* Keyed on the path so the mobile menu closes after navigating. */}
        <details className="menu" key={pathname}>
          <summary className="icon-btn" aria-label="Menu">
            ≡
          </summary>
          <nav className="menu-panel" aria-label="Main">
            {links}
          </nav>
        </details>
      </div>
    </header>
  );
}
