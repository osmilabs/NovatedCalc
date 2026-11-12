import Link from "next/link";
import { guideHref } from "@/components/guides/GuideArticle";
import { GUIDES } from "@/lib/guides";
import type { SeoPage } from "@/lib/types";

/** Guides to suggest on each landing page; any other page gets the first three. */
const RELATED_GUIDES: Record<string, string[]> = {
  "ev-novated-lease-comparison": ["ev-vs-petrol-novated-lease", "fbt-and-the-ev-exemption", "is-a-novated-lease-worth-it"],
  "best-novated-lease-provider-australia": ["is-a-novated-lease-worth-it", "novated-lease-balloon-payment", "novated-lease-changing-jobs"],
};

type Props = {
  page: SeoPage;
};

export function SeoLanding({ page }: Props) {
  const relatedSlugs = RELATED_GUIDES[page.slug];
  const related = relatedSlugs ? GUIDES.filter((guide) => relatedSlugs.includes(guide.slug)) : GUIDES.slice(0, 3);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>

      <div className="page page-narrow">
        <section className="section-hero intro">
          <h1 className="headline headline-md">{page.hero}</h1>
          <p className="lede">{page.description}</p>
          {page.body.split(/\n\s*\n/).map((paragraph) => (
            <p className="text-body" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>

        {page.faq.length > 0 ? (
          <section className="section">
            <h2 className="eyebrow section-title">Common questions</h2>
            <div className="panel">
              {page.faq.map((item) => (
                <div className="term" key={item.question}>
                  <h3 className="term-word">{item.question}</h3>
                  <p className="term-def">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section">
          <h2 className="eyebrow section-title">Related guides</h2>
          <div className="stack-sm">
            {related.map((guide) => (
              <Link className="tile" href={guideHref(guide.slug)} key={guide.slug}>
                <span className="tile-body">
                  <span className="tile-title">{guide.shortTitle}</span>
                </span>
                <span className="tile-go" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="panel-flush button-row">
            <Link className="btn btn-primary" href="/novated-lease-calculator">
              Compare providers for your car <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link className="btn btn-ghost" href="/how-novated-leasing-works">
              How novated leasing works
            </Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
