"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  MoreHorizontal,
  X,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

// Mock orders data
const ordersData = [
  {
    id: "ORD-001",
    customer: "Ayesha Khan",
    email: "ayesha@email.com",
    phone: "+92 300 1234567",
    address: "House 45, Street 12, DHA Phase 5, Lahore",
    items: [
      { name: "Emerald Embroidered Lawn 3PC", qty: 1, price: 5490 },
      { name: "Coral Lace Summer Collection", qty: 2, price: 3990 },
    ],
    total: 13470,
    status: "Pending",
    paymentMethod: "COD",
    date: "2026-05-17",
  },
  {
    id: "ORD-002",
    customer: "Ahmed Ali",
    email: "ahmed@email.com",
    phone: "+92 321 9876543",
    address: "Flat 12B, Ocean Tower, Clifton, Karachi",
    items: [{ name: "Royal Blue Mirror Work Suit", qty: 1, price: 8490 }],
    total: 8490,
    status: "Processing",
    paymentMethod: "Card",
    date: "2026-05-16",
  },
  {
    id: "ORD-003",
    customer: "Fatima Zahra",
    email: "fatima@email.com",
    phone: "+92 333 5551234",
    address: "Plot 78, Sector F-7/2, Islamabad",
    items: [
      { name: "Mustard Festive Embroidered Suit", qty: 1, price: 12990 },
      { name: "Teal Printed Lawn Collection", qty: 1, price: 4290 },
    ],
    total: 17280,
    status: "Shipped",
    paymentMethod: "Card",
    date: "2026-05-16",
  },
  {
    id: "ORD-004",
    customer: "Usman Malik",
    email: "usman@email.com",
    phone: "+92 345 6789012",
    address: "House 23, Model Town, Lahore",
    items: [{ name: "Classic White Shalwar Kameez", qty: 1, price: 5990 }],
    total: 5990,
    status: "Delivered",
    paymentMethod: "COD",
    date: "2026-05-15",
  },
  {
    id: "ORD-005",
    customer: "Sana Iqbal",
    email: "sana@email.com",
    phone: "+92 300 9998877",
    address: "Apartment 5C, Pearl Continental, Lahore",
    items: [{ name: "Sage Organza Formal Suit", qty: 1, price: 9490 }],
    total: 9490,
    status: "Pending",
    paymentMethod: "Card",
    date: "2026-05-15",
  },
  {
    id: "ORD-006",
    customer: "Hassan Raza",
    email: "hassan@email.com",
    phone: "+92 312 4445556",
    address: "House 89, Gulberg III, Lahore",
    items: [{ name: "Navy Embroidered Formal Kurta", qty: 2, price: 7490 }],
    total: 14980,
    status: "Cancelled",
    paymentMethod: "COD",
    date: "2026-05-14",
  },
]

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  Pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  Processing: { color: "bg-blue-100 text-blue-800", icon: Package },
  Shipped: { color: "bg-purple-100 text-purple-800", icon: Truck },
  Delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  Cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
}

const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedOrder, setSelectedOrder] = useState<(typeof ordersData)[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide font-[family-name:var(--font-heading)] text-foreground">
            Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-background rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders by ID, customer, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)]"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="hidden sm:flex items-center gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 text-xs tracking-wider font-[family-name:var(--font-body)] rounded-md transition-all ${
                    statusFilter === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="sm:hidden mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setShowFilters(false)
                }}
                className={`px-3 py-2 text-xs tracking-wider font-[family-name:var(--font-body)] rounded-md transition-all ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Order ID
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Customer
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Items
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Total
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Status
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Date
                </th>
                <th className="text-right px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                      <p className="text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                        {order.id}
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
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                      PKR {order.total.toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] sm:text-xs rounded-full font-medium ${
                          statusConfig[order.status].color
                        }`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                      {order.date}
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                        aria-label="View order details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">
              No orders found
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setSelectedOrder(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-background rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
                  Order {selectedOrder.id}
                </h3>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                  {selectedOrder.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-5">
              {/* Customer Info */}
              <div>
                <h4 className="text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                  Customer Information
                </h4>
                <div className="bg-secondary/30 rounded-md p-3 space-y-1">
                  <p className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                    {selectedOrder.customer}
                  </p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                    {selectedOrder.email}
                  </p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                    {selectedOrder.phone}
                  </p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                  Order Items
                </h4>
                <div className="bg-secondary/30 rounded-md divide-y divide-border">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex justify-between">
                      <div>
                        <p className="text-sm text-foreground font-[family-name:var(--font-body)]">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                        PKR {(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <div className="p-3 flex justify-between bg-secondary/50">
                    <p className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                      Total
                    </p>
                    <p className="text-sm font-semibold text-foreground font-[family-name:var(--font-body)]">
                      PKR {selectedOrder.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h4 className="text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                  Update Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                        className={`px-3 py-2 text-xs tracking-wider font-[family-name:var(--font-body)] rounded-md transition-all ${
                          selectedOrder.status === status
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
