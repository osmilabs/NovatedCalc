import Link from "next/link";
import { GuideArticle, guideHref, guideMetadata } from "@/components/guides/GuideArticle";
import { EV_BILL_STATUS } from "@/lib/guides";

const SLUG = "ev-vs-petrol-novated-lease";

export const metadata = guideMetadata(SLUG);

export default function Page() {
  return (
    <GuideArticle
      slug={SLUG}
      intro={
        <p>
          It&apos;s easy to assume a novated lease works the same whatever car you pick. It doesn&apos;t. Because
          eligible electric cars are exempt from fringe benefits tax (FBT), an EV lease and a petrol lease are taxed in
          completely different ways, and for the same price the EV usually leaves you thousands of dollars a year better
          off.
        </p>
      }
      sections={[
        {
          id: "the-difference-in-one-table",
          title: "The difference in one table",
          body: (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th />
                    <th>Eligible electric car</th>
                    <th>Petrol, diesel or hybrid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fringe benefits tax</td>
                    <td>Exempt</td>
                    <td>Applies</td>
                  </tr>
                  <tr>
                    <td>Paid from pre-tax pay</td>
                    <td>All of the lease and running costs</td>
                    <td>Only part; the rest comes from after-tax pay</td>
                  </tr>
                  <tr>
                    <td>GST savings</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>On your income statement</td>
                    <td>Yes, as a reportable fringe benefit</td>
                    <td>Usually not</td>
                  </tr>
                  <tr>
                    <td>Price limit</td>
                    <td>Under $91,661 when first sold (2026–27)</td>
                    <td>None for the lease itself</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
        {
          id: "how-petrol-leases-work",
          title: "How a petrol car lease works",
          body: (
            <>
              <p>
                When your employer provides a car you can use privately, they owe fringe benefits tax on it. For cars,
                the taxable value is usually worked out as <strong>20% of the car&apos;s base value each year</strong>,
                and the FBT on that is high enough to wipe out the benefit of packaging.
              </p>
              <p>
                To avoid that, almost every petrol novated lease uses the <strong>employee contribution method</strong>.
                You pay part of the car costs from your after-tax pay, equal to that 20% of the base value. Your
                contribution cancels out the taxable value, so there&apos;s no FBT. Only what&apos;s left over comes out
                of your pre-tax pay.
              </p>
            </>
          ),
        },
        {
          id: "how-ev-leases-work",
          title: "How an electric car lease works",
          body: (
            <>
              <p>
                Eligible electric cars are exempt from FBT, so there&apos;s no taxable value to cancel out. The whole
                cost of the lease and running costs can come out of your pay before tax.
              </p>
              <p>
                To qualify, the car must be a battery electric or hydrogen fuel cell car, first held and used on or
                after 1 July 2022, and priced under the luxury car tax threshold for fuel-efficient cars when it was
                first sold ($91,661 in 2026–27). Plug-in hybrids only qualify if the lease was committed to before 1
                April 2025. Full details are in{" "}
                <Link href={guideHref("fbt-and-the-ev-exemption")}>FBT and the EV exemption, explained</Link>.
              </p>
            </>
          ),
        },
        {
          id: "worked-example",
          title: "Worked example: same price, different result",
          body: (
            <>
              <p>
                Two cars with the same $50,000 base value, each costing $16,000 a year in lease payments and running
                costs. The driver is on the 32% marginal rate (including Medicare). Simplified, ignoring GST.
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th />
                      <th>Electric</th>
                      <th>Petrol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Paid after tax (20% of $50,000)</td>
                      <td>$0</td>
                      <td>$10,000</td>
                    </tr>
                    <tr>
                      <td>Paid before tax</td>
                      <td>$16,000</td>
                      <td>$6,000</td>
                    </tr>
                    <tr>
                      <td>Cost of pre-tax part to your take-home pay</td>
                      <td>$10,880</td>
                      <td>$4,080</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total cost to your take-home pay, per year</strong>
                      </td>
                      <td>
                        <strong>$10,880</strong>
                      </td>
                      <td>
                        <strong>$14,080</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                The electric car leaves this driver <strong>$3,200 a year better off</strong>, or $12,800 over a 4-year
                lease, before counting its usually lower charging and servicing costs. On a higher tax rate the gap
                grows.
              </p>
            </>
          ),
        },
        {
          id: "the-trade-off",
          title: "The trade-off: reportable fringe benefits",
          body: (
            <p>
              An exempt electric car still shows on your income statement as a reportable fringe benefit. It doesn&apos;t
              change your income tax, but it&apos;s counted in income tests for HELP repayments, the Medicare levy
              surcharge, Division 293 tax and some family payments. If any of those apply to you, factor it in. Some
              providers reduce it by having you make a small after-tax contribution.
            </p>
          ),
        },
        {
          id: "when-petrol-still-makes-sense",
          title: "When a petrol lease still makes sense",
          body: (
            <>
              <ul>
                <li>You need a vehicle with no practical electric option, such as a ute for towing or remote work.</li>
                <li>You&apos;re on a high tax rate, so even the smaller pre-tax portion is worth packaging.</li>
                <li>You drive a lot, so the GST saving on fuel and servicing adds up.</li>
              </ul>
              <p>
                Just compare it against a car loan rather than against an EV lease. Petrol leases save less, so a
                competitive loan is more likely to win.
              </p>
            </>
          ),
        },
        {
          id: "changes-coming",
          title: "Changes proposed from April 2027",
          body: (
            <>
              <p>
                A bill before Parliament would limit the full exemption to electric cars with a base value of $75,000
                or less for leases committed to from 1 April 2027, with a smaller 25% discount above that, and a 25%
                discount for all new leases from 1 April 2029. Leases committed to before 1 April 2027 would keep the
                full exemption until they end.
              </p>
              <p className="bill-status">{EV_BILL_STATUS}</p>
            </>
          ),
        },
      ]}
      takeaway={
        <p>
          An eligible electric car can be packaged entirely before tax; a petrol car can&apos;t. For the same price, that
          typically makes the EV lease worth thousands of dollars a year more. For a petrol car, check a novated lease
          against a car loan before you commit.
        </p>
      }
      faq={[
        {
          question: "Are hybrids FBT exempt on a novated lease?",
          answer:
            "Conventional hybrids aren't. Plug-in hybrids were exempt until 1 April 2025, and only leases committed to before then keep the exemption.",
        },
        {
          question: "Is a petrol novated lease still worth it?",
          answer:
            "It can be, especially on a high tax rate or with high running costs, but the saving is much smaller than for an electric car. Compare it with a car loan for the same car.",
        },
        {
          question: "Can I lease a used electric car and get the exemption?",
          answer:
            "Yes, if it was first held and used on or after 1 July 2022 and was under the luxury car tax threshold for fuel-efficient cars when it was first sold.",
        },
      ]}
      related={["fbt-and-the-ev-exemption", "is-a-novated-lease-worth-it", "novated-lease-balloon-payment"]}
    />
  );
}
