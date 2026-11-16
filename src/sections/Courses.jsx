import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Calendar, Clock, Headphones, Signal, Star, Users } from "lucide-react";
import { toast } from "sonner";
import Icon from "../components/Icon";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import CurriculumDialog from "../components/CurriculumDialog";
import { COURSES, COURSE_TABS } from "../data/courses";

const EASE = [0.22, 1, 0.36, 1];

function CoverArt({ art, id }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${art.from}, ${art.to})` }}>
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
        <defs>
          <pattern id={`p-${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${id})`} />
      </svg>
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
      <Icon name={art.icon} size={96} strokeWidth={1.2} className="absolute -bottom-4 -right-3 text-white/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
      <div className="absolute left-4 top-4 rounded-lg bg-white/15 px-2.5 py-1 font-mono text-xs font-semibold tracking-wider text-white backdrop-blur">
        {art.code}
      </div>
      <div className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-navy shadow-lg">
        <Icon name={art.icon} size={20} />
      </div>
    </div>
  );
}

/** Pre-fills the demo form with this course and scrolls to it. */
function talkToExperts(course) {
  window.dispatchEvent(new CustomEvent("nb:select-course", { detail: course.title }));
  toast.success("Great choice!", { description: `We've pre-filled “${course.title}” in the demo form below.` });
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
}

function CourseCard({ c, onViewCurriculum }) {
  return (
    <Card as="article" className="group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <CoverArt art={c.art} id={c.id} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span key={t} className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
              {t}
            </span>
          ))}
        </div>
        <h3 className="mt-3 font-display text-[1.05rem] font-bold leading-snug text-text">{c.title}</h3>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-400" aria-hidden="true" />
            <strong className="text-text">{c.rating}</strong>
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={13} aria-hidden="true" /> {c.learners.toLocaleString("en-IN")} enrolled
          </span>
        </div>
        <dl className="mb-5 mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted">
            <Clock size={14} aria-hidden="true" />
            <dt className="sr-only">Duration</dt>
            <dd>{c.duration}</dd>
          </div>
          <div className="flex items-center gap-1.5 text-muted">
            <Signal size={14} aria-hidden="true" />
            <dt className="sr-only">Level</dt>
            <dd>{c.level}</dd>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 text-muted">
            <Calendar size={14} aria-hidden="true" />
            <dt>Next cohort:</dt>
            <dd className="font-semibold text-text">{c.cohort}</dd>
          </div>
        </dl>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          <button
            type="button"
            onClick={() => onViewCurriculum(c)}
            aria-haspopup="dialog"
            aria-label={`View curriculum for ${c.title}`}
            className="group/btn inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-2 text-xs sm:text-[13px] font-semibold text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-accent"
          >
            <BookOpen size={14} aria-hidden="true" className="shrink-0 text-accent transition-transform duration-200 group-hover/btn:scale-110" />
            <span className="truncate">View curriculum</span>
          </button>
          <button
            type="button"
            onClick={() => talkToExperts(c)}
            aria-label={`Talk to our experts about ${c.title}`}
            className="btn-shine inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-accent/40 bg-accent/15 px-2 text-xs sm:text-[13px] font-semibold text-accent transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-[rgb(var(--btn-text))] focus-visible:outline-accent"
          >
            <Headphones size={14} aria-hidden="true" className="shrink-0" />
            <span className="truncate">Talk to experts</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function Courses() {
  const [tab, setTab] = useState("All");
  const reduce = useReducedMotion();
  const tabsRef = useRef(null);
  const [active, setActive] = useState(null); // course shown in the curriculum dialog
  const closeDialog = useCallback(() => setActive(null), []);
  const talkFromDialog = useCallback((course) => {
    setActive(null);
    // let the dialog close (and release the scroll lock) before scrolling
    window.setTimeout(() => talkToExperts(course), 220);
  }, []);
  const list = tab === "All" ? COURSES : COURSES.filter((c) => c.tags.includes(tab));

  const onKeyDown = (e) => {
    const i = COURSE_TABS.indexOf(tab);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % COURSE_TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + COURSE_TABS.length) % COURSE_TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = COURSE_TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setTab(COURSE_TABS[next]);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <section id="courses" aria-labelledby="courses-title" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          id="courses-title"
          eyebrow="Course catalog"
          title="Get access to"
          highlight="in-demand courses"
          subtitle="Career-oriented, certification-aligned programs with fixed cohorts and expert mentors."
        />

        <div className="scroll-thin -mx-4 mb-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Filter courses"
            onKeyDown={onKeyDown}
            className="mx-auto flex w-max gap-1 rounded-2xl border border-border bg-surface/70 p-1.5 shadow-soft backdrop-blur"
          >
            {COURSE_TABS.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  id={`tab-${t}`}
                  aria-selected={active}
                  aria-controls="courses-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(t)}
                  className={`relative whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${active ? "text-[rgb(var(--btn-text))]" : "text-muted hover:text-text"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="course-tab-pill"
                      className="absolute inset-0 rounded-xl bg-[linear-gradient(135deg,rgb(var(--btn-from)),rgb(var(--btn-to)))] shadow-glow"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="courses-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
                exit: { opacity: 0, transition: { duration: 0.15 } },
              }}
            >
              {list.map((c) => (
                <motion.li
                  key={c.id}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.97 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
                  }}
                >
                  <CourseCard c={c} onViewCurriculum={setActive} />
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
      <CurriculumDialog course={active} onClose={closeDialog} onTalk={talkFromDialog} />
    </section>
  );
}
