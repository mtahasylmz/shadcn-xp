# shadcn/ui — Concept Skins

A **skin engine** for [shadcn/ui](https://ui.shadcn.com): one set of *unmodified*
shadcn components, re-conceptualized by swappable CSS overlays. Not just a
re-theme (colors / fonts / radius) — each skin changes the whole **design
concept** (shape language, elevation, ornament) while the component markup,
behavior, and accessibility stay untouched and community-tested.

Flip one attribute, `data-skin` on `<html>`, and every component — including
portalled dialogs, dropdowns and tooltips — repaints.

Built with **Next.js 16 + React 19 + Tailwind v4 + shadcn (radix base)**.

## Skins

| `data-skin`   | Concept                                                             |
| ------------- | ------------------------------------------------------------------ |
| `default`     | Stock-ish shadcn baseline (the control)                            |
| `xp`          | Windows XP "Luna" — beveled putty controls, navy title gradient    |
| `brutalist`   | Hard black borders, chunky offset shadows, uppercase grotesk       |
| `neumorphic`  | Monochrome soft-UI, extruded via paired light/dark shadows         |
| `terminal`    | Phosphor green-on-black, monospace, `[ bracketed ]`, CRT scanlines |
| `glass`       | Frosted translucent panels, backdrop blur, over a vivid gradient   |

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000  (PORT=3100 pnpm dev to change)
```

Switch skins from the dropdown in the top bar. The choice persists to
`localStorage` and is applied before first paint (no flash).

## How the engine works

**Native shadcn theming only touches tokens** — CSS variables for color,
`--radius`, and fonts. That recolors and rounds, but every component keeps the
same fundamental shape. To change the *concept* you need more, without forking
the (tested) component source. The enabler: every current shadcn primitive
renders a stable **`data-slot`** attribute (plus Radix `data-state`,
`data-highlighted`, …).

So a **skin = one self-contained CSS file** under [`app/skins/`](app/skins),
scoped to `:root[data-skin="<name>"]`, that:

1. **Sets the tokens** for that concept (`:root[data-skin="x"]` outranks the
   core `:root` defaults).
2. **Restyles shape/elevation/ornament** via unlayered `[data-skin="x"]
   [data-slot="…"]` rules. Unlayered rules outrank Tailwind's `utilities`
   cascade layer, so they win cleanly without `!important`. Buttons also key off
   the `.group/button` class (it survives Radix `asChild` className merges).
3. **Repaints the generic shell** — the skin-agnostic skeleton
   (`.app` / `.stage` / `.specimen` / …) the page renders, which each skin turns
   into its signature container (XP window, terminal screen, glass slab).

**The ~10% CSS can't do** — genuinely new structure/behavior (e.g. a working
titlebar with window controls *inside* a Dialog) — is handled by a few optional
thin wrapper components, never by modifying shadcn. (Decorative chrome, like the
XP caption bar or the terminal scanlines, is done with `::before`/`::after`.)

### Add a new skin

1. Create `app/skins/myskin.css`, `@import` it in
   [`app/globals.css`](app/globals.css).
2. Add a `:root[data-skin="myskin"] { … }` token block + `[data-skin="myskin"]
   [data-slot="…"] { … }` rules.
3. Add it to `SKINS` in
   [`components/showcase/skin-switcher.tsx`](components/showcase/skin-switcher.tsx).

## Layout

```
app/
  globals.css         core: token plumbing, default skin, structural skeleton, skin @imports
  skins/*.css         one drop-in file per concept (scoped to [data-skin])
  layout.tsx          no-flash data-skin init script
  page.tsx            skin-neutral component gallery
components/
  ui/*                stock shadcn components (unmodified)
  showcase/           Specimen + SkinSwitcher (the thin wrapper layer)
```

## Component coverage

Button, Badge, Input, Textarea, Label, Checkbox, Radio Group, Switch, Select,
Card, Tabs, Accordion, Alert, Table, Dialog, Dropdown Menu, Tooltip, Popover,
Slider, Progress, Separator — each rendered under every skin. The rest of the
registry is the roadmap.

## License

The shadcn/ui components are MIT-licensed source you own. The skin engine and
concept skins are part of this project.
