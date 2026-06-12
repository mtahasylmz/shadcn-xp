"use client"

import * as React from "react"

/** Lets a parent page drive this embed live (no reloads): the LayerLab posts
 *  { type: "skin-lab", skin?, vars? } and we apply it — skin via data-skin,
 *  tokens as inline custom properties on <html> (inline wins over the skin's
 *  :root token block, which is exactly the point: your brand tokens ride
 *  along into every concept). */
export function LabListener() {
  React.useEffect(() => {
    function onMessage(e: MessageEvent) {
      const d = e.data
      if (!d || d.type !== "skin-lab") return
      const root = document.documentElement
      if (typeof d.skin === "string") root.dataset.skin = d.skin
      if (d.vars && typeof d.vars === "object") {
        for (const [k, v] of Object.entries(d.vars)) {
          if (!k.startsWith("--")) continue
          if (v === null || v === "") root.style.removeProperty(k)
          else root.style.setProperty(k, String(v))
        }
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])
  return null
}
