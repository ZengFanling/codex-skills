# Requirement Studio

> Dark-tech requirements interview engine. Powered by zfl-requirement & zfl-reqdoc methodologies.

## Design System (v2)

Redesigned with the taste-skill v1 framework:

| Parameter | Value |
|-----------|-------|
| Design Variance | 8 (Asymmetric) |
| Motion Intensity | 6 (Spring physics, micro-interactions) |
| Visual Density | 4 (Spacious, editorial feel) |

### Visual Decisions

- **Dark base** (#09090b) — never pure black, deep charcoal with subtle ambient gradients
- **Typography** — Outfit for headings, system sans for body. No Inter.
- **0 emojis** — all icons rendered as inline SVG with consistent stroke-weight
- **Liquid Glass** — sidebar + input bar use `backdrop-filter: blur(24px) saturate(180%)` with inner border refraction
- **Dot-grid background** — fixed pseudo-element overlay for tech texture
- **Spring physics** — `cubic-bezier(0.16,1,0.3,1)` on all transitions, `cubic-bezier(0.34,1.56,0.64,1)` for overshoot reveals
- **Perpetual animations** — progress bar shimmer, breathing status dots, staggered message slide-in
- **Tactile feedback** — `scale(0.97)` on button :active states

### Structure

```
requirement-studio/
├── index.html    # Self-contained single-file app
└── README.md
```

Zero dependencies. Open in any browser.
