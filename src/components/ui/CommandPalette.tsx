"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Command, ChevronRight, Search } from "lucide-react"
import { useCommandPalette } from "@/hooks"

const commands = [
  { id: "home", label: "Go to Home", description: "Navigate to the hero section", shortcut: "⌘H", section: "Navigation", action: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "about", label: "Go to About", description: "Learn more about me", shortcut: "⌘A", section: "Navigation", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "skills", label: "Go to Skills", description: "View technical skills", shortcut: "⌘S", section: "Navigation", action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "projects", label: "Go to Projects", description: "Explore featured projects", shortcut: "⌘P", section: "Navigation", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "education", label: "Go to Education", description: "View academic background", shortcut: "⌘E", section: "Navigation", action: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "certifications", label: "Go to Certifications", description: "View verified credentials", shortcut: "⌘C", section: "Navigation", action: () => document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "experience", label: "Go to Experience", description: "View projects and activities", shortcut: "⌘X", section: "Navigation", action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "github", label: "Go to GitHub", description: "View GitHub profile", shortcut: "⌘G", section: "Navigation", action: () => document.getElementById("github")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "contact", label: "Go to Contact", description: "Get in touch", shortcut: "⌘M", section: "Navigation", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "email", label: "Send Email", description: "Open email client", shortcut: "", section: "Actions", action: () => window.location.href = `mailto:indarkumarservi@gmail.com` },
  { id: "github-external", label: "Open GitHub", description: "Visit GitHub profile", shortcut: "", section: "Actions", action: () => window.open("https://github.com", "_blank") },
  { id: "linkedin", label: "Open LinkedIn", description: "Visit LinkedIn profile", shortcut: "", section: "Actions", action: () => window.open("https://linkedin.com", "_blank") },
]

export function CommandPalette() {
  const {
    isOpen,
    query,
    setQuery,
    selectedIndex,
    filteredCommands,
    close,
    executeSelected,
  } = useCommandPalette(commands)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const selectedItem = listRef.current?.querySelector("[data-selected]")
    selectedItem?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex, filteredCommands])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close()
    if (e.key === "Enter") executeSelected()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass border-border/30 shadow-2xl rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="w-full h-10 pl-10 pr-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <kbd className="px-3 py-1.5 text-xs font-mono text-muted-foreground bg-secondary rounded border border-border">
              <Command className="h-3 w-3 mr-1 inline-block align-middle" />
              K
            </kbd>
          </div>

          <div ref={listRef} className="max-h-96 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <Command className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No commands found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <ul role="listbox" aria-label="Commands">
                {filteredCommands.map((cmd, index) => (
                  <motion.li
                    key={cmd.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.02 }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                      "cursor-pointer select-none",
                      index === selectedIndex
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                    data-selected={index === selectedIndex}
                    role="option"
                    aria-selected={index === selectedIndex}
                    onClick={() => { cmd.action(); close() }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{cmd.label}</span>
                        {cmd.shortcut && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary">
                            {cmd.shortcut}
                          </span>
                        )}
                      </div>
                      {cmd.description && (
                        <p className="text-xs truncate">{cmd.description}</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>↑↓ Navigate • ⏎ Execute • Esc Close</span>
            <span className="font-mono">{filteredCommands.length} commands</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}