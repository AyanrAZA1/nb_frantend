import { BookOpen, Building2, GraduationCap, Star } from "lucide-react";
import { BRAND } from "../config";
import CountUp from "../components/CountUp";
import { Reveal, RevealItem } from "../components/Reveal";

const STATS = [
  { icon: GraduationCap, value: BRAND.stats.learners, suffix: "+", label: "Learners trained" },
  { icon: BookOpen, value: BRAND.stats.courses, suffix: "+", label: "Courses" },
  { icon: Star, value: BRAND.stats.rating, decimals: 1, suffix: "/5", label: "Google rating" },
  { icon: Building2, value: BRAND.stats.clients, suffix: "+", label: "Corporate clients" },
];

export default function Stats() {
  return (
    <section id="stats" aria-label="Key numbers" className="relative py-6 sm:py-10">
      <div className="container-x">
        <Reveal className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-surface/70 p-3 shadow-soft backdrop-blur sm:gap-4 sm:p-4 lg:grid-cols-4">
          {STATS.map(({ icon: I, ...s }) => (
            <RevealItem key={s.label} className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-surface-2 sm:gap-4 sm:p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                <I size={22} aria-hidden="true" />
              </span>
              <div>
                <div className="font-display text-2xl font-extrabold text-text sm:text-3xl">
                  <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </div>
                <div className="text-xs font-medium text-muted sm:text-sm">{s.label}</div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
