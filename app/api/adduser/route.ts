import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { userSchema, UserInput } from '@/lib/validation/userSchema';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    //  Validate with Zod
    const data: UserInput = userSchema.parse(body);

    //  Save to DB with Prisma
    const newUser = await prisma.user.create({data });

    return NextResponse.json({
      success: true,
      message: 'User added successfully',
      data: newUser,
    });
  } catch (error: unknown) {
    //  Handle validation error
    if (error instanceof ZodError) {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      issues: (error as ZodError),
    },
    { status: 400 }
  );
}

    // Handle Prisma unique constraint error
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );  
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
