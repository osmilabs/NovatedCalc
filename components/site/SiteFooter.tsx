import Link from "next/link";
import { ASSUMPTIONS_REVIEWED } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page stack">
        <nav className="footer-links" aria-label="Footer">
          <Link href="/novated-lease-calculator">Calculator</Link>
          <Link href="/how-novated-leasing-works">How novated leasing works</Link>
          <Link href="/novated-lease-comparison">Compare providers</Link>
          <Link href="/ev-novated-lease-comparison">EV novated leases</Link>
          <Link href="/novated-lease-without-phone-number">No phone number needed</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <p className="text-sm">
          Estimates only, not financial advice. We don&apos;t sell or arrange leases. We only collect your details if you
          ask a provider for a quote, and then send them to that provider alone. Figures last reviewed{" "}
          {ASSUMPTIONS_REVIEWED}.
        </p>
      </div>
    </footer>
  );
}
