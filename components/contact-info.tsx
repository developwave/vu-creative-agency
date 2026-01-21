"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Twitter, Dribbble } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@vucreative.agency",
    href: "mailto:hello@vucreative.agency",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Creative Ave, New York, NY 10001",
    href: "#",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri: 9AM - 6PM EST",
    href: null,
  },
]

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
]

export default function ContactInfo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  }

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 className="text-3xl font-bold text-foreground mb-2" variants={itemVariants}>
        Contact Information
      </motion.h2>
      <motion.p className="text-foreground/60 mb-8" variants={itemVariants}>
        Prefer to reach out directly? Here's how you can find us.
      </motion.p>

      <div className="space-y-6 mb-12">
        {contactDetails.map((detail, i) => {
          const Icon = detail.icon
          const content = (
            <motion.div
              key={i}
              className="flex items-start gap-4 group"
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-5 h-5 text-accent" />
              </motion.div>
              <div>
                <div className="text-sm text-foreground/60 mb-1">{detail.label}</div>
                <div className="text-foreground font-medium group-hover:text-accent transition">{detail.value}</div>
              </div>
            </motion.div>
          )

          return detail.href ? (
            <a key={i} href={detail.href} className="block">
              {content}
            </a>
          ) : (
            <div key={i}>{content}</div>
          )
        })}
      </div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
        <div className="flex gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-foreground/60 hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        className="mt-12 p-6 bg-gradient-to-br from-accent/10 to-chart-2/5 border border-accent/20 rounded-2xl"
        variants={itemVariants}
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(209, 113, 226, 0.4)",
          boxShadow: "0 10px 40px -10px rgba(209, 113, 226, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-foreground font-semibold">Quick Response</span>
        </div>
        <p className="text-foreground/60 text-sm">
          We typically respond within 2-4 hours during business hours. For urgent inquiries, give us a call.
        </p>
      </motion.div>
    </motion.div>
  )
}
