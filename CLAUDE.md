# CLAUDE.md — Emilio Guadarrama Portfolio

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Read `emilio_portfolio_spec.md`** at the start of every session for full content and structure reference.
- **Check `brand_assets/`** before designing — colors, photo, and PCB images are there.

## Framework & Stack
- React + Vite (already initialized)
- Dev server: `npm run dev` → runs at `http://localhost:5173`
- Routing: React Router v6
- Styling: Tailwind CSS (via PostCSS, already configured)
- Animation: Framer Motion
- i18n: i18next + react-i18next (language stored in localStorage, persists across sessions)
- Component library: shadcn/ui

## Local Server
- **Never screenshot a `file:///` URL**
- Start dev server: `npm run dev` (runs in background)
- Screenshot target: `http://localhost:5173`
- If server is already running, do not start a second instance

## Screenshot Workflow
- `screenshot.mjs` lives in the project root
- Usage: `node screenshot.mjs http://localhost:5173`
- Optional label: `node screenshot.mjs http://localhost:5173 hero` → saves as `screenshot-N-hero.png`
- Screenshots save to `./screenshots/screenshot-N.png` (auto-incremented, never overwritten)
- After screenshotting, read the PNG with the Read tool and analyze directly
- Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.
- When comparing, be specific: "heading is 32px but spec shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font sizes/weights, colors (exact hex from brand_assets/colors.md), alignment, borders

## Brand Assets
- `brand_assets/colors.md` — design system (colors, fonts, rules) — always use these exact values
- `brand_assets/photo.png` — Emilio's headshot (used in hero section)
- `brand_assets/pcb_3d_top.png` — FC-2026 PCB render (top view)
- `brand_assets/pcb_3d_angle.png` — FC-2026 PCB render (angled)
- `brand_assets/pcb_3d_bottom.png` — FC-2026 PCB render (bottom view)
- `brand_assets/pcb_layout.png` — FC-2026 PCB layout (Altium 2D)
- `brand_assets/resume.pdf` — downloadable CV (link in navbar)

## Site Structure
```
/                       → Home (single-page scroll)
/projects/fc-2026       → FC-2026 Flight Computer (flagship)
/projects/satellite     → LASC 2026 Satellite Challenge
/projects/ignitia       → Ignitia Rocket Lab hub
/projects/frc           → FIRST Robotics Competition
/projects/wgs           → Water Growth Solutions
/volunteering/techo     → TECHO México
```

## Design Rules
- Colors: always from `brand_assets/colors.md` — never invent or use Tailwind defaults
- Background: flat #070707 — no grid, no texture, no noise
- No glow, no blur, no gradients anywhere
- Borders: 1px solid #242424 at rest — hard edges only
- Amber (#b89060) used ONLY on Ignitia/competition tags (FC-2026, LASC 2026) — nowhere else
- Monospace font (JetBrains Mono) ONLY on: badges, labels, GPIO tables, code snippets, technical details
- Body copy uses Inter
- Every clickable element must have hover, focus-visible, and active states

## Bilingual (EN/ES)
- Language toggle in navbar — persists in localStorage via i18next
- All content has EN and ES translations
- Technical terms stay in English in both languages: ESP32-S3, LoRa, MOSFET, UART, etc.
- Competition names stay in English: LASC, ENMICE, FIRST
- Tagged labels stay in English: FC-2026, LASC 2026

## Build Order (follow this sequence)
1. Project setup (already done) + routing skeleton
2. Navbar + Footer (shared layout)
3. Home page — all sections
4. FC-2026 subpage (flagship — most important)
5. Ignitia Rocket Lab subpage
6. Satellite subpage
7. FRC subpage
8. WGS subpage
9. TECHO subpage
10. i18n — add all translations
11. Framer Motion — scroll animations
12. Final polish + mobile responsiveness

## Hard Rules
- Do not add content not in `emilio_portfolio_spec.md`
- Do not use default Tailwind blue/indigo/purple as any color
- Do not use `transition-all`
- Do not use gradients or background textures
- Do not stop after one screenshot pass
- Placeholder images for missing assets: `https://placehold.co/WIDTHxHEIGHT/111111/424242`
- Mobile-first responsive at all times
