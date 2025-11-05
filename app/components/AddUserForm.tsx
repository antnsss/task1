"use client";
import { useState } from "react";

type Props = {
  listId: number;
  token: string;
  onUserAdded: () => Promise<void>;
};

export default function AddUserForm({ listId, token, onUserAdded }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"ADMIN" | "VIEWER">("VIEWER");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (!email) return;
    setLoading(true);
    const res = await fetch("/api/lists/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email, listId, role }),
    });
    if (res.ok) {
      setEmail("");
      await onUserAdded();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add user");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="email"
        placeholder="User email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <select value={role} onChange={e => setRole(e.target.value as "ADMIN" | "VIEWER")}>
        <option value="VIEWER">Viewer</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={handleAddUser} disabled={loading} style={{ marginLeft: "0.5rem" }}>
        {loading ? "Adding..." : "Add User"}
      </button>
    </div>
  );
}
