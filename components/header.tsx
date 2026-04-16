"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter as useNextRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const nextRouter = useNextRouter();
  const locale = useLocale();
  const t = useTranslations("header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    // pathname from usePathname() already excludes the locale prefix
    // so we just need to add the new locale prefix
    const newPath = `/${newLocale}${pathname === "/" ? "" : pathname}`;
    nextRouter.push(newPath);
  };

  const navLinks = [
    { href: "/gallery", label: t("gallery") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/Logos/LEGADO_Logotipo-06.png"
            alt="Legado Logo"
            width={180}
            height={60}
            className="h-auto w-auto max-h-12 group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? "text-accent"
                  : "text-foreground/70 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          {/* Language Switcher */}
          <button
            onClick={() => switchLocale(locale === "en" ? "es" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-foreground/70 hover:text-accent transition rounded-md hover:bg-accent/10"
            title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe size={18} />
            <span className="text-sm font-medium uppercase">{locale}</span>
          </button>

          <Link
            href="/contact"
            className="px-6 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          {/* Language Switcher Mobile */}
          <button
            onClick={() => switchLocale(locale === "en" ? "es" : "en")}
            className="flex items-center gap-1 px-2 py-1.5 text-foreground/70 hover:text-accent transition"
            title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe size={18} />
            <span className="text-xs font-medium uppercase">{locale}</span>
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-6 space-y-4 overflow-hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`block py-2 transition ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-foreground/70 hover:text-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                href="/contact"
                className="block px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("cta")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
