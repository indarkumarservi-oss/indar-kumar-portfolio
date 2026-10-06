"use client"

import { ThemeProvider } from "@/hooks/useTheme"
import { Navigation } from "@/components/sections/Navigation"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Education } from "@/components/sections/Education"
import { Certifications } from "@/components/sections/Certifications"
import { Experience } from "@/components/sections/Experience"
import { WhatIBuild } from "@/components/sections/WhatIBuild"
import { GitHub } from "@/components/sections/GitHub"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { BootScreen } from "@/components/sections/BootScreen"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { CommandPalette } from "@/components/ui/CommandPalette"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { useReducedMotion } from "@/hooks"
import { useState } from "react"

export default function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          {!bootComplete && (
            <BootScreen onComplete={() => setBootComplete(true)} reducedMotion={reducedMotion} />
          )}

          {bootComplete && (
            <>
              <Navigation />
              <main id="main-content">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Education />
                <Certifications />
                <Experience />
                <WhatIBuild />
                <GitHub />
                <Contact />
                <Footer />
              </main>
              <CustomCursor />
              <CommandPalette />
            </>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}