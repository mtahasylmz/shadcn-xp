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
  brutalist: [
    { label: "Shadow offset", varName: "--bru-offset", min: 0, max: 14, step: 1, unit: "px" },
    { label: "Border width", varName: "--bru-border", min: 0, max: 8, step: 1, unit: "px" },
  ],
  glass: [
    { label: "Backdrop blur", varName: "--glass-blur-px", min: 0, max: 32, step: 1, unit: "px" },
    { label: "Surface opacity", varName: "--glass-alpha", min: 0, max: 0.4, step: 0.01, unit: "" },
    { label: "Border opacity", varName: "--glass-border-alpha", min: 0, max: 0.9, step: 0.02, unit: "" },
  ],
  neumorphic: [
    { label: "Extrusion", varName: "--neu-distance", min: 1, max: 16, step: 1, unit: "px" },
    { label: "Softness", varName: "--neu-blur", min: 2, max: 36, step: 1, unit: "px" },
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
    applyVar(p.varName, `${raw}${p.unit}`)
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
                {shapeParams.map((p) => (
                  <label key={p.varName} className="shape-row">
                    <span className="token-label">{p.label}</span>
                    <input
                      type="range"
                      min={p.min}
                      max={p.max}
                      step={p.step}
                      value={parseFloat(fields[p.varName] ?? "0") || 0}
                      onChange={(e) => setShape(p, e.target.value)}
                    />
                    <span className="shape-value">
                      {(parseFloat(fields[p.varName] ?? "0") || 0).toFixed(p.step < 1 ? 2 : 0)}
                      {p.unit}
                    </span>
                  </label>
                ))}
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
