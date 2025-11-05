import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getUserIdFromToken(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  return 1;
}

export async function POST(req: NextRequest) {
  const adminId = await getUserIdFromToken(req);
  if (!adminId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { listId, email, role } = await req.json();
  if (!listId || !email || !role) return NextResponse.json({ error: "listId, email, role required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const listUser = await prisma.listUser.create({
    data: { listId, userId: user.id, role },
    include: { user: true },
  });

  return NextResponse.json(listUser);
}
