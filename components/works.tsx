"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const projectImages = [
  "/modern-ecommerce-website-design-dark-theme.jpg",
  "/digital-marketing-dashboard-app-interface.jpg",
  "/brand-identity-design-system-logo-mockup.jpg",
  "/interactive-portfolio-website-modern-design.jpg",
  "/modern-mobile-app-interface-dark-mode.jpg",
  "/creative-visual-campaign-poster-design.jpg",
];

export default function Works() {
  const t = useTranslations("works");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-32 px-6 bg-gradient-to-b from-transparent to-primary/5 relative overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 50,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 border border-accent/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-40 left-10 w-96 h-96 border border-primary/5 rounded-full"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.p
            variants={titleVariants}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            {t("sectionLabel")}
          </motion.p>
          <motion.h2
            variants={titleVariants}
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative cursor-pointer"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl aspect-square bg-card border border-border"
                whileHover={{ borderColor: "rgba(212, 0, 255, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={image || "/placeholder.svg"}
                  alt={t(`projects.${index}.title`)}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-gradient-overlay via-background/50 to-transparent flex flex-col justify-end p-6"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: hoveredIndex === index ? 0 : 20,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {t(`projects.${index}.title`)}
                      </h3>
                      <motion.div
                        animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-accent" />
                      </motion.div>
                    </div>
                    <p className="text-accent text-sm font-semibold">
                      {t(`projects.${index}.category`)}
                    </p>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{
                    width: hoveredIndex === index ? 32 : 0,
                    height: hoveredIndex === index ? 32 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 border-t-2 border-r-2 border-accent"
                />
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{
                    width: hoveredIndex === index ? 32 : 0,
                    height: hoveredIndex === index ? 32 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 left-4 border-b-2 border-l-2 border-accent"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(212, 0, 255, 1)",
              color: "#0a0a0f",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-accent text-accent font-semibold rounded-xl transition-colors duration-300 group"
          >
            {t("viewAll")}
            <ArrowUpRight className="inline-block ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
