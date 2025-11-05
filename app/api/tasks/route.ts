import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getUserIdFromToken(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];

  return 1;
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { listId, title, description } = await req.json();
  if (!listId || !title) return NextResponse.json({ error: "ListId & title required" }, { status: 400 });

  const task = await prisma.task.create({
    data: { title, description, listId },
  });

  return NextResponse.json(task);
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title, description, completed } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const task = await prisma.task.update({
    where: { id },
    data: { title, description, completed },
  });

  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromToken(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
