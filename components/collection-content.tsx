"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Filter, Grid2X2, Grid3X3, ChevronDown, X } from "lucide-react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/data"

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
]

const priceRanges = [
  { label: "Under PKR 3,000", min: 0, max: 3000 },
  { label: "PKR 3,000 - 5,000", min: 3000, max: 5000 },
  { label: "PKR 5,000 - 10,000", min: 5000, max: 10000 },
  { label: "Above PKR 10,000", min: 10000, max: Infinity },
]

interface CollectionContentProps {
  title: string
  initialProducts: Product[]
}

export default function CollectionContent({ title, initialProducts }: CollectionContentProps) {
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3)
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // Apply price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      result = result.filter(p => p.price >= range.min && p.price < range.max)
    }

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [initialProducts, selectedPriceRange, sortBy])

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-40 sm:h-48 lg:h-64 bg-secondary flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10 px-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-[family-name:var(--font-heading)] font-semibold text-foreground">
            {title}
          </h1>
          <p className="mt-2 sm:mt-3 text-muted-foreground text-xs sm:text-sm tracking-wider font-[family-name:var(--font-body)]">
            Explore our exclusive {title.toLowerCase()} collection
          </p>
        </motion.div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-[72px] z-30 bg-background border-b border-border">
        <div className="px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Filter Button + Results Count */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-border hover:border-foreground transition-colors text-xs sm:text-sm font-[family-name:var(--font-body)]"
              >
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="tracking-wider uppercase">Filters</span>
              </button>
              <span className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                {filteredProducts.length} Products
              </span>
            </div>

            {/* Right: Sort + Grid Toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-border px-3 sm:px-4 py-2 pr-8 text-xs sm:text-sm tracking-wider font-[family-name:var(--font-body)] cursor-pointer focus:outline-none focus:border-foreground"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-muted-foreground" />
              </div>

              {/* Grid Toggle - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1 border border-border">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-2 transition-colors ${gridCols === 2 ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  aria-label="2 column grid"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 transition-colors ${gridCols === 3 ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  aria-label="3 column grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 transition-colors ${gridCols === 4 ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  aria-label="4 column grid"
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-[1px]" />
                    <div className="bg-current rounded-[1px]" />
                    <div className="bg-current rounded-[1px]" />
                    <div className="bg-current rounded-[1px]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-b border-border bg-secondary/30"
        >
          <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)] font-medium">
                Filter by Price
              </h3>
              {selectedPriceRange !== null && (
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                  className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs tracking-wider font-[family-name:var(--font-body)] transition-all ${
                    selectedPriceRange === idx
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border hover:border-foreground"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12">
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
            gridCols === 2 ? "grid-cols-2" :
            gridCols === 3 ? "grid-cols-2 sm:grid-cols-3" :
            "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20">
            <p className="text-muted-foreground tracking-wider uppercase font-[family-name:var(--font-body)] text-sm">
              No products found in this collection.
            </p>
            <button
              onClick={() => {
                setSelectedPriceRange(null)
                setSortBy("featured")
              }}
              className="mt-4 text-xs tracking-wider uppercase underline hover:no-underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}
