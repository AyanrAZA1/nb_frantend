import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogIn, Mail, Menu, MessageCircle, X } from "lucide-react";
import { BRAND } from "../config";
import { NAV, SECTION_IDS } from "../data/nav";
import Logo from "../components/Logo";
import Button from "../components/Button";
import ThemeToggle from "../components/ThemeToggle";
import { useScrolled } from "../hooks/useScrolled";
import { useActiveSection } from "../hooks/useActiveSection";

const EASE = [0.22, 1, 0.36, 1];

export function TopBar() {
  return (
    <div className="relative z-[61] bg-navy text-[13px] text-white/85">
      <div className="container-x flex h-9 items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1.5 hover:text-white">
            <MessageCircle size={14} className="text-[#25D366]" aria-hidden="true" />
            <span>{BRAND.phone}</span>
            <span className="hidden text-white/55 sm:inline">(Chat only)</span>
          </a>
          <a href={`mailto:${BRAND.email}`} className="link-underline hidden items-center gap-1.5 hover:text-white sm:inline-flex">
            <Mail size={14} className="text-brand-cyan" aria-hidden="true" />
            {BRAND.email}
          </a>
        </div>
        <p className="hidden truncate text-white/60 lg:block">New cohorts for CCNA, CEH & AZ-104 start in December</p>
      </div>
    </div>
  );
}

function Dropdown({ item, active }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const closeTimer = useRef(0);

  const focusItem = (i) => {
    const links = menuRef.current?.querySelectorAll("a");
    if (!links?.length) return;
    links[(i + links.length) % links.length].focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      requestAnimationFrame(() => {
        const links = [...(menuRef.current?.querySelectorAll("a") ?? [])];
        const idx = links.indexOf(document.activeElement);
        focusItem(idx + 1);
      });
    }
    if (e.key === "ArrowUp" && open) {
      e.preventDefault();
      const links = [...(menuRef.current?.querySelectorAll("a") ?? [])];
      focusItem(links.indexOf(document.activeElement) - 1);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = window.setTimeout(() => setOpen(false), 120);
      }}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        data-active={active}
        className={`link-underline inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors ${active ? "text-accent" : "text-text/80 hover:text-text"}`}
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
          <ChevronDown size={15} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <div ref={menuRef} className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="glass rounded-2xl p-2 shadow-lift"
          >
            <ul>
              {item.items.map((sub) => (
                <li key={sub.label}>
                  <a
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2 focus-visible:bg-surface-2"
                  >
                    <span className="block text-sm font-semibold text-text group-hover:text-accent">{sub.label}</span>
                    <span className="mt-0.5 block text-xs text-muted">{sub.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDrawer({ open, onClose, theme, onToggleTheme }) {
  const panelRef = useRef(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.querySelector("button, a")?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto border-l border-border bg-bg p-5 shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <Logo compact />
              <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-xl border border-border text-text">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-8 space-y-1">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: EASE }}
                >
                  {item.items ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-semibold text-text hover:bg-surface-2"
                      >
                        {item.label}
                        <motion.span animate={{ rotate: expanded === item.label ? 180 : 0 }} className="inline-flex">
                          <ChevronDown size={18} aria-hidden="true" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="mb-2 ml-3 border-l border-border pl-3"
                          >
                            {item.items.map((s) => (
                              <li key={s.label}>
                                <a href={s.href} onClick={onClose} className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-accent">
                                  {s.label}
                                </a>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={item.href} onClick={onClose} className="block rounded-xl px-3 py-3 font-semibold text-text hover:bg-surface-2">
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 pt-8">
              <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                <span className="text-sm font-medium text-text">Theme</span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
              <Button href="#demo" variant="outline" className="w-full" onClick={() => { window.dispatchEvent(new CustomEvent("nb:form-tab", { detail: "signup" })); onClose(); }}>
                <LogIn size={16} aria-hidden="true" /> Sign in
              </Button>
              <Button href="#demo" className="w-full" onClick={() => { window.dispatchEvent(new CustomEvent("nb:form-tab", { detail: "signup" })); onClose(); }}>
                Register free
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar({ theme, onToggleTheme }) {
  const scrolled = useScrolled(40);
  const active = useActiveSection(SECTION_IDS);
  const [drawer, setDrawer] = useState(false);
  const openSignup = () => window.dispatchEvent(new CustomEvent("nb:form-tab", { detail: "signup" }));

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="sticky top-0 z-[60]"
      >
        <div
          className={`border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
            scrolled ? "glass border-border/80 shadow-soft" : "border-transparent bg-transparent"
          }`}
        >
          <nav aria-label="Primary" className={`container-x flex items-center justify-between gap-4 transition-[height] duration-300 ${scrolled ? "h-16" : "h-20"}`}>
            <motion.a
              href="#home"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="rounded-xl"
            >
              <Logo />
            </motion.a>

            <motion.ul
              className="hidden items-center gap-6 lg:flex xl:gap-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {NAV.map((item) => {
                const isActive = item.sections.includes(active);
                return (
                  <motion.li
                    key={item.label}
                    variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
                  >
                    {item.items ? (
                      <Dropdown item={item} active={isActive} />
                    ) : (
                        <a
                          href={item.href}
                          data-active={isActive}
                          className={`link-underline py-2 text-sm font-medium transition-colors ${isActive ? "text-accent" : "text-text/80 hover:text-text"}`}
                        >
                          {item.label}
                        </a>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
            >
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <a href="#demo" onClick={openSignup} className="link-underline hidden px-1 text-sm font-semibold text-text sm:inline-block">
                Sign in
              </a>
              <span className="hidden sm:inline-flex">
                <Button href="#demo" size="sm" magnetic onClick={openSignup}>
                  Register
                </Button>
              </span>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label="Open menu"
                aria-expanded={drawer}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface/70 text-text lg:hidden"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </motion.div>
          </nav>
        </div>
      </motion.header>
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );
}
