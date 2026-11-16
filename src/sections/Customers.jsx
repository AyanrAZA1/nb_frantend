import Marquee from "../components/Marquee";
import SectionTitle from "../components/SectionTitle";
import { CUSTOMERS } from "../data/partners";

export default function Customers() {
  return (
    <section id="customers" aria-labelledby="customers-title" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionTitle id="customers-title" eyebrow="Trusted by teams" title="Our valued" highlight="customers" subtitle="Enterprises and universities across the GCC and India upskill their teams with us." />
      </div>
      <Marquee items={[...CUSTOMERS, ...CUSTOMERS]} duration={38} label="Customers" />
    </section>
  );
}
