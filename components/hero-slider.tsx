"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
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
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
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
            className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
              index === current ? "scale-110" : "scale-100"
            }`}
            priority={index <= 1}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        </div>
      ))}

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 sm:pb-32 lg:pb-40 pointer-events-none px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-center pointer-events-auto"
          >
            <p className="text-white/80 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 sm:mb-4 font-[family-name:var(--font-body)]">
              {heroSlides[current].subtitle}
            </p>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] uppercase mb-6 sm:mb-8 font-[family-name:var(--font-heading)] font-light">
              {heroSlides[current].title}
            </h2>
            <Link 
              href="/collections/new-arrivals"
              className="inline-block bg-white text-black px-8 sm:px-12 py-3 sm:py-3.5 text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-300 font-[family-name:var(--font-body)] font-medium"
            >
              {heroSlides[current].cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-30 p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-30 p-2"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={1} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-30">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "w-8 sm:w-10 h-[3px] bg-white"
                : "w-3 sm:w-4 h-[3px] bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors z-30 animate-bounce hidden lg:block"
        style={{ marginBottom: "60px" }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
      </button>
    </section>
  )
}
