import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// XP UI was Tahoma; we lean on the system Tahoma/Verdana stack (defined in
// globals.css) instead of a webfont so the chrome feels native and loads
// instantly. No next/font here on purpose.

export const metadata: Metadata = {
  title: "shadcn/ui — Windows XP edition",
  description:
    "Every shadcn/ui component, reskinned in the Windows XP (Luna) theme.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
