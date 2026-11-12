"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadJourney } from "@/lib/journey";

/** Back to the visitor's results if they've done the calculator, otherwise to the comparison landing page. */
export function BackToProviders() {
  const [hasJourney, setHasJourney] = useState(false);
  useEffect(() => setHasJourney(loadJourney() !== null), []);

  return hasJourney ? (
    <Link className="back-link" href="/novated-lease-comparison/results">
      ← Back to your results
    </Link>
  ) : (
    <Link className="back-link" href="/novated-lease-comparison">
      ← Compare providers
    </Link>
  );
}
