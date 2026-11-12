import Link from "next/link";
import { GuideArticle, guideHref, guideMetadata } from "@/components/guides/GuideArticle";

const SLUG = "is-a-novated-lease-worth-it";

export const metadata = guideMetadata(SLUG);

export default function Page() {
  return (
    <GuideArticle
      slug={SLUG}
      intro={
        <p>
          A novated lease can save you thousands of dollars, or cost you more than a plain car loan. Which one comes down
          to three things: your tax rate, the car you pick, and what the provider charges. This guide walks through each,
          so you can tell which side of the line you&apos;re on before anyone sends you a quote.
        </p>
      }
      sections={[
        {
          id: "where-the-saving-comes-from",
          title: "Where the saving comes from",
          body: (
            <>
              <p>There are only three real sources of saving. Everything else in a quote is a cost.</p>
              <ol>
                <li>
                  <strong>Income tax.</strong> Payments come out of your salary before tax, so you&apos;re taxed on a
                  smaller amount.
                </li>
                <li>
                  <strong>GST.</strong> Your employer claims back the GST on the car&apos;s price (up to $6,353 for cars
                  first leased in 2026–27) and on running costs like servicing, tyres and fuel or charging.
                </li>
                <li>
                  <strong>The electric car exemption.</strong> Eligible electric cars don&apos;t attract fringe benefits
                  tax, so the whole lease can come out before tax. For petrol and diesel cars, part of it has to be paid
                  from your after-tax pay. See{" "}
                  <Link href={guideHref("ev-vs-petrol-novated-lease")}>EV vs petrol novated leases</Link>.
                </li>
              </ol>
            </>
          ),
        },
        {
          id: "what-pre-tax-is-worth",
          title: "What paying before tax is worth to you",
          body: (
            <>
              <p>
                The higher your marginal tax rate, the more each pre-tax dollar is worth. Here&apos;s what $1,000 of car
                costs actually takes out of your take-home pay in 2026–27, including the 2% Medicare levy:
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Taxable income</th>
                      <th>Marginal rate</th>
                      <th>$1,000 paid pre-tax costs you</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>$18,201 – $45,000</td>
                      <td>17%</td>
                      <td>$830</td>
                    </tr>
                    <tr>
                      <td>$45,001 – $135,000</td>
                      <td>32%</td>
                      <td>$680</td>
                    </tr>
                    <tr>
                      <td>$135,001 – $190,000</td>
                      <td>39%</td>
                      <td>$610</td>
                    </tr>
                    <tr>
                      <td>Over $190,000</td>
                      <td>47%</td>
                      <td>$530</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Add the GST your employer claims back and the same costs come down roughly another 9%. That&apos;s why
                the same car can look like a great deal for someone on $200,000 and a marginal one for someone on
                $50,000.
              </p>
            </>
          ),
        },
        {
          id: "compare-against-the-right-thing",
          title: "Compare it against the right thing",
          body: (
            <>
              <p>
                The most common mistake is comparing a novated lease against doing nothing. Of course a new car costs
                more than keeping your old one. The fair question is:{" "}
                <strong>if I&apos;m getting this car anyway, is a novated lease cheaper than a car loan or cash?</strong>
              </p>
              <p>
                That&apos;s the comparison our calculator makes. It puts the novated lease next to a car loan for the
                same car, over the same term, with the same running costs, so the only differences are tax, GST,
                interest and fees.
              </p>
              <div className="callout">
                <p className="label">Worth checking</p>
                <p>
                  If a provider&apos;s quote says you&apos;ll &ldquo;save $X&rdquo;, ask what it&apos;s compared
                  against. A saving measured against paying all running costs after tax, with no GST credit, will
                  always look bigger than one measured against a sensible car loan.
                </p>
              </div>
            </>
          ),
        },
        {
          id: "costs-that-eat-into-it",
          title: "The costs that eat into the saving",
          body: (
            <ul>
              <li>
                <strong>Interest.</strong> Novated lease rates are often higher than a secured car loan, and many quotes
                don&apos;t show the rate at all. Ask for it in writing.
              </li>
              <li>
                <strong>Fees.</strong> Setup and monthly admin fees differ a lot between providers. Over a 4-year lease
                the gap can run to hundreds of dollars. <Link href="/novated-lease-comparison">Compare them here</Link>.
              </li>
              <li>
                <strong>Padded running-cost budgets.</strong> Insurance, tyres and servicing bought through the provider
                may cost more than you&apos;d pay yourself. You can usually adjust or remove items.
              </li>
              <li>
                <strong>The balloon payment.</strong> A lump sum is due at the end of the lease. Read{" "}
                <Link href={guideHref("novated-lease-balloon-payment")}>how balloon payments work</Link>.
              </li>
              <li>
                <strong>Super.</strong> Some employers work out your super on your salary after the lease comes out.
                Ask your payroll team how they handle it.
              </li>
              <li>
                <strong>Income tests.</strong> An electric car on a novated lease usually shows up as a reportable
                fringe benefit, which can affect HELP repayments, the Medicare levy surcharge and family payments. See{" "}
                <Link href={guideHref("fbt-and-the-ev-exemption")}>FBT and the EV exemption</Link>.
              </li>
            </ul>
          ),
        },
        {
          id: "when-it-tends-to-work",
          title: "When it tends to be worth it",
          body: (
            <ul className="pro-list is-yes">
              <li>You&apos;re on the 32% marginal rate or higher (taxable income above $45,000).</li>
              <li>You&apos;re choosing an electric car under the exemption limit.</li>
              <li>You were going to buy a new or near-new car anyway.</li>
              <li>Your job is stable and you expect to stay for most of the lease.</li>
              <li>You drive enough that running costs are a big part of your budget.</li>
            </ul>
          ),
        },
        {
          id: "when-to-slow-down",
          title: "When to slow down",
          body: (
            <ul className="pro-list is-no">
              <li>You might change jobs soon, or your employer may not keep offering salary packaging.</li>
              <li>You&apos;re on a lower income, where the tax saving is small.</li>
              <li>You barely drive, so there are few running costs to package.</li>
              <li>You&apos;re stretching to a more expensive car because the lease makes it feel cheaper.</li>
              <li>The quote doesn&apos;t show the interest rate, or the fees are well above other providers.</li>
              <li>You&apos;re planning a home loan soon. Lenders count the lease as a commitment.</li>
            </ul>
          ),
        },
      ]}
      takeaway={
        <p>
          A novated lease is worth it when you&apos;re on a decent tax rate, buying a car you&apos;d buy anyway, and the
          provider&apos;s rate and fees are competitive. Compare it against a car loan for the same car, not against
          keeping your old one.
        </p>
      }
      faq={[
        {
          question: "How much can a novated lease save me?",
          answer:
            "It depends on your tax rate, the car and the provider's rate and fees. On the 32% marginal rate, every $1,000 of car costs paid before tax costs about $680 of take-home pay, before counting GST savings. Electric cars under the exemption limit save the most.",
        },
        {
          question: "Is a novated lease better than a car loan?",
          answer:
            "Often, for electric cars and for people on higher tax rates. For a petrol car on a lower income, a competitive car loan can come out ahead once interest and fees are counted. Compare both for the same car and term.",
        },
        {
          question: "Can I get a novated lease on a used car?",
          answer:
            "Usually yes, though providers often set an age limit. A used electric car only gets the FBT exemption if it was first sold after 1 July 2022 and was under the luxury car tax threshold when first sold.",
        },
        {
          question: "Does a novated lease affect my borrowing power?",
          answer:
            "Yes. Lenders treat the lease payments as a commitment, and your taxable income on payslips will be lower. If you're planning a home loan, speak to your broker first.",
        },
      ]}
      related={["ev-vs-petrol-novated-lease", "novated-lease-balloon-payment", "novated-lease-changing-jobs"]}
    />
  );
}
