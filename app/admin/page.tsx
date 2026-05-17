"use client"

import { motion } from "framer-motion"
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const stats = [
  {
    title: "Total Revenue",
    value: "PKR 1,245,890",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "384",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
  },
  {
    title: "Total Products",
    value: "156",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Total Customers",
    value: "2,847",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Ayesha Khan",
    email: "ayesha@email.com",
    amount: 12990,
    status: "Pending",
    date: "2026-05-17",
  },
  {
    id: "ORD-002",
    customer: "Ahmed Ali",
    email: "ahmed@email.com",
    amount: 8490,
    status: "Processing",
    date: "2026-05-16",
  },
  {
    id: "ORD-003",
    customer: "Fatima Zahra",
    email: "fatima@email.com",
    amount: 15990,
    status: "Shipped",
    date: "2026-05-16",
  },
  {
    id: "ORD-004",
    customer: "Usman Malik",
    email: "usman@email.com",
    amount: 5990,
    status: "Delivered",
    date: "2026-05-15",
  },
  {
    id: "ORD-005",
    customer: "Sana Iqbal",
    email: "sana@email.com",
    amount: 9490,
    status: "Pending",
    date: "2026-05-15",
  },
]

const topProducts = [
  { name: "Emerald Embroidered Lawn 3PC", sales: 45, revenue: 247050 },
  { name: "Royal Blue Mirror Work Suit", sales: 38, revenue: 341620 },
  { name: "Mustard Festive Embroidered", sales: 32, revenue: 415680 },
  { name: "Classic White Shalwar Kameez", sales: 28, revenue: 167720 },
]

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide font-[family-name:var(--font-heading)] text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-background p-4 sm:p-5 lg:p-6 rounded-lg border border-border"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
              {stat.title}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground font-[family-name:var(--font-body)] mt-1">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-background rounded-lg border border-border overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-[family-name:var(--font-body)]"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                    Order
                  </th>
                  <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                    Customer
                  </th>
                  <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                    Amount
                  </th>
                  <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                        {order.id}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                        {order.date}
                      </p>
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm text-foreground font-[family-name:var(--font-body)]">
                        {order.customer}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-[family-name:var(--font-body)]">
                      PKR {order.amount.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                      <span
                        className={`inline-block px-2 py-1 text-[10px] sm:text-xs rounded-full font-medium ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-background rounded-lg border border-border overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
              Top Products
            </h2>
            <Link
              href="/admin/products"
              className="text-xs text-primary hover:underline flex items-center gap-1 font-[family-name:var(--font-body)]"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-4 sm:p-5 space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-secondary rounded flex items-center justify-center text-xs sm:text-sm font-medium text-muted-foreground">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)] truncate">
                    {product.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                    {product.sales} sales
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                  PKR {(product.revenue / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
