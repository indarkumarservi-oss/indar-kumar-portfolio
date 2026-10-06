"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Card } from "@/components/ui"
import { Badge } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui"
import { Github, ExternalLink, ArrowRight, Code, Server, Database, Bot, Layers, Globe, Sparkles, Shield } from "lucide-react"

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Python: Code,
  Java: Code,
  AI: Bot,
  "Voice AI": Bot,
  Automation: Bot,
  "Computer Vision": Bot,
  Agents: Bot,
  "Spring Boot": Server,
  MySQL: Database,
  "REST API": Globe,
  JavaScript: Code,
  TypeScript: Code,
  React: Code,
  Git: Code,
  GitHub: Github,
  Blockchain: Layers,
  Cryptography: Layers,
  "Web Development": Globe,
  C: Code,
  "C++": Code,
  "RTOS Concepts": Server,
  "Embedded Systems": Server,
  "Kernel Development": Server,
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioConfig.projects.items[0] | null>(null)

  return (
    <section id="projects" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Featured Projects</span>
          <h2 className="mt-4 section-heading">Systems I've Engineered</h2>
          <p className="mt-4 section-subheading">
            Real-world applications solving genuine problems — from AI agents to enterprise systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {portfolioConfig.projects.items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

interface ProjectCardProps {
  project: typeof portfolioConfig.projects.items[0]
  index: number
  onClick: () => void
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card className="h-full group cursor-pointer overflow-hidden" onClick={onClick}>
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="font-mono text-xs text-primary uppercase tracking-wider">
              PROJECT {project.number}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            {project.name}
          </h3>

          <p className="text-muted-foreground mb-5 line-clamp-3">
            {project.description}
          </p>

<div className="flex flex-wrap gap-2 mb-5">
  {project.technologies.slice(0, 6).map((tech) => {
    const TechIcon = techIcons[tech]
    return (
      <Badge key={tech} variant="outline" size="sm">
        {TechIcon && <TechIcon className="h-3 w-3 mr-1" />}
        {tech}
      </Badge>
    )
  })}
  {project.technologies.length > 6 && (
    <Badge variant="secondary" size="sm">
      +{project.technologies.length - 6} more
    </Badge>
  )}
</div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">View Details</span>
            <motion.div
              whileHover={{ x: 4 }}
              className="text-primary font-medium flex items-center gap-1"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

interface ProjectDetailModalProps {
  project: typeof portfolioConfig.projects.items[0]
  onClose: () => void
}

function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const detail = project.detail

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs text-primary uppercase tracking-wider">
                PROJECT {project.number}
              </span>
              <DialogTitle className="mt-2 text-2xl">{project.name}</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="View repository"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="View live demo"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-3">Technologies</h4>
<div className="flex flex-wrap gap-2">
  {project.technologies.map((tech) => {
    const TechIcon = techIcons[tech]
    return (
      <Badge key={tech} variant="outline" size="sm">
        {TechIcon && <TechIcon className="h-3 w-3 mr-1" />}
        {tech}
      </Badge>
    )
  })}
</div>
            </div>
            <div>
              <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-3">Key Features</h4>
              <div className="space-y-1">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DetailSection title="Overview" icon={Code}>
            <p className="text-muted-foreground leading-relaxed">{detail.overview}</p>
          </DetailSection>

          <DetailSection title="Problem" icon={Bot}>
            <p className="text-muted-foreground leading-relaxed">{detail.problem}</p>
          </DetailSection>

          <DetailSection title="Solution" icon={Sparkles}>
            <p className="text-muted-foreground leading-relaxed">{detail.solution}</p>
          </DetailSection>

          <DetailSection title="Architecture" icon={Layers}>
            <p className="text-muted-foreground leading-relaxed">{detail.architecture}</p>
          </DetailSection>

          <DetailSection title="Technology Stack" icon={Server}>
            <div className="flex flex-wrap gap-2">
              {detail.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" size="sm">{tech}</Badge>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Key Features" icon={Code}>
            <ul className="space-y-2">
              {detail.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Challenges" icon={Shield}>
            <ul className="space-y-2">
              {detail.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center text-orange-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  <span className="text-sm leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Future Improvements" icon={ArrowRight}>
            <ul className="space-y-2">
              {detail.futureImprovements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center text-green-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  <span className="text-sm leading-relaxed">{improvement}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface DetailSectionProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

function DetailSection({ title, icon: Icon, children }: DetailSectionProps) {
  return (
    <div className="pt-6 border-t border-border">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      {children}
    </div>
  )
}