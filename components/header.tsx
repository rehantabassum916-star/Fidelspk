"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react"

const menuItems = [
  {
    name: "New Arrivals",
    href: "/collections/new-arrivals",
    submenu: [
      { name: "Lawn Collection", href: "#" },
      { name: "Summer Prints", href: "#" },
      { name: "Embroidered Range", href: "#" },
    ],
  },
  {
    name: "Women",
    href: "/collections/women",
    submenu: [
      { name: "Unstitched", href: "#" },
      { name: "Ready to Wear", href: "#" },
      { name: "Luxury Pret", href: "#" },
      { name: "Formals", href: "#" },
      { name: "Basics", href: "#" },
    ],
  },
  {
    name: "Men",
    href: "/collections/men",
    submenu: [
      { name: "Shalwar Kameez", href: "#" },
      { name: "Kurta", href: "#" },
      { name: "Waistcoat", href: "#" },
    ],
  },
  {
    name: "Luxury Pret",
    href: "/collections/luxury-pret",
    submenu: [
      { name: "Formal Wear", href: "#" },
      { name: "Party Wear", href: "#" },
      { name: "Festive Collection", href: "#" },
    ],
  },
  { name: "Accessories", href: "/collections/accessories" },
  { name: "Sale", href: "/collections/sale" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
        Free Shipping on Orders Above PKR 5,000 | Use Code: FIDELS10
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background"
        }`}
      >
        {/* Main Header */}
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          {/* Left: Hamburger (mobile) + Nav (desktop) */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.slice(0, 3).map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className="text-xs tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-colors duration-300 font-[family-name:var(--font-body)] font-medium"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 pt-4 min-w-[200px]"
                    >
                      <div className="bg-card border border-border shadow-lg p-6">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-body)]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-3xl lg:text-4xl tracking-[0.3em] uppercase font-[family-name:var(--font-heading)] font-semibold text-foreground">
              FIDELS
            </h1>
          </Link>

          {/* Right: Nav (desktop) + Icons */}
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8">
              {menuItems.slice(3).map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`text-xs tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-colors duration-300 font-[family-name:var(--font-body)] font-medium ${
                      item.name === "Sale" ? "text-destructive" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 pt-4 min-w-[200px]"
                    >
                      <div className="bg-card border border-border shadow-lg p-6">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-body)]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link
                href="#"
                className="hidden sm:block text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>
              <Link
                href="#"
                className="hidden sm:block text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Account"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>
              <Link
                href="#"
                className="relative text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-[family-name:var(--font-body)]">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="px-6 lg:px-12 py-4">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="flex-1 bg-transparent text-sm tracking-wider outline-none placeholder:text-muted-foreground font-[family-name:var(--font-body)]"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-background z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl tracking-[0.3em] uppercase font-[family-name:var(--font-heading)] font-semibold text-foreground">
                    FIDELS
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className={`py-3 text-sm tracking-[0.15em] uppercase font-[family-name:var(--font-body)] font-medium ${
                            item.name === "Sale" ? "text-destructive" : "text-foreground"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.submenu && (
                          <button
                            onClick={() =>
                              setActiveSubmenu(
                                activeSubmenu === item.name ? null : item.name
                              )
                            }
                            className="p-2 text-foreground"
                            aria-label={`Toggle ${item.name} submenu`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                activeSubmenu === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {item.submenu && activeSubmenu === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-body)]"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-border flex items-center gap-6">
                  <Link href="#" className="flex items-center gap-2 text-sm text-foreground font-[family-name:var(--font-body)]" aria-label="Account">
                    <User className="w-4 h-4" />
                    <span className="tracking-wider uppercase text-xs">Account</span>
                  </Link>
                  <Link href="#" className="flex items-center gap-2 text-sm text-foreground font-[family-name:var(--font-body)]" aria-label="Wishlist">
                    <Heart className="w-4 h-4" />
                    <span className="tracking-wider uppercase text-xs">Wishlist</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
