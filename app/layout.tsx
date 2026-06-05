import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "shadcn/ui — Concept Skins",
  description:
    "One unmodified shadcn/ui component set, re-conceptualized by swappable CSS skins: Windows XP, Brutalist, Neumorphic, Terminal, Glassmorphism.",
}

// Set the active skin before first paint to avoid a flash of the default skin.
const skinInit = `try{var s=localStorage.getItem('skin')||'xp';document.documentElement.setAttribute('data-skin',s)}catch(e){document.documentElement.setAttribute('data-skin','xp')}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skinInit }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
