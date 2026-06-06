"use client"

import * as React from "react"

import { SKINS } from "./skin-switcher"

/** Stock-vs-skinned, side by side. Two iframes of /embed render the SAME
 *  component strip — one pinned to ?skin=default, one to the active skin.
 *  Iframes (separate documents) sidestep the html-level [data-skin] scoping,
 *  so "stock" is genuinely unstyled even while the page is skinned. */
export function ComparePanel() {
  const [open, setOpen] = React.useState(false)
  const [skin, setSkin] = React.useState("xp")

  React.useEffect(() => {
    setSkin(document.documentElement.dataset.skin || "xp")
    const mo = new MutationObserver(() =>
      setSkin(document.documentElement.dataset.skin || "xp")
    )
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    })
    return () => mo.disconnect()
  }, [])

  const label = (id: string) => SKINS.find((s) => s[0] === id)?.[1] ?? id

  return (
    <section className="compare">
      <div className="compare-head">
        <span className="compare-title">Stock vs skinned — same markup</span>
        <button
          type="button"
          className="code-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide compare" : "Compare with stock"}
        </button>
      </div>
      {open ? (
        <div className="compare-body">
          <figure className="compare-pane">
            <figcaption>Default · stock shadcn/ui</figcaption>
            <iframe title="Stock shadcn" src="/embed?skin=default" />
          </figure>
          <figure className="compare-pane">
            <figcaption>{label(skin)} · this skin</figcaption>
            <iframe
              title={`${label(skin)} skin`}
              src={`/embed?skin=${skin}`}
            />
          </figure>
        </div>
      ) : null}
    </section>
  )
}
