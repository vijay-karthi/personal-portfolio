# Vijay Karthi — Personal Portfolio

A world-class, handcrafted personal portfolio website built with pure **HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no libraries, no templates.

## ✦ Design Philosophy

Inspired by Apple, Porsche, Leica, and Bang & Olufsen — built with elegant typography, generous whitespace, and subtle motion. Not a developer template. A premium digital experience.

## ✦ Tech Stack

- **HTML5** — Semantic, accessible, SEO-optimised markup
- **CSS3** — Custom properties, Grid, Flexbox, Clamp, Keyframes, Backdrop-filter
- **JavaScript (ES6+)** — Modules, IntersectionObserver, Canvas API, requestAnimationFrame

## ✦ Features

| Feature | Implementation |
|---|---|
| Particle canvas background | Custom Canvas API particle system with mouse interaction |
| Scroll reveal | IntersectionObserver with stagger delays |
| Typing text animation | Custom character-by-character typewriter engine |
| Dark / Light mode toggle | CSS custom properties + localStorage persistence |
| Scroll progress bar | Real-time scroll position → width mapping |
| Sticky nav | Glassmorphic backdrop-filter on scroll |
| Mobile drawer menu | Animated slide-in panel with backdrop |
| Project detail modals | Dynamic HTML injection with keyboard focus management |
| Animated stats counter | Ease-out number interpolation via rAF |
| Contact form validation | Client-side regex + UX toast notifications |
| Cursor glow effect | Radial gradient following mouse position |
| Loading screen | CSS keyframe bar fill + opacity fade-out |
| Scroll-to-top button | Smooth scroll + visibility toggle |

## ✦ Folder Structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css          # Core design system & components
│   ├── animations.css     # Keyframes & micro-interactions
│   └── responsive.css     # Mobile-first breakpoints
├── js/
│   ├── main.js            # App initialization, projects, modal, form
│   ├── animations.js      # ScrollReveal, CursorGlow, ParticleSystem, StatsCounter
│   ├── navigation.js      # Navigation, scroll progress, mobile menu
│   └── effects.js         # TypingEffect, ThemeManager, ripple, smooth scroll
└── assets/
    ├── images/            # SVG project previews & hero graphic
    └── resume/            # Vijay_Karthi_Resume.pdf (add your own)
```

## ✦ Running Locally

### Option A — Python (fastest, no install needed)
```bash
cd portfolio
python -m http.server 3000
# Open http://localhost:3000
```

### Option B — Node.js `npx serve`
```bash
npx serve portfolio -l 3000
# Open http://localhost:3000
```

### Option C — VS Code Live Server
Install the **Live Server** extension and click "Go Live" with `index.html` open.

## ✦ Customization Checklist

- [ ] Add `Vijay_Karthi_Resume.pdf` to `assets/resume/`
- [ ] Update LinkedIn URL in `index.html` contact section
- [ ] Update GitHub URL in `js/main.js` project data
- [ ] Add profile photo to `assets/images/` and update hero section

## ✦ Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0F1115` | Page background |
| `--bg-card` | `#1A1D23` | Cards & panels |
| `--accent-emerald` | `#0F766E` | Primary accent |
| `--accent-gold` | `#D6B25E` | Secondary accent |
| `--text-primary` | `#F5F5F4` | Headings & primary text |
| `--text-secondary` | `#A8ADB8` | Body & secondary text |

## ✦ Performance Notes

- Google Fonts loaded with `display=swap` for zero render-blocking
- Images lazy-loaded with `loading="lazy"`
- IntersectionObserver used (not scroll events) for reveal animations
- Canvas particle count auto-scales to viewport area
- Particle connection lines limited to < 90px distance
- `prefers-reduced-motion` fully honoured — all animations disabled for users who prefer reduced motion

---

Built by **Vijay Karthi** &nbsp;·&nbsp; Bangalore, India
