import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, amount, frequency, nextBilling, description } = await req.json()

  const subscription = await prisma.subscription.create({
    data: {
      userId: session.user.id,
      name,
      amount: parseFloat(amount),
      frequency,
      nextBilling: new Date(nextBilling),
      description
    }
  })

  return NextResponse.json(subscription, { status: 201 })
}
