"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Github, Mail, Terminal } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"
import { useReducedMotion } from "@/hooks"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const initParticles = () => {
      const count = reducedMotion ? 20 : 60
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    const drawGrid = () => {
      const size = 50
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.strokeStyle = "hsl(var(--border) / 0.3)"
      ctx.lineWidth = 0.5

      for (let x = 0; x <= width; x += size) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y <= height; y += size) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const drawParticles = () => {
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        const dx = p.x - mousePos.x
        const dy = p.y - mousePos.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150 && !reducedMotion) {
          const force = (150 - dist) / 150 * 0.5
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.99
        p.vy *= 0.99

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(var(--primary) / ${p.opacity})`
        ctx.fill()
      })

      if (!reducedMotion) {
        particlesRef.current.forEach((p1, i) => {
          particlesRef.current.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 100) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `hsl(var(--primary) / ${0.1 * (1 - dist / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        })
      }
    }

    const animate = () => {
      if (!canvas) return

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.clearRect(0, 0, width, height)
      drawGrid()
      drawParticles()

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    })

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [reducedMotion, mousePos])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />

      <div className="absolute inset-0 grid-bg opacity-20 animate-[gridMove_20s_linear_infinite]" aria-hidden="true" />

      <div className="relative section-container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-mono text-xs text-primary uppercase tracking-wider"
            >
              SYSTEM ONLINE
            </motion.span>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            {portfolioConfig.hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {portfolioConfig.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            {portfolioConfig.hero.ctaButtons.map((btn) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const el = document.querySelector(btn.href)
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
                  btn.variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
                  btn.variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  btn.variant === "outline" && "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {btn.label}
                {btn.variant === "primary" && <ArrowRight className="h-4 w-4" />}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            {portfolioConfig.hero.displayRoles.map((role) => (
              <motion.div
                key={role}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
              >
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">{role}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-muted-foreground"
        >
          <a
            href={`mailto:${portfolioConfig.email}`}
            className="flex items-center gap-2 hover:text-primary transition-colors"
            aria-label="Email me"
          >
            <Mail className="h-5 w-5" />
            <span className="hidden sm:inline font-mono text-sm">{portfolioConfig.email}</span>
          </a>
          <a
            href={portfolioConfig.contact.socialLinks.github || "#github"}
            className="flex items-center gap-2 hover:text-primary transition-colors"
            aria-label="View GitHub"
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline font-mono text-sm">GitHub</span>
          </a>
        </motion.div>
      </div>

      <HUDElements reducedMotion={reducedMotion} />
    </section>
  )
}

function HUDElements({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-20 right-10 hidden lg:block">
        <HUDOrbit radius={80} speed={20} reducedMotion={reducedMotion} />
      </div>
      <div className="absolute bottom-20 left-10 hidden lg:block">
        <HUDOrbit radius={60} speed={-15} reducedMotion={reducedMotion} />
      </div>
      <div className="absolute top-1/2 right-20 hidden xl:block">
        <HUDPanel />
      </div>
    </div>
  )
}

function HUDOrbit({ radius, speed, reducedMotion }: { radius: number; speed: number; reducedMotion: boolean }) {
  return (
    <svg className="w-[160px] h-[160px] text-primary/30" viewBox="0 0 160 160">
      <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      <circle cx="80" cy="80" r={radius * 0.6} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
      <motion.circle
        cx={80 + radius}
        cy={80}
        r="3"
        fill="currentColor"
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: Math.abs(speed), repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "80px 80px" }}
      />
      <motion.circle
        cx={80 - radius * 0.6}
        cy={80}
        r="2"
        fill="currentColor"
        opacity={0.6}
        animate={reducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: Math.abs(speed) * 1.5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "80px 80px" }}
      />
    </svg>
  )
}

function HUDPanel() {
  const stats = [
    { label: "AI CORE", value: "ACTIVE", status: "online" },
    { label: "DATA STREAM", value: "FLOWING", status: "online" },
    { label: "NEURAL NET", value: "TRAINING", status: "processing" },
    { label: "AUTOMATION", value: "READY", status: "online" },
  ]

  return (
    <div className="glass p-4 rounded-xl border-border/30 w-56">
      <div className="font-mono text-xs text-primary mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        HUD STATUS
      </div>
      <div className="space-y-2">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-mono text-xs",
                stat.status === "online" ? "text-green-400" : "text-yellow-400"
              )}>
                {stat.value}
              </span>
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                stat.status === "online" ? "bg-green-400 animate-pulse" : "bg-yellow-400 animate-pulse"
              )} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}