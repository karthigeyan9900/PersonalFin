import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await prisma.expense.delete({
    where: { id: params.id, userId: session.user.id }
  })

  return NextResponse.json({ message: "Deleted" })
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { category, amount, date, description } = await req.json()

  const expense = await prisma.expense.update({
    where: { id: params.id, userId: session.user.id },
    data: {
      category,
      amount: parseFloat(amount),
      date: new Date(date),
      description
    }
  })

  return NextResponse.json(expense)
}
