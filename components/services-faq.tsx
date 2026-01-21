"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A logo design typically takes 2-3 weeks, while a complete brand identity can take 6-8 weeks. Website projects range from 4-12 weeks depending on features and pages.",
  },
  {
    question: "What's included in the revision process?",
    answer:
      "Each package includes a set number of revision rounds. During each round, you can provide consolidated feedback that we'll implement. Additional revisions beyond the included rounds are available at an hourly rate.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes! We offer maintenance packages and retainer agreements for ongoing design needs. We also provide 30 days of free support after project delivery to address any immediate concerns.",
  },
  {
    question: "Can I upgrade my package mid-project?",
    answer:
      "Absolutely. If your needs evolve during the project, we can discuss upgrading your package or adding specific services. We'll provide a revised quote based on the additional requirements.",
  },
  {
    question: "What file formats will I receive?",
    answer:
      "You'll receive all source files in industry-standard formats including AI, PSD, PDF, PNG, JPG, and SVG. For web projects, you'll get the complete codebase and access to all assets.",
  },
  {
    question: "How do payments work?",
    answer:
      "We typically require 50% upfront to begin work, with the remaining 50% due upon project completion. For larger projects, we can arrange milestone-based payments.",
  },
]

export default function ServicesFaq() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-card/30">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left"
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
            FAQ
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Common <span className="text-accent">Questions</span>
          </h2>
          <p className="text-lg text-foreground/60">Everything you need to know about working with us</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-border overflow-hidden"
              >
                <motion.button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  whileHover={{ backgroundColor: "hsl(var(--accent) / 0.05)" }}
                  animate={{
                    backgroundColor: isOpen ? "hsl(var(--accent) / 0.05)" : "hsl(var(--card))",
                  }}
                  className="w-full p-6 flex items-center justify-between text-left transition-colors"
                >
                  <span
                    className={`font-semibold text-lg transition-colors ${isOpen ? "text-accent" : "text-foreground"}`}
                  >
                    {faq.question}
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="px-6 pb-6 text-foreground/70 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
