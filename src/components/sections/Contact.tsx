"use client"

import { motion } from "framer-motion"
import { portfolioConfig } from "@/config/portfolio"
import { Card, CardContent } from "@/components/ui"
import { Button } from "@/components/ui"
import { Mail, Linkedin, Github, ExternalLink, ArrowRight, Send, MapPin, Clock } from "lucide-react"

export function Contact() {
  const { email, socialLinks } = portfolioConfig.contact

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-wider">Get In Touch</span>
          <h2 className="mt-4 section-heading">Let's Build Something</h2>
          <p className="mt-4 section-subheading">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            <Card className="glass border-border/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground">Primary contact method</p>
                  </div>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-primary font-medium hover:underline flex items-center gap-2"
                >
                  {email}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="glass border-border/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">Open to remote work</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{portfolioConfig.location}</p>
                <p className="text-sm text-muted-foreground mt-1">Timezone: IST (UTC+5:30)</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Availability</h3>
                    <p className="text-sm text-muted-foreground">Open to opportunities</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• Full-time positions</p>
                  <p>• Internships</p>
                  <p>• Freelance projects</p>
                  <p>• Open source collaboration</p>
                  <p>• Technical mentoring</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass border-border/30 h-full">
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold text-foreground mb-2">Send a Message</h3>
                <p className="text-muted-foreground mb-5">
                  Have a project in mind or just want to say hello? I'd love to hear from you.
                </p>

                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:${email}?subject=Portfolio Contact&body=Hello Indar,` }}>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                      placeholder="Project inquiry, collaboration, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Or connect directly:</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.github && (
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        <span className="text-sm font-medium">GitHub</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="text-sm font-medium">LinkedIn</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {!socialLinks.github && !socialLinks.linkedin && (
                      <span className="text-sm text-muted-foreground">Add social links in config to enable</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <div className="glass inline-flex items-center gap-3 px-5 py-3 rounded-xl border-border/30 max-w-2xl">
            <Mail className="h-5 w-5 text-primary" />
            <p className="text-muted-foreground text-sm">
              {email} — Usually respond within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}