/** Text placeholder logo. Pass `src` to swap in a real <img> later. */
export default function LogoChip({ name, src, weight = 700, tracking = "0" }) {
  return (
    <div className="flex h-16 min-w-[168px] items-center justify-center rounded-2xl border border-border bg-surface/70 px-6 text-muted shadow-soft transition-colors duration-300 hover:border-accent/50 hover:text-text sm:h-[72px] sm:min-w-[190px]">
      {src ? (
        <img src={src} alt={name} loading="lazy" className="max-h-8 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
      ) : (
        <span className="font-display text-lg sm:text-xl" style={{ fontWeight: weight, letterSpacing: tracking }}>
          {name}
        </span>
      )}
    </div>
  );
}
