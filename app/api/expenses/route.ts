import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const expenses = await prisma.expense.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' }
  })

  return NextResponse.json(expenses)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { category, amount, date, description } = await req.json()

  const expense = await prisma.expense.create({
    data: {
      userId: session.user.id,
      category,
      amount: parseFloat(amount),
      date: new Date(date),
      description
    }
  })

  return NextResponse.json(expense, { status: 201 })
}
