"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { products } from "@/lib/data"

const tabs = [
  { id: "unstitched", label: "Unstitched" },
  { id: "ready-to-wear", label: "Ready to Wear" },
  { id: "luxury-pret", label: "Luxury Pret" },
  { id: "men", label: "Men" },
  { id: "accessories", label: "Accessories" },
]

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("unstitched")

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const category = product.category.toLowerCase().replace(/ /g, "-")
      return category === activeTab || 
             (activeTab === "unstitched" && category === "unstitched") ||
             (activeTab === "ready-to-wear" && category === "ready-to-wear") ||
             (activeTab === "luxury-pret" && category === "luxury-pret") ||
             (activeTab === "men" && category === "men") ||
             (activeTab === "accessories" && category === "accessories")
    }).slice(0, 8)
  }

  const filteredProducts = getFilteredProducts()

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="px-4 sm:px-6 lg:px-10">
        {/* Tabs */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 sm:gap-4 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            // Show all products if no filter matches
            products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}
