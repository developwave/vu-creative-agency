"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Camera, Layers, Monitor, Palette } from "lucide-react"

export default function GalleryHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const floatingIcons = [
    { icon: Camera, x: "10%", y: "30%", delay: 0 },
    { icon: Palette, x: "85%", y: "35%", delay: 0.2 },
    { icon: Monitor, x: "20%", y: "70%", delay: 0.4 },
    { icon: Layers, x: "90%", y: "65%", delay: 0.6 },
  ]

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background elements with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute bottom-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
      />

      {/* Floating icons with Framer Motion */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay + 0.5, duration: 0.5, type: "spring" }}
            className="absolute"
            style={{ left: item.x, top: item.y }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: item.delay }}
              className="w-14 h-14 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center"
            >
              <Icon className="w-6 h-6 text-accent" />
            </motion.div>
          </motion.div>
        )
      })}

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            OUR PORTFOLIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-foreground">Creative</span>
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0%", "200%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              Gallery
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-12"
          >
            Explore our collection of award-winning designs, brand identities, websites, and creative projects that
            showcase our passion for visual excellence.
          </motion.p>

          {/* Category pills with staggered animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
            }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["250+ Projects", "120+ Clients", "15+ Awards", "10+ Years"].map((stat) => (
              <motion.div
                key={stat}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-5 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-foreground/80 text-sm cursor-default"
              >
                {stat}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />
    </section>
  )
}
