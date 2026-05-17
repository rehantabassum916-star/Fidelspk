"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Phone, MapPin, Eye, X } from "lucide-react"

// Mock customers data
const customersData = [
  {
    id: "1",
    name: "Ayesha Khan",
    email: "ayesha@email.com",
    phone: "+92 300 1234567",
    address: "House 45, Street 12, DHA Phase 5, Lahore",
    orders: 5,
    totalSpent: 67450,
    joinedDate: "2026-01-15",
  },
  {
    id: "2",
    name: "Ahmed Ali",
    email: "ahmed@email.com",
    phone: "+92 321 9876543",
    address: "Flat 12B, Ocean Tower, Clifton, Karachi",
    orders: 3,
    totalSpent: 28470,
    joinedDate: "2026-02-20",
  },
  {
    id: "3",
    name: "Fatima Zahra",
    email: "fatima@email.com",
    phone: "+92 333 5551234",
    address: "Plot 78, Sector F-7/2, Islamabad",
    orders: 8,
    totalSpent: 138280,
    joinedDate: "2025-11-10",
  },
  {
    id: "4",
    name: "Usman Malik",
    email: "usman@email.com",
    phone: "+92 345 6789012",
    address: "House 23, Model Town, Lahore",
    orders: 2,
    totalSpent: 11980,
    joinedDate: "2026-04-05",
  },
  {
    id: "5",
    name: "Sana Iqbal",
    email: "sana@email.com",
    phone: "+92 300 9998877",
    address: "Apartment 5C, Pearl Continental, Lahore",
    orders: 12,
    totalSpent: 189640,
    joinedDate: "2025-08-22",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customersData)[0] | null>(null)

  const filteredCustomers = customersData.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide font-[family-name:var(--font-heading)] text-foreground">
          Customers
        </h1>
        <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
          View and manage your customer base
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-background rounded-lg border border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Customer
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Contact
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Orders
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Total Spent
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Joined
                </th>
                <th className="text-right px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-4 sm:px-5 py-3 sm:py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                        {customer.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4">
                    <p className="text-xs sm:text-sm text-foreground font-[family-name:var(--font-body)]">
                      {customer.email}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                      {customer.phone}
                    </p>
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-[family-name:var(--font-body)]">
                    {customer.orders}
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                    PKR {customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                    {customer.joinedDate}
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      aria-label="View customer details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">
              No customers found
            </p>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setSelectedCustomer(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-background rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
                Customer Details
              </h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium text-primary">
                    {selectedCustomer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-foreground font-[family-name:var(--font-heading)]">
                    {selectedCustomer.name}
                  </h4>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-body)]">
                    Customer since {selectedCustomer.joinedDate}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground font-[family-name:var(--font-body)]">
                    {selectedCustomer.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground font-[family-name:var(--font-body)]">
                    {selectedCustomer.phone}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-foreground font-[family-name:var(--font-body)]">
                    {selectedCustomer.address}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="bg-secondary/30 rounded-md p-3 text-center">
                  <p className="text-2xl font-semibold text-foreground font-[family-name:var(--font-body)]">
                    {selectedCustomer.orders}
                  </p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                    Total Orders
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-md p-3 text-center">
                  <p className="text-2xl font-semibold text-foreground font-[family-name:var(--font-body)]">
                    {(selectedCustomer.totalSpent / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                    Total Spent (PKR)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
