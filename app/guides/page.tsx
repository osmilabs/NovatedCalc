import type { Metadata } from "next";
import Link from "next/link";
import { guideHref } from "@/components/guides/GuideArticle";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Novated Lease Guides",
  description:
    "Plain-English guides to novated leasing in Australia: whether it's worth it, EV vs petrol, FBT, balloon payments and changing jobs.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="page page-narrow">
      <section className="section-hero intro">
        <h1 className="headline headline-md">Novated lease guides</h1>
        <p className="lede">
          Plain-English answers to the questions people ask before signing, checked against current tax rules.
        </p>
      </section>

      <section className="section stack-sm">
        <Link className="tile" href="/how-novated-leasing-works">
          <span className="tile-body">
            <span className="tile-title">New to novated leasing? Start here</span>
            <span className="tile-sub">What a novated lease is and how it works, in five minutes.</span>
          </span>
          <span className="tile-go" aria-hidden>
            →
          </span>
        </Link>
        {GUIDES.map((guide) => (
          <Link className="tile" href={guideHref(guide.slug)} key={guide.slug}>
            <span className="tile-body">
              <span className="tile-title">{guide.shortTitle}</span>
              <span className="tile-sub">{guide.description}</span>
            </span>
            <span className="tile-go" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
