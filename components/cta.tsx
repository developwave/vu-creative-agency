"use client"

import { useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  }

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-transparent"
      />

      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-16 h-16 border border-accent/20 rounded-xl"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-24 h-24 bg-accent/5 rounded-full blur-xl"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-1/2 right-10 w-32 h-32 border border-primary/10 rounded-full"
      />

      <motion.div
        style={{ scale }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block mb-6"
        >
          <Sparkles className="w-10 h-10 text-accent" />
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ready to Transform
          </motion.span>
          <motion.span
            className="block text-accent"
            animate={{ backgroundPosition: ["0%", "200%"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage: "linear-gradient(90deg, #d400ff, #ff006a, #d400ff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Brand?
          </motion.span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Let's collaborate and create something extraordinary. Get in touch with our team today to discuss your
          project.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 0, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-accent text-background font-semibold rounded-xl flex items-center gap-2 group w-full sm:w-auto justify-center relative overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Start Your Project</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 0, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-accent/30 text-accent font-semibold rounded-xl w-full sm:w-auto"
          >
            Schedule a Call
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 pt-16 border-t border-border">
          <motion.p
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="text-foreground/40 text-sm mb-6"
          >
            TRUSTED BY LEADING BRANDS
          </motion.p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {["Brand A", "Brand B", "Brand C", "Brand D"].map((brand, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 0.5, y: 0 } : {}}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.1, color: "rgb(212, 0, 255)" }}
                className="text-foreground/40 font-semibold text-sm cursor-default transition-colors"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
