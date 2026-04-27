"use client";

import { trackClientEvent } from "@/lib/tracking";

type Props = {
  href: string;
  providerSlug: string;
};

export function AffiliateLink({ href, providerSlug }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      onClick={() => trackClientEvent("affiliate_outbound_click", { providerSlug })}
    >
      Visit provider
    </a>
  );
}
