"use client"

import * as React from "react"

/** Three iframes of the SAME component strip, showing the progression:
 *  1) stock shadcn → 2) + XP tokens (what tweakcn/cssVars gives you: a flat,
 *  square recolor) → 3) + our [data-slot] overlay (the actual XP look).
 *  The jump from 2→3 is exactly the part tweakcn can't express. */
const PANES = [
  ["default", "1 · stock shadcn", "no theme"],
  ["xp-tokens", "2 · + XP tokens", "what tweakcn outputs"],
  ["xp", "3 · + our overlay", "the XP look"],
] as const

export function TokenDeltaPanel() {
  const [open, setOpen] = React.useState(false)

  return (
    <section className="compare">
      <div className="compare-head">
        <span className="compare-title">
          Tokens vs concept — where tweakcn stops
        </span>
        <button
          type="button"
          className="code-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide the delta" : "Show the delta"}
        </button>
      </div>
      {open ? (
        <div className="compare-body is-three">
          {PANES.map(([skin, title, sub]) => (
            <figure className="compare-pane" key={skin}>
              <figcaption>
                {title} <span className="compare-sub">· {sub}</span>
              </figcaption>
              <iframe title={title} src={`/embed?skin=${skin}`} />
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  )
}
