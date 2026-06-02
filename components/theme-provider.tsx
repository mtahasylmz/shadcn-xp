"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Windows XP is a light-only world. Force the light theme so neither the
// system preference nor any stray hotkey can flip us into shadcn's dark mode.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
