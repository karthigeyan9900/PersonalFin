import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { currency } = await req.json()

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { currency }
  })

  return NextResponse.json({ currency: user.currency })
}
