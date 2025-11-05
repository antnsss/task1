import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { listId, email, role } = await req.json();

    if (!listId || !email || !role) {
      return NextResponse.json({ error: "listId, email and role are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const listUser = await prisma.listUser.create({
      data: {
        listId,
        userId: user.id,
        role, // "ADMIN" або "VIEWER"
      },
    });

    return NextResponse.json(listUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
