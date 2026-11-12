"use client";

import { useEffect, useRef } from "react";
import { AD_SIZES, AD_SLOTS, ADSENSE_CLIENT, type AdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** One AdSense unit at a fixed size, or a labelled placeholder in development. Mount it only when visible. */
export function AdSlot({ placement }: { placement: AdPlacement }) {
  const { width, height } = AD_SIZES[placement];
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // Blocked or not loaded: the reserved space just stays empty.
    }
  }, []);

  if (!ADSENSE_CLIENT) {
    return (
      <div className="ad-placeholder" style={{ width, height }}>
        Ad · {width}×{height}
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width, height }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={AD_SLOTS[placement]}
    />
  );
}
