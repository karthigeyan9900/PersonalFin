import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// This is a one-time setup endpoint
// After creating your first admin, you should delete this file or disable it
export async function POST(req: Request) {
  try {
    const { email, secret } = await req.json()

    // Add a secret key to prevent unauthorized access
    // Set this in your Vercel environment variables
    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    await prisma.user.update({
      where: { email },
      data: { role: "admin" }
    })

    return NextResponse.json(
      { message: `User ${email} is now an admin!` },
      { status: 200 }
    )
  } catch (error) {
    console.error("Setup admin error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
