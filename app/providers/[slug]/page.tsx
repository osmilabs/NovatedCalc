import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/providers/AffiliateLink";
import { BackToProviders } from "@/components/providers/BackToProviders";
import { PreviewNotice, SampleTag } from "@/components/ui/PreviewNotice";
import { COMPARISON_LEASE_MONTHS, feesOverLease } from "@/lib/fees";
import { money } from "@/lib/format";
import { getProviderBySlug, getProviders } from "@/lib/providers";
import { trackServerEvent } from "@/lib/tracking";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const providers = await getProviders();
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: `${provider.name} Novated Lease Profile`,
    description: provider.summary,
    // Made-up providers shouldn't turn up in search results.
    ...(provider.sample ? { robots: { index: false } } : {}),
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  trackServerEvent("provider_profile_view", { providerSlug: provider.slug });

  return (
    <>
      <div className="page page-narrow">
        <section className="section-hero intro">
          <BackToProviders />
          <p className="eyebrow">
            Provider profile <span className="tag capitalize">{provider.serviceModel}</span>
          </p>
          <h1 className="headline headline-md">
            {provider.name}
            {provider.sample ? <SampleTag /> : null}
          </h1>
          <p className="lede">{provider.summary}</p>
          {provider.sample ? <PreviewNotice subject="provider details" className="mt" /> : null}
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">At a glance</h2>
          <div className="stat-grid">
            <div className="stat">
              <span className="label">Setup fee</span>
              <p className="figure figure-sm">{money(provider.setupFee)}</p>
            </div>
            <div className="stat">
              <span className="label">Monthly admin fee</span>
              <p className="figure figure-sm">{money(provider.monthlyAdminFee)}</p>
            </div>
            <div className="stat">
              <span className="label">Fees over {COMPARISON_LEASE_MONTHS / 12} years</span>
              <p className="figure figure-sm">{money(feesOverLease(provider))}</p>
            </div>
            <div className="stat">
              <span className="label">Quote responsiveness</span>
              <p className="figure figure-sm">{provider.responsivenessScore}/10</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="eyebrow section-title">What&apos;s included</h2>
          <ul className="inclusion-grid plain-list">
            {provider.inclusions.map((inclusion) => (
              <li className="inclusion" key={inclusion}>
                <span className="inclusion-tick" aria-hidden>
                  ✓
                </span>
                {inclusion}
              </li>
            ))}
          </ul>
          <p className="text-sm mt-sm">Inclusions vary between packages. Confirm them in your quote.</p>
        </section>

        <section className="section">
          <div className="panel">
            <div className="list-row">
              <span className="list-row-label">Support</span>
              <span className="list-row-value">{provider.supportChannels.join(", ")}</span>
            </div>
            <div className="list-row">
              <span className="list-row-label">States covered</span>
              <span className="list-row-value">{provider.states.join(", ")}</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="panel-flush stack-sm">
            <p className="title-sm">Know your numbers before you call</p>
            <p className="text-sm">
              The calculator shows roughly what a lease would cost you, so you can sense-check any quote.
            </p>
            <Link className="btn btn-primary" href="/novated-lease-calculator">
              Work out my numbers <span className="arrow" aria-hidden>→</span>
            </Link>
            {provider.affiliateLink && !provider.sample ? (
              <>
                <AffiliateLink className="btn btn-ghost" href={provider.affiliateLink} providerSlug={provider.slug}>
                  Visit {provider.name} <span aria-hidden>↗</span>
                </AffiliateLink>
                <p className="text-sm">This is an affiliate link. We may be paid if you sign up.</p>
              </>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}
