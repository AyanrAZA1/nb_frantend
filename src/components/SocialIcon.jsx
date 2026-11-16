// Brand marks for the social links. Inline SVG keeps them crisp, theme-aware
// (they inherit `currentColor`) and free of extra network requests.
const ICONS = {
  linkedin: {
    viewBox: "0 0 448 512",
    body: (
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    ),
  },
  x: {
    viewBox: "0 0 512 512",
    body: (
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    ),
  },
  facebook: {
    viewBox: "0 0 320 512",
    body: (
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    ),
  },
  instagram: {
    viewBox: "0 0 24 24",
    body: (
      <>
        <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.1" />
        <circle cx="12" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="2.1" />
        <circle cx="17.6" cy="6.4" r="1.35" />
      </>
    ),
  },
  youtube: {
    viewBox: "0 0 24 24",
    body: (
      <path
        fillRule="evenodd"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"
      />
    ),
  },
};

/**
 * Brand colours used by the footer tiles.
 *  - color: icon colour at rest
 *  - bg:    tile background on hover (can be a gradient)
 *  - fg:    icon colour on hover
 * X uses theme tokens because its brand colour is black.
 */
export const SOCIAL_BRANDS = {
  linkedin: { color: "#0A66C2", bg: "#0A66C2", fg: "#fff" },
  x: { color: "rgb(var(--text))", bg: "rgb(var(--text))", fg: "rgb(var(--bg))" },
  facebook: { color: "#1877F2", bg: "#1877F2", fg: "#fff" },
  instagram: {
    color: "#E1306C",
    bg: "radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
    fg: "#fff",
  },
  youtube: { color: "#FF0000", bg: "#FF0000", fg: "#fff" },
};

export default function SocialIcon({ id, size = 18, className = "" }) {
  const icon = ICONS[id];
  if (!icon) return null;
  return (
    <svg viewBox={icon.viewBox} width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {icon.body}
    </svg>
  );
}
