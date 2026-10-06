"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio"
import { Badge } from "@/components/ui"
import { Code, Database, Bot, Layers, Globe, Sparkles } from "lucide-react"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Programming: Code,
  "Data Science": Database,
  AI: Bot,
  Development: Layers,
  Other: Globe,
}

const categoryColors = {
  Programming: "from-blue-500 to-cyan-500",
  "Data Science": "from-green-500 to-emerald-500",
  AI: "from-purple-500 to-violet-500",
  Development: "from-orange-500 to-red-500",
  Other: "from-gray-500 to-slate-500",
}

export function Skills() {
  const { categories, levelLabels } = portfolioConfig.skills

  return (
    <section id="skills" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Technical Skills</span>
          <h2 className="mt-4 section-heading">Technologies & Tools I Work With</h2>
          <p className="mt-4 section-subheading">
            Continuously expanding my toolkit across the full stack — from low-level systems to intelligent agents.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-12"
        >
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
  <div className={cn(
    "h-10 w-10 rounded-xl flex items-center justify-center",
    `bg-gradient-to-br ${categoryColors[category.name as keyof typeof categoryColors] || "from-gray-500 to-gray-600"}`
  )}>
    {(() => {
      const Icon = categoryIcons[category.name]
      return Icon ? <Icon className="h-5 w-5 text-white" /> : null
    })()}
  </div>
  <div>
    <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
    <p className="text-sm text-muted-foreground">{category.items.length} technologies</p>
  </div>
</div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    levelLabel={levelLabels[skill.level as keyof typeof levelLabels]}
                    index={skillIndex}
                    categoryColor={categoryColors[category.name as keyof typeof categoryColors] || "from-gray-500 to-gray-600"}
                  />
                ))}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: categories.length * 0.1 }}
              className="mt-12 glass p-6 rounded-2xl border-border/30"
            >
              <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Proficiency Levels
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(levelLabels).map(([level, label]) => (
                  <div key={level} className="p-4 rounded-lg border border-border/50 bg-card/50">
                    <div className="font-medium text-foreground mb-1">{level}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

interface SkillCardProps {
  skill: { name: string; level: string }
  levelLabel: string
  index: number
  categoryColor: string
}

function SkillCard({ skill, levelLabel, index, categoryColor }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group relative glass p-5 rounded-xl border-border/30 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{skill.name}</h4>
          <Badge variant="outline" size="sm" className="mt-2">
            {skill.level}
          </Badge>
        </div>
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: categoryColor }} />
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        className="mt-3 overflow-hidden text-xs text-muted-foreground"
      >
        {levelLabel}
      </motion.div>

      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: categoryColor }} />
    </motion.div>
  )
}