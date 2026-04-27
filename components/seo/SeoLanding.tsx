import Link from "next/link";
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
      <section className="glass-card hero">
        <h1>{page.hero}</h1>
        <p className="muted">{page.description}</p>
        <p>{page.body}</p>
      </section>
      <section className="glass-card">
        <h2>Common questions</h2>
        {page.faq.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
        <p>
          <Link href="/novated-lease-calculator">Run calculator</Link> |{" "}
          <Link href="/novated-lease-comparison">Compare providers</Link>
        </p>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
