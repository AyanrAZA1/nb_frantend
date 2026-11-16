import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { BRAND } from "../config";
import Logo from "../components/Logo";
import Icon from "../components/Icon";
import { SocialBrandIcon } from "../components/SocialIcons";
import { Reveal, RevealItem } from "../components/Reveal";

const RESOURCES = [
  ["Events", "#newsletter"],
  ["Instructors", "#instructors"],
  ["Roadmap", "#roles"],
  ["All Courses", "#courses"],
  ["Our Blogs", "#newsletter"],
];
const USEFUL = [
  ["About Us", "#why"],
  ["Corporate Training", "#formats"],
  ["Hire Our Trainer", "#demo"],
  ["Get in Touch", "#demo"],
  ["Privacy Policy", "#footer"],
  ["Refund Policy", "#footer"],
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | error | done
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    toast.success("You're subscribed!", { description: "Fresh labs, cert tips and cohort dates — twice a month." });
  };
  return (
    <section id="newsletter" aria-labelledby="nl-title" className="relative py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0B1B2E,#0F3358_60%,#1A6CB2)] px-6 py-10 text-white shadow-lift sm:px-12 sm:py-14">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40 [--grid:127_196_240] [--grid-alpha:0.12]" />
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-cyan/30 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <RevealItem as="p" className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">The Binary Brief</RevealItem>
              <RevealItem as="h2" id="nl-title" className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Security insights & cohort alerts, straight to your inbox
              </RevealItem>
              <RevealItem as="p" className="mt-3 text-white/70">Join 12,000+ IT professionals. No spam — unsubscribe anytime.</RevealItem>
            </div>
            <RevealItem>
              <AnimatePresence mode="wait">
                {state === "done" ? (
                  <motion.p key="ok" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 font-semibold">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400 text-navy"><Check size={18} aria-hidden="true" /></span>
                    Thanks! Check your inbox to confirm.
                  </motion.p>
                ) : (
                  <motion.form key="f" noValidate onSubmit={submit} exit={{ opacity: 0, y: -8 }} className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="nl-email" className="sr-only">Email address</label>
                    <input
                      id="nl-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="you@company.com"
                      aria-invalid={state === "error"}
                      aria-describedby={state === "error" ? "nl-err" : undefined}
                      className={`h-12 w-full rounded-xl border bg-white/10 sm:flex-1 px-4 text-white placeholder:text-white/50 outline-none backdrop-blur transition focus:border-brand-cyan focus:bg-white/15 ${state === "error" ? "border-red-400" : "border-white/20"}`}
                    />
                    <button type="submit" className="btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-navy transition hover:-translate-y-0.5">
                      Subscribe <Send size={16} aria-hidden="true" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {state === "error" && <p id="nl-err" role="alert" className="mt-2 text-sm text-red-300">Please enter a valid email address.</p>}
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
      <Newsletter />
      <footer id="footer" className="relative mt-4 border-t border-transparent bg-surface/60">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,#2F8FD8,#7FC4F0,transparent)]" />
        <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              At {BRAND.name}, we have a team of top-notch, industry-experienced and certified instructors who are passionate about
              sharing their knowledge. We take a facilitative role rather than just being instructors.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {BRAND.socials.map((s) => {
                const name = s.name.toLowerCase();
                const hoverStyle = name.includes("youtube")
                  ? "hover:border-[#FF0000] hover:text-[#FF0000] dark:hover:text-[#FF4D4D] hover:shadow-[0_4px_16px_rgba(255,0,0,0.25)]"
                  : name.includes("instagram")
                  ? "hover:border-[#E4405F] hover:text-[#E4405F] dark:hover:text-[#FF5876] hover:shadow-[0_4px_16px_rgba(228,64,95,0.25)]"
                  : name.includes("linkedin")
                  ? "hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:text-[#388DFF] hover:shadow-[0_4px_16px_rgba(10,102,194,0.25)]"
                  : name.includes("facebook")
                  ? "hover:border-[#1877F2] hover:text-[#1877F2] dark:hover:text-[#4B9CFF] hover:shadow-[0_4px_16px_rgba(24,119,242,0.25)]"
                  : "hover:border-text hover:text-text hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]";

                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className={`grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-muted transition-all duration-200 hover:-translate-y-1 ${hoverStyle}`}
                  >
                    <SocialBrandIcon name={s.name} size={18} />
                  </a>
                );
              })}
            </div>
          </div>
          <nav aria-label="Resources">
            <h3 className="font-display text-base font-bold text-text">Resources</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {RESOURCES.map(([l, h]) => (
                <li key={l}><a href={h} className="link-underline text-muted hover:text-text">{l}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Useful links">
            <h3 className="font-display text-base font-bold text-text">Useful links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {USEFUL.map(([l, h]) => (
                <li key={l}><a href={h} className="link-underline text-muted hover:text-text">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="font-display text-base font-bold text-text">Contact info</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a href={`tel:${BRAND.phoneHref}`} className="inline-flex items-center gap-2.5 hover:text-text">
                  <Phone size={16} className="text-accent" aria-hidden="true" /> {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2.5 hover:text-text">
                  <Mail size={16} className="text-accent" aria-hidden="true" /> {BRAND.email}
                </a>
              </li>
              {BRAND.addresses.map((a) => (
                <li key={a.city} className="flex gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span><strong className="font-semibold text-text">{a.city}:</strong> {a.line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <a href="#home" className="inline-flex items-center gap-2 font-semibold text-text hover:text-accent">
              Back to top
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-border transition group-hover:-translate-y-0.5"><ArrowUp size={15} aria-hidden="true" /></span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

/** Floating WhatsApp + back-to-top buttons */
export function FloatingActions({ show }) {
  return (
    <div className="fixed bottom-5 right-5 z-[55] flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            whileHover={{ y: -3 }}
            className="glass grid h-11 w-11 place-items-center rounded-full text-text shadow-lift"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </motion.a>
        )}
      </AnimatePresence>
      <motion.a
        href={BRAND.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgb(37_211_102/0.6)]"
      >
        <MessageCircle size={26} aria-hidden="true" />
      </motion.a>
    </div>
  );
}
