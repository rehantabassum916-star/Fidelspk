"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AccessoriesBanner() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Accessories
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link href="#" className="group block relative aspect-[21/9] overflow-hidden">
          <Image
            src="/images/accessories.jpg"
            alt="Accessories Collection"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background/90 backdrop-blur-sm text-foreground px-10 py-3 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] font-medium">
              Shop Accessories
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  )
}
