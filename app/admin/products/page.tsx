"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  ChevronDown,
} from "lucide-react"
import { products } from "@/lib/data"

const categoriesData = [
  "Unstitched",
  "Ready to Wear",
  "Luxury Pret",
  "Men",
  "Accessories",
]

// Pre-defined stock values to avoid hydration mismatch from Math.random()
const stockValues: Record<string, number> = {
  "1": 35,
  "2": 72,
  "3": 40,
  "4": 50,
  "5": 28,
  "6": 65,
  "7": 15,
  "8": 88,
}

type Product = (typeof products)[0] & { stock?: number }

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productsList, setProductsList] = useState<Product[]>(
    products.map((p) => ({ ...p, stock: stockValues[p.id] || 50 }))
  )

  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductsList(productsList.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide font-[family-name:var(--font-heading)] text-foreground">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-background rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-background border border-border px-4 py-2.5 pr-10 text-sm tracking-wider font-[family-name:var(--font-body)] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="All">All Categories</option>
              {categoriesData.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-lg border border-border overflow-hidden group"
          >
            <div className="relative aspect-[3/4] bg-secondary">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] tracking-wider px-2 py-0.5 font-[family-name:var(--font-body)]">
                  {product.badge}
                </span>
              )}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 bg-background rounded-md text-foreground hover:bg-secondary transition-colors"
                  aria-label="Edit product"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 bg-background rounded-md text-destructive hover:bg-secondary transition-colors"
                  aria-label="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-[10px] tracking-wider uppercase text-muted-foreground mb-1 font-[family-name:var(--font-body)]">
                {product.category}
              </p>
              <h3 className="text-sm font-medium text-foreground line-clamp-1 font-[family-name:var(--font-body)]">
                {product.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                    PKR {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs line-through text-muted-foreground font-[family-name:var(--font-body)]">
                      PKR {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                  Stock: {product.stock}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    (product.stock ?? 0) > 20
                      ? "bg-green-100 text-green-800"
                      : (product.stock ?? 0) > 5
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {(product.stock ?? 0) > 20 ? "In Stock" : (product.stock ?? 0) > 5 ? "Low Stock" : "Critical"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-background rounded-lg border border-border">
          <p className="text-muted-foreground font-[family-name:var(--font-body)]">
            No products found
          </p>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false)
            setEditingProduct(null)
          }}
          onSave={(product) => {
            if (editingProduct) {
              setProductsList(
                productsList.map((p) => (p.id === product.id ? product : p))
              )
            } else {
              setProductsList([...productsList, { ...product, id: `${Date.now()}` }])
            }
            setShowAddModal(false)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || undefined,
    category: product?.category || "Unstitched",
    image: product?.image || "/images/product-1.jpg",
    badge: product?.badge || "",
    stock: product?.stock || 50,
    isNew: product?.isNew || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: product?.id || "",
      ...formData,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-background rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
              Product Image
            </label>
            <div className="relative aspect-[3/4] bg-secondary rounded-md overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">Click to upload</span>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
              Product Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Price (PKR)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Original Price
              </label>
              <input
                type="number"
                value={formData.originalPrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originalPrice: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {categoriesData.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Badge & New */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Badge
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g., SALE, NEW"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) =>
                    setFormData({ ...formData, isNew: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-[family-name:var(--font-body)]">
                  Mark as New Arrival
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border text-foreground text-sm font-medium rounded-md hover:bg-secondary transition-colors font-[family-name:var(--font-body)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
