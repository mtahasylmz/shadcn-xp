# Competitive analysis — how others reskin shadcn/ui

Pulled the actual registry source of two leading aesthetic registries to see how
they work, versus our swappable CSS-overlay engine.

## 8bitcn (`@8bitcn`) — the **wrapper** strategy

`shadcn add @8bitcn/button` installs `components/ui/8bit/button.tsx` with
`registryDependencies: ["button"]`, i.e. it **wraps the stock shadcn Button**:

```tsx
import { Button as ShadcnButton } from "@/components/ui/button";
// …renders <ShadcnButton> and injects ~16 absolutely-positioned <div>s
// to fake the notched pixel border + drop-shadow…
```

- Ships a tiny `retro.css` that only loads a webfont (`Press Start 2P`) + a
  `.pixelated` helper. The *shape* is all extra DOM + Tailwind utilities.
- You must import **their** `<Button>`. Per-import, **not runtime-swappable**.

## neobrutalism (`neobrutalism.dev`) — the **source-replacement** strategy

`add` installs `src/components/ui/button.tsx` as `registry:ui` — it **overwrites
the stock button** with its own `cva`:

```
border-2 border-border shadow-shadow
hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
```

on custom tokens (`--main`, `--shadow`, `--box-shadow-x/y`, `rounded-base`).
Keeps `data-slot="button"`. One aesthetic, baked into the component source; you
can't keep stock + neobrutalism side by side.

## Where we sit

| | 8bitcn | neobrutalism | **us (skin engine)** |
|---|---|---|---|
| Mechanism | wrap stock + extra DOM | replace component source | CSS overlay on stock |
| Components forked? | yes (wrappers) | yes (full) | **no** |
| Concepts at once | 1 | 1 | **many, live-swappable** |
| Upgrade base later | medium | hard | **trivial (untouched)** |
| Can change geometry/markup | **yes** | **yes** | no (CSS-reachable only) |

The aesthetics aren't novel (terminal/glass/brutalist/retro all exist). The
**mechanism** is the gap: non-invasive, multi-concept, swappable, components stay
stock and upgradeable.

## Ideas worth stealing

1. **Per-skin webfonts via CSS** (8bitcn loads Press Start 2P) — embed a real
   webfont per skin instead of leaning on system fallbacks (fixes Tahoma/Inter
   not being present on every OS). Stays pure CSS, in the skin file.
2. **neobrutalism's hover "press"** — `translate + shadow-none` on hover, not
   just `:active`. More tactile; trivial to add to our brutalist skin.
3. **A dedicated `--shadow` token** (neobrutalism) — cleaner than hardcoding the
   offset-shadow; makes the brutalist skin tweakable in one place.
4. **The honest limit they expose:** 8bitcn's notched-pixel corners need real
   DOM. Our overlay can only approximate that with multi-`box-shadow`/`clip-path`
   tricks — good enough for most, not pixel-identical. Worth documenting per skin.
