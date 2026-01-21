"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Rocket, Award, Globe, Zap, Star, Users } from "lucide-react"

const milestones = [
  {
    year: "2014",
    title: "The Beginning",
    description: "Founded in a small NYC apartment with big dreams and three passionate designers.",
    icon: Rocket,
  },
  {
    year: "2016",
    title: "First Major Client",
    description: "Landed our first Fortune 500 client, marking a turning point in our journey.",
    icon: Star,
  },
  {
    year: "2018",
    title: "Global Expansion",
    description: "Opened offices in London and Tokyo, expanding our reach across continents.",
    icon: Globe,
  },
  {
    year: "2020",
    title: "Award Recognition",
    description: "Won our first Webby Award and multiple design industry accolades.",
    icon: Award,
  },
  {
    year: "2022",
    title: "Team Growth",
    description: "Expanded to 15+ team members with diverse backgrounds and expertise.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Innovation Lab",
    description: "Launched our AI-powered design innovation lab for next-gen experiences.",
    icon: Zap,
  },
]

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"])

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 bg-gradient-to-b from-transparent via-accent/5 to-transparent overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-accent">Journey</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            A decade of creativity, growth, and countless projects that shaped who we are today.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-accent via-accent/50 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon
              const isEven = i % 2 === 0

              return (
                <motion.div
                  key={i}
                  className={`relative flex items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-colors duration-300"
                      whileHover={{
                        y: -8,
                        boxShadow: "0 20px 40px -15px rgba(209, 113, 226, 0.2)",
                        borderColor: "rgba(209, 113, 226, 0.5)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="text-accent font-bold text-sm mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {milestone.year}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{milestone.title}</h3>
                      <p className="text-foreground/60">{milestone.description}</p>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 hidden md:flex"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-full bg-background border-2 border-accent flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-accent" />
                    </motion.div>
                  </motion.div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
