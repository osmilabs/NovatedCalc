"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState, useSyncExternalStore } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { AD_MEDIA, adsAllowedOn } from "@/lib/ads";

const DISMISS_KEY = "novatedscout:mobile-ad-dismissed";

/** False on the server and before hydration, so ads only ever mount client-side at the right size. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Skyscrapers in the empty space either side of the page, on screens wide enough to fit them. */
export function AdRails() {
  const pathname = usePathname();
  const wide = useMediaQuery(AD_MEDIA.rails);
  if (!wide || !adsAllowedOn(pathname)) return null;

  return (
    <>
      <aside className="ad-rail ad-rail-left" aria-label="Advertisement">
        <AdSlot key={pathname} placement="rail" />
      </aside>
      <aside className="ad-rail ad-rail-right" aria-label="Advertisement">
        <AdSlot key={pathname} placement="rail" />
      </aside>
    </>
  );
}

/** Leaderboard above the site footer on desktop. */
export function FooterAd() {
  const pathname = usePathname();
  const desktop = useMediaQuery(AD_MEDIA.desktop);
  if (!desktop || !adsAllowedOn(pathname)) return null;

  return (
    <aside className="ad-footer" aria-label="Advertisement">
      <span className="ad-label">Advertisement</span>
      <AdSlot key={pathname} placement="footer" />
    </aside>
  );
}

/** Banner pinned to the bottom on phones. Closing it hides it for the rest of the visit. */
export function MobileAdBanner() {
  const pathname = usePathname();
  const desktop = useMediaQuery(AD_MEDIA.desktop);
  const hydrated = useMediaQuery("all");
  const [dismissed, setDismissed] = useState(false);

  // Before paint, so a closed banner doesn't flash back on the next page load.
  useLayoutEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      // Storage blocked: the banner shows, and closing it lasts until the next page load.
    }
  }, []);

  if (!hydrated || desktop || dismissed || !adsAllowedOn(pathname)) return null;

  function close() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // See above.
    }
  }

  return (
    <>
      {/* Keeps the footer clear of the fixed banner. */}
      <div className="ad-mobile-spacer" aria-hidden />
      <aside className="ad-mobile" aria-label="Advertisement">
        <span className="ad-label">Ad</span>
        <AdSlot key={pathname} placement="mobile" />
        <button type="button" className="ad-close" aria-label="Close advertisement" onClick={close}>
          ×
        </button>
      </aside>
    </>
  );
}
