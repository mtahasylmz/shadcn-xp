"use client"

import * as React from "react"

export const SKINS = [
  ["default", "Default (stock)"],
  ["xp", "Windows XP"],
  ["brutalist", "Brutalist"],
  ["neumorphic", "Neumorphic"],
  ["terminal", "Terminal"],
  ["glass", "Glassmorphism"],
] as const

export type SkinId = (typeof SKINS)[number][0]

/** Swaps the active concept by setting data-skin on <html>. The whole skin
 *  layer is CSS scoped under [data-skin="…"], so this single attribute flip
 *  re-skins every (unmodified) component, including portalled overlays. */
export function SkinSwitcher() {
  const [skin, setSkin] = React.useState<string>("xp")

  React.useEffect(() => {
    setSkin(document.documentElement.dataset.skin || "xp")
  }, [])

  function apply(next: string) {
    setSkin(next)
    document.documentElement.dataset.skin = next
    try {
      localStorage.setItem("skin", next)
    } catch {}
  }

  return (
    <select
      className="skin-select"
      value={skin}
      onChange={(e) => apply(e.target.value)}
      aria-label="Choose a skin"
    >
      {SKINS.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
