"use client"

import * as React from "react"

/** A lightweight, native token editor wired to the skin engine — the token
 *  half of what tweakcn does (https://tweakcn.com, Apache-2.0), but applied
 *  live to the ACTIVE skin so you watch tokens AND the [data-slot] overlay
 *  update together. Edits are inline custom props on <html>, scoped per skin
 *  (re-applied whenever data-skin changes). Export = cssVars / registry:theme. */

type Field = { label: string; varName: string; kind: "color" | "radius" | "font" }

const FIELDS: Field[] = [
  { label: "Background", varName: "--background", kind: "color" },
  { label: "Foreground", varName: "--foreground", kind: "color" },
  { label: "Card", varName: "--card", kind: "color" },
  { label: "Primary", varName: "--primary", kind: "color" },
  { label: "Primary text", varName: "--primary-foreground", kind: "color" },
  { label: "Secondary", varName: "--secondary", kind: "color" },
  { label: "Accent", varName: "--accent", kind: "color" },
  { label: "Accent text", varName: "--accent-foreground", kind: "color" },
  { label: "Muted text", varName: "--muted-foreground", kind: "color" },
  { label: "Border", varName: "--border", kind: "color" },
  { label: "Destructive", varName: "--destructive", kind: "color" },
  { label: "Ring", varName: "--ring", kind: "color" },
  { label: "Radius (px)", varName: "--radius", kind: "radius" },
  { label: "Font", varName: "--app-font-sans", kind: "font" },
]

const MANAGED = FIELDS.map((f) => f.varName)

function hexOf(value: string) {
  const v = value.trim()
  return /^#[0-9a-fA-F]{6}/.test(v) ? v.slice(0, 7) : "#888888"
}

export function TokenEditor() {
  const [open, setOpen] = React.useState(false)
  const [skin, setSkin] = React.useState("xp")
  const [fields, setFields] = React.useState<Record<string, string>>({})
  const editsRef = React.useRef<Record<string, Record<string, string>>>({})
  const baseRef = React.useRef<Record<string, Record<string, string>>>({})

  // Read a skin's pristine base values, then re-apply its edits, then sync inputs.
  const loadSkin = React.useCallback((next: string) => {
    const root = document.documentElement
    MANAGED.forEach((v) => root.style.removeProperty(v)) // clear our overrides
    const cs = getComputedStyle(root)
    const base: Record<string, string> = {}
    MANAGED.forEach((v) => (base[v] = cs.getPropertyValue(v).trim()))
    baseRef.current[next] = base
    const edits = editsRef.current[next] ?? {}
    Object.entries(edits).forEach(([v, val]) => root.style.setProperty(v, val))
    const merged: Record<string, string> = {}
    MANAGED.forEach((v) => (merged[v] = edits[v] ?? base[v]))
    setFields(merged)
  }, [])

  React.useEffect(() => {
    const cur = document.documentElement.dataset.skin || "xp"
    setSkin(cur)
    loadSkin(cur)
    const mo = new MutationObserver(() => {
      const s = document.documentElement.dataset.skin || "xp"
      setSkin(s)
      loadSkin(s)
    })
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-skin"],
    })
    return () => mo.disconnect()
  }, [loadSkin])

  function setVar(varName: string, raw: string, kind: Field["kind"]) {
    const value = kind === "radius" ? `${raw.replace(/[^0-9.]/g, "") || 0}px` : raw
    const edits = (editsRef.current[skin] ??= {})
    edits[varName] = value
    document.documentElement.style.setProperty(varName, value)
    setFields((f) => ({ ...f, [varName]: kind === "radius" ? value : value }))
  }

  function reset() {
    const root = document.documentElement
    MANAGED.forEach((v) => root.style.removeProperty(v))
    editsRef.current[skin] = {}
    loadSkin(skin)
  }

  function exportJson() {
    const light: Record<string, string> = {}
    const theme: Record<string, string> = {}
    FIELDS.forEach(({ varName, kind }) => {
      const val = fields[varName] ?? ""
      if (kind === "color") light[varName.replace(/^--/, "")] = val
      else if (kind === "radius") theme["radius"] = val
      else theme["font-sans"] = val
    })
    return JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: `theme-${skin}-custom`,
        type: "registry:theme",
        cssVars: { theme, light },
      },
      null,
      2
    )
  }

  const [copied, setCopied] = React.useState(false)
  function copy() {
    navigator.clipboard?.writeText(exportJson()).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      },
      () => {}
    )
  }

  return (
    <section className="editor">
      <div className="compare-head">
        <span className="compare-title">
          Token editor — tune the <code>{skin}</code> theme, live
        </span>
        <button
          type="button"
          className="code-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide editor" : "Edit tokens"}
        </button>
      </div>

      {open ? (
        <div className="editor-body">
          <p className="editor-note">
            This edits the token half only (what tweakcn / a{" "}
            <code>registry:theme</code> covers). The overlay reads these same
            tokens for color — change Primary, Accent or Background and the whole
            page (this skin&apos;s bevels/blur included) recolors live. Where a
            skin deliberately hardcodes a value (e.g. a fixed radius), the token
            won&apos;t override it — that&apos;s the token-vs-overlay line.{" "}
            <a
              href="https://tweakcn.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Token-editing concept inspired by tweakcn (Apache-2.0).
            </a>
          </p>

          <div className="editor-grid">
            {FIELDS.map((f) => (
              <label key={f.varName} className="token-row">
                <span className="token-label">{f.label}</span>
                {f.kind === "color" ? (
                  <span className="token-inputs">
                    <input
                      type="color"
                      value={hexOf(fields[f.varName] ?? "#888888")}
                      onChange={(e) => setVar(f.varName, e.target.value, f.kind)}
                    />
                    <input
                      type="text"
                      className="token-text"
                      value={fields[f.varName] ?? ""}
                      onChange={(e) => setVar(f.varName, e.target.value, f.kind)}
                    />
                  </span>
                ) : f.kind === "radius" ? (
                  <input
                    type="number"
                    min={0}
                    max={40}
                    className="token-text"
                    value={parseFloat(fields[f.varName] ?? "0") || 0}
                    onChange={(e) => setVar(f.varName, e.target.value, f.kind)}
                  />
                ) : (
                  <input
                    type="text"
                    className="token-text"
                    value={fields[f.varName] ?? ""}
                    onChange={(e) => setVar(f.varName, e.target.value, f.kind)}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="editor-actions">
            <button type="button" className="code-toggle" onClick={copy}>
              {copied ? "Copied!" : "Copy registry:theme"}
            </button>
            <button type="button" className="code-toggle" onClick={reset}>
              Reset
            </button>
          </div>

          <div className="skin-code">
            <div className="skin-code-note">
              Export — install with <code>npx shadcn add</code> (or paste the
              cssVars into your globals):
            </div>
            <pre>{exportJson()}</pre>
          </div>
        </div>
      ) : null}
    </section>
  )
}
