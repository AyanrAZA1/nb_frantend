import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { useTheme } from "./hooks/useTheme";
import { useScrolled } from "./hooks/useScrolled";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import Navbar, { TopBar } from "./sections/Navbar";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Partners from "./sections/Partners";

// Below-the-fold sections are code-split and mounted lazily
const Technologies = lazy(() => import("./sections/Technologies"));
const Courses = lazy(() => import("./sections/Courses"));
const JobRoles = lazy(() => import("./sections/JobRoles"));
const HowItWorks = lazy(() => import("./sections/HowItWorks"));
const Formats = lazy(() => import("./sections/Formats"));
const Customers = lazy(() => import("./sections/Customers"));
const WhyUs = lazy(() => import("./sections/WhyUs"));
const Instructors = lazy(() => import("./sections/Instructors"));
const Testimonials = lazy(() => import("./sections/Testimonials"));
const GetStarted = lazy(() => import("./sections/GetStarted"));
const Footer = lazy(() => import("./sections/Footer"));
const FloatingActions = lazy(() => import("./sections/Footer").then((m) => ({ default: m.FloatingActions })));

export default function App() {
  const { theme, toggle } = useTheme();
  const scrolled = useScrolled(600);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only z-[100] rounded-lg bg-surface px-4 py-2 text-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <TopBar />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main" className="relative z-[2] overflow-x-clip">
        <Hero />
        <Stats />
        <Partners />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Technologies />
          <Courses />
          <JobRoles />
          <HowItWorks />
          <Formats />
          <Customers />
          <WhyUs />
          <Instructors />
          <Testimonials />
          <GetStarted />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <FloatingActions show={scrolled} />
      </Suspense>
      <Toaster theme={theme} position="bottom-left" richColors closeButton />
    </MotionConfig>
  );
}
