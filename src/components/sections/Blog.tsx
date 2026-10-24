"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Badge } from "@/components/ui"
import { Calendar, Clock, ExternalLink, FileText, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Blog() {
  const { items } = portfolioConfig.blog

  const featuredPosts = items.filter(post => post.featured)
  const regularPosts = items.filter(post => !post.featured)

  return (
    <section id="blog" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Blog & Writings</span>
          <h2 className="mt-4 section-heading">Thoughts on Systems, AI & Engineering</h2>
          <p className="mt-4 section-subheading">
            Deep dives into architecture decisions, lessons learned, and technical explorations.
          </p>
        </motion.div>

        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h3 className="font-mono text-xs text-primary uppercase tracking-wider mb-5 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured
            </h3>
            <div className="grid md:grid-cols-2 gap-5">
              {featuredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} featured />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-mono text-xs text-primary uppercase tracking-wider mb-5">Latest Posts</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            More writings coming soon. Subscribe to stay updated.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={portfolioConfig.contact.socialLinks.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">View on GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={`mailto:${portfolioConfig.email}?subject=Blog Subscription`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Email Updates</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  post: typeof portfolioConfig.blog.items[0]
  index: number
  featured?: boolean
}

function BlogCard({ post, index, featured = false }: BlogCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-xl hover:border-primary/30">
        <div className="relative h-36 bg-gradient-to-br from-primary/10 to-primary/5" />
        <CardContent className="p-5 pt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" size="sm">
                +{post.tags.length - 3}
              </Badge>
            )}
            {featured && (
              <Badge variant="default" size="sm" className="bg-primary/10 text-primary">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <div className="pt-3 border-t border-border">
            <a
              href={post.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                post.url ? "text-primary hover:text-primary/80" : "text-muted-foreground cursor-not-allowed"
              )}
            >
              {post.url ? "Read Article" : "Coming Soon"}
              <ExternalLink className={cn("h-3 w-3 transition-transform", post.url && "group-hover:translate-x-1")} />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}