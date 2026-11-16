import { useEffect, useState } from "react";

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const seen = new Map();
    const observe = () => {
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
          const current = ids.find((id) => seen.get(id));
          if (current) setActive(current);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      els.forEach((el) => io.observe(el));
      return io;
    };
    // Lazy sections mount a moment later — observe again once they exist
    let io = observe();
    const t = window.setTimeout(() => {
      io.disconnect();
      io = observe();
    }, 1200);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
