import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "../hooks/usePointer";

/** Soft glow that trails the mouse. Desktop only, hidden on touch & reduced motion. */
export default function CursorGlow() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!fine || reduce) return;
    const onMove = (e) => {
      mx.set(e.clientX - 200);
      my.set(e.clientY - 200);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduce, mx, my]);

  if (!fine || reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full opacity-60 mix-blend-normal"
      style={{ x, y, background: "radial-gradient(circle, rgb(var(--glow) / 0.10), transparent 65%)" }}
    />
  );
}
