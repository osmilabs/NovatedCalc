"use client";

import { trackClientEvent } from "@/lib/tracking";

type Props = {
  href: string;
  providerSlug: string;
  className?: string;
  children: React.ReactNode;
};

export function AffiliateLink({ href, providerSlug, className, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="sponsored noopener"
      onClick={() => trackClientEvent("affiliate_outbound_click", { providerSlug })}
    >
      {children}
    </a>
  );
}
