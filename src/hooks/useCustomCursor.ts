"use client"

import { useEffect, useRef, useState } from "react"

export function useCustomCursor() {
  const [cursorStyle, setCursorStyle] = useState<{ x: number; y: number; visible: boolean; hovering: boolean }>({
    x: 0,
    y: 0,
    visible: false,
    hovering: false,
  })
  const animationRef = useRef<number>()
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setCursorStyle((prev) => ({ ...prev, visible: false }))
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setCursorStyle((prev) => ({ ...prev, visible: true }))
    }

    const handleMouseLeave = () => {
      setCursorStyle((prev) => ({ ...prev, visible: false }))
    }

    const animate = () => {
      setCursorStyle((prev) => {
        const newX = prev.x + (targetRef.current.x - prev.x) * 0.2
        const newY = prev.y + (targetRef.current.y - prev.y) * 0.2
        return { ...prev, x: newX, y: newY }
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const setHovering = (hovering: boolean) => {
    setCursorStyle((prev) => ({ ...prev, hovering }))
  }

  return { cursorStyle, setHovering }
}