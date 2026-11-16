// Main navigation. `sections` decides which nav item lights up while scrolling.
export const NAV = [
  {
    label: "About Us",
    sections: ["why", "instructors", "customers"],
    items: [
      { label: "Why Network Binary", href: "#why", desc: "What makes our training different" },
      { label: "Our Instructors", href: "#instructors", desc: "Certified, 25+ years of field experience" },
      { label: "Valued Customers", href: "#customers", desc: "Enterprises that trust us" },
      { label: "Testimonials", href: "#testimonials", desc: "Hear from our learners" },
    ],
  },
  {
    label: "Train & Certify",
    sections: ["technologies", "courses", "roles", "how", "formats"],
    items: [
      { label: "Browse by Technology", href: "#technologies", desc: "9 tracks from Enterprise to Cyber" },
      { label: "Course Catalog", href: "#courses", desc: "In-demand certification courses" },
      { label: "Explore by Job Role", href: "#roles", desc: "Guided learning paths" },
      { label: "Training Formats", href: "#formats", desc: "Live, self-paced, classroom, blended" },
    ],
  },
  {
    label: "Cyber & Infra Solutions",
    sections: [],
    items: [
      { label: "Network Security Audits", href: "#demo", desc: "Assess and harden your perimeter" },
      { label: "SOC Readiness Programs", href: "#demo", desc: "Upskill your security operations team" },
      { label: "Cloud Infrastructure", href: "#demo", desc: "Design, migrate and secure workloads" },
      { label: "Corporate Training", href: "#demo", desc: "Tailored programs for teams" },
    ],
  },
  { label: "Blog", href: "#newsletter", sections: ["newsletter"] },
  { label: "Contact", href: "#demo", sections: ["demo"] },
];

export const SECTION_IDS = [
  "home", "technologies", "courses", "roles", "how", "formats", "customers",
  "why", "instructors", "testimonials", "demo", "newsletter",
];
