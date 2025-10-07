import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { productSchema, ProductInput } from '@/lib/validation/productSchema';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    //  Validate with Zod
    const data: ProductInput = productSchema.parse(body);

    //  Save to DB with Prisma
    const newProduct = await prisma.product.create({ data });

    return NextResponse.json({
      success: true,
      message: 'Product added successfully',
      data: newProduct,
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
        { success: false, error: 'Product already exists' },
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
