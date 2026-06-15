"use client"

import * as React from "react"

/** A lightweight, native editor wired to the skin engine.
 *  - TOKENS (color/radius/font): the token half, what tweakcn / a
 *    registry:theme covers — exported as cssVars.
 *  - SHAPE: the part tweakcn CAN'T reach — each concept's structural knobs
 *    (bevel/shadow/blur/extrusion) exposed as sliders, the spectrum-picker
 *    equivalent for shape. Both apply live as inline custom props on <html>,
 *    scoped to the active skin. */

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

type ShapeParam = {
  label: string
  varName: string
  min: number
  max: number
  step: number
  unit: string
}

// The structural knobs — the part no token/theme tool can express.
const SHAPE_PARAMS: Record<string, ShapeParam[]> = {
  // Generic, concept-free dials. Neutral at default = stock; turn up to ADD
  // structure (bevel→skeuomorphic, border+elevation→brutalist, blur+low
  // opacity→glass). Concepts are presets of these + their irreducible extras.
  base: [
    { label: "Border width", varName: "--ui-border", min: 0, max: 4, step: 1, unit: "px" },
    { label: "Bevel (3D)", varName: "--ui-bevel", min: 0, max: 3, step: 1, unit: "" },
    { label: "Elevation", varName: "--ui-elevation", min: 0, max: 12, step: 1, unit: "" },
    { label: "Frost blur", varName: "--ui-blur", min: 0, max: 24, step: 1, unit: "px" },
    { label: "Surface opacity", varName: "--ui-surface", min: 0.3, max: 1, step: 0.05, unit: "" },
    { label: "Press depth", varName: "--ui-press", min: 0, max: 4, step: 1, unit: "px" },
  ],
  xp: [
    { label: "Control radius", varName: "--xp-radius", min: 0, max: 8, step: 1, unit: "px" },
    { label: "Window corner radius", varName: "--xp-window-radius", min: 0, max: 16, step: 1, unit: "px" },
    { label: "Bevel thickness", varName: "--xp-bevel", min: 1, max: 3, step: 1, unit: "px" },
    { label: "Title bar gloss", varName: "--xp-titlebar-gloss", min: 0, max: 1, step: 0.05, unit: "" },
  ],
  win98: [
    { label: "Bevel thickness", varName: "--w98-bevel", min: 1, max: 4, step: 1, unit: "px" },
    { label: "Window drop-shadow", varName: "--w98-window-drop", min: 0, max: 8, step: 1, unit: "px" },
  ],
  aqua: [
    { label: "Gel gloss", varName: "--aqua-gloss", min: 0, max: 1, step: 0.05, unit: "" },
    { label: "Control radius", varName: "--aqua-radius-control", min: 0, max: 999, step: 1, unit: "px" },
    { label: "Surface radius", varName: "--aqua-radius-surface", min: 0, max: 24, step: 1, unit: "px" },
    { label: "Shadow strength", varName: "--aqua-shadow-strength", min: 0, max: 0.6, step: 0.02, unit: "" },
  ],
  macos: [
    { label: "Control radius", varName: "--mac-radius", min: 0, max: 16, step: 1, unit: "px" },
    { label: "Surface radius bump", varName: "--mac-surface-bump", min: 0, max: 14, step: 1, unit: "px" },
    { label: "Elevation", varName: "--mac-elevation", min: 0, max: 24, step: 1, unit: "" },
    { label: "Vibrancy blur", varName: "--mac-vibrancy-blur", min: 0, max: 40, step: 1, unit: "px" },
  ],
  material: [
    { label: "Small shape", varName: "--md-shape-sm", min: 0, max: 16, step: 1, unit: "px" },
    { label: "Control shape", varName: "--md-shape", min: 4, max: 28, step: 1, unit: "px" },
    { label: "Large shape", varName: "--md-shape-lg", min: 8, max: 40, step: 1, unit: "px" },
    { label: "Elevation", varName: "--md-elevation", min: 0, max: 16, step: 1, unit: "" },
  ],
  brutalist: [
    { label: "Shadow offset", varName: "--bru-offset", min: 0, max: 12, step: 1, unit: "px" },
    { label: "Border width", varName: "--bru-border", min: 1, max: 6, step: 1, unit: "px" },
    { label: "Corner radius", varName: "--bru-radius", min: 0, max: 16, step: 1, unit: "px" },
    { label: "Paper-grid spacing", varName: "--bru-grid", min: 8, max: 48, step: 2, unit: "px" },
  ],
  neumorphic: [
    { label: "Extrusion", varName: "--neu-distance", min: 2, max: 14, step: 1, unit: "px" },
    { label: "Softness", varName: "--neu-blur", min: 4, max: 30, step: 1, unit: "px" },
    { label: "Contrast", varName: "--neu-tint", min: 0, max: 1, step: 0.05, unit: "" },
    { label: "Container elevation", varName: "--neu-elevate", min: 1, max: 3, step: 0.1, unit: "x" },
  ],
  clay: [
    { label: "Puffiness", varName: "--clay-puff", min: 3, max: 16, step: 1, unit: "" },
    { label: "Shadow alpha", varName: "--clay-shadow-alpha", min: 0.1, max: 0.5, step: 0.02, unit: "" },
    { label: "Top sheen", varName: "--clay-highlight", min: 0.4, max: 1, step: 0.02, unit: "" },
  ],
  glass: [
    { label: "Frost blur", varName: "--glass-blur-px", min: 0, max: 40, step: 1, unit: "px" },
    { label: "Saturation", varName: "--glass-saturate", min: 100, max: 250, step: 5, unit: "%" },
    { label: "Surface opacity", varName: "--glass-alpha", min: 0.04, max: 0.3, step: 0.01, unit: "" },
    { label: "Border opacity", varName: "--glass-border-alpha", min: 0.1, max: 0.6, step: 0.02, unit: "" },
  ],
  terminal: [
    { label: "Phosphor glow", varName: "--term-glow", min: 0, max: 24, step: 1, unit: "px" },
    { label: "Text glow", varName: "--term-text-glow", min: 0, max: 1, step: 0.05, unit: "" },
    { label: "Scanline darkness", varName: "--term-scanline", min: 0, max: 0.6, step: 0.02, unit: "" },
    { label: "Scanline pitch", varName: "--term-scanline-gap", min: 2, max: 8, step: 1, unit: "px" },
  ],
  cyberpunk: [
    { label: "Panel notch", varName: "--cy-notch", min: 0, max: 24, step: 1, unit: "px" },
    { label: "Control notch", varName: "--cy-notch-sm", min: 0, max: 16, step: 1, unit: "px" },
    { label: "Neon glow", varName: "--cy-glow", min: 0, max: 24, step: 1, unit: "px" },
    { label: "Border width", varName: "--cy-border-width", min: 1, max: 4, step: 1, unit: "px" },
  ],
  pixel: [
    { label: "Pixel unit", varName: "--px", min: 2, max: 8, step: 1, unit: "px" },
    { label: "Corner notch step", varName: "--px-step", min: 0, max: 6, step: 1, unit: "px" },
    { label: "CRT scanlines", varName: "--scanline-opacity", min: 0, max: 0.4, step: 0.02, unit: "" },
  ],
  synthwave: [
    { label: "Neon glow", varName: "--sw-glow", min: 0, max: 24, step: 1, unit: "px" },
    { label: "Control radius", varName: "--sw-radius", min: 0, max: 16, step: 1, unit: "px" },
    { label: "Surface radius", varName: "--sw-radius-lg", min: 0, max: 28, step: 1, unit: "px" },
    { label: "Border width", varName: "--sw-border-w", min: 1, max: 4, step: 1, unit: "px" },
  ],
  editorial: [
    { label: "Hairline rule", varName: "--ed-rule", min: 1, max: 3, step: 0.5, unit: "px" },
    { label: "Heavy rule", varName: "--ed-rule-heavy", min: 1, max: 5, step: 0.5, unit: "px" },
    { label: "Corner radius", varName: "--ed-radius", min: 0, max: 8, step: 1, unit: "px" },
    { label: "Letterpress offset", varName: "--ed-shadow-offset", min: 0, max: 10, step: 1, unit: "px" },
  ],
  swiss: [
    { label: "Hairline rule", varName: "--sw-rule", min: 0.5, max: 3, step: 0.5, unit: "px" },
    { label: "Bold rule", varName: "--sw-rule-bold", min: 1, max: 6, step: 0.5, unit: "px" },
    { label: "Accent underline", varName: "--sw-rule-accent", min: 1, max: 8, step: 1, unit: "px" },
    { label: "Focus ring width", varName: "--sw-focus-width", min: 1, max: 5, step: 1, unit: "px" },
  ],
}

const TOKEN_VARS = FIELDS.map((f) => f.varName)
const shapeFor = (skin: string) => SHAPE_PARAMS[skin] ?? []
const managedFor = (skin: string) => [...TOKEN_VARS, ...shapeFor(skin).map((s) => s.varName)]

function hexOf(value: string) {
  const v = value.trim()
  return /^#[0-9a-fA-F]{6}/.test(v) ? v.slice(0, 7) : "#888888"
}

export function TokenEditor() {
  const [open, setOpen] = React.useState(false)
  const [skin, setSkin] = React.useState("xp")
  const [fields, setFields] = React.useState<Record<string, string>>({})
  const editsRef = React.useRef<Record<string, Record<string, string>>>({})

  const loadSkin = React.useCallback((next: string) => {
    const root = document.documentElement
    const managed = managedFor(next)
    managed.forEach((v) => root.style.removeProperty(v))
    const cs = getComputedStyle(root)
    const base: Record<string, string> = {}
    managed.forEach((v) => (base[v] = cs.getPropertyValue(v).trim()))
    const edits = editsRef.current[next] ?? {}
    Object.entries(edits).forEach(([v, val]) => root.style.setProperty(v, val))
    const merged: Record<string, string> = {}
    managed.forEach((v) => (merged[v] = edits[v] ?? base[v]))
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
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-skin"] })
    return () => mo.disconnect()
  }, [loadSkin])

  function applyVar(varName: string, value: string) {
    ;(editsRef.current[skin] ??= {})[varName] = value
    document.documentElement.style.setProperty(varName, value)
    setFields((f) => ({ ...f, [varName]: value }))
  }

  function setToken(varName: string, raw: string, kind: Field["kind"]) {
    applyVar(varName, kind === "radius" ? `${raw.replace(/[^0-9.]/g, "") || 0}px` : raw)
  }
  function setShape(p: ShapeParam, raw: string) {
    // "x" is a display-only multiplier label, NOT a CSS unit — appending it
    // (e.g. --neu-elevate: "3x") makes calc(6px * 3x) invalid and silently
    // drops the property, so the knob would break the shadow it controls.
    const cssUnit = p.unit === "x" ? "" : p.unit
    applyVar(p.varName, `${raw}${cssUnit}`)
  }

  function reset() {
    const root = document.documentElement
    managedFor(skin).forEach((v) => root.style.removeProperty(v))
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
    navigator.clipboard?.writeText(exportJson()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }, () => {})
  }

  const shapeParams = shapeFor(skin)

  return (
    <section className="editor">
      <div className="compare-head">
        <span className="compare-title">
          Customize the <code>{skin}</code> skin, live
        </span>
        <button
          type="button"
          className="code-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide editor" : "Customize"}
        </button>
      </div>

      {open ? (
        <div className="editor-body">
          <p className="editor-note">
            <strong>Tokens</strong> (below) are the half tweakcn / a{" "}
            <code>registry:theme</code> covers.{" "}
            {shapeParams.length ? (
              <>
                <strong>Shape</strong> is the part no token tool can reach — this
                skin&apos;s structural knobs, on a spectrum just like color. Drag
                them and watch the concept itself change.
              </>
            ) : (
              <>This skin&apos;s shape is fixed CSS; the swatches recolor it live.</>
            )}{" "}
            <a href="https://tweakcn.com" target="_blank" rel="noreferrer noopener">
              Token editing inspired by tweakcn (Apache-2.0).
            </a>
          </p>

          {shapeParams.length ? (
            <>
              <div className="editor-section-label">Shape — the part tweakcn can&apos;t do</div>
              <div className="shape-grid">
                {shapeParams.map((p) => {
                  const val = parseFloat(fields[p.varName] ?? "0") || 0
                  const pct = ((val - p.min) / (p.max - p.min)) * 100
                  return (
                    <label key={p.varName} className="shape-row">
                      <span className="token-label">{p.label}</span>
                      <input
                        className="shape-slider"
                        type="range"
                        min={p.min}
                        max={p.max}
                        step={p.step}
                        value={val}
                        onChange={(e) => setShape(p, e.target.value)}
                        style={{ "--range-pct": `${pct}%` } as React.CSSProperties}
                      />
                      <span className="shape-value">
                        {val.toFixed(p.step < 1 ? 2 : 0)}
                        {p.unit}
                      </span>
                    </label>
                  )
                })}
              </div>
            </>
          ) : null}

          <div className="editor-section-label">Tokens — color · radius · font</div>
          <div className="editor-grid">
            {FIELDS.map((f) => (
              <label key={f.varName} className="token-row">
                <span className="token-label">{f.label}</span>
                {f.kind === "color" ? (
                  <span className="token-inputs">
                    <input
                      type="color"
                      value={hexOf(fields[f.varName] ?? "#888888")}
                      onChange={(e) => setToken(f.varName, e.target.value, f.kind)}
                    />
                    <input
                      type="text"
                      className="token-text"
                      value={fields[f.varName] ?? ""}
                      onChange={(e) => setToken(f.varName, e.target.value, f.kind)}
                    />
                  </span>
                ) : f.kind === "radius" ? (
                  <input
                    type="number"
                    min={0}
                    max={40}
                    className="token-text"
                    value={parseFloat(fields[f.varName] ?? "0") || 0}
                    onChange={(e) => setToken(f.varName, e.target.value, f.kind)}
                  />
                ) : (
                  <input
                    type="text"
                    className="token-text"
                    value={fields[f.varName] ?? ""}
                    onChange={(e) => setToken(f.varName, e.target.value, f.kind)}
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
              Token export (install with <code>npx shadcn add</code>). Shape knobs
              ship inside the skin&apos;s overlay CSS as <code>--*</code> vars.
            </div>
            <pre>{exportJson()}</pre>
          </div>
        </div>
      ) : null}
    </section>
  )
}
