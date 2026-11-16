import { BRAND } from "../config";

/**
 * Official Network Binary Brand Logo
 * - Light theme: clean, untouched transparent presentation
 * - Dark theme: enhanced professional dark-mode styling with subtle luminous container & glow
 */
export default function Logo({ className = "", compact = false }) {
  return (
    <span
      className={`group inline-flex items-center transition-all duration-300 ${
        compact ? "py-0.5" : ""
      } dark:bg-white/[0.04] dark:backdrop-blur-md dark:border dark:border-white/[0.08] dark:rounded-2xl dark:px-3 dark:py-1.5 dark:shadow-[0_0_20px_-2px_rgba(47,143,216,0.25)] dark:hover:border-accent/40 dark:hover:shadow-[0_0_24px_-1px_rgba(47,143,216,0.35)] ${className}`}
    >
      {/* Light Theme Logo — Clean original presentation */}
      <img
        src="/logo-light.png"
        alt={BRAND.name}
        className={`${
          compact ? "h-8 sm:h-9" : "h-9 sm:h-10"
        } w-auto max-w-[190px] sm:max-w-[220px] object-contain transition-transform duration-200 group-hover:scale-[1.02] dark:hidden`}
        loading="eager"
      />

      {/* Dark Theme Logo — High-contrast illuminated presentation */}
      <img
        src="/logo-dark.png"
        alt={BRAND.name}
        className={`hidden dark:block ${
          compact ? "h-8 sm:h-9" : "h-9 sm:h-10"
        } w-auto max-w-[190px] sm:max-w-[220px] object-contain transition-transform duration-200 group-hover:scale-[1.02] drop-shadow-[0_1px_12px_rgba(47,143,216,0.35)]`}
        loading="eager"
      />

      <span className="sr-only">{BRAND.name} — {BRAND.tagline}</span>
    </span>
  );
}
