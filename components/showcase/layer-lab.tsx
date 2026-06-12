"use client"

import * as React from "react"

import { SKINS } from "@/components/showcase/skin-switcher"

/** Hands-on proof of the layer stack. The visitor assembles the look
 *  themselves on ONE live iframe:
 *    1 · shadcn markup (fixed — the community-tested base)
 *    2 · tokens (the tweakcn layer: brand color + radius)
 *    3 · concept overlay (the layer this project adds)
 *  Toggling layer 3 off shows exactly where existing tools stop; their layer-2
 *  picks persist into every concept, proving the layers compose. */

const PALETTES: ReadonlyArray<
  readonly [label: string, vars: Record<string, string>]
> = [
  ["Stock", {}],
  [
    "Indigo",
    { "--primary": "#4f46e5", "--primary-foreground": "#ffffff", "--ring": "#4f46e5" },
  ],
  [
    "Ruby",
    { "--primary": "#be123c", "--primary-foreground": "#ffffff", "--ring": "#be123c" },
  ],
  [
    "Forest",
    { "--primary": "#15803d", "--primary-foreground": "#ffffff", "--ring": "#15803d" },
  ],
]

const TOKEN_KEYS = ["--primary", "--primary-foreground", "--ring", "--radius"]

const CONCEPTS = SKINS.filter(([v]) => v !== "default" && v !== "base")

export function LayerLab() {
  const frame = React.useRef<HTMLIFrameElement>(null)
  const [palette, setPalette] = React.useState(0)
  const [radius, setRadius] = React.useState<number | null>(null)
  const [concept, setConcept] = React.useState<string>("none")

  const post = React.useCallback(
    (msg: { skin?: string; vars?: Record<string, string | null> }) => {
      frame.current?.contentWindow?.postMessage({ type: "skin-lab", ...msg }, "*")
    },
    []
  )

  // Re-apply the full state (used on iframe load and any control change).
  const apply = React.useCallback(
    (p = palette, r = radius, c = concept) => {
      const vars: Record<string, string | null> = {}
      for (const k of TOKEN_KEYS) vars[k] = null
      Object.assign(vars, PALETTES[p][1])
      if (r !== null) vars["--radius"] = `${r}px`
      post({ skin: c === "none" ? "default" : c, vars })
    },
    [palette, radius, concept, post]
  )

  function pickPalette(i: number) {
    setPalette(i)
    apply(i, radius, concept)
  }
  function pickRadius(v: number) {
    setRadius(v)
    apply(palette, v, concept)
  }
  function pickConcept(c: string) {
    setConcept(c)
    apply(palette, radius, c)
  }

  const tokensTouched = palette !== 0 || radius !== null

  return (
    <section className="lab" id="lab">
      <div className="compare-head">
        <span className="compare-title">
          Build it yourself — three layers, one component set
        </span>
      </div>

      <div className="lab-body">
        <div className="lab-steps">
          <div className="lab-step" data-done>
            <div className="lab-step-title">
              <span className="lab-step-num">1</span> shadcn/ui markup
            </div>
            <p className="lab-step-note">
              Unmodified, community-tested components. Never forked — every
              layer below is additive.
            </p>
          </div>

          <div className="lab-step" data-done={tokensTouched || undefined}>
            <div className="lab-step-title">
              <span className="lab-step-num">2</span> tokens — the tweakcn layer
            </div>
            <p className="lab-step-note">
              Brand color, radius, fonts. This is everything a theme editor can
              reach:
            </p>
            <div className="lab-row">
              {PALETTES.map(([label], i) => (
                <button
                  key={label}
                  type="button"
                  className="skin-chip"
                  data-active={palette === i || undefined}
                  onClick={() => pickPalette(i)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="lab-slider">
              <span>radius {radius === null ? "(skin default)" : `${radius}px`}</span>
              <input
                type="range"
                min={0}
                max={24}
                step={1}
                value={radius ?? 10}
                onChange={(e) => pickRadius(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="lab-step" data-done={concept !== "none" || undefined}>
            <div className="lab-step-title">
              <span className="lab-step-num">3</span> concept — the layer we add
            </div>
            <p className="lab-step-note">
              {concept === "none" ? (
                <>
                  Off — what you see is the <em>ceiling of token theming</em>.
                  Pick a concept:
                </>
              ) : (
                <>
                  Structure no token can express — and your layer-2 picks ride
                  along into it. Swap freely:
                </>
              )}
            </p>
            <div className="lab-row">
              <button
                type="button"
                className="skin-chip"
                data-active={concept === "none" || undefined}
                onClick={() => pickConcept("none")}
              >
                none
              </button>
              {CONCEPTS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className="skin-chip"
                  data-active={concept === value || undefined}
                  onClick={() => pickConcept(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <figure className="lab-preview">
          <figcaption>
            live result ·{" "}
            {concept === "none"
              ? tokensTouched
                ? "tokens only (tweakcn territory)"
                : "stock shadcn"
              : `tokens + ${concept}`}
          </figcaption>
          <iframe
            ref={frame}
            title="Layer lab preview"
            src="/embed?skin=default"
            onLoad={() => apply()}
          />
        </figure>
      </div>
    </section>
  )
}
