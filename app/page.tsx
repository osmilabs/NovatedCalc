import Link from "next/link";
import { getProviders } from "@/lib/providers";

export default async function HomePage() {
  const providers = await getProviders();

  return (
    <>
      <section className="glass-card hero">
        <h1>Australian novated lease comparison without fake live rates</h1>
        <p className="muted">
          See estimate-based lease impact first, compare providers by real service factors, then choose if you want outreach.
        </p>
        <div className="grid-two">
          <Link className="btn-primary" href="/novated-lease-calculator">
            Start calculator
          </Link>
          <Link className="btn-primary" href="/novated-lease-comparison">
            Compare providers
          </Link>
        </div>
      </section>

      <section className="glass-card">
        <h2>Why this is different</h2>
        <ul>
          <li>Manual provider profiles instead of pretending to have live lease rates.</li>
          <li>Estimate-first UX so users get value before lead capture.</li>
          <li>Optional phone field for users who want low-contact research.</li>
        </ul>
      </section>

      <section className="glass-card">
        <h2>Featured providers</h2>
        <div className="stats">
          {providers.slice(0, 4).map((provider) => (
            <article key={provider.id} className="stat">
              <strong>{provider.name}</strong>
              <p>{provider.summary}</p>
              <Link href={`/providers/${provider.slug}`}>View profile</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
