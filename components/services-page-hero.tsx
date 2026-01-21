"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Zap } from "lucide-react"

export default function ServicesPageHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const floatingTexts = ["Aa", "</>", "UI", "Br", "UX", "3D"]

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Background Elements with parallax */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-2/5 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(209,113,226,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(209,113,226,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating service text with Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingTexts.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 0.2,
              y: [0, -30, 0],
            }}
            transition={{
              opacity: { delay: i * 0.2, duration: 0.5 },
              y: { duration: 4 + i, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 },
            }}
            className="absolute text-2xl font-bold text-accent/20"
            style={{
              top: `${15 + ((i * 15) % 70)}%`,
              left: `${5 + ((i * 18) % 85)}%`,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-accent text-sm font-medium">What We Do</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <span className="text-foreground">Creative </span>
            <motion.span
              className="bg-gradient-to-r from-accent via-chart-2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "200%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              Services
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            From stunning visuals to seamless digital experiences, we offer comprehensive creative solutions that make
            your brand unforgettable.
          </motion.p>

          {/* Service Pills with staggered animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
            }}
            className="flex flex-wrap justify-center gap-3 mt-12"
          >
            {["Graphic Design", "Web Design", "Branding", "UI/UX", "Motion", "Photography"].map((service) => (
              <motion.div
                key={service}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                whileHover={{ scale: 1.1, y: -4, backgroundColor: "hsl(var(--accent) / 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-card border border-border rounded-full text-foreground/80 hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer"
              >
                {service}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1.5 h-3 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
