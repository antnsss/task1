"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginUser(email: string, password: string) {
  if (!email || !password) return { error: "Email and password required" };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Invalid credentials" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Invalid credentials" };

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { token };
}
