import Link from "next/link";
import { GuideArticle, guideHref, guideMetadata } from "@/components/guides/GuideArticle";
import { EV_BILL_STATUS } from "@/lib/guides";

const SLUG = "novated-lease-balloon-payment";

export const metadata = guideMetadata(SLUG);

const RESIDUALS = [
  { years: 1, percent: "65.63%" },
  { years: 2, percent: "56.25%" },
  { years: 3, percent: "46.88%" },
  { years: 4, percent: "37.50%" },
  { years: 5, percent: "28.13%" },
];

export default function Page() {
  return (
    <GuideArticle
      slug={SLUG}
      intro={
        <p>
          Every novated lease ends with a lump sum called the balloon or residual payment. It&apos;s often the biggest
          single number in the deal, and the one people plan for least. Here&apos;s how big it will be and what you can
          do when it&apos;s due.
        </p>
      }
      sections={[
        {
          id: "why-there-is-one",
          title: "Why there's a balloon at all",
          body: (
            <p>
              A novated lease is a lease, not a loan: the finance company owns the car until the end. Tax rules require
              that a meaningful part of the car&apos;s value is left over when the lease finishes, rather than being
              paid off in the regular payments. That leftover amount is the balloon. If a lease were paid down to zero,
              it would be treated as a purchase and lose its tax treatment.
            </p>
          ),
        },
        {
          id: "how-much",
          title: "How much it will be",
          body: (
            <>
              <p>
                The tax office sets a minimum balloon for each lease length, as a percentage of the amount financed.
                Most providers use these minimums:
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Lease length</th>
                      <th>Minimum balloon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESIDUALS.map((row) => (
                      <tr key={row.years}>
                        <td>
                          {row.years} year{row.years > 1 ? "s" : ""}
                        </td>
                        <td>{row.percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>The longer the lease, the smaller the balloon, and the bigger the regular payments that come out before tax.</p>
            </>
          ),
        },
        {
          id: "worked-example",
          title: "Worked example",
          body: (
            <>
              <div className="callout">
                <p className="label">Example</p>
                <p>
                  $50,000 financed over 4 years. The balloon is 37.50% of $50,000 ={" "}
                  <strong>$18,750</strong>, due at the end of year four. Over 5 years it would be 28.13%, or about
                  $14,065.
                </p>
              </div>
              <p>
                Many quotes show the balloon before GST, with GST added when you pay it out. Check which figure
                you&apos;re looking at, because the difference is about 10%.
              </p>
            </>
          ),
        },
        {
          id: "your-options",
          title: "Your four options when the lease ends",
          body: (
            <ol>
              <li>
                <strong>Pay it and keep the car.</strong> From savings, or with a car loan. The balloon comes from your
                after-tax money, so there&apos;s no tax saving on it.
              </li>
              <li>
                <strong>Sell the car and pay it out.</strong> If the car sells for more than the balloon, you keep the
                difference. If it sells for less, you cover the gap.
              </li>
              <li>
                <strong>Re-lease the same car.</strong> Finance the balloon with a new novated lease, so the payments
                keep coming out of your pay before tax. Under the proposed EV rules, this counts as a new commitment;
                see <Link href={guideHref("fbt-and-the-ev-exemption")}>FBT and the EV exemption</Link>.
                <span className="bill-status">{EV_BILL_STATUS}</span>
              </li>
              <li>
                <strong>Trade it in on a new lease.</strong> The trade-in value pays out the balloon, and any surplus
                can go toward the next car.
              </li>
            </ol>
          ),
        },
        {
          id: "planning-for-it",
          title: "Planning for it",
          body: (
            <ul>
              <li>Ask for the balloon in dollars, including GST, before you sign.</li>
              <li>
                Look up what similar cars of that age sell for. If the balloon is well above the likely resale value,
                you&apos;ll be paying the difference.
              </li>
              <li>
                Choosing a longer lease lowers the balloon but ties you in longer. If you might change jobs, read{" "}
                <Link href={guideHref("novated-lease-changing-jobs")}>what happens when you change jobs</Link> first.
              </li>
              <li>
                If you plan to keep the car, consider putting money aside during the lease so you&apos;re not forced to
                refinance.
              </li>
            </ul>
          ),
        },
      ]}
      takeaway={
        <p>
          Expect a balloon of about 37.5% of the amount financed on a 4-year lease, or 28% on a 5-year one. At the end
          you can pay it, sell the car, re-lease it or trade it in. Ask for the figure in dollars, including GST, before
          you sign.
        </p>
      }
      faq={[
        {
          question: "Can I choose a smaller balloon?",
          answer:
            "Not below the tax office minimum for your lease length. You can lower it by choosing a longer lease.",
        },
        {
          question: "Can I pay the balloon from my pre-tax salary?",
          answer:
            "Not directly. To keep paying for the car before tax, you'd re-lease it, which rolls the balloon into a new novated lease.",
        },
        {
          question: "What if the car is worth less than the balloon?",
          answer:
            "If you sell or trade it in, you'll need to cover the difference. If you keep it, you pay the balloon regardless of the car's value.",
        },
      ]}
      related={["is-a-novated-lease-worth-it", "novated-lease-changing-jobs", "ev-vs-petrol-novated-lease"]}
    />
  );
}
