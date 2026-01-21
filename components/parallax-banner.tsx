"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxBanner() {
  const bannerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <section ref={bannerRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -top-20 -bottom-20">
        <img
          src="/creative-design-studio-artistic-workspace-with-neo.jpg"
          alt="Creative studio"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </motion.div>

      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,50 Q1080,100 720,50 Q360,0 0,50 L0,0 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      {/* Content */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            <span className="block mb-2">Let's Create</span>
            <span className="bg-gradient-to-r from-accent via-pink-500 to-accent bg-clip-text text-transparent">
              Something Amazing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Transform your vision into reality with designs that captivate and convert
          </motion.p>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path d="M0,100 L1440,100 L1440,50 Q1080,0 720,50 Q360,100 0,50 L0,100 Z" fill="hsl(var(--background))" />
        </svg>
      </div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] w-16 h-16 border border-accent/30 rounded-full"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-[10%] w-12 h-12 bg-accent/10 rounded-lg rotate-45"
      />
    </section>
  )
}
