"use client";

import { useRouter } from "next/navigation";
import { registerUser } from "./registerAction";
import { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await registerUser(name, email, password);
    if ("error" in result) {
      alert(result.error);
      return;
    }

    localStorage.setItem("token", result.token);
    router.push("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ gap: 2 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
