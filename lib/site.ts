/**
 * The public address of the site, for canonical links, the sitemap and structured data.
 * Set SITE_URL in production; local development falls back to localhost.
 */
export const SITE_URL = (process.env.SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
