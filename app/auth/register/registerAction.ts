"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(name: string, email: string, password: string) {
  if (!name || !email || !password) return { error: "All fields required" };

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { token };
}
