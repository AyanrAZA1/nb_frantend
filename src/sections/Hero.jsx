import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Play, Star } from "lucide-react";
import { BRAND } from "../config";
import Button from "../components/Button";
import { useTypewriter } from "../hooks/useTypewriter";
import { useFinePointer } from "../hooks/usePointer";

const EASE = [0.22, 1, 0.36, 1];
const KEYWORDS = ["Cybersecurity", "Cloud", "Ethical Hacking", "Networking"];

const LINES = [
  { t: "cmd", text: 'nb enroll --track "Cybersecurity Analyst"' },
  { t: "ok", text: "Lab environment provisioned · Cisco CML + Kali" },
  { t: "cmd", text: "nmap -sV 10.10.20.0/24" },
  { t: "out", text: "3 hosts up · 22/ssh  443/https  3389/rdp" },
  { t: "cmd", text: "show ip ospf neighbor" },
  { t: "out", text: "10.0.0.2  FULL/DR  Gi0/1  · 10.0.0.3  FULL/BDR" },
  { t: "ok", text: "Module 4 of 6 complete — keep going!" },
];

/** Types terminal lines one by one, then loops. */
function useTerminal(reduce) {
  const [lineIdx, setLineIdx] = useState(reduce ? LINES.length : 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (lineIdx >= LINES.length) {
      const id = window.setTimeout(() => {
        setLineIdx(0);
        setChars(0);
      }, 3200);
      return () => window.clearTimeout(id);
    }
    const line = LINES[lineIdx];
    if (line.t !== "cmd") {
      const id = window.setTimeout(() => {
        setLineIdx((i) => i + 1);
        setChars(0);
      }, 420);
      return () => window.clearTimeout(id);
    }
    if (chars < line.text.length) {
      const id = window.setTimeout(() => setChars((c) => c + 1), 34);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setLineIdx((i) => i + 1);
      setChars(0);
    }, 380);
    return () => window.clearTimeout(id);
  }, [lineIdx, chars, reduce]);

  return { lineIdx, chars };
}

function Terminal({ reduce }) {
  const { lineIdx, chars } = useTerminal(reduce);
  const visible = LINES.slice(0, Math.min(lineIdx + 1, LINES.length));
  const progress = 0.68;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgb(var(--terminal))] text-white shadow-[0_30px_80px_-20px_rgb(11_27_46/0.55)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-[11px] text-white/50">nb-lab ~ cyber-analyst</span>
        <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-300">LIVE LAB</span>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-5">
        <div className="min-h-[188px] min-w-0 font-mono text-[12px] leading-6 sm:text-[12.5px]" aria-live="off">
          {visible.map((l, i) => {
            const isTyping = i === lineIdx && l.t === "cmd";
            const text = isTyping ? l.text.slice(0, chars) : l.text;
            return (
              <div key={i} className="truncate">
                {l.t === "cmd" && <span className="text-brand-cyan">$ </span>}
                {l.t === "ok" && <span className="text-emerald-400">✔ </span>}
                {l.t === "out" && <span className="text-white/35">› </span>}
                <span className={l.t === "out" ? "text-white/60" : l.t === "ok" ? "text-emerald-200" : "text-white/90"}>{text}</span>
                {isTyping && <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-blink bg-brand-cyan" />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-white/10 pt-4 sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <div className="relative h-[88px] w-[88px]">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="9" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none" stroke="url(#ring-g)" strokeWidth="9" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.8 }}
              />
              <defs>
                <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2F8FD8" />
                  <stop offset="1" stopColor="#7FC4F0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-display text-xl font-extrabold">68%</div>
                <div className="text-[9px] uppercase tracking-wider text-white/50">Progress</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-white/60 sm:text-center">
            <div className="font-semibold text-white">Security+ Track</div>
            Next: Threat Intel
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ children, className, depth, mx, my, delay, reduce }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={`absolute z-10 ${className}`} style={reduce ? undefined : { x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay, duration: 0.5 },
          scale: { delay, duration: 0.5, ease: EASE },
          y: { delay: delay + 0.5, duration: 4 + (depth % 5) * 0.4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-text shadow-lift sm:text-sm"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const keyword = useTypewriter(KEYWORDS, { reduce });
  const words = `Master ${"§"} & IT Skills with ${BRAND.name}`.split(" ");

  // Normalised mouse position (-1..1) for parallax + spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const sx = useSpring(spotX, { stiffness: 90, damping: 22 });
  const sy = useSpring(spotY, { stiffness: 90, damping: 22 });
  const cardX = useTransform(smx, (v) => v * -10);
  const cardY = useTransform(smy, (v) => v * -10);

  const onMove = (e) => {
    if (!fine || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    spotX.set(e.clientX - r.left - 300);
    spotY.set(e.clientY - r.top - 300);
  };

  return (
    <section id="home" aria-labelledby="hero-title" onPointerMove={onMove} className="relative -mt-20 overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-28">
      {/* Animated background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 overflow-hidden mask-radial">
          <div className={`bg-grid absolute -inset-y-12 inset-x-0 ${reduce ? "" : "animate-grid-move"}`} />
        </div>
        <motion.div
          className="absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(47_143_216/0.35),transparent_65%)] blur-2xl"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 top-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgb(127_196_240/0.32),transparent_65%)] blur-2xl"
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgb(124_58_237/0.16),transparent_65%)] blur-2xl"
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {fine && !reduce && (
          <motion.div
            className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.14),transparent_60%)]"
            style={{ x: sx, y: sy }}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1 pl-1 pr-3 text-xs font-medium text-muted backdrop-blur sm:text-sm"
          >
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent">New</span>
            CEH v13 & AZ-104 cohorts open
            <ArrowRight size={14} aria-hidden="true" />
          </motion.div>

          <h1 id="hero-title" className="mt-6 text-[2.05rem] font-extrabold leading-[1.08] text-text sm:text-5xl lg:text-[3.6rem]">
            <span className="sr-only">Master Cybersecurity & IT Skills with {BRAND.name}</span>
            <span aria-hidden="true">
              {words.map((w, i) =>
                w === "§" ? (
                  <span key={i} className="block min-h-[1.1em] whitespace-nowrap">
                    <motion.span
                      className="text-gradient inline-block pb-[0.14em] -mb-[0.14em]"
                      initial={{ opacity: 0, y: reduce ? 0 : "0.5em" }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      {keyword || " "}
                    </motion.span>
                    {!reduce && <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-blink rounded bg-accent" />}{" "}
                  </span>
                ) : (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: reduce ? 0 : "0.5em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    {w}&nbsp;
                  </motion.span>
                )
              )}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Empowering 1 million learners to build secure digital futures — with certified instructors, real-gear labs and
            career-ready certification paths in Cisco, Microsoft, AWS and EC-Council.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#demo" size="lg" magnetic onClick={() => window.dispatchEvent(new CustomEvent("nb:form-tab", { detail: "demo" }))}>
              <Play size={16} aria-hidden="true" className="fill-current" /> Request a Demo
            </Button>
            <Button href="#courses" size="lg" variant="outline">
              <BookOpen size={17} aria-hidden="true" /> Browse Courses
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {["#2F8FD8", "#7C3AED", "#16A34A", "#F59E0B"].map((c, i) => (
                  <span key={c} className="grid h-8 w-8 place-items-center rounded-full border-2 border-bg text-[11px] font-bold text-white" style={{ background: c }}>
                    {["AK", "SR", "MJ", "RT"][i]}
                  </span>
                ))}
              </div>
              <span>
                <strong className="text-text">7,000+</strong> learners trained
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex text-amber-500" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-current" />
                ))}
              </span>
              <span>
                <strong className="text-text">4.9/5</strong> on Google
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="relative mx-auto w-full min-w-0 max-w-[560px] px-2 py-10 sm:px-8"
        >
          <motion.div style={reduce ? undefined : { x: cardX, y: cardY }}>
            <Terminal reduce={reduce} />
          </motion.div>

          <FloatingBadge mx={smx} my={smy} depth={22} delay={0.9} reduce={reduce} className="-left-1 top-0 sm:-left-4">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[#049FD9] text-[10px] font-extrabold text-white">C</span>
            Cisco Certified
          </FloatingBadge>
          <FloatingBadge mx={smx} my={smy} depth={34} delay={1.05} reduce={reduce} className="-right-1 bottom-4 sm:-right-6">
            <span className="grid h-6 w-6 grid-cols-2 gap-[2px] p-1" aria-hidden="true">
              <span className="bg-[#F25022]" />
              <span className="bg-[#7FBA00]" />
              <span className="bg-[#00A4EF]" />
              <span className="bg-[#FFB900]" />
            </span>
            Microsoft Partner
          </FloatingBadge>
          <FloatingBadge mx={smx} my={smy} depth={14} delay={1.2} reduce={reduce} className="bottom-0 left-2 sm:left-6">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-[#C8202F] text-[10px] font-extrabold text-white">+</span>
            CompTIA Security+
          </FloatingBadge>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#stats"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-muted md:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-border pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll
      </motion.a>
    </section>
  );
}
