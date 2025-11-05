"use client";
import React, { useState } from "react";

type Props = {
  token: string;
  onCreated: () => void;
  list?: { id: number; title: string };
};

export default function ListForm({ token, onCreated, list }: Props) {
  const [title, setTitle] = useState(list?.title || "");

  const handleSubmit = async () => {
    const url = list ? `/api/lists/${list.id}` : "/api/lists";
    const method = list ? "PATCH" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, id: list?.id }),
    });

    setTitle("");
    onCreated();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="List title"
      />
      <button onClick={handleSubmit}>{list ? "Update" : "Create"} List</button>
    </div>
  );
}
