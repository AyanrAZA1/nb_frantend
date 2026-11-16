import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "../hooks/usePointer";

const VARIANTS = {
  primary:
    "text-[rgb(var(--btn-text))] bg-[linear-gradient(135deg,rgb(var(--btn-from)),rgb(var(--btn-to)))] shadow-glow hover:shadow-[0_0_0_1px_rgb(var(--accent)/0.4),0_18px_50px_-12px_rgb(var(--glow)/0.7)]",
  outline: "text-text border border-border bg-surface/60 backdrop-blur hover:border-accent/60 hover:bg-surface",
  ghost: "text-text hover:bg-surface-2",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem] sm:h-14 sm:px-7 sm:text-base",
};

/**
 * Button with lift + shine sweep on hover, ripple on click and an optional magnetic pull.
 * Renders an <a> when `href` is passed.
 */
export default function Button({
  children, href, variant = "primary", size = "md", magnetic = false, className = "", onClick, ...rest
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 250, damping: 18, mass: 0.4 });
  const isMagnetic = magnetic && fine && !reduce;

  const onMove = (e) => {
    if (!isMagnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };
  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const id = Date.now() + Math.random();
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2, size }]);
    window.setTimeout(() => setRipples((rs) => rs.filter((rp) => rp.id !== id)), 650);
    onClick?.(e);
  };

  const Tag = href ? "a" : "button";
  const cls = `btn-shine group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={isMagnetic ? { x, y } : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <Tag href={href} className={cls} onClick={handleClick} {...(Tag === "button" && !rest.type ? { type: "button" } : {})} {...rest}>
        <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          {ripples.map((rp) => (
            <span
              key={rp.id}
              className="absolute animate-ripple rounded-full bg-white/50"
              style={{ left: rp.x, top: rp.y, width: rp.size, height: rp.size }}
            />
          ))}
        </span>
      </Tag>
    </motion.span>
  );
}
