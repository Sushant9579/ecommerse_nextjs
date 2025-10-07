import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Environment variables you’ll need:
// EMAIL_USER, EMAIL_PASS, JWT_SECRET, NEXT_PUBLIC_API_URL
// (Set these in your .env file)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // 1 Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found with this email" },
        { status: 404 }
      );
    }

    // 2 Generate reset token (expires in 15 minutes)
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY!, {
      expiresIn: "15m",
    });

    // 3 Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset?token=${token}`;

    // 4 Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5 Email content
    const mailOptions = {
      from: `"Ecommerce Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:sans-serif;line-height:1.6">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.name || "User"},</p>
          <p>You requested a password reset. Click below to reset your password:</p>
          <a href="${resetLink}" 
             style="background:#2563eb;color:white;padding:10px 15px;text-decoration:none;border-radius:6px;display:inline-block">
            Reset Password
          </a>
          <p>This link expires in 15 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
          <br/>
          <p>– Your Ecommerce Team</p>
        </div>
      `,
    };

    // 6 Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Reset password link sent to your email.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error sending reset email" },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
//     }

//     // Generate a short-lived JWT token (10 mins)
//     const token = jwt.sign({ email }, process.env.SECRET_KEY as string, { expiresIn: "10m" });
//     const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset?token=${token}`;

//     console.log("Reset Link:", resetLink);

//     // Normally you'd send this via email, but we return it for testing
//     return NextResponse.json({
//       success: true,
//       message: "Password reset link generated successfully.",
//       link: resetLink,
//     });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal server error." },
//       { status: 500 }
//     );
//   }
// }
