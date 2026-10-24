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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Certifications</span>
          <h2 className="mt-4 section-heading">Verified Credentials</h2>
          <p className="mt-4 section-subheading">
            Industry-recognized certifications validating technical competencies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-5"
        >
          {items.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="glass h-full border-border/30 hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span className="font-mono text-xs text-primary uppercase tracking-wider">{cert.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
                      <p className="text-muted-foreground mt-1">{cert.provider}</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-2">Skills Validated</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 text-center"
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