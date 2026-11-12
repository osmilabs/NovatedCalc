import { ADSENSE_CLIENT } from "@/lib/ads";

/** Declares AdSense as an authorised seller, which AdSense needs before it serves ads at full rates. */
export function GET() {
  if (!ADSENSE_CLIENT) return new Response("Not found", { status: 404 });
  const publisherId = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
