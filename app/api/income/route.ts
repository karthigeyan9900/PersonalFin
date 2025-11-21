import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const incomes = await prisma.income.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'desc' }
  })

  return NextResponse.json(incomes)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { source, amount, date, description } = await req.json()

  const income = await prisma.income.create({
    data: {
      userId: session.user.id,
      source,
      amount: parseFloat(amount),
      date: new Date(date),
      description
    }
  })

  return NextResponse.json(income, { status: 201 })
}
