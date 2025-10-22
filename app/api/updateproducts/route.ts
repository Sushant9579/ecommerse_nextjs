import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateProductSchema, UpdateProductInput } from '@/lib/validation/updateProductSchema';
import { ZodError } from 'zod';

// shared prisma

export async function PATCH(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    // Validate input
    const data: UpdateProductInput = updateProductSchema.parse(body);

    const { id, ...updateData } = data;

    // Update the product by ID
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: error,
        },
        { status: 400 }
      );
    }

    // Prisma error: product not found or unique constraint violation
    const maybePrismaError = error as { code?: string } | null;
    if (maybePrismaError && maybePrismaError.code === 'P2025') {
      // P2025 = Record to update not found
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    if (maybePrismaError && maybePrismaError.code === 'P2002') {
      // P2002 = Unique constraint failed
      return NextResponse.json(
        { success: false, error: 'Unique constraint failed' },
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
