import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id

  const [user, incomes, expenses, liabilities, subscriptions, investments] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { currency: true } }),
    prisma.income.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
    prisma.expense.findMany({ where: { userId }, orderBy: { date: 'desc' } }),
    prisma.liability.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    prisma.subscription.findMany({ where: { userId }, orderBy: { nextBilling: 'asc' } }),
    prisma.investment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
  ])

  const currency = user?.currency || "USD"

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0)
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const monthlySubscriptions = subscriptions
    .filter(sub => sub.frequency === 'monthly')
    .reduce((sum, sub) => sum + sub.amount, 0)

  return (
    <DashboardClient
      user={session.user}
      currency={currency}
      stats={{
        totalIncome,
        totalExpenses,
        totalLiabilities,
        totalInvestments,
        monthlySubscriptions,
        netWorth: totalIncome - totalExpenses + totalInvestments - totalLiabilities
      }}
      incomes={incomes}
      expenses={expenses}
      liabilities={liabilities}
      subscriptions={subscriptions}
      investments={investments}
    />
  )
}
