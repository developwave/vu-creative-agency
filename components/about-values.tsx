"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Lightbulb, Target, Handshake, Palette, Sparkles } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "We pour our hearts into every project, treating each one as our own.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries and exploring new creative territories.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Meticulous attention to detail in every pixel and interaction.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Working together with clients as true creative partners.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Palette,
    title: "Creativity",
    description: "Fearless exploration of ideas that challenge the status quo.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "Never settling for good when great is within reach.",
    color: "from-accent to-chart-2",
  },
]

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Core <span className="text-accent">Values</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            The principles that guide every decision we make and every project we undertake.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-colors duration-300 cursor-default"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">{value.description}</p>
                </div>

                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent/50"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
