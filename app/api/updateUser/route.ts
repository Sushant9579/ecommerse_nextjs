import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UpdateUserSchema, UserInputSchema } from "@/lib/validation/updateUserSchema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    //   Validate input
    const data: UserInputSchema = UpdateUserSchema.parse(body);
    const { email, ...updateData } = data;

    //   Make sure at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields provided to update" },
        { status: 400 }
      );
    }

    //   Update user
    const updatedUser = await prisma.user.update({
      where: { email },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    //   Zod validation error
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: error.flatten(), // gives cleaner error structure
        },
        { status: 400 }
      );
    }

    //   Prisma record not found
    if ((error as any).code === "P2025") {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    //   Prisma unique constraint error
    if ((error as any).code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Unique constraint failed" },
        { status: 409 }
      );
    }

    //   Unknown or internal errors
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
