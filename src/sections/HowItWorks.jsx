import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Icon from "../components/Icon";
import SectionTitle from "../components/SectionTitle";
import { STEPS } from "../data/content";

export default function HowItWorks() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how" aria-labelledby="how-title" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          id="how-title"
          eyebrow="How it works"
          title="From first class to"
          highlight="certified pro"
          subtitle="A clear, guided journey — no guesswork, no dead ends."
        />

        <div ref={ref} className="relative">
          {/* Progress line draws itself with scroll (scaleX / scaleY — transform only) */}
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[3px] rounded-full bg-border lg:block">
            <motion.div
              className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#2F8FD8,#7FC4F0)] shadow-[0_0_12px_rgb(47_143_216/0.6)]"
              style={{ scaleX: reduce ? 1 : progress }}
            />
          </div>
          <div aria-hidden="true" className="absolute bottom-8 left-[31px] top-8 w-[3px] rounded-full bg-border lg:hidden">
            <motion.div
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,#2F8FD8,#7FC4F0)]"
              style={{ scaleY: reduce ? 1 : progress }}
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <motion.span
                  initial={{ scale: reduce ? 1 : 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.18 }}
                  className="relative z-[1] grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-border bg-surface text-accent shadow-glow"
                >
                  <Icon name={s.icon} size={26} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,#2F8FD8,#7FC4F0)] text-[11px] font-bold text-navy">
                    {i + 1}
                  </span>
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.18 }}
                  className="pt-1 lg:pt-0"
                >
                  <h3 className="font-display text-lg font-bold text-text lg:mt-5">{s.title}</h3>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{s.desc}</p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
