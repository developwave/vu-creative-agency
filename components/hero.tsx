"use client";

import type React from "react";

import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden relative"
    >
      <motion.div
        style={{ y: smoothY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-40 right-20 w-4 h-4 bg-accent rounded-full opacity-60"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-40 left-20 w-2 h-2 bg-accent rounded-full opacity-40"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute top-60 left-1/4 w-3 h-3 bg-accent/50 rounded-full"
        />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left side - Text content */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="text-left"
        >
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full"
            >
              <p className="text-accent text-sm font-semibold tracking-widest">
                MEET VU CREATIVE
              </p>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Design That
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-accent via-pink-500 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
                whileHover={{ scale: 1.02 }}
              >
                Moves You
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/60 max-w-xl mb-10 leading-relaxed"
            >
              We craft stunning digital experiences through web design and
              graphics that tell your story, captivate your audience, and drive
              results.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(212, 0, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent text-background font-semibold rounded-xl flex items-center gap-2 group"
              >
                View Our Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(212, 0, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-accent/30 text-accent font-semibold rounded-xl flex items-center gap-2 group"
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring" }}
                >
                  <Play className="w-5 h-5" />
                </motion.span>
                Watch Showreel
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          variants={imageVariants}
          className="relative lg:justify-self-end"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateY: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
            style={{ transformPerspective: 1000 }}
          >
            {/* Glow effect behind image */}
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-pink-500/20 to-accent/20 rounded-3xl blur-2xl"
            />

            {/* Main image container */}
            <div className="w-full max-w-lg xl:max-w-xl h-[400px] md:h-[500px] lg:h-[550px] bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl border border-accent/20 overflow-hidden relative">
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/modern-creative-agency-workspace-with-designers.jpg"
                alt="VU Creative Agency workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Floating badge on image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 p-4 bg-background/80 backdrop-blur-md rounded-xl border border-accent/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-semibold">10+ Years</p>
                    <p className="text-foreground/60 text-sm">
                      Crafting digital excellence
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        className="w-10 h-10 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center text-accent text-xs font-bold"
                      >
                        {i === 1 ? "★" : i === 2 ? "♦" : "●"}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements around image */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute -top-6 -right-6 w-12 h-12 border-2 border-accent/30 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent/20 rounded-lg"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-foreground/40 text-xs tracking-widest"
        >
          SCROLL
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1.5 h-3 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
