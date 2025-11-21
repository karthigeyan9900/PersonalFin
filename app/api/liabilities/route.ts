import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, amount, interestRate, dueDate, description } = await req.json()

  const liability = await prisma.liability.create({
    data: {
      userId: session.user.id,
      name,
      amount: parseFloat(amount),
      interestRate: interestRate ? parseFloat(interestRate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      description
    }
  })

  return NextResponse.json(liability, { status: 201 })
}
