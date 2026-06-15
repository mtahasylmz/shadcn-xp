"use client"

import * as React from "react"

import { SkinSwitcher } from "@/components/showcase/skin-switcher"

/** The app-bar skin control is the *persistent* picker — it only fades in once
 *  the hero (and its primary SkinGallery rail) has scrolled out of view, so the
 *  two controls never compete above the fold. Above the fold the hero gallery
 *  is unambiguously the picker; past it, this becomes the always-there handle. */
export function HeaderSkin() {
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const hero = document.getElementById("top")
    if (!hero) {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => setShown(!e.isIntersecting),
      { rootMargin: "-45% 0px 0px 0px" }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  return (
    <span
      className="app-bar-controls"
      data-shown={shown || undefined}
      aria-hidden={!shown}
      inert={!shown || undefined}
    >
      <label htmlFor="skin">skin</label>
      <SkinSwitcher />
    </span>
  )
}
