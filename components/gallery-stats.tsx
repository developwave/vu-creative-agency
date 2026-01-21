"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Briefcase, Globe, Heart } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  {
    icon: Briefcase,
    number: 250,
    suffix: "+",
    label: "Projects Completed",
    color: "from-accent to-primary",
  },
  {
    icon: Heart,
    number: 120,
    suffix: "+",
    label: "Happy Clients",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Award,
    number: 15,
    suffix: "",
    label: "Design Awards",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe,
    number: 30,
    suffix: "+",
    label: "Countries Reached",
    color: "from-cyan-500 to-blue-500",
  },
]

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, start])

  return count
}

function StatCard({
  icon: Icon,
  number,
  suffix,
  label,
  color,
  index,
  isVisible,
}: {
  icon: typeof Briefcase
  number: number
  suffix: string
  label: string
  color: string
  index: number
  isVisible: boolean
}) {
  const count = useCountUp(number, 2000, isVisible)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-500 text-center overflow-hidden">
        {/* Background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.1 }}
          className={`absolute inset-0 bg-gradient-to-br ${color}`}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${color} p-[1px]`}
        >
          <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
            <Icon className="w-7 h-7 text-foreground" />
          </div>
        </motion.div>

        {/* Number */}
        <motion.div
          className="text-5xl font-bold text-foreground mb-2"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
        >
          {count}
          {suffix}
        </motion.div>

        {/* Label */}
        <p className="text-foreground/60">{label}</p>
      </div>
    </motion.div>
  )
}

export default function GalleryStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration with parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            BY THE NUMBERS
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Our <span className="text-accent">Impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} isVisible={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
