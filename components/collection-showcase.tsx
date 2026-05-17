"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CollectionShowcase() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-[family-name:var(--font-body)]">
          Shop Best Sellers
        </p>
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Elegance Redefined for Him & Her
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-12">
        {/* Women */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="#" className="group block relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/collection-women.jpg"
              alt="Women Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-foreground/15 group-hover:bg-foreground/25 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-primary-foreground text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light">
                Women
              </h3>
              <span className="inline-block mt-3 text-primary-foreground/80 text-[10px] tracking-[0.2em] uppercase border-b border-primary-foreground/40 pb-0.5 font-[family-name:var(--font-body)]">
                Shop Collection
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Men */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="#" className="group block relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/collection-men.jpg"
              alt="Men Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-foreground/15 group-hover:bg-foreground/25 transition-colors duration-500" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-primary-foreground text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light">
                Men
              </h3>
              <span className="inline-block mt-3 text-primary-foreground/80 text-[10px] tracking-[0.2em] uppercase border-b border-primary-foreground/40 pb-0.5 font-[family-name:var(--font-body)]">
                Shop Collection
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
