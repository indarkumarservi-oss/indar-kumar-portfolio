"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useCustomCursor } from "@/hooks"

export function CustomCursor() {
  const { cursorStyle, setHovering } = useCustomCursor()
  const { x, y, visible, hovering } = cursorStyle

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovering(true)
      }
    }

    const handleMouseOut = () => {
      setHovering(false)
    }

    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [setHovering])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: hovering ? 2 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: x,
          top: y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: hovering ? 1.5 : 1,
          opacity: hovering ? 0.3 : 0.6,
          borderColor: hovering ? "#06b6d4" : "#374151",
        }}
        initial={{ borderColor: "#374151" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div className="h-10 w-10 rounded-full border" style={{ borderColor: "#374151" }} />
      </motion.div>
    </>
  )
}