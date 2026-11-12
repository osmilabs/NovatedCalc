type EventPayload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    /** Set by the Umami script when analytics is configured; missing when it isn't, or is blocked. */
    umami?: { track: (eventName: string, data?: EventPayload) => void };
  }
}

export function trackClientEvent(eventName: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.umami?.track(eventName, payload);
  window.dispatchEvent(new CustomEvent("analytics:event", { detail: { eventName, payload } }));
}

/** Logs only. Lead counts come from the PocketBase `leads` collection, which ad blockers can't skew. */
export function trackServerEvent(eventName: string, payload: EventPayload = {}) {
  console.info("[analytics]", eventName, payload);
}
