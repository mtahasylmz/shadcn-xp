import * as React from "react"

import { cn } from "@/lib/utils"

/** The outer application window: title bar + chrome wrapper. */
export function XPWindow({
  title,
  icon,
  className,
  children,
}: {
  title: string
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("xp-window", className)}>
      <div className="xp-titlebar">
        <span className="xp-titlebar-title">
          {icon ? <span aria-hidden>{icon}</span> : null}
          {title}
        </span>
        <span className="xp-titlebar-buttons">
          <span className="xp-caption-btn" aria-hidden>
            _
          </span>
          <span className="xp-caption-btn" aria-hidden>
            ▢
          </span>
          <span className="xp-caption-btn xp-caption-btn--close" aria-hidden>
            ✕
          </span>
        </span>
      </div>
      {children}
    </div>
  )
}

/** A grouped section with a Luna gradient caption — one per component. */
export function XPPanel({
  title,
  tag,
  id,
  className,
  bodyClassName,
  children,
}: {
  title: string
  tag?: string
  id?: string
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("xp-panel scroll-mt-4", className)}>
      <header className="xp-panel-header">
        <span>{title}</span>
        {tag ? <span className="xp-panel-tag">{tag}</span> : null}
      </header>
      <div className={cn("xp-panel-body", bodyClassName)}>{children}</div>
    </section>
  )
}

/** A labelled row of demo controls inside a panel. */
export function XPDemoRow({
  label,
  className,
  children,
}: {
  label?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <span className="font-mono text-[11px] text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className={cn("flex flex-wrap items-center gap-3", className)}>
        {children}
      </div>
    </div>
  )
}
