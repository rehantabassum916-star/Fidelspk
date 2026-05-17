"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const ways = [
  { title: "Unstitched", image: "/images/category-unstitched.jpg", href: "#" },
  { title: "Ready to Wear", image: "/images/category-readytowear.jpg", href: "#" },
  { title: "Luxury Pret", image: "/images/category-luxurypret.jpg", href: "#" },
]

export default function ThreeWays() {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Three Ways to Wear Elegance
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {ways.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <Link href={item.href} className="group block relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-primary-foreground text-lg tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-medium">
                  {item.title}
                </h3>
                <span className="inline-block mt-2 text-primary-foreground/80 text-[10px] tracking-[0.2em] uppercase border-b border-primary-foreground/40 pb-0.5 font-[family-name:var(--font-body)]">
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
