"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, X, Upload, FolderTree } from "lucide-react"
import { categories } from "@/lib/data"

type Category = {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

const initialCategories: Category[] = categories.map((cat, idx) => ({
  id: `cat-${idx + 1}`,
  ...cat,
  productCount: Math.floor(Math.random() * 50) + 10,
}))

export default function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState<Category[]>(initialCategories)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategoriesList(categoriesList.filter((c) => c.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide font-[family-name:var(--font-heading)] text-foreground">
            Categories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
            Manage your product categories
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoriesList.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-background rounded-lg border border-border overflow-hidden group"
          >
            <div className="relative aspect-[4/3] bg-secondary">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-lg font-medium font-[family-name:var(--font-heading)]">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs mt-1 font-[family-name:var(--font-body)]">
                  {category.productCount} products
                </p>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="p-2 bg-background rounded-md text-foreground hover:bg-secondary transition-colors"
                  aria-label="Edit category"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 bg-background rounded-md text-destructive hover:bg-secondary transition-colors"
                  aria-label="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                Slug: /{category.slug}
              </span>
              <span className="text-xs bg-secondary px-2 py-1 rounded font-[family-name:var(--font-body)]">
                Active
              </span>
            </div>
          </motion.div>
        ))}

        {/* Add Category Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex flex-col items-center justify-center aspect-[4/3] bg-secondary/30 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
            <FolderTree className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground font-[family-name:var(--font-body)]">
            Add New Category
          </span>
        </button>
      </div>

      {/* Add/Edit Category Modal */}
      {(showAddModal || editingCategory) && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowAddModal(false)
            setEditingCategory(null)
          }}
          onSave={(category) => {
            if (editingCategory) {
              setCategoriesList(
                categoriesList.map((c) => (c.id === category.id ? category : c))
              )
            } else {
              setCategoriesList([
                ...categoriesList,
                { ...category, id: `cat-${Date.now()}`, productCount: 0 },
              ])
            }
            setShowAddModal(false)
            setEditingCategory(null)
          }}
        />
      )}
    </div>
  )
}

function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: Category | null
  onClose: () => void
  onSave: (category: Category) => void
}) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    image: category?.image || "/images/category-unstitched.jpg",
  })

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: category?.id || "",
      ...formData,
      productCount: category?.productCount || 0,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
            {category ? "Edit Category" : "Add New Category"}
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
              Category Image
            </label>
            <div className="relative aspect-[4/3] bg-secondary rounded-md overflow-hidden border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt="Category"
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
              Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g., Luxury Pret"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
              URL Slug
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-secondary border border-r-0 border-border rounded-l-md text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                /collections/
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="flex-1 px-4 py-2.5 border border-border rounded-r-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="luxury-pret"
                required
              />
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
              {category ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
