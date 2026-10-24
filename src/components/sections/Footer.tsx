"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Github, Linkedin, Mail, Circle, Heart } from "lucide-react"

export function Footer() {
  const { name, email, contact, footer } = portfolioConfig
  const { socialLinks } = contact

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="section-container py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-3">
            <Circle className="h-6 w-6 text-primary" />
            <span className="font-mono text-lg font-semibold tracking-wider">{name.split(" ")[0]}.{name.split(" ")[1].toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{footer.copyright}</span>
            <Heart className="h-3.5 w-3.5 text-red-500" />
            <span className="font-mono">React + TypeScript + Tailwind</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono">SYSTEM STATUS: ONLINE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-secondary rounded border border-border font-mono">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 bg-secondary rounded border border-border font-mono">K</kbd>
            <span>Command Palette</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}