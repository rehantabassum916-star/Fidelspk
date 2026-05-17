export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  category: string
  badge?: string
  isNew?: boolean
  isBestseller?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Emerald Embroidered Lawn 3PC",
    price: 5490,
    originalPrice: 7990,
    image: "/images/product-1.jpg",
    hoverImage: "/images/product-2.jpg",
    category: "Unstitched",
    badge: "SALE",
    isNew: true,
  },
  {
    id: "2",
    name: "Royal Blue Mirror Work Suit",
    price: 8990,
    image: "/images/product-2.jpg",
    hoverImage: "/images/product-3.jpg",
    category: "Luxury Pret",
    isNew: true,
  },
  {
    id: "3",
    name: "Teal Printed Lawn Collection",
    price: 4290,
    originalPrice: 5990,
    image: "/images/product-3.jpg",
    hoverImage: "/images/product-4.jpg",
    category: "Unstitched",
    badge: "SALE",
  },
  {
    id: "4",
    name: "Mustard Festive Embroidered Suit",
    price: 12990,
    image: "/images/product-4.jpg",
    hoverImage: "/images/product-5.jpg",
    category: "Luxury Pret",
    isBestseller: true,
  },
  {
    id: "5",
    name: "Coral Lace Summer Collection",
    price: 3990,
    image: "/images/product-5.jpg",
    hoverImage: "/images/product-6.jpg",
    category: "Ready to Wear",
    isNew: true,
  },
  {
    id: "6",
    name: "Sage Organza Formal Suit",
    price: 9490,
    image: "/images/product-6.jpg",
    hoverImage: "/images/product-7.jpg",
    category: "Luxury Pret",
    isBestseller: true,
  },
  {
    id: "7",
    name: "Dusty Rose Pearl Embellished",
    price: 7490,
    originalPrice: 9990,
    image: "/images/product-7.jpg",
    hoverImage: "/images/product-8.jpg",
    category: "Ready to Wear",
    badge: "SALE",
  },
  {
    id: "8",
    name: "Ivory Geometric Print Suit",
    price: 4790,
    image: "/images/product-8.jpg",
    hoverImage: "/images/product-1.jpg",
    category: "Unstitched",
    isNew: true,
  },
  {
    id: "9",
    name: "Classic White Shalwar Kameez",
    price: 5990,
    image: "/images/men-1.jpg",
    hoverImage: "/images/men-2.jpg",
    category: "Men",
    isBestseller: true,
  },
  {
    id: "10",
    name: "Navy Embroidered Formal Kurta",
    price: 7490,
    image: "/images/men-2.jpg",
    hoverImage: "/images/men-1.jpg",
    category: "Men",
    isNew: true,
  },
]

export const categories = [
  { name: "Unstitched", slug: "unstitched", image: "/images/category-unstitched.jpg" },
  { name: "Ready to Wear", slug: "ready-to-wear", image: "/images/category-readytowear.jpg" },
  { name: "Luxury Pret", slug: "luxury-pret", image: "/images/category-luxurypret.jpg" },
  { name: "Men", slug: "men", image: "/images/collection-men.jpg" },
  { name: "Accessories", slug: "accessories", image: "/images/accessories.jpg" },
]

export const heroSlides = [
  {
    image: "/images/hero-1.jpg",
    title: "Summer Collection 2026",
    subtitle: "Elegance Redefined",
    cta: "Shop Now",
  },
  {
    image: "/images/hero-2.jpg",
    title: "Luxury Pret",
    subtitle: "The Art of Tradition",
    cta: "Explore",
  },
  {
    image: "/images/hero-3.jpg",
    title: "Festive Edit",
    subtitle: "Celebrate in Style",
    cta: "Discover",
  },
]
