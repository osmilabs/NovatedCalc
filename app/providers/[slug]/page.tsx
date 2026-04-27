import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProviderBySlug, getProviders } from "@/lib/providers";
import { trackServerEvent } from "@/lib/tracking";
import { AffiliateLink } from "@/components/providers/AffiliateLink";

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
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  trackServerEvent("provider_profile_view", { providerSlug: provider.slug });

  return (
    <>
      <section className="glass-card hero">
        <h1>{provider.name}</h1>
        <p className="muted">{provider.summary}</p>
      </section>
      <section className="glass-card">
        <h2>At a glance</h2>
        <div className="stats">
          <article className="stat">
            <strong>{provider.serviceModel}</strong>
            <span>Service model</span>
          </article>
          <article className="stat">
            <strong>${provider.setupFee}</strong>
            <span>Setup fee</span>
          </article>
          <article className="stat">
            <strong>${provider.monthlyAdminFee}</strong>
            <span>Monthly admin fee</span>
          </article>
          <article className="stat">
            <strong>{provider.responsivenessScore}/10</strong>
            <span>Quote responsiveness</span>
          </article>
        </div>
      </section>
      <section className="glass-card">
        <h2>Inclusions</h2>
        <ul>
          {provider.inclusions.map((inclusion) => (
            <li key={inclusion}>{inclusion}</li>
          ))}
        </ul>
        <p className="muted">Coverage: {provider.states.join(", ")}</p>
        {provider.affiliateLink ? (
          <p>
            <AffiliateLink href={provider.affiliateLink} providerSlug={provider.slug} />
          </p>
        ) : null}
      </section>
    </>
  );
}
