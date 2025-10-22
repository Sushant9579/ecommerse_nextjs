import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// shared prisma

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character." },
        { status: 400 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { email: string };
    if (!decoded?.email)
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 400 });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await prisma.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 400 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { token, password, confirmPassword } = await req.json();

//     if (!token || !password || !confirmPassword) {
//       return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
//     }

//     if (password !== confirmPassword) {
//       return NextResponse.json({ success: false, message: "Passwords do not match." }, { status: 400 });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { email: string };
//     if (!decoded?.email) {
//       return NextResponse.json({ success: false, message: "Invalid or expired token." }, { status: 401 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await prisma.user.update({
//       where: { email: decoded.email },
//       data: { password: hashedPassword },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Password reset successful.",
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Token expired or invalid." },
//       { status: 400 }
//     );
//   }
// }
