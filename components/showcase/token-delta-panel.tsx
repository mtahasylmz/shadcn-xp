"use client"

import * as React from "react"

import { SKINS } from "@/components/showcase/skin-switcher"

/** The landing proof, generalized to EVERY concept: three iframes of the SAME
 *  component strip for whichever skin is active.
 *  1) stock shadcn → 2) the active skin's TOKENS ONLY (captured live from its
 *  :root block and applied to a stock document — exactly what a theme editor
 *  like tweakcn can replicate) → 3) the full concept overlay.
 *  Switch skins anywhere on the page and the proof follows. */

export function TokenDeltaPanel() {
  const [open, setOpen] = React.useState(true)
  const [skin, setSkin] = React.useState("xp")

  React.useEffect(() => {
    const sync = () => {
      const s = document.documentElement.dataset.skin || "xp"
      // default/base have no concept overlay to prove — fall back to xp.
      setSkin(s === "default" || s === "base" ? "xp" : s)
    }
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    })
    return () => mo.disconnect()
  }, [])

  const label =
    SKINS.find(([v]) => v === skin)?.[1] ?? skin

  const panes = [
    ["/embed?skin=default", "1 · stock shadcn", "the components, untouched"],
    [
      `/embed?skin=${skin}&tokensOnly=1`,
      `2 · + ${label} tokens`,
      "ALL a theme editor (tweakcn) can reach",
    ],
    [
      `/embed?skin=${skin}`,
      "3 · + concept overlay",
      "what only this engine adds",
    ],
  ] as const

  return (
    <section className="compare">
      <div className="compare-head">
        <span className="compare-title">
          The proof for <em>{label}</em> — same markup in all three panes
        </span>
        <button
          type="button"
          className="code-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      {open ? (
        <>
          <div className="compare-body is-three">
            {panes.map(([src, title, sub]) => (
              <figure className="compare-pane" key={src}>
                <figcaption>
                  {title} <span className="compare-sub">· {sub}</span>
                </figcaption>
                <iframe title={title} src={src} />
              </figure>
            ))}
          </div>
          <p className="compare-verdict">
            Pane 2 is the ceiling of token theming: this concept&apos;s colors,
            radius and fonts, lifted live from its token block and applied to
            stock shadcn — still flat. Everything pane 3 adds is{" "}
            <em>structure</em>, not values: no token editor can emit it. That
            layer — swappable per concept, tunable via shape knobs, on
            unmodified shadcn — is what this project adds.
          </p>
        </>
      ) : null}
    </section>
  )
}
