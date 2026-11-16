import { BRAND } from "../config";
import Icon from "../components/Icon";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealItem } from "../components/Reveal";
import { BENEFITS } from "../data/content";

export default function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-20 sm:py-28">
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="container-x">
        <SectionTitle id="why-title" eyebrow="Why us" title="Why" highlight={`${BRAND.name}?`} subtitle="Ten reasons thousands of engineers and enterprises choose us to build their skills." />
        <Reveal className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {BENEFITS.map((b) => (
            <RevealItem key={b.title} className={b.span ?? ""}>
              <Card className={`group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 ${b.feature ? "justify-between overflow-hidden bg-[linear-gradient(160deg,rgb(var(--surface)),rgb(var(--surface-2)))]" : ""}`}>
                <span className={`grid place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${b.feature ? "h-14 w-14" : "h-11 w-11"}`}>
                  <Icon name={b.icon} size={b.feature ? 28 : 21} />
                </span>
                <div className={b.feature ? "mt-8" : "mt-5"}>
                  <h3 className={`font-display font-bold text-text ${b.feature ? "text-2xl sm:text-3xl" : "text-lg"}`}>{b.title}</h3>
                  <p className={`mt-1.5 leading-relaxed text-muted ${b.feature ? "text-base" : "text-sm"}`}>{b.desc}</p>
                </div>
                {b.feature && (
                  <div aria-hidden="true" className="mt-6 rounded-xl border border-border bg-[rgb(var(--terminal))] p-4 font-mono text-[11.5px] leading-6 text-white/80">
                    <div><span className="text-brand-cyan">R1#</span> configure terminal</div>
                    <div><span className="text-brand-cyan">R1(config)#</span> router ospf 1</div>
                    <div><span className="text-brand-cyan">R1(config-router)#</span> network 10.0.0.0 0.0.0.255 area 0</div>
                    <div className="text-emerald-300">%OSPF-5-ADJCHG: Nbr 2.2.2.2 FULL</div>
                  </div>
                )}
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
