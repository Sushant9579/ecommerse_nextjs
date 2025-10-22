// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

// shared prisma

async function checkDBConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Prisma/Postgres connection failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const dbOk = await checkDBConnection();

  if (!dbOk) {
    return new NextResponse('Database connection failed', { status: 503 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'],
};
