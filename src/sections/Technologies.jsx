import { ArrowRight } from "lucide-react";
import Icon from "../components/Icon";
import SectionTitle from "../components/SectionTitle";
import TiltCard from "../components/TiltCard";
import { Reveal, RevealItem } from "../components/Reveal";
import { TECHNOLOGIES } from "../data/content";

export default function Technologies() {
  return (
    <section id="technologies" aria-labelledby="tech-title" className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="bg-dots mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="container-x">
        <SectionTitle
          id="tech-title"
          eyebrow="Explore"
          title="Browse courses by"
          highlight="technology"
          subtitle="Nine focused tracks — from enterprise routing to offensive security — each with labs mapped to real job tasks."
        />
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {TECHNOLOGIES.map((t) => (
            <RevealItem key={t.name}>
              <TiltCard className="group h-full rounded-2xl">
                <a
                  href="#courses"
                  className="flex h-full items-center gap-4 rounded-2xl border border-border bg-surface/80 p-5 shadow-soft transition-shadow duration-300 group-hover:shadow-lift sm:p-6"
                >
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(var(--accent)/0.18),rgb(var(--accent-2)/0.06))] text-accent">
                    <span className="absolute inset-0 rounded-2xl bg-accent/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon name={t.icon} size={26} className="relative" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-lg font-bold text-text">{t.name}</span>
                      <span className="shrink-0 whitespace-nowrap rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-muted">{t.count} courses</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted">{t.desc}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" className="shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </TiltCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
