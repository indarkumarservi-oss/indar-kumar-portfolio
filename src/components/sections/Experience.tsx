"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Badge } from "@/components/ui"
import { Code, GraduationCap, Zap, Brain, Layers } from "lucide-react"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Software & AI Project Development": Code,
  "Academic Projects": GraduationCap,
  "Technical Activities": Zap,
}

const typeColors = {
  Projects: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Learning: "bg-green-500/10 text-green-400 border-green-500/20",
  Activities: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export function Experience() {
  const { categories } = portfolioConfig.experience

  return (
    <section id="experience" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Experience & Activities</span>
          <h2 className="mt-4 section-heading">Where I've Applied My Skills</h2>
          <p className="mt-4 section-subheading">
            Hands-on project development, academic exploration, and continuous technical growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {categories.map((category, catIndex) => {
            const CategoryIcon = categoryIcons[category.name]
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.4, delay: catIndex * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {CategoryIcon && <CategoryIcon className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.items.length} entries</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.03 }}
                    >
                      <Card className="glass border-border/30 hover:border-primary/30 transition-all duration-200">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                              <p className="text-muted-foreground mt-1">{item.period}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(typeColors[category.type as keyof typeof typeColors] || "bg-gray-500/10 text-gray-400 border-gray-500/20")}
                            >
                              {category.type}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 glass p-6 rounded-2xl border-border/30"
        >
          <div className="grid sm:grid-cols-3 gap-5 text-center">
            <StatItem value="4+" label="Major Projects" icon={Layers} />
            <StatItem value="15+" label="Technologies Used" icon={Code} />
            <StatItem value="3+" label="Years Learning" icon={Brain} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface StatItemProps {
  value: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

function StatItem({ value, label, icon: Icon }: StatItemProps) {
  return (
    <div className="p-3">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}