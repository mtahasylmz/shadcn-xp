"use client"

import * as React from "react"

/** The landing proof: three iframes of the SAME component strip.
 *  1) stock shadcn → 2) + tokens (everything a theme editor like tweakcn can
 *  reach: colors, radius, fonts) → 3) + the concept overlay (bevels, chrome,
 *  press states — structure no token can express). Open by default: this IS
 *  the value argument, so it must be visible on landing. */
const PANES = [
  ["default", "1 · stock shadcn", "the components, untouched"],
  ["xp-tokens", "2 · + tokens", "ALL a theme editor (tweakcn) can reach"],
  ["xp", "3 · + concept overlay", "what only this engine adds"],
] as const

export function TokenDeltaPanel() {
  const [open, setOpen] = React.useState(true)

  return (
    <section className="compare" id="proof">
      <div className="compare-head">
        <span className="compare-title">
          The proof — same markup in all three panes
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
            {PANES.map(([skin, title, sub]) => (
              <figure className="compare-pane" key={skin}>
                <figcaption>
                  {title} <span className="compare-sub">· {sub}</span>
                </figcaption>
                <iframe title={title} src={`/embed?skin=${skin}`} />
              </figure>
            ))}
          </div>
          <p className="compare-verdict">
            Pane 2 is the ceiling of token theming: recolored, squared,
            re-fonted — still flat. The bevels, gloss, window chrome and press
            states in pane 3 are <em>structure</em>, not values: no token
            editor can emit them. That layer — swappable per concept, tunable
            via shape knobs, on unmodified shadcn — is what this project adds.
          </p>
        </>
      ) : null}
    </section>
  )
}
