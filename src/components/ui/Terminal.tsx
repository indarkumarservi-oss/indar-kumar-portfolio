"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check } from "lucide-react"
import { Button } from "./Button"

interface Command {
  name: string
  description: string
  handler: (args: string[]) => string | Promise<string>
}

const commands: Command[] = [
  {
    name: "help",
    description: "Show available commands",
    handler: () => commands.map(c => `  ${c.name.padEnd(15)} ${c.description}`).join("\n")
  },
  {
    name: "about",
    description: "Show about information",
    handler: () => `Indar Kumar - Computer Science Engineering & Data Science Student
Focus: AI Systems, Automation, Data Platforms, Business Software
Location: India
Email: indarkumarservi@gmail.com`
  },
  {
    name: "skills",
    description: "List technical skills",
    handler: () => `Programming:     Python, Java, JavaScript, TypeScript, C, C++
Data Science:    Pandas, NumPy, Data Analysis, Visualization, ML
AI:              Generative AI, AI Agents, Computer Vision, NLP, Automation
Development:     React, Spring Boot, REST APIs, MySQL, Git, GitHub
Other:           Blockchain, Cybersecurity, Cloud Fundamentals, System Design`
  },
  {
    name: "projects",
    description: "List featured projects",
    handler: () => `01  NEXUS - Personal AI Computer Agent
02  Jewellery & Pawn Management ERP (Spring Boot + JavaFX)
03  Blockchain-Based Secure Academic Record Management
04  Real-Time OS Kernel Implementation (C)
05  CampusResolve - Student Grievance Platform
06  Jewel ERP - Jewellery & Pawn Broking Management (React + Capacitor)`
  },
  {
    name: "contact",
    description: "Show contact information",
    handler: () => `Email:    indarkumarservi@gmail.com
GitHub:   github.com/indarkumar
LinkedIn: linkedin.com/in/indarkumar
Location: India (IST UTC+5:30)`
  },
  {
    name: "clear",
    description: "Clear terminal",
    handler: () => "__CLEAR__"
  },
  {
    name: "theme",
    description: "Toggle theme (dark/light)",
    handler: () => "__THEME__"
  },
  {
    name: "date",
    description: "Show current date/time",
    handler: () => new Date().toString()
  },
  {
    name: "echo",
    description: "Echo arguments",
    handler: (args) => args.join(" ")
  },
  {
    name: "whoami",
    description: "Show current user",
    handler: () => "indar@portfolio ~ $"
  },
  {
    name: "ls",
    description: "List directory contents",
    handler: () => `projects/     skills/     contact/     about/
blog/       certs/      experience/  config/`
  }
]

const commandMap = new Map(commands.map(c => [c.name, c]))

export function Terminal({ className = "", initiallyOpen = false }: { className?: string; initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [isMaximized, setIsMaximized] = useState(false)
  const [history, setHistory] = useState<Array<{ type: "input" | "output" | "error"; content: string }>>([
    { type: "output", content: "Welcome to Indar's Portfolio Terminal v1.0.0" },
    { type: "output", content: "Type 'help' to see available commands.\n" }
  ])
  const [input, setInput] = useState("")
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputHistory, setInputHistory] = useState<string[]>([])
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const executeCommand = useCallback(async (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setHistory(prev => [...prev, { type: "input", content: `indar@portfolio ~ $ ${trimmed}` }])
    setInputHistory(prev => [trimmed, ...prev.slice(0, 49)])
    setHistoryIndex(-1)

    const parts = trimmed.split(/\s+/)
    const commandName = parts[0].toLowerCase()
    const args = parts.slice(1)

    const command = commandMap.get(commandName)

    if (!command) {
      setHistory(prev => [...prev, { type: "error", content: `Command not found: ${commandName}. Type 'help' for available commands.` }])
      return
    }

    try {
      const result = await command.handler(args)
      if (result === "__CLEAR__") {
        setHistory([{ type: "output", content: "Terminal cleared.\n" }])
      } else if (result === "__THEME__") {
        toggleTheme()
        setHistory(prev => [...prev, { type: "output", content: `Theme switched to ${theme === "dark" ? "light" : "dark"} mode.` }])
      } else {
        setHistory(prev => [...prev, { type: "output", content: result }])
      }
    } catch (error) {
      setHistory(prev => [...prev, { type: "error", content: `Error: ${error instanceof Error ? error.message : "Unknown error"}` }])
    }
  }, [theme, toggleTheme])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < inputHistory.length - 1) {
        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setInput(inputHistory[nextIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1
        setHistoryIndex(nextIndex)
        setInput(inputHistory[nextIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const parts = input.trim().split(/\s+/)
      const partial = parts[0].toLowerCase()
      const matches = commands.filter(c => c.name.startsWith(partial))
      if (matches.length === 1) {
        setInput(matches[0].name + (parts.length > 1 ? " " + parts.slice(1).join(" ") : "") + " ")
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, { type: "output", content: matches.map(m => m.name).join("  ") }])
      }
    }
  }

  const toggleTerminal = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50 transition-all duration-300", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "glass border-border/30 shadow-2xl rounded-xl overflow-hidden flex flex-col",
              isMaximized ? "fixed inset-4 max-w-none max-h-none w-auto h-auto" : "w-96 h-[500px] md:w-[600px] md:h-[600px]"
            )}
            style={{ zIndex: 100 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/50">
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-primary" />
                <span className="font-mono text-sm text-foreground">portfolio-terminal</span>
                <span className="px-2 py-0.5 text-xs font-mono bg-primary/20 text-primary rounded">active</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMaximized(!isMaximized)}
                  aria-label={isMaximized ? "Minimize" : "Maximize"}
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTerminal}
                  aria-label="Close terminal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-background/95"
              style={{ fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "1.6" }}
            >
              <AnimatePresence mode="popLayout">
                {history.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "whitespace-pre-wrap break-all",
                      entry.type === "input" && "text-primary",
                      entry.type === "error" && "text-red-400",
                      entry.type === "output" && "text-muted-foreground"
                    )}
                  >
                    {entry.content}
                    {entry.type === "input" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 p-0.5 h-5 w-5 opacity-0 group-hover:opacity-100"
                        onClick={() => {
                          navigator.clipboard.writeText(entry.content.replace("indar@portfolio ~ $ ", ""))
                          setCopiedCommand(entry.content)
                          setTimeout(() => setCopiedCommand(null), 2000)
                        }}
                        aria-label="Copy command"
                      >
                        {copiedCommand === entry.content ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-border/50 bg-background/50">
              <span className="text-primary font-mono text-sm">indar@portfolio</span>
              <span className="text-muted-foreground font-mono text-sm">~</span>
              <span className="text-blue-400 font-mono text-sm">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          onClick={toggleTerminal}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="glass border-border/30 p-3 rounded-xl shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
          aria-label="Open terminal"
          style={{ zIndex: 50 }}
        >
          <TerminalIcon className="h-6 w-6 text-primary" />
        </motion.button>
      )}
    </div>
  )
}

import { useTheme } from "@/hooks"