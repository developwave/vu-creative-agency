"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  X,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const categories = [
  "All",
  "Web Design",
  "Branding",
  "Graphics",
  "Mobile Apps",
  "UI/UX",
  "Photography",
];

const projects = [
  {
    id: 1,
    title: "Luxe Fashion E-Commerce",
    category: "Web Design",
    image: "/luxury-fashion-ecommerce-website-dark-theme.jpg",
    description:
      "A premium e-commerce platform for high-end fashion brands with immersive shopping experience.",
    year: "2024",
    client: "Luxe Fashion Co.",
    size: "large",
  },
  {
    id: 2,
    title: "TechVault Brand Identity",
    category: "Branding",
    image: "/modern-tech-company-brand-identity-logo-dark.jpg",
    description:
      "Complete brand identity system including logo, colors, and guidelines for a tech startup.",
    year: "2024",
    client: "TechVault Inc.",
    size: "small",
  },
  {
    id: 3,
    title: "Minimalist App Interface",
    category: "Mobile Apps",
    image: "/minimal-mobile-app-interface-dark-mode.jpg",
    description:
      "Clean and intuitive mobile app design focused on user experience.",
    year: "2024",
    client: "AppFlow",
    size: "tall",
  },
  {
    id: 4,
    title: "Creative Campaign Visuals",
    category: "Graphics",
    image: "/creative-marketing-campaign-poster-design.jpg",
    description: "Eye-catching visual campaign materials for a product launch.",
    year: "2023",
    client: "Nova Marketing",
    size: "wide",
  },
  {
    id: 5,
    title: "Restaurant Website Redesign",
    category: "Web Design",
    image: "/elegant-restaurant-website-design-dark.jpg",
    description: "Modern website redesign for an upscale dining establishment.",
    year: "2023",
    client: "The Golden Fork",
    size: "small",
  },
  {
    id: 6,
    title: "Finance Dashboard UI",
    category: "UI/UX",
    image: "/finance-dashboard-ui-design-dark-theme.jpg",
    description:
      "Comprehensive dashboard design for financial analytics platform.",
    year: "2024",
    client: "FinanceFlow",
    size: "large",
  },
  {
    id: 7,
    title: "Startup Brand Package",
    category: "Branding",
    image: "/startup-branding-package-mockup-dark.jpg",
    description: "Full branding package for an innovative tech startup.",
    year: "2023",
    client: "Innovate Labs",
    size: "tall",
  },
  {
    id: 8,
    title: "Product Photography",
    category: "Photography",
    image: "/professional-product-photography-dark-background.jpg",
    description: "Professional product photography for luxury goods.",
    year: "2024",
    client: "Premium Goods",
    size: "wide",
  },
  {
    id: 9,
    title: "Social Media Kit",
    category: "Graphics",
    image: "/social-media-design-kit-templates-dark.jpg",
    description: "Comprehensive social media design templates and assets.",
    year: "2023",
    client: "Social Spark",
    size: "small",
  },
  {
    id: 10,
    title: "Fitness App Design",
    category: "Mobile Apps",
    image: "/fitness-app-interface-dark-mode.jpg",
    description: "Health and fitness tracking app with gamification elements.",
    year: "2024",
    client: "FitLife",
    size: "small",
  },
  {
    id: 11,
    title: "Architecture Portfolio",
    category: "Web Design",
    image: "/architecture-portfolio-website-minimal-dark.jpg",
    description: "Elegant portfolio website for an architecture firm.",
    year: "2023",
    client: "Modern Arch",
    size: "large",
  },
  {
    id: 12,
    title: "Event Branding",
    category: "Branding",
    image: "/event-branding-design-conference-materials.jpg",
    description: "Complete event branding for a tech conference.",
    year: "2024",
    client: "TechCon 2024",
    size: "tall",
  },
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const navigateProject = (direction: "prev" | "next") => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(
      (p) => p.id === selectedProject.id,
    );
    if (direction === "prev") {
      const prevIndex =
        currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
      setSelectedProject(filteredProjects[prevIndex]);
    } else {
      const nextIndex =
        currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
      setSelectedProject(filteredProjects[nextIndex]);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                  : "bg-card/50 text-foreground/70 hover:bg-card hover:text-foreground border border-border/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid with AnimatePresence */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="break-inside-avoid group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 ${
                    project.size === "tall"
                      ? "aspect-[3/4]"
                      : project.size === "large" || project.size === "wide"
                        ? "aspect-video"
                        : "aspect-square"
                  }`}
                >
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-gradient-overlay via-background/60 to-transparent"
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-accent text-xs font-semibold tracking-wider mb-2 block">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {project.title}
                        </h3>
                        <p className="text-foreground/60 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Corner accents */}
                  <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-accent/0 group-hover:border-accent transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-accent/0 group-hover:border-accent transition-all duration-300" />

                  {/* View button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 left-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            />

            {/* Navigation buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateProject("prev");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-card hover:border-accent/50 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateProject("next");
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/50 flex items-center justify-center text-foreground hover:bg-card hover:border-accent/50 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-auto rounded-3xl bg-card border border-border/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background hover:border-accent/50 transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto overflow-hidden">
                  <motion.img
                    key={selectedProject.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 md:p-12 flex flex-col justify-center"
                >
                  <span className="text-accent text-sm font-semibold tracking-wider mb-3">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-foreground/60 text-lg mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-foreground/40 text-sm mb-1">Client</p>
                      <p className="text-foreground font-medium">
                        {selectedProject.client}
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground/40 text-sm mb-1">Year</p>
                      <p className="text-foreground font-medium">
                        {selectedProject.year}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all w-fit"
                  >
                    View Live Project
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
