import { useEffect, useState } from "react";

/** true when the primary pointer is a fine pointer (mouse / trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    if (!mq) return;
    setFine(mq.matches);
    const onChange = (e) => setFine(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return fine;
}

/** Sets --mx/--my CSS vars on the card for the spotlight + glow border. */
export function spotlightHandlers() {
  return {
    onPointerMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    },
  };
}
