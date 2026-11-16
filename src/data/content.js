export const TECHNOLOGIES = [
  { name: "Enterprise", icon: "Building2", desc: "Routing, switching & SD-WAN", count: 42 },
  { name: "Service Provider", icon: "Network", desc: "MPLS, BGP & carrier networks", count: 18 },
  { name: "Data Center", icon: "Server", desc: "ACI, Nexus & virtualization", count: 24 },
  { name: "Security", icon: "ShieldCheck", desc: "Firewalls, VPN & zero trust", count: 36 },
  { name: "Collaboration", icon: "Video", desc: "Webex, voice & unified comms", count: 14 },
  { name: "Cloud", icon: "Cloud", desc: "AWS, Azure & Google Cloud", count: 31 },
  { name: "Digital Skills", icon: "Sparkles", desc: "AI, data & productivity", count: 27 },
  { name: "Ethical Hacking", icon: "Bug", desc: "Pentesting & red teaming", count: 19 },
  { name: "Cyber", icon: "Crosshair", desc: "SOC, DFIR & threat hunting", count: 22 },
];

export const ROLES = [
  {
    title: "Security Analyst",
    icon: "ShieldCheck",
    salary: "Avg. ₹9–14 LPA · AED 18–25k/mo",
    blurb: "Monitor, detect and respond to threats in a modern SOC.",
    path: ["CompTIA Security+", "Cisco CyberOps Associate", "Microsoft SC-200"],
  },
  {
    title: "Network Engineer",
    icon: "Network",
    salary: "Avg. ₹6–12 LPA · AED 15–22k/mo",
    blurb: "Design, build and troubleshoot enterprise networks.",
    path: ["CCNA 200-301", "CCNP ENCOR", "CCNP ENARSI"],
  },
  {
    title: "Cloud Architect",
    icon: "Cloud",
    salary: "Avg. ₹18–30 LPA · AED 30–45k/mo",
    blurb: "Plan secure, scalable workloads across public clouds.",
    path: ["Azure Fundamentals", "AZ-104 Administrator", "AWS Solutions Architect"],
  },
  {
    title: "Ethical Hacker",
    icon: "Bug",
    salary: "Avg. ₹8–16 LPA · AED 20–30k/mo",
    blurb: "Think like an attacker to find weaknesses first.",
    path: ["Networking Essentials", "CEH v13", "OSCP-style Lab Program"],
  },
];

export const STEPS = [
  { title: "Choose your path", desc: "Talk to an advisor and pick a track that fits your role and goals.", icon: "Route" },
  { title: "Learn live with experts", desc: "Interactive sessions led by certified, industry-experienced instructors.", icon: "MonitorPlay" },
  { title: "Practice in real labs", desc: "Hands-on labs on real gear and cloud sandboxes, available 24/7.", icon: "Terminal" },
  { title: "Certify & level up", desc: "Exam prep, mock tests and career support until you pass.", icon: "Award" },
];

export const FORMATS = [
  {
    id: "live",
    label: "Live Online",
    icon: "MonitorPlay",
    headline: "Instructor-led, from anywhere",
    desc: "Join small live batches with real-time Q&A, breakout labs and recorded sessions you can replay anytime.",
    points: ["Small batches of 8–15 learners", "Session recordings for 12 months", "Weekday & weekend batches"],
    meta: [["Batch size", "8–15"], ["Schedule", "Weekday / Weekend"], ["Labs", "24/7 cloud labs"]],
  },
  {
    id: "self",
    label: "Self-Paced",
    icon: "Laptop",
    headline: "Learn on your own clock",
    desc: "HD video modules, guided labs and quizzes — with mentor support whenever you get stuck.",
    points: ["Lifetime access to content", "Mentor chat support", "Practice exams included"],
    meta: [["Access", "Lifetime"], ["Support", "Mentor chat"], ["Pace", "Your choice"]],
  },
  {
    id: "classroom",
    label: "Classroom",
    icon: "Users",
    headline: "Face-to-face in Delhi, Noida & Dubai",
    desc: "Immersive bootcamps in our labs with physical routers, switches and firewalls.",
    points: ["Physical rack access", "Peer networking", "Fast-track bootcamps"],
    meta: [["Locations", "3 cities"], ["Format", "Bootcamp"], ["Gear", "Physical racks"]],
  },
  {
    id: "blended",
    label: "Blended",
    icon: "Layers",
    headline: "The best of both worlds",
    desc: "Combine live classes, self-paced modules and in-person lab days into one tailored program.",
    points: ["Custom curriculum", "Corporate dashboards", "Ideal for teams"],
    meta: [["Best for", "Teams"], ["Reporting", "Progress dashboard"], ["Plan", "Tailored"]],
  },
];

export const BENEFITS = [
  { title: "Hands-On Learning", desc: "Real gear, real cloud — every module ends in a practical lab.", icon: "Terminal", span: "lg:col-span-2 lg:row-span-2", feature: true },
  { title: "Certified Instructors", desc: "Industry-experienced trainers with up to 25+ years in the field.", icon: "UserCheck" },
  { title: "Free Refresher Sessions", desc: "Rejoin future batches to refresh skills at no extra cost.", icon: "RefreshCw" },
  { title: "Certification-Based Learning", desc: "Mapped to official exam blueprints, with mock tests.", icon: "Award", span: "lg:col-span-2" },
  { title: "Learning Eco-System", desc: "Labs, notes, forums and mentors in one place.", icon: "Globe" },
  { title: "Continuous Learning", desc: "Webinars and updates as technology evolves.", icon: "Infinity" },
  { title: "Tailored Training Solutions", desc: "Programs designed around your team's stack and goals.", icon: "Target", span: "lg:col-span-2" },
  { title: "Customized Pathways", desc: "Personal roadmaps from beginner to expert.", icon: "Route" },
  { title: "Flexible Schedule", desc: "Weekday, weekend and fast-track batches.", icon: "Calendar" },
  { title: "Engaging Experience", desc: "Interactive sessions, quizzes and real-world stories that stick.", icon: "Sparkles", span: "lg:col-span-2" },
];

export const LOCATIONS = {
  India: ["Delhi", "Uttar Pradesh", "Haryana", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana", "West Bengal", "Gujarat", "Rajasthan", "Kerala", "Punjab"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
  "Saudi Arabia": ["Riyadh", "Makkah", "Eastern Province", "Madinah", "Qassim", "Asir"],
  Qatar: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor"],
  "United States": ["California", "New York", "Texas", "Florida", "Illinois", "Washington", "New Jersey"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
};
