"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Palette, Globe, Smartphone, Sparkles, Video, Camera, PenTool, Layers, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Eye-catching visuals that tell your brand story. From logos to marketing materials, we create designs that leave lasting impressions.",
    features: ["Logo Design", "Print Materials", "Illustrations", "Packaging"],
    color: "from-pink-500 to-accent",
  },
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Beautiful, responsive websites that convert visitors into customers. We blend aesthetics with functionality for stunning digital experiences.",
    features: ["Custom Websites", "E-commerce", "Web Applications", "CMS Development"],
    color: "from-accent to-blue-500",
  },
  {
    icon: Smartphone,
    title: "UI/UX Design",
    description:
      "Intuitive interfaces designed for engagement. We create seamless user experiences that delight and retain your audience.",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Brand Identity",
    description:
      "Comprehensive brand strategies that elevate your identity. We build memorable brands that resonate with your target market.",
    features: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Rebranding"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Video,
    title: "Motion Graphics",
    description:
      "Dynamic animations that bring your message to life. From explainer videos to social content, we create motion that captivates.",
    features: ["Animation", "Video Editing", "Social Content", "Explainer Videos"],
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Professional photography that showcases your brand. We capture stunning visuals for products, events, and marketing campaigns.",
    features: ["Product Photos", "Event Coverage", "Lifestyle Shots", "Photo Editing"],
    color: "from-green-500 to-yellow-500",
  },
  {
    icon: PenTool,
    title: "Illustration",
    description:
      "Custom illustrations that add character to your brand. From icons to full artwork, we bring creativity to every stroke.",
    features: ["Custom Icons", "Character Design", "Digital Art", "Infographics"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Layers,
    title: "Social Media Design",
    description:
      "Scroll-stopping social content that drives engagement. We create cohesive visual strategies for all your social platforms.",
    features: ["Post Templates", "Story Design", "Ad Creatives", "Content Strategy"],
    color: "from-orange-500 to-pink-500",
  },
]

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            COMPREHENSIVE SOLUTIONS
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Everything Your Brand <span className="text-accent">Needs</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Full-spectrum creative services to take your brand from concept to reality
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => {
              const Icon = service.icon
              const isExpanded = expandedIndex === index
              return (
                <motion.div
                  key={service.title}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`group relative p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 cursor-pointer ${
                    isExpanded ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-12 h-12 mb-4 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-background" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>

                    <p
                      className={`text-foreground/60 text-sm leading-relaxed mb-4 ${isExpanded ? "" : "line-clamp-2"}`}
                    >
                      {service.description}
                    </p>

                    {/* Features - shown when expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.features.map((feature, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                      <span>{isExpanded ? "Show Less" : "Learn More"}</span>
                      <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Corner number */}
                  <motion.div
                    initial={{ opacity: 0.05 }}
                    whileHover={{ opacity: 0.1 }}
                    className="absolute top-4 right-4 text-4xl font-bold text-foreground/5"
                  >
                    0{index + 1}
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
