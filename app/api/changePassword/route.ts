import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// shared prisma

export async function POST(request: NextRequest) {
  try {
    const { email, oldPassword, newPassword } = await request.json();

    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Fetch user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Old password is incorrect" }, { status: 400 });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
