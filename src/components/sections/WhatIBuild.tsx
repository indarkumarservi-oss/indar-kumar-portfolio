"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Cpu, Zap, Database, Briefcase, Code, Bot, Sparkles } from "lucide-react"

const buildIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "AI Systems": Cpu,
  Automation: Zap,
  "Data Platforms": Database,
  "Business Software": Briefcase,
  "Developer Tools": Code,
  "Intelligent Agents": Bot,
}

export function WhatIBuild() {
  const { items } = portfolioConfig.whatIBuild

  return (
    <section id="what-i-build" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Development Philosophy</span>
          <h2 className="mt-4 section-heading">What I Build</h2>
          <p className="mt-4 section-subheading">
            Focused on creating practical, intelligent systems that solve real problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
<Card className="glass h-full border-border/30 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
  <CardContent className="p-6">
    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      {(() => {
        const Icon = buildIcons[item.name]
        return Icon ? <Icon className="h-6 w-6 text-primary" /> : null
      })()}
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-xs font-mono text-primary">Explore</span>
      <Sparkles className="h-4 w-4 text-primary/50" />
    </div>
  </CardContent>
</Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass inline-flex items-center gap-3 px-6 py-4 rounded-xl border-border/30 max-w-2xl">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-muted-foreground text-sm">
              Always exploring new domains — if you have an interesting problem, let's discuss.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}