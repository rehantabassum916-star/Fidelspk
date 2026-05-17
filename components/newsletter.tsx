"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 lg:py-20 bg-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto text-center px-6"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-[family-name:var(--font-body)]">
          Keep Me Updated
        </p>
        <h2 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-[family-name:var(--font-heading)] font-light text-foreground">
          Newsletter
        </h2>
        <p className="mt-4 text-sm text-muted-foreground font-[family-name:var(--font-body)] leading-relaxed">
          Subscribe to get notified about product launches, special offers and exclusive releases.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 w-full bg-background border border-border px-5 py-3 text-sm tracking-wider outline-none focus:border-foreground transition-colors font-[family-name:var(--font-body)] text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors duration-300 font-[family-name:var(--font-body)] font-medium"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-xs text-muted-foreground tracking-wider font-[family-name:var(--font-body)]"
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
