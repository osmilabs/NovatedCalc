import type { Metadata } from "next";
import { PRIVACY } from "@/lib/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal information novated.calc collects, why, who it's shared with, and your choices.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS = [
  { id: "summary", title: "In short" },
  { id: "collect", title: "What we collect" },
  { id: "use", title: "How we use it" },
  { id: "share", title: "Who we share it with" },
  { id: "storage", title: "Cookies and browser storage" },
  { id: "security", title: "Storage, security and overseas disclosure" },
  { id: "retention", title: "How long we keep it" },
  { id: "rights", title: "Accessing, correcting or deleting your information" },
  { id: "complaints", title: "Complaints" },
  { id: "changes", title: "Changes to this policy" },
];

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default function PrivacyPage() {
  const email = PRIVACY.contactEmail;
  const contact = email.startsWith("[") ? email : <a href={`mailto:${email}`}>{email}</a>;

  return (
    <div className="page page-narrow">
      <article>
        <header className="intro guide-head">
          <h1 className="headline headline-lg">Privacy policy</h1>
          <p className="lede">
            What personal information novated.calc collects, why we collect it, and who it goes to.
          </p>
          <p className="text-sm">Last updated {formatDate(PRIVACY.lastUpdated)}</p>
        </header>

        <div className="prose mt-lg">
          <p>
            novated.calc is operated by {PRIVACY.operator}
            {PRIVACY.abn ? ` (${PRIVACY.abn})` : ""} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We handle personal
            information in line with the Australian Privacy Principles in the <i>Privacy Act 1988</i> (Cth).
          </p>
        </div>

        <nav className="panel-flush guide-toc mt-lg" aria-label="On this page">
          <p className="label">On this page</p>
          <ol>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="prose guide-section" id="summary">
          <h2>In short</h2>
          <ul>
            <li>You can use the calculator and compare providers without telling us who you are.</li>
            <li>Your calculator answers, including your salary, stay in your browser unless you request a quote.</li>
            <li>
              We only collect your contact details if you ask a provider for a quote, and we send them to that one
              provider only.
            </li>
            <li>We don&apos;t sell your information, and we don&apos;t use advertising or tracking cookies.</li>
          </ul>
        </section>

        <section className="prose guide-section" id="collect">
          <h2>What we collect</h2>
          <p>
            <strong>When you use the calculator or comparison.</strong> The car, price, salary, lease term and
            distance you enter are kept in your browser&apos;s session storage so the comparison can use them. They
            aren&apos;t sent to us, and they&apos;re cleared when you close the tab.
          </p>
          <p>
            <strong>When you request a quote.</strong> If you choose to ask a provider for a quote, we collect:
          </p>
          <ul>
            <li>your name, email address, phone number, postcode and state</li>
            <li>the car you chose and your calculator answers, including your salary, plus our cost estimate</li>
            <li>
              a record of your consent: the wording you agreed to, when you agreed, and the page you were on
            </li>
            <li>your IP address and browser details, to help us prevent spam and misuse</li>
          </ul>
          <p>
            <strong>Usage statistics.</strong> We use Umami, a privacy-focused analytics tool that we host ourselves,
            to count page visits and actions such as opening a quote form. It doesn&apos;t use cookies and doesn&apos;t
            identify you. Our hosting providers may also keep standard server logs, such as IP addresses and request
            times, for security and troubleshooting.
          </p>
          <p>
            We don&apos;t ask for sensitive information, such as health information, and we ask that you don&apos;t
            include it.
          </p>
        </section>

        <section className="prose guide-section" id="use">
          <h2>How we use it</h2>
          <ul>
            <li>to send your quote request to the provider you chose</li>
            <li>to keep evidence of your consent, so we can show you or the provider exactly what you agreed to</li>
            <li>to prevent spam, fraud and misuse of the site</li>
            <li>to understand, in aggregate, how the site is used and improve it</li>
            <li>to meet our legal obligations</li>
          </ul>
          <p>We don&apos;t use your details for marketing, and we don&apos;t pass them to anyone else to market to you.</p>
        </section>

        <section className="prose guide-section" id="share">
          <h2>Who we share it with</h2>
          <p>
            <strong>The provider you choose.</strong> Your quote request goes to that provider only, never to other
            providers. From then on, the provider handles your details under its own privacy policy, and you should
            contact it directly about anything it holds. We may be paid a referral fee if you go ahead with a lease.
            That fee never affects the order of results.
          </p>
          <p>
            <strong>Service providers.</strong> Businesses that host the site and store our data, under obligations
            to keep it secure and use it only to provide their services to us.
          </p>
          <p>
            <strong>When required by law.</strong> For example, to respond to a valid request from a court or
            regulator.
          </p>
          <p>We don&apos;t sell or rent personal information.</p>
        </section>

        <section className="prose guide-section" id="storage">
          <h2>Cookies and browser storage</h2>
          <p>
            We don&apos;t set advertising or tracking cookies. The site uses your browser&apos;s session storage to
            remember your calculator answers and similar preferences during your visit. This stays on your device and
            is cleared when you close the tab.
          </p>
        </section>

        <section className="prose guide-section" id="security">
          <h2>Storage, security and overseas disclosure</h2>
          <p>
            Quote requests are stored in a database hosted {PRIVACY.hostingLocation}. Access is limited to people who
            need it to run the service. When we send a request to a provider electronically, it goes over an encrypted
            connection and is signed so the provider can check it came from us.
          </p>
          <p>
            We take reasonable steps to protect personal information from misuse, loss and unauthorised access. No
            system is completely secure, so we can&apos;t guarantee it.
          </p>
        </section>

        <section className="prose guide-section" id="retention">
          <h2>How long we keep it</h2>
          <p>
            We keep quote requests for {PRIVACY.leadRetention}, so we can answer questions about them and show
            evidence of consent, then delete them. We may keep information longer if the law requires it.
          </p>
        </section>

        <section className="prose guide-section" id="rights">
          <h2>Accessing, correcting or deleting your information</h2>
          <p>
            You can ask for a copy of the personal information we hold about you, ask us to correct it, or ask us to
            delete it. Email {contact}. We&apos;ll respond within 30 days. We may need to confirm your identity first.
          </p>
          <p>
            Deleting your details from our records doesn&apos;t remove them from a provider you&apos;ve already
            contacted. Ask that provider directly.
          </p>
        </section>

        <section className="prose guide-section" id="complaints">
          <h2>Complaints</h2>
          <p>
            If you&apos;re concerned about how we&apos;ve handled your personal information, email {contact}.
            We&apos;ll look into it and reply within 30 days.
          </p>
          <p>
            If you&apos;re not satisfied with our response, you can complain to the Office of the Australian
            Information Commissioner at <a href="https://www.oaic.gov.au">oaic.gov.au</a> or on 1300 363 992.
          </p>
        </section>

        <section className="prose guide-section" id="changes">
          <h2>Changes to this policy</h2>
          <p>
            We&apos;ll update this policy if what we collect or how we use it changes, and show the new date at the
            top.
          </p>
        </section>
      </article>
    </div>
  );
}
