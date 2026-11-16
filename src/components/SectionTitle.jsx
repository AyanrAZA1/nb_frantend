import { Reveal, RevealItem } from "./Reveal";

export default function SectionTitle({ eyebrow, title, highlight, subtitle, align = "center", id }) {
  const center = align === "center";
  return (
    <Reveal className={`mb-10 sm:mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <RevealItem>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
        </RevealItem>
      )}
      <RevealItem as="h2" id={id} className="mt-4 text-3xl font-extrabold leading-tight text-text sm:text-4xl lg:text-[2.75rem]">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </RevealItem>
      {subtitle && (
        <RevealItem as="p" className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </RevealItem>
      )}
    </Reveal>
  );
}
