import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, type, amount, currentValue, purchaseDate, description } = await req.json()

  const investment = await prisma.investment.create({
    data: {
      userId: session.user.id,
      name,
      type,
      amount: parseFloat(amount),
      currentValue: parseFloat(currentValue),
      purchaseDate: new Date(purchaseDate),
      description
    }
  })

  return NextResponse.json(investment, { status: 201 })
}
