import { useCallback, useEffect, useState } from "react";

const KEY = "nb-theme";

function readStored() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

/** Theme state: light default, persisted choice, smooth 300ms swap. */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      const t = document.documentElement.getAttribute("data-theme");
      if (t === "light" || t === "dark") return t;
    }
    return readStored() ?? "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* storage unavailable — theme still switches for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
