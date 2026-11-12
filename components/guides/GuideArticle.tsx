import type { Metadata, Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatGuideDate, getGuide, GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export type GuideSection = { id: string; title: string; body: ReactNode };
export type GuideFaq = { question: string; answer: string };

type Props = {
  slug: string;
  /** Opening paragraph(s), shown above the contents list. */
  intro: ReactNode;
  sections: GuideSection[];
  takeaway: ReactNode;
  faq: GuideFaq[];
  /** Slugs of guides to suggest at the end. */
  related: string[];
};

export function guideMetadata(slug: string): Metadata {
  const guide = getGuide(slug);
  return { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${slug}` } };
}

export function guideHref(slug: string) {
  return `/guides/${slug}` as Route;
}

export function GuideArticle({ slug, intro, sections, takeaway, faq, related }: Props) {
  const guide = getGuide(slug);
  const relatedGuides = GUIDES.filter((item) => related.includes(item.slug));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      dateModified: guide.updated,
      inLanguage: "en-AU",
      mainEntityOfPage: absoluteUrl(`/guides/${slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
        { "@type": "ListItem", position: 3, name: guide.shortTitle, item: absoluteUrl(`/guides/${slug}`) },
      ],
    },
    ...(faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="page page-narrow">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden>›</span>
        <Link href="/guides">Guides</Link>
      </nav>

      <article>
        <header className="intro guide-head">
          <h1 className="headline headline-lg">{guide.title}</h1>
          <p className="lede">{guide.description}</p>
          <p className="text-sm">
            Updated {formatGuideDate(guide.updated)} · {guide.readMinutes} min read
          </p>
        </header>

        <div className="prose mt-lg">{intro}</div>

        <nav className="panel-flush guide-toc mt-lg" aria-label="On this page">
          <p className="label">On this page</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
            {faq.length > 0 ? (
              <li>
                <a href="#faq">Common questions</a>
              </li>
            ) : null}
          </ol>
        </nav>

        {sections.map((section) => (
          <section className="prose guide-section" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            {section.body}
          </section>
        ))}

        <aside className="panel mint-panel guide-takeaway" aria-label="Key takeaway">
          <p className="label">Key takeaway</p>
          <div className="prose mt-xs">{takeaway}</div>
        </aside>

        <section className="panel-flush mt-lg">
          <p className="title-sm">See what it would cost you</p>
          <p className="text-sm mt-xs">
            Pick a car and set your salary to see your monthly cost and how it compares with a car loan. No sign-up.
          </p>
          <div className="button-row mt">
            <Link className="btn btn-primary" href="/novated-lease-calculator">
              Open the calculator <span className="arrow" aria-hidden>→</span>
            </Link>
            <Link className="btn btn-ghost" href="/novated-lease-comparison">
              Compare providers
            </Link>
          </div>
        </section>

        {faq.length > 0 ? (
          <section className="guide-section" id="faq">
            <h2 className="headline headline-sm">Common questions</h2>
            <div className="panel mt">
              {faq.map((item) => (
                <div className="term" key={item.question}>
                  <h3 className="term-word">{item.question}</h3>
                  <p className="term-def">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <p className="text-sm guide-disclaimer">
          General information only, not financial or tax advice. Tax rules and thresholds change; check the figures with
          your provider, employer or a tax adviser before you sign.
        </p>
      </article>

      {relatedGuides.length > 0 ? (
        <section className="section">
          <h2 className="eyebrow section-title">Keep reading</h2>
          <div className="stack-sm">
            {relatedGuides.map((item) => (
              <Link className="tile" href={guideHref(item.slug)} key={item.slug}>
                <span className="tile-body">
                  <span className="tile-title">{item.shortTitle}</span>
                  <span className="tile-sub">{item.description}</span>
                </span>
                <span className="tile-go" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
