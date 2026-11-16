import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { TESTIMONIALS } from "../data/testimonials";

const EASE = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;

  const go = useCallback((d) => setState(([i]) => [(i + d + n) % n, d]), [n]);
  const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(id);
  }, [paused, reduce, go]);

  const t = TESTIMONIALS[index];
  const offset = reduce ? 0 : 80;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle id="testimonials-title" eyebrow="Testimonials" title="Customer voices" highlight="speak volumes" />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Learner testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative mx-auto max-w-3xl rounded-3xl"
        >
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: dir * offset }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * offset }}
                transition={{ duration: 0.4, ease: EASE }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -400) go(1);
                  else if (info.offset.x > 70 || info.velocity.x > 400) go(-1);
                }}
                className="cursor-grab touch-pan-y select-none rounded-3xl border border-border bg-surface p-7 shadow-lift active:cursor-grabbing sm:p-10"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${n}`}
              >
                <Quote size={40} className="text-accent/30" aria-hidden="true" />
                <div className="mt-3 flex text-amber-400" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-lg font-semibold leading-relaxed text-text sm:text-2xl">“{t.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,#2F8FD8,#7FC4F0)] font-bold text-navy">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="flex items-center gap-2 font-semibold text-text">
                      {t.name}
                      {t.sample && <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Sample</span>}
                    </span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-text transition hover:-translate-y-0.5 hover:border-accent/60">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="relative h-2.5 w-2.5 rounded-full bg-border before:absolute before:-inset-3 before:content-['']"
                >
                  {i === index && <motion.span layoutId="testi-dot" className="absolute -inset-x-2 inset-y-0 rounded-full bg-accent" />}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-text transition hover:-translate-y-0.5 hover:border-accent/60">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
