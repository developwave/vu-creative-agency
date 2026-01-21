"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, ExternalLink } from "lucide-react"

export default function ContactMap() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Map Placeholder */}
          <div className="relative h-[400px] bg-card border border-border">
            {/* Styled Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-chart-2/5" />

            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(209,113,226,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(209,113,226,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Location Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/20 rounded-full animate-ping" />
                <div className="relative w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                  <MapPin className="w-8 h-8 text-background" />
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm bg-background/90 backdrop-blur-sm border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">VU Creative Agency HQ</h3>
              <p className="text-foreground/60 text-sm mb-4">
                123 Creative Avenue, Suite 500
                <br />
                New York, NY 10001, USA
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm transition"
              >
                Open in Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
