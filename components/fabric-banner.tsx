"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const categoryLinks = [
  "Unstitched",
  "Ready to Wear",
  "Luxury Pret",
  "Freedom to Buy",
  "Men",
  "Accessories",
]

export default function FabricBanner() {
  return (
    <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
      <div className="px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-light leading-tight text-balance">
            | FIDELS | The Fabric of Pakistan
          </h2>

          <p className="mt-6 text-xs tracking-[0.2em] uppercase text-primary-foreground/70 font-[family-name:var(--font-body)]">
            Discover Our Most Popular Styles
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 mt-8">
            {categoryLinks.map((cat) => (
              <Link
                key={cat}
                href="#"
                className="text-xs tracking-[0.15em] uppercase text-primary-foreground/80 hover:text-primary-foreground border-b border-transparent hover:border-primary-foreground/40 pb-1 transition-all duration-300 font-[family-name:var(--font-body)]"
              >
                {cat}
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="#"
              className="inline-block bg-primary-foreground text-primary px-10 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary-foreground/90 transition-colors duration-300 font-[family-name:var(--font-body)] font-medium"
            >
              View All
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
