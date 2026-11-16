# Network Binary — Frontend

Vite + React 18 + Tailwind CSS v3 + framer-motion + lucide-react + sonner (toasts).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

- Brand name, phone, email, addresses: `src/config.js`
- Courses / instructors / testimonials / partners: `src/data/*.js`
- Theme colours (light + dark): CSS variables at the top of `src/index.css`
- Replace a text logo with a real one: add `src: "/logos/x.svg"` to an entry in `src/data/partners.js`
- Testimonials marked `sample: true` are placeholders — swap in real reviews before launch.
