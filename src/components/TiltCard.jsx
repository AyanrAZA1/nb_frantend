import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer, spotlightHandlers } from "../hooks/usePointer";

/** 3D tilt on hover + spotlight glow border that follows the cursor. */
export default function TiltCard({ children, className = "", max = 10, ...rest }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const enabled = fine && !reduce;
  const spot = spotlightHandlers();

  const onPointerMove = (e) => {
    spot.onPointerMove(e);
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={`spotlight ${className}`}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
