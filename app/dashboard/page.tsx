"use client";
import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import AddUserForm from "../components/AddUserForm";
import ListForm from "../components/ListForm";
import TaskForm from "../components/TaskForm";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};
type UserInList = { id: number; name: string; email: string };
type ListUserWithRole = {
  id: number;
  role: "ADMIN" | "VIEWER";
  user: UserInList;
};
type List = {
  id: number;
  title: string;
  tasks: Task[];
  users: ListUserWithRole[];
};

export default function Dashboard() {
  const [lists, setLists] = useState<List[]>([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const fetchLists = async () => {
    if (!token) return;
    const res = await fetch("/api/lists", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLists(data);

    const payload = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(payload.id);
  };

  useEffect(() => {
    if (token) fetchLists();
  }, [token]);

  if (!token) return <p>Please log in</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>My To-Do Lists</h1>

      {token && <ListForm token={token} onCreated={fetchLists} />}

      {lists.map((list) => {
        const isAdmin =
          list.users.find((u) => u.user.id === currentUserId)?.role === "ADMIN";

        return (
          <div
            key={list.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h2>{list.title}</h2>

            {isAdmin && (
              <ListForm token={token} list={list} onCreated={fetchLists} />
            )}

            <h3>Tasks:</h3>
            <ul>
              {list.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  completed={task.completed}
                  description={task.description}
                  listId={list.id}
                  token={token}
                  onUpdated={fetchLists}
                />
              ))}
            </ul>

            {isAdmin && (
              <TaskForm listId={list.id} token={token} onAdded={fetchLists} />
            )}

            <h3>Users:</h3>
            <ul>
              {list.users.map((u) => (
                <li key={u.id}>
                  {u.user.name} ({u.role})
                </li>
              ))}
            </ul>

            {isAdmin && (
              <AddUserForm
                listId={list.id}
                token={token}
                onUserAdded={fetchLists}
              />
            )}
          </div>
        );
      })}
    </main>
  );
}
