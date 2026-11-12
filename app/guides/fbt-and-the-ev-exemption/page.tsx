import Link from "next/link";
import { GuideArticle, guideHref, guideMetadata } from "@/components/guides/GuideArticle";
import { EV_BILL_STATUS } from "@/lib/guides";

const SLUG = "fbt-and-the-ev-exemption";

export const metadata = guideMetadata(SLUG);

export default function Page() {
  return (
    <GuideArticle
      slug={SLUG}
      intro={
        <p>
          Fringe benefits tax is the reason novated leases on electric cars are such a different deal from petrol ones.
          This guide covers what FBT is, which cars are exempt, how the exemption still shows up on your income
          statement, and the changes proposed from April 2027.
        </p>
      }
      sections={[
        {
          id: "what-fbt-is",
          title: "What fringe benefits tax is",
          body: (
            <>
              <p>
                FBT is a tax your employer pays on non-cash benefits they give you, such as a car you can use privately.
                It runs on its own year, from 1 April to 31 March, and it&apos;s charged at 47% of a grossed-up value of
                the benefit. Without a way around it, packaging a car would cost more than it saves.
              </p>
              <p>
                For cars, the taxable value is usually worked out with the <strong>statutory formula</strong>: 20% of
                the car&apos;s base value for each year. The base value is roughly what was paid for the car including
                GST and dealer-fitted options, but not registration or stamp duty. It drops by a third once the car has
                been held for four years.
              </p>
            </>
          ),
        },
        {
          id: "how-petrol-cars-avoid-it",
          title: "How petrol car leases avoid it",
          body: (
            <p>
              Petrol, diesel and conventional hybrid leases use the <strong>employee contribution method</strong>. You
              pay part of the car costs from after-tax pay, equal to the taxable value (20% of the base value a year).
              That reduces the taxable value to nil, so your employer owes no FBT, and the rest of the costs come out
              before tax. The catch is that the after-tax part gets no income tax saving. See the{" "}
              <Link href={guideHref("ev-vs-petrol-novated-lease")}>EV vs petrol worked example</Link>.
            </p>
          ),
        },
        {
          id: "which-cars-are-exempt",
          title: "Which electric cars are exempt",
          body: (
            <>
              <p>Since 1 July 2022, a car provided to an employee is exempt from FBT if all of these are true:</p>
              <ul className="pro-list is-yes">
                <li>It&apos;s a battery electric or hydrogen fuel cell car.</li>
                <li>It was first held and used on or after 1 July 2022.</li>
                <li>
                  When it was first sold, its value was under the luxury car tax threshold for fuel-efficient cars
                  ($91,661 in 2026–27).
                </li>
              </ul>
              <p>
                Plug-in hybrids were also exempt until 1 April 2025. A plug-in hybrid lease committed to before then
                keeps the exemption; new ones don&apos;t qualify.
              </p>
              <p>
                Used electric cars can qualify too. What matters is the price when the car was first sold new, not
                what you pay for it now.
              </p>
            </>
          ),
        },
        {
          id: "reportable-fringe-benefits",
          title: "Reportable fringe benefits: the part people miss",
          body: (
            <>
              <p>
                An exempt electric car still appears on your income statement as a <strong>reportable fringe benefit
                amount</strong>. It&apos;s worked out as if the car weren&apos;t exempt, then grossed up:
              </p>
              <div className="callout">
                <p className="label">Example</p>
                <p>
                  A $50,000 base value × 20% = $10,000 taxable value. Grossed up by 1.8868, that&apos;s a reportable
                  amount of about <strong>$18,868</strong> a year, less anything you contribute after tax.
                </p>
              </div>
              <p>
                You don&apos;t pay income tax on it, but it&apos;s added to your income for these tests:
              </p>
              <ul>
                <li>HELP and other study loan repayments</li>
                <li>Medicare levy surcharge</li>
                <li>Division 293 tax on super contributions (incomes over $250,000)</li>
                <li>Child care subsidy and family tax benefit</li>
                <li>Government super co-contributions</li>
              </ul>
              <p>
                If one of these applies to you, it can claw back part of the saving. Some providers suggest a small
                after-tax contribution to lower the reportable amount.
              </p>
            </>
          ),
        },
        {
          id: "proposed-changes",
          title: "Proposed changes from 1 April 2027",
          body: (
            <>
              <p>
                After a review of the electric car discount, the Government introduced changes in the Treasury Laws
                Amendment (Tax Reform No. 4) Bill 2026. The rules depend on when the lease is committed to:
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Lease committed to</th>
                      <th>Base value $75,000 or less</th>
                      <th>Above $75,000, up to the threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 July 2022 – 31 March 2027</td>
                      <td>Fully exempt until the lease ends</td>
                      <td>Fully exempt until the lease ends</td>
                    </tr>
                    <tr>
                      <td>1 April 2027 – 31 March 2029</td>
                      <td>Fully exempt</td>
                      <td>25% discount</td>
                    </tr>
                    <tr>
                      <td>From 1 April 2029</td>
                      <td>25% discount</td>
                      <td>25% discount</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                A 25% discount means the taxable value is worked out at 15% of the base value instead of 20%, so a
                petrol-style after-tax contribution would come back for those cars.
              </p>
              <p>
                Under the bill, these count as a <strong>new commitment</strong>, which resets which rules apply:
                refinancing, changing the lease term or balloon, adding accessories that raise the payments, renewing
                the lease on the same car, and changing employers (even within the same group).
              </p>
              <div className="callout">
                <p className="label">Status</p>
                <p>
                  {EV_BILL_STATUS} Until it does, the current exemption applies in full. We&apos;ll update this guide
                  when that changes.
                </p>
              </div>
            </>
          ),
        },
        {
          id: "what-it-means-for-you",
          title: "What it means if you're leasing an EV",
          body: (
            <ul>
              <li>
                <strong>Already have an EV lease?</strong> Under the bill it keeps the full exemption until it ends.
                Think carefully before refinancing, extending or changing employers, since those would count as a new
                commitment. See{" "}
                <Link href={guideHref("novated-lease-changing-jobs")}>changing jobs with a novated lease</Link>.
              </li>
              <li>
                <strong>Looking at an EV over $75,000?</strong> Base value includes dealer-fitted options, so check the
                figure on the quote, not just the advertised price.
              </li>
              <li>
                <strong>Under $75,000?</strong> The full exemption would still apply to new leases until 31 March
                2029.
              </li>
            </ul>
          ),
        },
      ]}
      takeaway={
        <p>
          Eligible electric cars are exempt from FBT, so the whole lease can be paid before tax, but the benefit still
          counts in income tests like HELP repayments. Proposed rules would cap the full exemption at a $75,000 base
          value from 1 April 2027; leases committed to before then keep it until they end.
        </p>
      }
      faq={[
        {
          question: "Is the EV FBT exemption ending?",
          answer:
            `Not yet. A bill before Parliament would limit the full exemption to cars with a base value of $75,000 or less from 1 April 2027 and replace it with a 25% discount for all new leases from 1 April 2029. ${EV_BILL_STATUS}`,
        },
        {
          question: "Will my existing EV lease lose the exemption?",
          answer:
            `Under the bill, no. Leases committed to before 1 April 2027 keep the full exemption until they end. Refinancing, extending the lease or changing employers would count as a new commitment, though. ${EV_BILL_STATUS}`,
        },
        {
          question: "Do I pay tax on the reportable fringe benefit?",
          answer:
            "No income tax, but the amount is added to your income for tests such as HELP repayments, the Medicare levy surcharge and family payments.",
        },
        {
          question: "What is the base value of a car?",
          answer:
            "Roughly the price paid including GST and dealer-fitted options, excluding registration and stamp duty. It's the figure FBT and the proposed $75,000 test are based on.",
        },
      ]}
      related={["ev-vs-petrol-novated-lease", "is-a-novated-lease-worth-it", "novated-lease-changing-jobs"]}
    />
  );
}
