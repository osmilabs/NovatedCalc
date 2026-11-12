import Link from "next/link";
import { EstimateChip } from "@/components/ui/EstimateChip";
import type { SeoPage } from "@/lib/types";

type Props = {
  page: SeoPage;
};

export function SeoLanding({ page }: Props) {
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
      <EstimateChip />

      <div className="page page-narrow">
        <section className="section-hero intro">
          <h1 className="headline headline-md">{page.hero}</h1>
          <p className="lede">{page.description}</p>
          <p className="text-body">{page.body}</p>
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
          <div className="panel-flush button-row">
            <Link className="btn btn-primary" href="/novated-lease-calculator">
              Work out my numbers <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link className="btn btn-ghost" href="/novated-lease-comparison">
              Compare providers
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
