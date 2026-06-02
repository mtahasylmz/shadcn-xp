# shadcn/ui — Windows XP Edition

A showcase site that reskins the [shadcn/ui](https://ui.shadcn.com) component
library in the **Windows XP "Luna"** theme — beveled controls, putty greys, the
navy→cerulean title gradient, and white drop-shadowed menus.

Built with **Next.js 16 + React 19 + Tailwind v4 + shadcn (radix base)**. The
components are the real, unmodified shadcn source; all of the XP look lives in a
single theming layer.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000  (use PORT=3100 pnpm dev to change)
```

## How the theme works

Everything is driven from [`app/globals.css`](app/globals.css). Two mechanisms:

1. **Color via semantic tokens.** shadcn's CSS variables (`--background`,
   `--card`, `--primary`, `--accent`, …) are remapped to the XP palette
   (`#d4d0c8` desktop, `#ece9d8` control face, `#0a246a`/`#3a6ea5` title
   gradient, `#316ac5` selection). The radius scale is zeroed — XP is square.

2. **Shape + bevel via an unlayered override block.** Tailwind utilities live in
   the `utilities` cascade layer; an *unlayered* rule outranks any layer, so
   `[data-slot="…"]` selectors reliably restyle components without forking their
   source or sprinkling `!important`. Buttons additionally key off the
   `.group/button` class (emitted by `buttonVariants`) because Radix `asChild`
   triggers — Dialog, Tooltip, Popover — overwrite `data-slot` on merge, but the
   className always survives.

The reusable bevel recipes (`--xp-bevel-raised`, `--xp-bevel-sunken`,
`--xp-bevel-field`) reproduce the pixel highlight/shadow edges of Luna controls.

Window chrome (title bar, menubar, captioned panels, status bar, explorer nav,
green CRT terminal) is a small set of helper classes + the
[`components/xp/chrome.tsx`](components/xp/chrome.tsx) primitives, matching the
aesthetic of the bosphorify.com site this theme is derived from.

XP is light-only: [`components/theme-provider.tsx`](components/theme-provider.tsx)
forces the light theme so the system preference can't flip it.

## Component coverage

**Core set (current):** Button, Badge, Input, Textarea, Label, Checkbox,
Radio Group, Switch, Select, Card, Tabs, Accordion, Alert, Table, Dialog,
Dropdown Menu, Tooltip, Popover, Slider, Progress, Separator.

**Roadmap (the rest of the registry):** Alert Dialog, Sheet, Drawer, Command,
Combobox, Calendar, Date Picker, Carousel, Chart, Sidebar, Navigation Menu,
Breadcrumb, Pagination, Menubar, Context Menu, Hover Card, Avatar, Skeleton,
Sonner (toast), Resizable, Scroll Area, Collapsible, Toggle / Toggle Group,
Input OTP, Aspect Ratio, Empty, Field / Input Group, and more.

## License

The shadcn/ui components are MIT-licensed source you own. The XP theming layer is
part of this project.
