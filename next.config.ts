import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Allow dev assets (/_next/*) to be served through tunnels — the dev server
  // blocks unknown origins by default, which renders SSR HTML but no JS
  // (page looks fine, nothing is interactive).
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.app", "*.trycloudflare.com"],
  // Hide the floating dev-tools indicator so it never overlaps the showcase
  // (it's dev-only, but it shows in screenshots / tunnels).
  devIndicators: false,
}

export default nextConfig
