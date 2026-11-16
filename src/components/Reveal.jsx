import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/** Scroll reveal container: fades children up once, staggered. */
export function Reveal({ as = "div", children, className = "", delay = 0, stagger = 0.08, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE, delay, staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Child of <Reveal> — inherits the stagger. */
export function RevealItem({ as = "div", children, className = "", ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}
