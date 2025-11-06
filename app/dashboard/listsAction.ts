"use server";

import { prisma } from "@/lib/prisma";

// Можна передавати userId з токена, якщо потрібна авторизація
export async function getLists() {
  return await prisma.list.findMany({
    include: { tasks: true, users: { include: { user: true } } },
  });
}

export async function createList(title: string, userId: number) {
  if (!title) throw new Error("Title required");

  const list = await prisma.list.create({
    data: {
      title,
      users: { create: { userId, role: "ADMIN" } },
    },
    include: { tasks: true, users: { include: { user: true } } },
  });

  return list;
}

export async function deleteList(id: number) {
  if (!id) throw new Error("ID required");

  await prisma.list.delete({ where: { id } });
  return { success: true };
}
