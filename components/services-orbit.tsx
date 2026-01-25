"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Palette, Globe, Smartphone, Sparkles, Camera, PenTool, Layers, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

const serviceIcons = [Globe, Sparkles, Smartphone, Palette, Camera, PenTool, Layers, Zap]
const ROTATION_INTERVAL = 4000
const TOTAL_SERVICES = serviceIcons.length

// Active position: 2 = right (3 o'clock) for desktop, 4 = bottom (6 o'clock) for mobile
const ACTIVE_POSITION_DESKTOP = 2
const ACTIVE_POSITION_MOBILE = 4

export default function ServicesOrbit() {
  const t = useTranslations("homeServices")
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [rotationOffset, setRotationOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const activePosition = isDesktop ? ACTIVE_POSITION_DESKTOP : ACTIVE_POSITION_MOBILE

  // Auto-rotation
  useEffect(() => {
    if (!isInView || isPaused) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (ROTATION_INTERVAL / 50))
        if (next >= 100) {
          return 100 // Cap at 100
        }
        return next
      })
    }, 50)

    return () => {
      clearInterval(progressInterval)
    }
  }, [isInView, isPaused, resetKey])

  // Handle rotation when progress completes
  useEffect(() => {
    if (progress >= 100 && !isPaused) {
      const timeout = setTimeout(() => {
        setRotationOffset((prev) => (prev + 1) % TOTAL_SERVICES)
        setProgress(0)
      }, 150) // Small delay to show complete circle
      return () => clearTimeout(timeout)
    }
  }, [progress, isPaused])

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  const handleServiceClick = useCallback((index: number) => {
    // Bring clicked service to active position
    const currentPosition = (index + rotationOffset) % TOTAL_SERVICES
    const stepsNeeded = (activePosition - currentPosition + TOTAL_SERVICES) % TOTAL_SERVICES
    setRotationOffset((prev) => (prev + stepsNeeded) % TOTAL_SERVICES)
    setProgress(0)
    setResetKey((prev) => prev + 1) // Reset intervals
  }, [rotationOffset, activePosition])

  // Calculate position on circular orbit
  const getServicePosition = (index: number) => {
    const position = (index + rotationOffset) % TOTAL_SERVICES
    // Angle: distribute services evenly, starting from top (-90°)
    const angleDeg = position * (360 / TOTAL_SERVICES) - 90
    const angleRad = angleDeg * (Math.PI / 180)

    // Circle: same radius for both axes (40% of container)
    const radius = 40
    const left = 50 + radius * Math.cos(angleRad)
    const top = 50 + radius * Math.sin(angleRad)

    // Active = activePosition (desktop: right/3 o'clock, mobile: bottom/6 o'clock)
    const isActive = position === activePosition

    // Depth effect: scale and opacity based on horizontal position
    const depthFactor = (Math.cos(angleRad) + 1) / 2 // 0 (left) to 1 (right)
    const scale = isActive ? 1 : 0.5 + depthFactor * 0.4 // 0.5 to 0.9 for inactive
    const opacity = isActive ? 1 : 0.3 + depthFactor * 0.5 // 0.3 to 0.8 for inactive

    // Z-index: higher for items on the right (in front)
    const zIndex = isActive ? 30 : Math.round(10 + depthFactor * 10)

    return { left, top, scale, opacity, zIndex, isActive }
  }

  // Current active service
  const activeServiceIndex = (TOTAL_SERVICES - rotationOffset + activePosition) % TOTAL_SERVICES
  const ActiveIcon = serviceIcons[activeServiceIndex]

  return (
    <section ref={sectionRef} className="py-32 md:py-48 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent text-sm font-medium tracking-[0.2em] mb-4">{t("sectionLabel")}</p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">{t("title")}</h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-8 items-center">
          {/* Left: Orbit container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mx-auto lg:mx-0 lg:-ml-16 xl:-ml-24"
          >
            {/* Orbit path (decorative) */}
            <div
              className="absolute border border-border/20 rounded-full pointer-events-none"
              style={{
                left: '10%',
                right: '10%',
                top: '10%',
                bottom: '10%',
              }}
            />

            {/* Service circles */}
            {serviceIcons.map((_, index) => {
              const pos = getServicePosition(index)
              const serviceName = t(`items.${index}.name`)

              return (
                <motion.button
                  key={index}
                  onClick={() => handleServiceClick(index)}
                  onMouseEnter={pos.isActive ? handleMouseEnter : undefined}
                  onMouseLeave={pos.isActive ? handleMouseLeave : undefined}
                  className={`absolute rounded-full border flex items-center justify-center cursor-pointer ${
                    pos.isActive
                      ? "bg-background border-transparent"
                      : "bg-background/80 border-border/20 hover:border-border/40"
                  }`}
                  style={{
                    zIndex: pos.zIndex,
                    boxShadow: pos.isActive ? "0 0 50px 15px rgba(209, 113, 226, 0.35)" : "none"
                  }}
                  animate={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    scale: pos.scale,
                    opacity: pos.opacity,
                    x: "-50%",
                    y: "-50%",
                    width: pos.isActive ? "clamp(200px, 32vw, 280px)" : "clamp(80px, 14vw, 120px)",
                    height: pos.isActive ? "clamp(200px, 32vw, 280px)" : "clamp(80px, 14vw, 120px)",
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={!pos.isActive ? {
                    scale: pos.scale * 1.15,
                    opacity: Math.min(pos.opacity + 0.2, 1),
                  } : {}}
                >
                  {/* Progress ring */}
                  {pos.isActive && (
                    <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="3" className="text-border/30" />
                      <motion.circle
                        cx="50" cy="50" r="48"
                        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                        className="text-accent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.1, ease: "linear" }}
                      />
                    </svg>
                  )}

                  {/* Service name */}
                  <span
                    className={`font-serif text-center px-3 ${
                      pos.isActive
                        ? "text-base md:text-lg lg:text-xl text-foreground"
                        : "text-[10px] md:text-xs text-muted-foreground/70"
                    }`}
                    style={{ fontStyle: "italic" }}
                  >
                    {serviceName}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Right: Service details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center lg:justify-center items-center lg:items-start"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-center lg:text-left"
              >
                {/* Icon - hidden on mobile */}
                <div className="hidden lg:flex w-16 h-16 rounded-2xl bg-accent/10 items-center justify-center">
                  <ActiveIcon className="w-8 h-8 text-accent" />
                </div>

                {/* Service name - hidden on mobile */}
                <h3 className="hidden lg:block text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  {t(`items.${activeServiceIndex}.name`)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-md">
                  {t(`items.${activeServiceIndex}.description`)}
                </p>

              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
