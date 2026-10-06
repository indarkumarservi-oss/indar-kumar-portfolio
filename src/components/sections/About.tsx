"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Sparkles, Code, Brain, Shield, Eye, Zap, Link, Briefcase, Database } from "lucide-react"

const interestIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Artificial Intelligence": Brain,
  "Data Science": Database,
  "Software Development": Code,
  "Cybersecurity": Shield,
  "Computer Vision": Eye,
  "Automation": Zap,
  "Blockchain": Link,
  "Business & Technology": Briefcase,
}

export function About() {
  const { description, philosophy, interests } = portfolioConfig.about

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">About Me</span>
          <h2 className="mt-4 section-heading">Building Intelligent Systems That Matter</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <p className="text-lg text-foreground leading-relaxed font-medium">
              {philosophy}
            </p>

            <div className="pt-4 border-t border-border">
              <h3 className="font-mono text-xs text-primary uppercase tracking-wider mb-4">Interests</h3>
              <div className="grid sm:grid-cols-2 gap-3">
{interests.map((interest, i) => {
  const Icon = interestIcons[interest]
  return (
    <motion.div
      key={interest}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all"
    >
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {Icon && <Icon className="h-4 w-4" />}
      </div>
      <span className="text-sm font-medium">{interest}</span>
    </motion.div>
  )
})}
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative glass p-8 rounded-2xl border-border/30"
            >
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-primary/5 blur-2xl" aria-hidden="true" />

              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Computer Science Engineering</h4>
                    <p className="text-sm text-muted-foreground">Data Science Specialization</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">3+</div>
                    <div className="text-xs text-muted-foreground">Years Learning</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">4</div>
                    <div className="text-xs text-muted-foreground">Major Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">15+</div>
                    <div className="text-xs text-muted-foreground">Technologies</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Python", "Java", "React", "AI/ML", "Spring Boot", "SQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}