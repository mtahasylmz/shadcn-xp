import { ComponentStrip } from "@/components/showcase/component-strip"
import { TokensOnly } from "@/components/showcase/tokens-only"

// Minimal, chrome-less render of the component strip. The skin is set from the
// ?skin= URL param by the init script in the root layout, so this page can be
// iframed (stock-vs-skinned compare, tri-pane proof). TokensOnly handles the
// ?tokensOnly=1 middle pane (skin's resolved tokens applied over stock).
export default function EmbedPage() {
  return (
    <div className="embed-root">
      <TokensOnly />
      <ComponentStrip />
    </div>
  )
}
