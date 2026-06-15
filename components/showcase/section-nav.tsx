"use client"

import * as React from "react"

/** Scroll-spy navigation, shared by the desktop sidebar and the mobile rail.
 *  An IntersectionObserver tracks which section owns the viewport and marks the
 *  matching link active (brand accent). Covers the story sections AND the 15
 *  component specimens, so the whole journey is navigable — and the mobile
 *  variant restores wayfinding that the hidden sidebar dropped. */

export const SECTIONS: ReadonlyArray<readonly [id: string, label: string]> = [
  ["top", "Overview"],
  ["proof", "The proof"],
  ["try", "Try it live"],
  ["buttons", "Buttons"],
  ["badges", "Badges"],
  ["inputs", "Text Fields"],
  ["selection", "Selection"],
  ["select", "Select"],
  ["card", "Card"],
  ["tabs", "Tabs"],
  ["accordion", "Accordion"],
  ["alert", "Alerts"],
  ["table", "Table"],
  ["dialog", "Dialog"],
  ["menu", "Dropdown Menu"],
  ["overlays", "Tooltip & Popover"],
  ["ranges", "Slider & Progress"],
  ["chart", "Chart"],
]

function useScrollSpy() {
  const [active, setActive] = React.useState<string>("top")
  React.useEffect(() => {
    const seen = new Map<string, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.set(e.target.id, e.intersectionRatio)
          else seen.delete(e.target.id)
        }
        // pick the section nearest the top that is currently visible
        let best: string | null = null
        for (const [id] of SECTIONS) {
          if (seen.has(id)) {
            best = id
            break
          }
        }
        if (best) setActive(best)
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0, 0.1] }
    )
    for (const [id] of SECTIONS) {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    }
    return () => obs.disconnect()
  }, [])
  return active
}

const STORY_IDS = new Set(["top", "proof", "try"])

export function SectionNav() {
  const active = useScrollSpy()
  const story = SECTIONS.filter(([id]) => STORY_IDS.has(id))
  const components = SECTIONS.filter(([id]) => !STORY_IDS.has(id))

  const link = ([id, label]: readonly [string, string]) => (
    <a
      key={id}
      href={`#${id}`}
      data-active={active === id || undefined}
      aria-current={active === id ? "true" : undefined}
    >
      {label}
    </a>
  )

  return (
    <nav className="app-nav-inner" aria-label="Sections">
      <span className="app-nav-title">The story</span>
      {story.map(link)}
      <span className="app-nav-title app-nav-title-mt">The components</span>
      {components.map(link)}
    </nav>
  )
}

export function MobileSectionNav() {
  const active = useScrollSpy()
  const railRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = railRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [active])

  const firstComponentId = SECTIONS.find(([id]) => !STORY_IDS.has(id))?.[0]

  return (
    <div className="mobile-nav" ref={railRef} aria-label="Sections">
      <span className="mobile-nav-group">Story</span>
      {SECTIONS.map(([id, label]) => (
        <React.Fragment key={id}>
          {id === firstComponentId ? (
            <span className="mobile-nav-group">Components</span>
          ) : null}
          <a
            href={`#${id}`}
            className="mobile-nav-chip"
            data-active={active === id || undefined}
            aria-current={active === id ? "true" : undefined}
          >
            {label}
          </a>
        </React.Fragment>
      ))}
    </div>
  )
}
