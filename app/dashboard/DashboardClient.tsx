"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatCurrency, currencies } from "@/lib/currency"

type Stats = {
  totalIncome: number
  totalExpenses: number
  totalLiabilities: number
  totalInvestments: number
  monthlySubscriptions: number
  netWorth: number
}

type DashboardClientProps = {
  user: any
  currency: string
  stats: Stats
  incomes: any[]
  expenses: any[]
  liabilities: any[]
  subscriptions: any[]
  investments: any[]
}

export default function DashboardClient({
  user,
  currency,
  stats,
  incomes,
  expenses,
  liabilities,
  subscriptions,
  investments
}: DashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [showForm, setShowForm] = useState(false)
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  
  const refreshData = () => {
    router.refresh()
    setShowForm(false)
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return
    
    await fetch(`/api/${type}/${id}`, { method: "DELETE" })
    refreshData()
  }

  const handleCurrencyChange = async (newCurrency: string) => {
    await fetch("/api/user/currency", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency: newCurrency })
    })
    setShowCurrencyModal(false)
    refreshData()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">PersonalFin</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCurrencyModal(true)}
              className="px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-xl hover:scale-105 transition-all duration-300 text-sm font-medium shadow-sm"
            >
              {currency}
            </button>
            <span className="text-gray-700 hidden md:block">Hi, {user.name || user.email.split('@')[0]}</span>
            {user.role === "admin" && (
              <a
                href="/admin"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium"
              >
                Admin
              </a>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-red-300 hover:text-red-600 transition-all duration-300 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {showCurrencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl border border-purple-100 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Select Currency</h2>
            <div className="space-y-2">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`w-full text-left px-4 py-3 rounded-xl hover:scale-102 transition-all duration-200 ${
                    currency === curr.code 
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 shadow-md" 
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{curr.code}</span>
                    <span className="text-gray-600 text-sm">{curr.symbol} - {curr.name}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCurrencyModal(false)}
              className="mt-4 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Income</h3>
            <p className="text-3xl font-bold text-green-600 group-hover:scale-105 transition-transform">{formatCurrency(stats.totalIncome, currency)}</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-red-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600 group-hover:scale-105 transition-transform">{formatCurrency(stats.totalExpenses, currency)}</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Net Worth</h3>
            <p className="text-3xl font-bold text-blue-600 group-hover:scale-105 transition-transform">{formatCurrency(stats.netWorth, currency)}</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-orange-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Liabilities</h3>
            <p className="text-3xl font-bold text-orange-600 group-hover:scale-105 transition-transform">{formatCurrency(stats.totalLiabilities, currency)}</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Monthly Subscriptions</h3>
            <p className="text-3xl font-bold text-purple-600 group-hover:scale-105 transition-transform">{formatCurrency(stats.monthlySubscriptions, currency)}</p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-indigo-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Investments</h3>
            <p className="text-3xl font-bold text-indigo-600 group-hover:scale-105 transition-transform">{formatCurrency(stats.totalInvestments, currency)}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100">
          <div className="border-b border-purple-100">
            <div className="flex gap-2 px-6 py-2 overflow-x-auto">
              {["overview", "income", "expenses", "liabilities", "subscriptions", "investments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 rounded-xl font-medium capitalize transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Financial Overview</h2>
                <p className="text-gray-600">
                  Your financial dashboard shows a comprehensive view of your finances.
                  Use the tabs above to manage different aspects of your financial life.
                </p>
              </div>
            )}

            {activeTab === "income" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Income</h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    {showForm ? "Cancel" : "+ Add Income"}
                  </button>
                </div>

                {showForm && <IncomeForm onSuccess={refreshData} />}

                {incomes.length === 0 ? (
                  <p className="text-gray-500">No income records yet</p>
                ) : (
                  <div className="space-y-2">
                    {incomes.map((income) => (
                      <div key={income.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-md transition-all duration-200">
                        <div>
                          <p className="font-semibold text-gray-800">{income.source}</p>
                          <p className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</p>
                          {income.description && <p className="text-sm text-gray-600 mt-1">{income.description}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-green-600 font-bold text-lg">{formatCurrency(income.amount, currency)}</p>
                          <button
                            onClick={() => handleDelete("income", income.id)}
                            className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "expenses" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Expenses</h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    {showForm ? "Cancel" : "+ Add Expense"}
                  </button>
                </div>

                {showForm && <ExpenseForm onSuccess={refreshData} />}

                {expenses.length === 0 ? (
                  <p className="text-gray-500">No expense records yet</p>
                ) : (
                  <div className="space-y-2">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{expense.category}</p>
                          <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                          {expense.description && <p className="text-sm text-gray-600">{expense.description}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-red-600 font-semibold">{formatCurrency(expense.amount, currency)}</p>
                          <button
                            onClick={() => handleDelete("expenses", expense.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "liabilities" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Liabilities</h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    {showForm ? "Cancel" : "+ Add Liability"}
                  </button>
                </div>

                {showForm && <LiabilityForm onSuccess={refreshData} />}

                {liabilities.length === 0 ? (
                  <p className="text-gray-500">No liabilities yet</p>
                ) : (
                  <div className="space-y-2">
                    {liabilities.map((liability) => (
                      <div key={liability.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{liability.name}</p>
                            {liability.interestRate && (
                              <p className="text-sm text-gray-500">Interest: {liability.interestRate}%</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-orange-600 font-semibold">{formatCurrency(liability.amount, currency)}</p>
                            <button
                              onClick={() => handleDelete("liabilities", liability.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "subscriptions" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Subscriptions</h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    {showForm ? "Cancel" : "+ Add Subscription"}
                  </button>
                </div>

                {showForm && <SubscriptionForm onSuccess={refreshData} />}

                {subscriptions.length === 0 ? (
                  <p className="text-gray-500">No subscriptions yet</p>
                ) : (
                  <div className="space-y-2">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{sub.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{sub.frequency}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="text-purple-600 font-semibold">{formatCurrency(sub.amount, currency)}</p>
                            <button
                              onClick={() => handleDelete("subscriptions", sub.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "investments" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Investments</h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    {showForm ? "Cancel" : "+ Add Investment"}
                  </button>
                </div>

                {showForm && <InvestmentForm onSuccess={refreshData} />}

                {investments.length === 0 ? (
                  <p className="text-gray-500">No investments yet</p>
                ) : (
                  <div className="space-y-2">
                    {investments.map((inv) => (
                      <div key={inv.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{inv.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{inv.type}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-indigo-600 font-semibold">{formatCurrency(inv.currentValue, currency)}</p>
                              <p className="text-sm text-gray-500">Cost: {formatCurrency(inv.amount, currency)}</p>
                            </div>
                            <button
                              onClick={() => handleDelete("investments", inv.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


function IncomeForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await fetch("/api/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: formData.get("source"),
        amount: formData.get("amount"),
        date: formData.get("date"),
        description: formData.get("description")
      })
    })
    
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="source" placeholder="Source" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        <input name="amount" type="number" step="0.01" placeholder="Amount" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      </div>
      <input name="date" type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
      <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium">
        {loading ? "Adding..." : "Add Income"}
      </button>
    </form>
  )
}

function ExpenseForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: formData.get("category"),
        amount: formData.get("amount"),
        date: formData.get("date"),
        description: formData.get("description")
      })
    })
    
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="category" placeholder="Category" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
        <input name="amount" type="number" step="0.01" placeholder="Amount" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
      </div>
      <input name="date" type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
      <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
      <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium">
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  )
}

function LiabilityForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await fetch("/api/liabilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        amount: formData.get("amount"),
        interestRate: formData.get("interestRate") || null,
        dueDate: formData.get("dueDate") || null,
        description: formData.get("description")
      })
    })
    
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="name" placeholder="Name" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
        <input name="amount" type="number" step="0.01" placeholder="Amount" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="interestRate" type="number" step="0.01" placeholder="Interest Rate %" className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
        <input name="dueDate" type="date" placeholder="Due Date" className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
      </div>
      <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
      <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 font-medium">
        {loading ? "Adding..." : "Add Liability"}
      </button>
    </form>
  )
}

function SubscriptionForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        amount: formData.get("amount"),
        frequency: formData.get("frequency"),
        nextBilling: formData.get("nextBilling"),
        description: formData.get("description")
      })
    })
    
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="name" placeholder="Name" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        <input name="amount" type="number" step="0.01" placeholder="Amount" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select name="frequency" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          <option value="">Select Frequency</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="weekly">Weekly</option>
        </select>
        <input name="nextBilling" type="date" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
      </div>
      <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
      <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium">
        {loading ? "Adding..." : "Add Subscription"}
      </button>
    </form>
  )
}

function InvestmentForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    await fetch("/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        type: formData.get("type"),
        amount: formData.get("amount"),
        currentValue: formData.get("currentValue"),
        purchaseDate: formData.get("purchaseDate"),
        description: formData.get("description")
      })
    })
    
    setLoading(false)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-4 rounded-lg mb-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="name" placeholder="Name" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        <select name="type" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          <option value="">Select Type</option>
          <option value="stocks">Stocks</option>
          <option value="crypto">Crypto</option>
          <option value="real estate">Real Estate</option>
          <option value="bonds">Bonds</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="amount" type="number" step="0.01" placeholder="Purchase Amount" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        <input name="currentValue" type="number" step="0.01" placeholder="Current Value" required className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
      </div>
      <input name="purchaseDate" type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
      <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
      <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium">
        {loading ? "Adding..." : "Add Investment"}
      </button>
    </form>
  )
}
