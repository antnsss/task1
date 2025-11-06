"use server";

import { prisma } from "@/lib/prisma";

export async function addUserToList(listId: number, email: string, role: "ADMIN" | "VIEWER") {
  if (!listId || !email || !role) throw new Error("listId, email, role required");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const listUser = await prisma.listUser.create({
    data: {
      listId,
      userId: user.id,
      role,
    },
    include: { user: true },
  });

  return listUser;
}
