import { ComponentStrip } from "@/components/showcase/component-strip"
import { LabListener } from "@/components/showcase/lab-listener"

// Minimal, chrome-less render of the component strip. The skin is set from the
// ?skin= URL param by the init script in the root layout, so this page can be
// iframed (stock-vs-skinned compare, tri-pane proof). The LabListener also
// lets the LayerLab drive skin + tokens live via postMessage.
export default function EmbedPage() {
  return (
    <div className="embed-root">
      <LabListener />
      <ComponentStrip />
    </div>
  )
}
