"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Badge } from "@/components/ui"
import { Button } from "@/components/ui"
import { Award, CheckCircle, ExternalLink, BookOpen, Clock, Shield } from "lucide-react"

export function Certifications() {
  const { items } = portfolioConfig.certifications

  return (
    <section id="certifications" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Certifications</span>
          <h2 className="mt-4 section-heading">Verified Credentials</h2>
          <p className="mt-4 section-subheading">
            Industry-recognized certifications validating technical competencies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {items.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass h-full border-border/30 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span className="font-mono text-xs text-primary uppercase tracking-wider">{cert.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{cert.name}</h3>
                      <p className="text-muted-foreground mt-1">{cert.provider}</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-3">Skills Validated</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        Verified
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5" />
                        Valid
                      </span>
                    </div>
                    {cert.verificationUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Verify
                        </a>
                      </Button>
                    )}
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
          className="mt-12 text-center"
        >
          <div className="glass inline-flex items-center gap-3 px-6 py-4 rounded-xl border-border/30">
            <Clock className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium text-foreground">Continuously Updating</p>
              <p className="text-sm text-muted-foreground">
                New certifications added as I complete them
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}