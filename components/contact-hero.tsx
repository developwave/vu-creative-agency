"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function ContactHero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(209,113,226,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(209,113,226,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div
        className="absolute top-32 right-24 w-4 h-4 bg-accent rounded-full"
        animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-24 w-5 h-5 border-2 border-chart-2 rounded-full"
        animate={{ y: [15, -15, 15], rotate: [0, 180, 360] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-16 w-3 h-3 bg-chart-2/50 rotate-45"
        animate={{ y: [-12, 12, -12], rotate: [45, 225, 405] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div className="relative z-10 max-w-4xl mx-auto px-6 text-center" style={{ opacity }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8"
            whileHover={{ scale: 1.05, borderColor: "rgba(209,113,226,0.5)" }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <MessageCircle className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-accent text-sm font-medium">Let's Talk</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-foreground">Get in </span>
            <motion.span
              className="bg-gradient-to-r from-accent via-chart-2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent inline-block"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              Touch
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
          >
            Have a project in mind? We'd love to hear about it. Drop us a line and let's create something amazing
            together.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
