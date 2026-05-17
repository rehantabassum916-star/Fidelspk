"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NewArrivalBanner() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square lg:aspect-auto overflow-hidden"
        >
          <Image
            src="/images/hero-1.jpg"
            alt="New Arrival Collection"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-secondary flex items-center justify-center p-10 lg:p-16"
        >
          <div className="text-center max-w-md">
            <h2 className="text-3xl lg:text-4xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground text-balance">
              New Arrival
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground font-[family-name:var(--font-body)]">
              Step into the season with our latest arrivals. Discover trending
              pieces, seasonal highlights, and timeless choices for your wardrobe.
            </p>
            <Link
              href="#"
              className="inline-block mt-8 bg-primary text-primary-foreground px-10 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300 font-[family-name:var(--font-body)] font-medium"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
