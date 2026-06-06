import { ComponentStrip } from "@/components/showcase/component-strip"

// Minimal, chrome-less render of the component strip. The skin is set from the
// ?skin= URL param by the init script in the root layout, so this page can be
// iframed twice (default vs active skin) for the stock-vs-skinned compare.
export default function EmbedPage() {
  return (
    <div className="embed-root">
      <ComponentStrip />
    </div>
  )
}
