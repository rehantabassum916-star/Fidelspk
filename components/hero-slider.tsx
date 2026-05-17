"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { heroSlides } from "@/lib/data"

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[90vh] overflow-hidden bg-background">
      {/* Background Images Layer */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover object-top transition-transform duration-[6000ms] ease-out ${
              index === current ? "scale-105" : "scale-100"
            }`}
            priority={index <= 1} // Preload the first two images to fix loading delays
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center pointer-events-auto"
          >
            <p className="text-white/90 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)] drop-shadow-sm">
              {heroSlides[current].subtitle}
            </p>
            <h2 className="text-white text-4xl sm:text-5xl lg:text-7xl tracking-[0.2em] uppercase mb-8 font-[family-name:var(--font-heading)] font-light drop-shadow-md">
              {heroSlides[current].title}
            </h2>
            <button className="bg-white text-black px-10 py-3 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-300 font-[family-name:var(--font-body)] font-medium">
              {heroSlides[current].cta}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" strokeWidth={1} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 ${
              idx === current
                ? "w-8 h-[2px] bg-white"
                : "w-4 h-[2px] bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
