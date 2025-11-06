"use client";

import { useEffect, useState } from "react";
import { getLists, createList, deleteList } from "./listsAction";
import { addUserToList } from "./usersAction";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material"

export default function DashboardPage() {
  const [lists, setLists] = useState<any[]>([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const userId = 1;

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    const result = await getLists();
    setLists(result);
  }

  async function handleCreateList(e: React.FormEvent) {
    e.preventDefault();
    const list = await createList(newListTitle, userId);
    setLists((prev) => [...prev, list]);
    setNewListTitle("");
  }

  async function handleDeleteList(id: number) {
    await deleteList(id);
    setLists((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedListId) return;
    await addUserToList(selectedListId, newUserEmail, "VIEWER");
    setNewUserEmail("");
    fetchLists();
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

  
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Create New List
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreateList}
            sx={{ display: "flex", gap: 2 }}
          >
            <TextField
              fullWidth
              label="New list title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </Paper>

  
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Lists
          </Typography>
          <List>
            {lists.length === 0 && (
              <Typography color="text.secondary">No lists yet.</Typography>
            )}
            {lists.map((list) => (
              <ListItem
                key={list.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteList(list.id)}
                  >
              
                  </IconButton>
                }
              >
                <ListItemText primary={list.title} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Divider sx={{ my: 4 }} />

       
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add User to List
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddUser}
            sx={{ display: "flex", gap: 2, flexDirection: "column" }}
          >
            <FormControl fullWidth>
              <InputLabel>Select List</InputLabel>
              <Select
                value={selectedListId ?? ""}
                label="Select List"
                onChange={(e) => setSelectedListId(Number(e.target.value))}
                required
              >
                {lists.map((l) => (
                  <MenuItem key={l.id} value={l.id}>
                    {l.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="User email"
              fullWidth
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
