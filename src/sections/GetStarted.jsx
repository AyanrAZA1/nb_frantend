import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, EyeOff, Send, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { BRAND } from "../config";
import Field from "../components/Field";
import Button from "../components/Button";
import AnimatedCheck from "../components/AnimatedCheck";
import { Reveal, RevealItem } from "../components/Reveal";
import { COURSES } from "../data/courses";
import { LOCATIONS } from "../data/content";

const EASE = [0.22, 1, 0.36, 1];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s-]{8,16}$/;

const PROPS = [
  "Free 1:1 career counselling session",
  "Live demo class with a certified instructor",
  "24/7 access to real-gear and cloud labs",
  "Exam vouchers and mock tests included",
  "Complimentary refresher sessions",
];

function useForm(initial, validate) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((s) => {
      const next = { ...s, [k]: v };
      if (touched[k]) setErrors(validate(next));
      return next;
    });
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };
  const submit = (onOk) => (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(errs).length === 0) onOk(values);
    else {
      const first = e.currentTarget.querySelector('[aria-invalid="true"]');
      first?.focus();
      toast.error("Please fix the highlighted fields");
    }
  };
  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
  };
  const err = (k) => (touched[k] ? errors[k] : undefined);
  return { values, setValues, set, blur, submit, reset, err };
}

function Success({ title, text, onReset }) {
  return (
    <motion.div
      key="ok"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex min-h-[460px] flex-col items-center justify-center text-center"
      role="status"
    >
      <AnimatedCheck size={88} />
      <h3 className="mt-6 font-display text-2xl font-extrabold text-text">{title}</h3>
      <p className="mt-2 max-w-sm text-muted">{text}</p>
      <button type="button" onClick={onReset} className="mt-6 text-sm font-semibold text-accent hover:underline">
        Submit another response
      </button>
    </motion.div>
  );
}

function SignupForm() {
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);
  const f = useForm({ name: "", email: "", phone: "", password: "", agree: false }, (v) => {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Please enter your full name";
    if (!EMAIL.test(v.email)) e.email = "Enter a valid email address";
    if (!PHONE.test(v.phone)) e.phone = "Enter a valid phone number";
    if (v.password.length < 8) e.password = "Use at least 8 characters";
    if (!v.agree) e.agree = "Please accept the terms to continue";
    return e;
  });
  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(f.values.password)).length);

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <Success
          title={`Welcome aboard, ${f.values.name.split(" ")[0]}!`}
          text="Your account is ready. We've sent a verification link to your inbox (demo — nothing is actually sent)."
          onReset={() => {
            f.reset();
            setDone(false);
          }}
        />
      ) : (
        <motion.form
          key="form"
          noValidate
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          onSubmit={f.submit(() => {
            setDone(true);
            toast.success("Account created", { description: `Welcome to ${BRAND.name}!` });
          })}
          className="space-y-4"
        >
          <Field label="Full name" required autoComplete="name" value={f.values.name} onChange={f.set("name")} onBlur={f.blur("name")} error={f.err("name")} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" type="email" required autoComplete="email" value={f.values.email} onChange={f.set("email")} onBlur={f.blur("email")} error={f.err("email")} />
            <Field label="Phone" type="tel" required autoComplete="tel" value={f.values.phone} onChange={f.set("phone")} onBlur={f.blur("phone")} error={f.err("phone")} />
          </div>
          <div>
            <div className="relative">
              <Field label="Password" type={show ? "text" : "password"} required autoComplete="new-password" value={f.values.password} onChange={f.set("password")} onBlur={f.blur("password")} error={f.err("password")} />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-3.5 grid h-8 w-8 place-items-center rounded-lg text-muted hover:text-text">
                {show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 overflow-hidden rounded-full bg-border">
                  <motion.span
                    className={`block h-full origin-left ${strength <= 1 ? "bg-red-500" : strength === 2 ? "bg-amber-500" : "bg-emerald-500"}`}
                    animate={{ scaleX: i < strength ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </span>
              ))}
            </div>
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
            <input type="checkbox" checked={f.values.agree} onChange={f.set("agree")} onBlur={f.blur("agree")} aria-invalid={f.err("agree") ? "true" : "false"} className="mt-0.5 h-4 w-4 rounded border-border accent-[rgb(var(--accent))]" />
            <span>
              I agree to the <a href="#footer" className="font-medium text-accent hover:underline">Terms</a> and{" "}
              <a href="#footer" className="font-medium text-accent hover:underline">Privacy Policy</a>.
            </span>
          </label>
          {f.err("agree") && <p className="-mt-2 text-xs font-medium text-red-600 dark:text-red-400" role="alert">{f.err("agree")}</p>}
          <Button type="submit" size="lg" className="w-full">
            <UserPlus size={18} aria-hidden="true" /> Create free account
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function DemoForm() {
  const [done, setDone] = useState(false);
  const f = useForm(
    { name: "", email: "", phone: "", company: "", country: "", state: "", course: "", format: "Live Online", message: "" },
    (v) => {
      const e = {};
      if (v.name.trim().length < 2) e.name = "Please enter your name";
      if (!EMAIL.test(v.email)) e.email = "Enter a valid email address";
      if (!PHONE.test(v.phone)) e.phone = "Enter a valid phone number";
      if (!v.country) e.country = "Select your country";
      if (v.country && !v.state) e.state = "Select your state / region";
      if (!v.course) e.course = "Choose a course";
      return e;
    }
  );

  // Pre-select a course when "Talk to our experts" is clicked
  useEffect(() => {
    const on = (e) => f.setValues((s) => ({ ...s, course: e.detail }));
    window.addEventListener("nb:select-course", on);
    return () => window.removeEventListener("nb:select-course", on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const states = LOCATIONS[f.values.country] ?? [];

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <Success
          title="Demo request received!"
          text={`A ${BRAND.name} advisor will call you within one business day to schedule your live demo.`}
          onReset={() => {
            f.reset();
            setDone(false);
          }}
        />
      ) : (
        <motion.form
          key="form"
          noValidate
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          onSubmit={f.submit(() => {
            setDone(true);
            toast.success("Demo booked", { description: "We'll be in touch within 24 hours." });
          })}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required autoComplete="name" value={f.values.name} onChange={f.set("name")} onBlur={f.blur("name")} error={f.err("name")} />
            <Field label="Work email" type="email" required autoComplete="email" value={f.values.email} onChange={f.set("email")} onBlur={f.blur("email")} error={f.err("email")} />
            <Field label="Phone" type="tel" required autoComplete="tel" value={f.values.phone} onChange={f.set("phone")} onBlur={f.blur("phone")} error={f.err("phone")} />
            <Field label="Company (optional)" autoComplete="organization" value={f.values.company} onChange={f.set("company")} />
            <Field
              as="select"
              label="Country"
              required
              options={Object.keys(LOCATIONS)}
              value={f.values.country}
              onChange={(e) => {
                const country = e.target.value;
                f.setValues((s) => ({ ...s, country, state: "" }));
              }}
              onBlur={f.blur("country")}
              error={f.err("country")}
            />
            <Field as="select" label="State / Region" required options={states} disabled={!f.values.country} value={f.values.state} onChange={f.set("state")} onBlur={f.blur("state")} error={f.err("state")} />
          </div>
          <Field as="select" label="Course of interest" required options={COURSES.map((c) => c.title)} value={f.values.course} onChange={f.set("course")} onBlur={f.blur("course")} error={f.err("course")} />
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-muted">Preferred format</legend>
            <div className="flex flex-wrap gap-2">
              {["Live Online", "Self-Paced", "Classroom", "Blended"].map((o) => {
                const on = f.values.format === o;
                return (
                  <label key={o} className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${on ? "border-accent bg-accent/10 text-accent" : "border-border text-muted hover:text-text"}`}>
                    <input type="radio" name="format" value={o} checked={on} onChange={f.set("format")} className="sr-only" />
                    {on && <Check size={13} className="mr-1 inline" aria-hidden="true" />}
                    {o}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <Field as="textarea" label="Anything we should know? (optional)" value={f.values.message} onChange={f.set("message")} />
          <Button type="submit" size="lg" className="w-full">
            <Send size={17} aria-hidden="true" /> Request a demo
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function GetStarted() {
  const [tab, setTab] = useState("demo");

  useEffect(() => {
    const on = (e) => setTab(e.detail === "signup" ? "signup" : "demo");
    const onCourse = () => setTab("demo");
    window.addEventListener("nb:form-tab", on);
    window.addEventListener("nb:select-course", onCourse);
    return () => {
      window.removeEventListener("nb:form-tab", on);
      window.removeEventListener("nb:select-course", onCourse);
    };
  }, []);

  const TABS = [
    { id: "demo", label: "Request a demo" },
    { id: "signup", label: "Sign up" },
  ];

  return (
    <section id="demo" aria-labelledby="demo-title" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[420px] w-[420px] -translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgb(47_143_216/0.22),transparent_65%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgb(127_196_240/0.2),transparent_65%)] blur-2xl" />
      </div>
      <div className="container-x grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <RevealItem as="span" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Get started
          </RevealItem>
          <RevealItem as="h2" id="demo-title" className="mt-4 text-3xl font-extrabold leading-tight text-text sm:text-4xl lg:text-[2.75rem]">
            Start your journey — <span className="text-gradient">future-proof your skills</span>
          </RevealItem>
          <RevealItem as="p" className="mt-4 text-lg leading-relaxed text-muted">
            Book a free live demo or create your account in under a minute. No credit card required.
          </RevealItem>
          <ul className="mt-8 space-y-4">
            {PROPS.map((p, i) => (
              <RevealItem as="li" key={p} className="flex items-center gap-3 font-medium text-text">
                <motion.span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[rgb(var(--bg))]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 + i * 0.12 }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <motion.path
                      d="M5 12.5 10 17 19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.45 + i * 0.12 }}
                    />
                  </svg>
                </motion.span>
                {p}
              </RevealItem>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <RevealItem className="rounded-3xl border border-border bg-surface/90 p-5 shadow-lift backdrop-blur sm:p-8">
            <div role="tablist" aria-label="Choose a form" className="mb-7 grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  id={`formtab-${t.id}`}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      const next = tab === "demo" ? "signup" : "demo";
                      setTab(next);
                      document.getElementById(`formtab-${next}`)?.focus();
                    }
                  }}
                  tabIndex={tab === t.id ? 0 : -1}
                  className={`relative rounded-xl py-2.5 text-sm font-semibold transition-colors ${tab === t.id ? "text-text" : "text-muted hover:text-text"}`}
                >
                  {tab === t.id && <motion.span layoutId="form-tab" className="absolute inset-0 rounded-xl bg-surface shadow-soft" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
            <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`formtab-${tab}`}>
              {tab === "demo" ? <DemoForm /> : <SignupForm />}
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
