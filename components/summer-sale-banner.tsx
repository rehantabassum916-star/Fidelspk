"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SummerSaleBanner() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-[40vh] lg:h-[50vh]"
      >
        <Image
          src="/images/summer-banner.jpg"
          alt="Summer Sale"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary-foreground/80 text-xs tracking-[0.3em] uppercase mb-3 font-[family-name:var(--font-body)]">
              Shop Now
            </p>
            <h2 className="text-primary-foreground text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-light text-balance">
              {"Summer'26 Sale Flat 30% & 40% Off"}
            </h2>
            <Link
              href="#"
              className="inline-block mt-8 bg-primary-foreground text-primary px-10 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary-foreground/90 transition-colors duration-300 font-[family-name:var(--font-body)] font-medium"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
