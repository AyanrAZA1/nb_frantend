import LogoChip from "./LogoChip";

/** Infinite logo marquee: duplicated track, CSS transform animation, pauses on hover. */
export default function Marquee({ items, reverse = false, duration = 40, label }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee mask-fade-x relative overflow-hidden py-2" aria-label={label} role="region">
      <ul
        className={`marquee-track flex w-max gap-4 sm:gap-5 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {loop.map((p, i) => (
          <li key={`${p.name}-${i}`} aria-hidden={i >= items.length ? "true" : undefined}>
            <LogoChip {...p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
