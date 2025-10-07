import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {

  const prisma = new PrismaClient();
  const JWT_SECRET = process.env.SECRET_KEY || "secretkey";

  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({id:user.id,name:user.name,email:user.email,mobile:user.mobile,city:user.city,state:user.state,address:user.address},JWT_SECRET,{expiresIn:"24h"})

  return NextResponse.json({ message: "Login successful",
                             token: `Bearer ${token}`
                         });
}
