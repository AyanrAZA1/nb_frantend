// ─── Edit-once brand config ────────────────────────────────────────────────
// Change the name, contact details or addresses here and the whole site updates.
export const BRAND = {
  name: "Network Binary",
  tagline: "Building the Culture of Learning",
  phone: "+91 92891 11686",
  phoneHref: "+919289111686",
  whatsapp: "https://wa.me/919289111686",
  email: "learning@networkbinary.com",
  addresses: [
    { city: "New Delhi", line: "44, Regal Building, Connaught Place, New Delhi – 110001, India" },
    { city: "Noida", line: "Office B-1122, I-Thum Tower, Sector 62, Noida, U.P. – 201301, India" },
    { city: "Dubai", line: "FAB Properties, Gate no 8, Building 17, Dubai Investment Park 1, Dubai – 113976, UAE" },
  ],
  // `id` picks the brand mark in src/components/SocialIcon.jsx — replace the hrefs with your real profile URLs.
  socials: [
    { id: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/" },
    { id: "x", name: "X (Twitter)", href: "https://x.com/" },
    { id: "facebook", name: "Facebook", href: "https://www.facebook.com/" },
    { id: "instagram", name: "Instagram", href: "https://www.instagram.com/" },
    { id: "youtube", name: "YouTube", href: "https://www.youtube.com/" },
  ],
  stats: { learners: 7000, courses: 1000, rating: 4.9, clients: 50 },
};
