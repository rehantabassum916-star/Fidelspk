"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const ways = [
  { title: "Unstitched", image: "/images/category-unstitched.jpg", href: "/collections/unstitched" },
  { title: "Ready to Wear", image: "/images/category-readytowear.jpg", href: "/collections/ready-to-wear" },
  { title: "Freedom to Buy", image: "/images/category-luxurypret.jpg", href: "/collections/luxury-pret" },
]

export default function ThreeWays() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10 lg:mb-12"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Three Ways to Wear Elegance
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {ways.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Link href={item.href} className="group block relative aspect-[3/4] sm:aspect-[2/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 sm:pb-8">
                <h3 className="text-white text-base sm:text-lg lg:text-xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-medium mb-3">
                  {item.title}
                </h3>
                <span className="inline-block px-5 py-2 bg-white text-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-[family-name:var(--font-body)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
