"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Badge } from "@/components/ui"
import { GraduationCap, BookOpen, Award, Target } from "lucide-react"

export function Education() {
  const { items } = portfolioConfig.education

  return (
    <section id="education" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Education</span>
          <h2 className="mt-4 section-heading">Academic Background</h2>
          <p className="mt-4 section-subheading">
            Formal education providing the theoretical foundation for practical engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/30 to-transparent" aria-hidden="true" />

          <div className="space-y-8">
            {items.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative pl-16"
              >
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center">
                  <div className={cn(
                    "relative z-10 h-4 w-4 rounded-full border-4 border-background",
                    edu.status === "Current" ? "bg-primary" : "bg-green-400"
                  )} />
                  <motion.div
                    animate={{ scale: edu.status === "Current" ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={cn(
                      "absolute h-4 w-4 rounded-full border-2",
                      edu.status === "Current" ? "border-primary/30" : "border-green-400/30"
                    )} />
                </div>

                <Card className="glass border-border/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.specialization}</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="font-mono text-sm text-muted-foreground">{edu.startYear} — {edu.endYear}</p>
                        <Badge variant="outline" size="sm" className="mt-1">
                          {edu.status}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{edu.institution}</p>

                    <div className="flex flex-wrap gap-2">
                      {edu.details.map((detail, i) => (
                        <Badge key={i} variant="secondary" size="sm">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {detail}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>In Progress</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>Data Science & AI Focus</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.4, delay: items.length * 0.08 }}
            className="mt-10 text-center"
          >
            <div className="glass inline-flex items-center gap-3 px-6 py-4 rounded-xl border-border/30">
              <Award className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Continuous Learning</p>
                <p className="text-sm text-muted-foreground">
                  Actively expanding knowledge through certifications, projects, and research
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}