import { useReducedMotion } from "framer-motion";
import Marquee from "../components/Marquee";
import { Reveal, RevealItem } from "../components/Reveal";
import { PARTNERS, PARTNERS_ROW_2 } from "../data/partners";

export default function Partners() {
  const reduce = useReducedMotion();
  return (
    <section id="partners" aria-labelledby="partners-title" className="py-14 sm:py-20">
      <Reveal className="container-x mb-8 text-center">
        <RevealItem as="p" className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Global authorized training partners
        </RevealItem>
        <RevealItem as="h2" id="partners-title" className="mt-3 text-2xl font-extrabold text-text sm:text-3xl">
          Learn the platforms the world runs on
        </RevealItem>
      </Reveal>
      <div className="space-y-4">
        <Marquee items={PARTNERS} duration={reduce ? 0 : 45} label="Training partners" />
        <Marquee items={PARTNERS_ROW_2} reverse duration={reduce ? 0 : 50} label="Technology vendors" />
      </div>
    </section>
  );
}
