"use client"

import * as React from "react"

/** Pull the exact rules the active skin layers on top of a component, straight
 *  from the live stylesheet — so "Show code" shows the REAL overlay, not a
 *  hand-written copy. Matches [data-skin="<skin>"] rules that touch any of the
 *  given data-slots (plus the .group/button hook for buttons). */
function collectSkinCss(skin: string, slots: string[]): string[] {
  if (!skin || skin === "default") return []

  const matchesSlot = (selRaw: string) => {
    const sel = selRaw.replace(/\\/g, "")
    if (!sel.includes(`[data-skin="${skin}"]`)) return false
    return slots.some((slot) =>
      slot === "button"
        ? sel.includes("group/button") || sel.includes('[data-slot="button"]')
        : sel.includes(`[data-slot="${slot}"]`)
    )
  }

  const format = (cssText: string) => {
    const open = cssText.indexOf("{")
    if (open === -1) return cssText
    const sel = cssText.slice(0, open).trim()
    const body = cssText.slice(open + 1, cssText.lastIndexOf("}")).trim()
    const decls = body
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => `  ${d};`)
      .join("\n")
    return `${sel} {\n${decls}\n}`
  }

  const out: string[] = []
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue // cross-origin (e.g. a webfont sheet)
    }
    for (const rule of Array.from(rules)) {
      const sel = (rule as CSSStyleRule).selectorText
      if (sel && matchesSlot(sel)) out.push(format((rule as CSSStyleRule).cssText))
    }
  }
  return out
}

/** A skin-agnostic component showcase block, with a "Show code" disclosure that
 *  proves the markup is stock and only CSS is layered per skin. */
export function Specimen({
  id,
  title,
  tag,
  slots = [],
  children,
}: {
  id: string
  title: string
  tag?: string
  slots?: string[]
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [skin, setSkin] = React.useState("")
  const [rules, setRules] = React.useState<string[]>([])

  function toggle() {
    if (!open) {
      const current = document.documentElement.dataset.skin || "default"
      setSkin(current)
      setRules(collectSkinCss(current, slots))
    }
    setOpen((o) => !o)
  }

  return (
    <section id={id} className="specimen">
      <div className="specimen-head">
        <span className="specimen-title">{title}</span>
        <span className="specimen-head-right">
          {tag ? <span className="specimen-tag">{tag}</span> : null}
          {slots.length ? (
            <button
              type="button"
              className="code-toggle"
              aria-expanded={open}
              onClick={toggle}
            >
              {open ? "Hide code" : "Show code"}
            </button>
          ) : null}
        </span>
      </div>

      <div className="specimen-body">{children}</div>

      {open ? (
        <div className="skin-code">
          <div className="skin-code-note">
            Same stock markup in every skin —{" "}
            <code>data-skin=&quot;{skin}&quot;</code> only layers the CSS below.
          </div>
          <pre>
            {rules.length
              ? rules.join("\n\n")
              : skin === "default"
                ? `/* "default" skin: no overlay at all — this is stock shadcn/ui. */`
                : `/* "${skin}" adds no per-component CSS for ${title}. */\n/* It's stock shadcn, recolored only by this skin's design tokens. */`}
          </pre>
        </div>
      ) : null}
    </section>
  )
}
