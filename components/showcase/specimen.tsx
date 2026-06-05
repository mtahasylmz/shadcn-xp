import * as React from "react"

/** A skin-agnostic component showcase block. Each skin repaints these via
 *  the .specimen / .specimen-head / .specimen-body classes. */
export function Specimen({
  id,
  title,
  tag,
  children,
}: {
  id: string
  title: string
  tag?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="specimen">
      <div className="specimen-head">
        <span className="specimen-title">{title}</span>
        {tag ? <span className="specimen-tag">{tag}</span> : null}
      </div>
      <div className="specimen-body">{children}</div>
    </section>
  )
}
