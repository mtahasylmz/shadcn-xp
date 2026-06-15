"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { SKINS } from "@/components/showcase/skin-switcher"

/** The hero centerpiece. The whole page re-skins when data-skin changes, so
 *  this IS the live demo: a prominent gallery rail + an auto-tour that cycles
 *  the page through every concept with a one-line vibe caption. The product
 *  performs its own promise. Stays in sync with the app-bar dropdown via a
 *  shared MutationObserver on <html data-skin>. */

const VIBES: Record<string, string> = {
  xp: "Luna bevels · glossy chrome",
  win98: "Hard 3D edges · system grey",
  aqua: "Glossy gel · candy gradients",
  macos: "Vibrancy blur · hairline calm",
  material: "Tonal surfaces · M3 elevation",
  brutalist: "Black borders · hard shadows",
  neumorphic: "Soft extruded monochrome",
  clay: "Puffy pastel 3D",
  glass: "Frosted translucent panes",
  terminal: "Phosphor green · CRT scanlines",
  cyberpunk: "Neon HUD · clipped corners",
  pixel: "8-bit stepped bevels",
  synthwave: "Outrun sunset · neon glow",
  editorial: "Ink on cream · serif voice",
  swiss: "Helvetica grid · signal red",
}

const CONCEPTS = SKINS.filter(([v]) => v !== "default" && v !== "base")
const TOUR_MS = 2200

export function SkinGallery() {
  const [skin, setSkin] = React.useState<string>("xp")
  const [playing, setPlaying] = React.useState(false)
  const railRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const sync = () => setSkin(document.documentElement.dataset.skin || "default")
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    })
    return () => mo.disconnect()
  }, [])

  // Auto-tour: advance data-skin on a timer. Reads the live attribute each tick
  // so a manual pick mid-tour continues from there rather than snapping back.
  React.useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      const cur = document.documentElement.dataset.skin || "xp"
      const i = CONCEPTS.findIndex(([v]) => v === cur)
      const next = CONCEPTS[(i + 1) % CONCEPTS.length][0]
      apply(next)
    }, TOUR_MS)
    return () => window.clearInterval(id)
  }, [playing])

  // Keep the active chip scrolled into view (during tour and on manual pick).
  React.useEffect(() => {
    const el = railRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [skin])

  function apply(next: string) {
    document.documentElement.dataset.skin = next
    try {
      localStorage.setItem("skin", next)
    } catch {}
  }

  function pick(next: string) {
    setPlaying(false)
    apply(next)
  }

  const isStock = skin === "default" || skin === "base"
  const label = isStock
    ? "Stock shadcn/ui"
    : CONCEPTS.find(([v]) => v === skin)?.[1] ?? "Windows XP"
  const vibe = isStock ? "the unmodified baseline — pick a concept →" : VIBES[skin] ?? ""

  return (
    <div className="gallery-switch">
      <div className="gallery-now">
        <button
          type="button"
          className="gallery-play"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={playing ? "Pause skin tour" : "Play skin tour"}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          <span>{playing ? "Touring" : "Tour all 15"}</span>
        </button>
        <div className="gallery-now-text">
          <span className="gallery-now-label">
            <span className="gallery-now-dot" data-playing={playing || undefined} />
            Now showing · <strong>{label}</strong>
          </span>
          <span className="gallery-now-vibe">{vibe}</span>
        </div>
      </div>

      <div className="gallery-rail" ref={railRef} role="group" aria-label="Pick a concept skin">
        {CONCEPTS.map(([value, name]) => (
          <button
            key={value}
            type="button"
            className="gallery-chip"
            data-active={skin === value || undefined}
            onClick={() => pick(value)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
