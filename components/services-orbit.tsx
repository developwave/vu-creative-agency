"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Palette, Globe, Smartphone, Sparkles, Camera, PenTool, Layers, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

const serviceIcons = [Globe, Sparkles, Smartphone, Palette, Camera, PenTool, Layers, Zap]

export default function ServicesOrbit() {
  const t = useTranslations("homeServices")
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <section ref={sectionRef} className="py-32 md:py-40 relative overflow-hidden">
      {/* Subtle background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-accent text-sm font-medium tracking-[0.2em] mb-4">{t("sectionLabel")}</p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">{t("title")}</h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left side - Animated circle visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square max-w-[500px] mx-auto w-full"
          >
            {/* Rotating outer ring with service names */}
            <motion.div className="absolute inset-0" style={{ rotate }}>
              {/* Outer circle border */}
              <div className="absolute inset-0 rounded-full border border-border/30" />

              {/* Service dots on the circle */}
              {serviceIcons.map((_, index) => {
                const angle = (index * 45 - 90) * (Math.PI / 180)
                const x = 50 + 48 * Math.cos(angle)
                const y = 50 + 48 * Math.sin(angle)

                return (
                  <motion.div
                    key={index}
                    className="absolute w-2 h-2 bg-accent rounded-full"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )
              })}
            </motion.div>

            {/* Static middle ring */}
            <div className="absolute inset-[15%] rounded-full border border-dashed border-border/20" />

            {/* Inner accent ring */}
            <div className="absolute inset-[30%] rounded-full">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border/30"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-accent"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 0.6 } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
            </div>

            {/* Center content */}
            <div className="absolute inset-[35%] rounded-full bg-card/50 backdrop-blur-sm border border-border/30 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                {activeIndex !== null ? (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    {(() => {
                      const Icon = serviceIcons[activeIndex]
                      return <Icon className="w-8 h-8 text-accent mb-2" />
                    })()}
                    <span className="text-sm font-semibold text-foreground">{t(`items.${activeIndex}.name`)}</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Sparkles className="w-8 h-8 text-accent mb-2" />
                    <span className="text-sm font-semibold text-foreground">{t("servicesCount")}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Floating service labels around the circle */}
            {serviceIcons.map((_, index) => {
              const angle = (index * 45 - 90) * (Math.PI / 180)
              const radius = 58
              const x = 50 + radius * Math.cos(angle)
              const y = 50 + radius * Math.sin(angle)

              return (
                <motion.button
                  key={index}
                  className="absolute text-xs md:text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-300 whitespace-nowrap"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {t(`items.${index}.name`)}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Right side - Service cards list */}
          <div className="space-y-4">
            {serviceIcons.map((Icon, index) => {
              const isActive = activeIndex === index

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent/10 border-accent/30"
                      : "bg-card/30 border-border/20 hover:bg-card/50 hover:border-border/40"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "bg-card border border-border/30 text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold transition-colors duration-300 ${isActive ? "text-accent" : "text-foreground"}`}
                    >
                      {t(`items.${index}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t(`items.${index}.description`)}</p>
                  </div>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-accent"
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
