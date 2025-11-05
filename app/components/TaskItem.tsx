"use client";
import React from "react";

type TaskItemProps = {
  taskId: number;
  title: string;
  completed: boolean;
  description?: string;
  listId: number;
  token: string;
  onUpdated: () => Promise<void>;
};

export default function TaskItem({
  taskId,
  title,
  completed,
  description,
  listId,
  token,
  onUpdated,
}: TaskItemProps) {
  const handleToggle = async () => {
    await fetch(`/api/lists/${listId}/tasks/${taskId}/toggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    onUpdated();
  };

  return (
    <li>
      <span>
        {title} {description && `- ${description}`}
      </span>
      <button onClick={handleToggle}>{completed ? "❌" : "✅"}</button>
    </li>
  );
}
