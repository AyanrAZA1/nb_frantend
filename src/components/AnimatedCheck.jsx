import { motion } from "framer-motion";

export default function AnimatedCheck({ size = 72, delay = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
      <motion.circle
        cx="36" cy="36" r="32" fill="none" stroke="rgb(var(--accent))" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
      />
      <motion.path
        d="M22 37.5 31.5 47 50 27" fill="none" stroke="rgb(var(--accent))" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: delay + 0.45 }}
      />
    </svg>
  );
}
