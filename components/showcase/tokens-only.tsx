"use client"

import * as React from "react"

/** Generalizes the tri-pane middle pane to ANY skin. With ?tokensOnly=1 the
 *  embed renders "what a token editor could replicate" for the ?skin= concept:
 *  we let the skin apply, capture its RESOLVED token values (colors, radius,
 *  fonts — exactly the surface tweakcn/cssVars can reach), then flip the
 *  document to the stock skin and re-apply only those tokens inline. The
 *  overlay (bevels/chrome/glow) vanishes; the token half stays. */

const TOKENS = [
  "--background", "--foreground",
  "--card", "--card-foreground",
  "--popover", "--popover-foreground",
  "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground",
  "--muted", "--muted-foreground",
  "--accent", "--accent-foreground",
  "--destructive", "--destructive-foreground",
  "--border", "--input", "--ring",
  "--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5",
  "--radius",
  "--app-font-sans", "--app-font-heading", "--app-font-mono", "--app-font-size",
]

export function TokensOnly() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.get("tokensOnly")) return
    const root = document.documentElement
    // The init script already set data-skin from ?skin= — its full CSS is
    // active, so computed values ARE the skin's tokens.
    const cs = getComputedStyle(root)
    const captured: Array<[string, string]> = []
    for (const t of TOKENS) {
      const v = cs.getPropertyValue(t).trim()
      if (v) captured.push([t, v])
    }
    root.dataset.skin = "default"
    for (const [t, v] of captured) root.style.setProperty(t, v)
    root.style.visibility = "" // reveal (hidden by the init script)
  }, [])
  return null
}
