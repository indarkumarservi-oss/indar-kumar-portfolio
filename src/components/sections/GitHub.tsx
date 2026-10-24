"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Github, ExternalLink, Star, GitFork, Code, Clock } from "lucide-react"

export function GitHub() {
  const { username, showStats, placeholderMessage } = portfolioConfig.github

  return (
    <section id="github" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">GitHub Profile</span>
          <h2 className="mt-4 section-heading">Code & Contributions</h2>
          <p className="mt-4 section-subheading">
            Open source contributions and personal projects hosted on GitHub.
          </p>
        </motion.div>

        {username && showStats ? (
          <GitHubStats username={username} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <Card className="glass border-border/30">
              <CardContent className="p-8 text-center">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Github className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">GitHub Integration Ready</h3>
                <p className="text-muted-foreground mb-5">
                  {placeholderMessage}
                </p>
                <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    Configure username in config
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    No API key required
                  </span>
                </div>
                {portfolioConfig.contact.socialLinks.github && (
                  <a
                    href={portfolioConfig.contact.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>Visit My GitHub Profile</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-6 grid sm:grid-cols-3 gap-3 text-center"
            >
              <FeatureCard icon={Star} label="Stars Earned" value="—" />
              <FeatureCard icon={GitFork} label="Forks Received" value="—" />
              <FeatureCard icon={Code} label="Repositories" value="—" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function GitHubStats({ username }: { username: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -150px 0px" }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card className="glass border-border/30">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{username}</h3>
                <p className="text-sm text-muted-foreground">GitHub Profile</p>
              </div>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">View Profile</span>
            </a>
          </div>

          <div className="grid sm:grid-cols-4 gap-3">
            <StatCard icon={Star} label="Total Stars" value="—" />
            <StatCard icon={GitFork} label="Total Forks" value="—" />
            <StatCard icon={Code} label="Repositories" value="—" />
            <StatCard icon={Clock} label="Contributions" value="—" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/30">
        <CardContent className="p-5">
          <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-3">Featured Repositories</h4>
          <div className="space-y-2">
            <RepoPlaceholder name="nexus-ai-agent" description="Personal AI computer agent with voice control" />
            <RepoPlaceholder name="jewellery-erp" description="Full-stack jewellery & pawn management system" />
            <RepoPlaceholder name="blockchain-academic-records" description="Blockchain-based credential verification" />
            <RepoPlaceholder name="rtos-kernel" description="Real-time OS kernel implementation in C" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FeatureCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="glass p-3 rounded-xl border-border/30">
      <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="text-center p-3">
      <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
      <div className="text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function RepoPlaceholder({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:border-primary/30 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Code className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">{name}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Private</span>
    </div>
  )
}