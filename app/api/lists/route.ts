import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getUserIdFromToken(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  // тут твоя JWT перевірка
  return 1;
}

export async function GET(req: NextRequest) {
  const lists = await prisma.list.findMany({
    include: { tasks: true, users: { include: { user: true } } },
  });
  return NextResponse.json(lists);
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const list = await prisma.list.create({
    data: {
      title,
      users: { create: { userId, role: "ADMIN" } },
    },
    include: { tasks: true, users: { include: { user: true } } },
  });
  return NextResponse.json(list);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.list.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
