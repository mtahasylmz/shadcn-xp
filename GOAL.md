# Goal — what this project uniquely adds

## The north star

> **A runtime that layers complete, swappable visual _concepts_ on top of
> unmodified shadcn/ui — and lets you fine-tune the _structural_ shape of each
> one, the way tweakcn lets you fine-tune color.**

Components stay stock (untouched, upgradeable, accessible). A concept is a CSS
overlay scoped to `[data-skin]`. Many concepts coexist and swap live by one
attribute.

## What is ours vs. what is already solved

Proven empirically (see `git log`: _"prove XP is unreachable with tokens alone"_).
The same XP markup, styled with **only** what tweakcn/tokens can set
(palette, `--radius`, fonts, the full `--shadow-*` scale), comes out **dead flat**
— a square grey-and-navy theme, not Windows XP.

| Layer | Examples | Who owns it |
| --- | --- | --- |
| **Tokens** | color, one global radius, font, global shadow scale | **tweakcn / shadcn `cssVars`** — commoditized. We lean on it; we don't claim it. |
| **Shape / structure** | bevels, press-inversion (raised→sunken), per-component shape, inset fields, property-sheet tabs, `backdrop-filter` blur, scanlines, `[ brackets ]`, notched corners, window chrome | **Ours.** Not reachable by any token/theme tool — ever — because it isn't a value, it's structure/state/DOM. |

Structural reason it can't leak to tokens: `button`/`input`/`card` consume **no**
shadow utility, so shadow tokens can't even reach them; and tokens can't express
inset bevels, `:active` inversion, per-slot shape, pseudo-elements, or chrome.

## The product idea: tune the overlay like a color picker

tweakcn gives you a **spectrum picker for color**. We give you **sliders for
shape** — the structural knobs that define a concept:

- **Bevel skins (XP / 98):** bevel depth, edge highlight/shadow colors, border
  width, title-bar gradient, press-inversion on/off.
- **Brutalist:** border width, hard-shadow offset (X/Y), shadow color, hover-press
  distance, uppercase on/off.
- **Neumorphic:** extrusion distance, blur softness, light/dark shadow tint,
  concave/convex, radius.
- **Glass:** backdrop-blur amount, surface opacity, border opacity, tint,
  saturation, glow.
- **Terminal:** phosphor hue (green/amber/white), scanline intensity + gap, glow
  amount, bracket style.

Mechanically: each skin's overlay reads its shape from a small set of named CSS
variables (`--bru-offset`, `--glass-blur-px`, `--neu-distance`, …). The editor
exposes those as range/picker controls and applies them live — the exact same
move as the color tokens, but for the part tweakcn can't touch.

So a user **customizing a skin** chooses from:
1. **Tokens** (color/radius/font) — the tweakcn-style pickers (already built), and
2. **Shape params** — the structural sliders unique to that concept (this is the
   differentiator made tunable).

## The "base" skin — generic, concept-free, fully tunable (verified)

Tested the question: _can shape be tunable WITHOUT a concept?_ Answer, empirically:

- **Yes for the _continuous_ structural primitives.** `[data-skin="base"]` exposes
  universal dials — `--ui-border`, `--ui-bevel` (0=flat→3D), `--ui-elevation`,
  `--ui-blur`, `--ui-surface` (opacity), `--ui-press`, plus `--radius`. **Every
  one neutral at default**, so all-default ≈ stock ("no skin"); turning them up
  _adds_ structure. Verified: cranking bevel+elevation+border turns flat stock
  into beveled/elevated skeuomorphic controls — concept-free.
- **No for the _discrete_, concept-specific bits.** Scanlines, window titlebars,
  `[ bracketed ]` text, the exact XP gradient chrome, notched corners — these
  can't be a generic dial; they _are_ the concept.

**So the model:** a generic **base** (the continuous shape spectrum, fully
tunable, neutral=stock) + named **concepts** that are presets of that space PLUS
their irreducible extras. "Customizing a skin" = token pickers + the base dials +
any concept-specific knobs.

Portability note: the base skin's value is its `[data-slot]` rules, which apply to
ANY real shadcn app (the `.app/.specimen` shell rules are showcase-only and inert
elsewhere). Installs as a drop-in, same as a tweakcn token theme.

## Non-goals

- Competing with tweakcn on recolor. (Use it; export `cssVars`.)
- Forking components per aesthetic (8bitcn / neobrutalism do that). We never touch
  component source.
