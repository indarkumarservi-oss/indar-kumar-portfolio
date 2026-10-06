"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check, Loader2, Terminal } from "lucide-react"

interface BootScreenProps {
  onComplete: () => void
  reducedMotion: boolean
}

const bootSteps = [
  { id: "init", label: "INITIALIZING INDAR.KUMAR...", delay: 0 },
  { id: "core", label: "DEVELOPER CORE .... READY", delay: 300 },
  { id: "ai", label: "AI MODULES ........ READY", delay: 600 },
  { id: "ds", label: "DATA SCIENCE ...... READY", delay: 900 },
  { id: "net", label: "NETWORK LAYER ..... ONLINE", delay: 1200 },
  { id: "sys", label: "SYSTEM STATUS ..... ONLINE", delay: 1500 },
]

export function BootScreen({ onComplete, reducedMotion }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setCurrentStep(bootSteps.length - 1)
      const timer = setTimeout(() => {
        setCompleted(true)
        onComplete()
      }, 300)
      return () => clearTimeout(timer)
    }

    let step = 0

    const interval = setInterval(() => {
      if (step < bootSteps.length - 1) {
        step++
        setCurrentStep(step)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setCompleted(true)
          onComplete()
        }, 500)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [reducedMotion, onComplete])

  const handleSkip = () => {
    setCompleted(true)
    onComplete()
  }

  if (completed) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.5 } }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        role="alert"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-8 px-6">
          <div className="flex items-center gap-3 text-primary">
            <Terminal className="h-8 w-8 animate-pulse" />
            <span className="font-mono text-lg font-semibold tracking-wider">INDAR.KUMAR</span>
          </div>

          <div className="w-full max-w-md">
            <AnimatePresence mode="popLayout">
              {bootSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: index <= currentStep ? 1 : 0, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  className={cn(
                    "font-mono text-sm text-muted-foreground flex items-center gap-2",
                    index <= currentStep && "text-foreground"
                  )}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: index <= currentStep ? 1 : 0 }}
                    transition={{ delay: index * 0.1, duration: reducedMotion ? 0 : 0.2 }}
                    className="text-primary"
                  >
                    {index <= currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </motion.span>
                  {step.label}
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: currentStep === bootSteps.length - 1 ? 1 : 0, height: currentStep === bootSteps.length - 1 ? "auto" : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.3 }}
              className="mt-6 pt-4 border-t border-border flex items-center justify-between"
            >
              <span className="font-mono text-xs text-muted-foreground">
                BOOT SEQUENCE COMPLETE
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkip}
                className="px-4 py-1.5 text-xs font-mono text-primary border border-primary/30 rounded hover:bg-primary/10 transition-colors"
              >
                ENTER SYSTEM
              </motion.button>
            </motion.div>
          </div>

          {showSkip && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
              aria-label="Skip boot sequence"
            >
              SKIP INITIALIZATION
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}