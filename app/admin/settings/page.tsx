"use client"

import { useState } from "react"
import { Store, Bell, CreditCard, Truck, Save } from "lucide-react"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "FIDELS",
    storeEmail: "info@fidels.pk",
    storePhone: "+92 42 111 347 345",
    storeAddress: "L-1-6, Peshawar Road, Lahore, Pakistan",
    currency: "PKR",
    taxRate: 0,
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 5000,
    standardShipping: 200,
    expressShipping: 500,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    shippingUpdates: true,
    promotionalEmails: false,
    lowStockAlerts: true,
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide font-[family-name:var(--font-heading)] text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground font-[family-name:var(--font-body)]">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Store Information */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <Store className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
              Store Information
            </h2>
            <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
              Basic store details and contact information
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Store Name
              </label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, storeName: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Email
              </label>
              <input
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, storeEmail: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Phone
              </label>
              <input
                type="text"
                value={storeSettings.storePhone}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, storePhone: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Currency
              </label>
              <select
                value={storeSettings.currency}
                onChange={(e) =>
                  setStoreSettings({ ...storeSettings, currency: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
              Store Address
            </label>
            <textarea
              value={storeSettings.storeAddress}
              onChange={(e) =>
                setStoreSettings({ ...storeSettings, storeAddress: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <Truck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
              Shipping Settings
            </h2>
            <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
              Configure shipping rates and free shipping threshold
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Free Shipping Above (PKR)
              </label>
              <input
                type="number"
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) =>
                  setShippingSettings({
                    ...shippingSettings,
                    freeShippingThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Standard Shipping (PKR)
              </label>
              <input
                type="number"
                value={shippingSettings.standardShipping}
                onChange={(e) =>
                  setShippingSettings({
                    ...shippingSettings,
                    standardShipping: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2 font-[family-name:var(--font-body)]">
                Express Shipping (PKR)
              </label>
              <input
                type="number"
                value={shippingSettings.expressShipping}
                onChange={(e) =>
                  setShippingSettings({
                    ...shippingSettings,
                    expressShipping: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-border rounded-md text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground font-[family-name:var(--font-heading)]">
              Notifications
            </h2>
            <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
              Configure email notifications
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
          {[
            { key: "orderConfirmation", label: "Order Confirmation Emails", desc: "Send confirmation emails when orders are placed" },
            { key: "shippingUpdates", label: "Shipping Updates", desc: "Notify customers when their order is shipped" },
            { key: "promotionalEmails", label: "Promotional Emails", desc: "Send marketing and promotional emails" },
            { key: "lowStockAlerts", label: "Low Stock Alerts", desc: "Get notified when products are running low" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-body)]">
                  {item.desc}
                </p>
              </div>
              <button
                onClick={() =>
                  setNotificationSettings({
                    ...notificationSettings,
                    [item.key]: !notificationSettings[item.key as keyof typeof notificationSettings],
                  })
                }
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  notificationSettings[item.key as keyof typeof notificationSettings]
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    notificationSettings[item.key as keyof typeof notificationSettings]
                      ? "translate-x-5"
                      : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors font-[family-name:var(--font-body)]"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
