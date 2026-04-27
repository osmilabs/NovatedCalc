type EventPayload = Record<string, string | number | boolean>;

export function trackClientEvent(eventName: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("analytics:event", { detail: { eventName, payload } }));
}

export function trackServerEvent(eventName: string, payload: EventPayload = {}) {
  console.info("[analytics]", eventName, payload);
}
