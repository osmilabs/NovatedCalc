import Link from "next/link";
import { GuideArticle, guideHref, guideMetadata } from "@/components/guides/GuideArticle";
import { EV_BILL_STATUS } from "@/lib/guides";

const SLUG = "novated-lease-changing-jobs";

export const metadata = guideMetadata(SLUG);

export default function Page() {
  return (
    <GuideArticle
      slug={SLUG}
      intro={
        <p>
          A novated lease is in your name, not your employer&apos;s. Your employer only handles the deductions from your
          pay. So when you leave a job, whether you resign, are made redundant or are let go, the lease doesn&apos;t
          end. What changes is how it gets paid.
        </p>
      }
      sections={[
        {
          id: "what-happens",
          title: "What happens on your last day",
          body: (
            <p>
              Your employer stops making the pre-tax deductions, and the agreement that made them responsible for the
              payments ends. From then on, the lease falls back to you until you either move it to a new employer or pay
              it out. Payments are still due in the meantime.
            </p>
          ),
        },
        {
          id: "your-options",
          title: "Your options",
          body: (
            <ol>
              <li>
                <strong>Move it to your new employer.</strong> If they offer salary packaging, the provider sets up a
                new agreement with them and the pre-tax deductions start again. There&apos;s often a fee, and some
                employers only work with certain providers.
              </li>
              <li>
                <strong>Keep paying it yourself.</strong> You pay the finance company directly from after-tax income.
                The lease continues, but you lose the income tax and GST savings, and running costs are no longer
                packaged.
              </li>
              <li>
                <strong>Pay it out.</strong> Ask for a payout figure: the remaining amount owed plus the balloon, and
                possibly an early termination fee. Once paid, the car is yours.
              </li>
              <li>
                <strong>Sell the car and pay it out.</strong> If the sale covers the payout figure, you walk away clean,
                and keep any surplus. If not, you pay the difference.
              </li>
            </ol>
          ),
        },
        {
          id: "which-to-choose",
          title: "Which option makes sense",
          body: (
            <ul>
              <li>
                <strong>New job lined up that offers packaging:</strong> moving the lease is usually cheapest. Ask the
                new employer before you accept the offer.
              </li>
              <li>
                <strong>A gap between jobs:</strong> keep paying it yourself for a few weeks, then move it once you
                start.
              </li>
              <li>
                <strong>New employer doesn&apos;t offer packaging:</strong> compare paying it yourself against a payout
                funded by a car loan. A cheaper loan rate can beat continuing the lease after tax.
              </li>
              <li>
                <strong>You no longer need the car:</strong> selling it and paying out the lease stops the payments
                completely.
              </li>
            </ul>
          ),
        },
        {
          id: "electric-cars",
          title: "If you're leasing an electric car",
          body: (
            <>
              <p>
                Under the bill now before Parliament, changing employers counts as a new commitment for the EV
                exemption, even within the same corporate group. A lease that&apos;s fully exempt today could be
                reassessed under the new rules when it moves, which matters most for cars with a base value over
                $75,000. If the bill passes, check this before you move your lease. More in{" "}
                <Link href={guideHref("fbt-and-the-ev-exemption")}>FBT and the EV exemption</Link>.
              </p>
              <p className="bill-status">{EV_BILL_STATUS}</p>
            </>
          ),
        },
        {
          id: "checklist",
          title: "Before your last day",
          body: (
            <ul className="pro-list is-yes">
              <li>Tell your lease provider your finish date.</li>
              <li>Ask for a payout figure and any early termination fees, in writing.</li>
              <li>Ask whether your new employer offers salary packaging, and through which providers.</li>
              <li>Agree who pays, and how, for any weeks between jobs.</li>
              <li>Ask what happens to any unspent money in your running-cost budget.</li>
              <li>Make sure your car insurance stays active if it was paid through the lease.</li>
              <li>Check your final payslip for lease deductions.</li>
            </ul>
          ),
        },
      ]}
      takeaway={
        <p>
          Leaving your job doesn&apos;t end a novated lease; it moves the payments back to you. Moving it to a new
          employer that offers packaging is usually cheapest. Otherwise, compare paying it yourself against paying it
          out, and sort out insurance before your last day.
        </p>
      }
      faq={[
        {
          question: "Do I have to pay out my novated lease if I quit?",
          answer:
            "No. You can keep paying it yourself after tax, move it to a new employer that offers salary packaging, or pay it out. Paying it out is a choice, not a requirement.",
        },
        {
          question: "What happens to a novated lease if I'm made redundant?",
          answer:
            "The same as resigning: the employer stops the deductions and the lease falls back to you. Contact your provider straight away so payments don't fall behind.",
        },
        {
          question: "Can my new employer take over the lease?",
          answer:
            "If they offer salary packaging, yes. The provider sets up a new agreement with them. Some employers only use particular providers, so ask early.",
        },
      ]}
      related={["is-a-novated-lease-worth-it", "novated-lease-balloon-payment", "fbt-and-the-ev-exemption"]}
    />
  );
}
