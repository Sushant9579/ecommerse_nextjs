import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized, token missing" }, { status: 401 });
    }

    // Decode JWT token
    const decoded = jwt.decode(token) as { email: string } | null;
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { email: decoded.email },
      include: {
        products: {
          include: {
            product: true, // include actual product details
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (err: unknown) {
    console.error("API Error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
