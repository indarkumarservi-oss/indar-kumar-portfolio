"use client"

import { useEffect, useState, useCallback } from "react"

interface Command {
  id: string
  label: string
  description?: string
  shortcut?: string
  action: () => void
  section?: string
}

export function useCommandPalette(commands: Command[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands
    .filter((cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
      cmd.section?.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8)

  const open = useCallback(() => {
    setIsOpen(true)
    setQuery("")
    setSelectedIndex(0)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setQuery("")
    setSelectedIndex(0)
  }, [])

  const toggle = useCallback(() => {
    if (isOpen) close()
    else open()
  }, [isOpen, open, close])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        toggle()
        return
      }

      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          close()
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
            close()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, close, toggle])

  const executeSelected = useCallback(() => {
    if (filteredCommands[selectedIndex]) {
      filteredCommands[selectedIndex].action()
      close()
    }
  }, [filteredCommands, selectedIndex, close])

  return {
    isOpen,
    query,
    setQuery,
    selectedIndex,
    filteredCommands,
    open,
    close,
    toggle,
    executeSelected,
  }
}