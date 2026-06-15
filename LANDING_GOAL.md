# GOAL: the best-looking skin showcase landing page, high UX

**Binding goal (session /goal).** Iterate the landing page (`app/page.tsx` +
`app/globals.css` shell, the chrome around the skin engine) until critic
subagents score it **≥95/100 on every axis**. Keep the generalized tri-pane
proof; the LayerLab self-composer was removed.

## Critique axes (each scored 0–100; overall = lowest)
1. **Visual design** — is it genuinely beautiful? modern, intentional,
   memorable. Would it stand among the best landing pages on the web.
2. **UX & flow** — hierarchy, scan-ability, navigation, responsiveness
   (desktop + mobile), interaction feedback, no dead ends.
3. **Message clarity** — within 5 seconds: this re-conceptualizes shadcn
   beyond what a token/theme editor can do; the proof is obvious.
4. **Craft & polish** — spacing rhythm, typographic scale, alignment,
   micro-interactions, consistency, zero rough edges or overflow.

## Hard constraints
- Don't touch the 15 skin CSS files' concept fidelity (already certified ≥95).
  The shell/landing may be restyled freely, but must stay legible under ALL
  15 skins (the whole page re-skins via data-skin).
- Stock shadcn components stay unmodified; landing chrome uses shell classes.
- No console errors; all /embed routes 200; mobile (~390px) must not overflow.

## Loop
screenshot (desktop full-page + mobile) → critic workflow (4 axes, cite
defects) → implement (coherent, single hand) → re-screenshot → re-critique →
repeat until all axes ≥95.
