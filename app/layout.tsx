import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "shadcn/ui — Concept Skins",
  description:
    "One unmodified shadcn/ui component set, re-conceptualized by swappable CSS skins: Windows XP, Brutalist, Neumorphic, Terminal, Glassmorphism.",
}

// Set the active skin before first paint (no flash). A ?skin= URL param wins
// over localStorage — that's how the compare iframes pin each side's skin.
const skinInit = `try{var q=new URLSearchParams(location.search);var s=q.get('skin')||localStorage.getItem('skin')||'xp';document.documentElement.setAttribute('data-skin',s);if(q.get('tokensOnly')){document.documentElement.style.visibility='hidden'}}catch(e){document.documentElement.setAttribute('data-skin','xp')}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skinInit }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Poppins:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&family=Roboto:wght@400;500;700&family=Playfair+Display:wght@400;600;700;800&family=Orbitron:wght@400;600;700;800&family=Press+Start+2P&family=Archivo+Black&family=Audiowide&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
