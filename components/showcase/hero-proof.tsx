"use client"

import * as React from "react"

import { SKINS } from "@/components/showcase/skin-switcher"

/** The in-hero proof: the SAME stock markup rendered twice, stacked — plain
 *  shadcn vs the live skin — so the structural delta (bevels, chrome, press)
 *  is visible in the first viewport, not just claimed. Two short /embed
 *  iframes (separate documents) keep "stock" genuinely unstyled while the page
 *  is skinned; the skinned pane follows the tour. */
export function HeroProof() {
  const [skin, setSkin] = React.useState("xp")

  React.useEffect(() => {
    const sync = () => {
      const s = document.documentElement.dataset.skin || "xp"
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

  const label = SKINS.find((s) => s[0] === skin)?.[1] ?? skin

  return (
    <div className="hero-proof" inert>
      <div className="hero-stage-label">
        <span className="hero-stage-dot" /> the exact same markup, two ways
      </div>
      <div className="hero-proof-panes">
        <figure className="hero-proof-pane">
          <figcaption>
            <span className="hero-proof-tag is-stock">recolor only</span>
            <span className="hero-proof-sub">all a theme editor reaches</span>
          </figcaption>
          <div className="hero-proof-frame">
            <iframe title="Plain shadcn" src="/embed?skin=default" scrolling="no" />
          </div>
        </figure>
        <figure className="hero-proof-pane">
          <figcaption>
            <span className="hero-proof-tag is-skin">+ structure</span>
            <span className="hero-proof-sub">the {label} overlay</span>
          </figcaption>
          <div className="hero-proof-frame">
            <iframe title={`${label} skin`} src={`/embed?skin=${skin}`} scrolling="no" />
          </div>
        </figure>
      </div>
      <p className="hero-proof-cap">
        Same buttons, same code — only the right pane gains bevels, chrome and
        press physics. That layer is what this engine adds.
      </p>
    </div>
  )
}
