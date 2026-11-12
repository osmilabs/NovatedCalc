"use client";

import { useEffect, useRef, useState } from "react";

/** Eases the displayed number towards `target` whenever it changes. */
export function useCountUp(target: number, ms = 700) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);

  useEffect(() => {
    const from = shown.current;
    if (from === target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shown.current = target;
      setValue(target);
      return;
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / ms);
      shown.current = from + (target - from) * (1 - (1 - progress) ** 3);
      setValue(shown.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);

  return value;
}
