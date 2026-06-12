"use client"

import * as React from "react"

export const SKINS = [
  ["default", "Default (stock)"],
  ["base", "Base (tunable, no concept)"],
  ["xp", "Windows XP"],
  ["win98", "Windows 98"],
  ["aqua", "Mac OS X Aqua"],
  ["macos", "macOS (modern)"],
  ["material", "Material 3"],
  ["brutalist", "Brutalist"],
  ["neumorphic", "Neumorphic"],
  ["clay", "Claymorphism"],
  ["glass", "Glassmorphism"],
  ["terminal", "Terminal"],
  ["cyberpunk", "Cyberpunk"],
  ["pixel", "8-bit Pixel"],
  ["synthwave", "Synthwave"],
  ["editorial", "Editorial"],
  ["swiss", "Swiss"],
] as const

export type SkinId = (typeof SKINS)[number][0]

/** Swaps the active concept by setting data-skin on <html>. The whole skin
 *  layer is CSS scoped under [data-skin="…"], so this single attribute flip
 *  re-skins every (unmodified) component, including portalled overlays. */
export function SkinSwitcher() {
  const [skin, setSkin] = React.useState<string>("xp")

  React.useEffect(() => {
    const sync = () => setSkin(document.documentElement.dataset.skin || "xp")
    sync()
    // Keep the dropdown in sync if data-skin changes from anywhere else.
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    })
    return () => mo.disconnect()
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

/** Hero chip strip: all concepts one click away, so the breadth of the engine
 *  is visible (and provable) the moment the page loads. Same data-skin flip as
 *  the dropdown; both stay in sync via the MutationObserver. */
export function SkinStrip() {
  const [skin, setSkin] = React.useState<string>("xp")

  React.useEffect(() => {
    const sync = () => setSkin(document.documentElement.dataset.skin || "xp")
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    })
    return () => mo.disconnect()
  }, [])

  function apply(next: string) {
    document.documentElement.dataset.skin = next
    try {
      localStorage.setItem("skin", next)
    } catch {}
  }

  return (
    <div className="skin-strip" role="group" aria-label="Switch concept skin">
      {SKINS.filter(([v]) => v !== "default" && v !== "base").map(
        ([value, label]) => (
          <button
            key={value}
            type="button"
            className="skin-chip"
            data-active={skin === value || undefined}
            onClick={() => apply(value)}
          >
            {label}
          </button>
        )
      )}
    </div>
  )
}
