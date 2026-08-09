"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import type { AdminUser } from "../types/types";

interface UserFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  user: AdminUser | null;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (email: string, password: string) => Promise<void> | void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserFormDialog({
  open,
  mode,
  user,
  loading,
  onCancel,
  onSubmit,
}: UserFormDialogProps) {
  const [email, setEmail] = useState(() => user?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mode === "create" && password.trim().length === 0) {
      setError("Password is required for a new user.");
      return;
    }
    setError("");
    try {
      await onSubmit(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {mode === "create" ? "Add User" : "Edit User"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#f97316" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
            }}
          />
          <TextField
            label={mode === "create" ? "Password" : "New Password (optional)"}
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={mode === "edit" ? "Leave blank to keep the current password." : ""}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#f97316" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#f97316",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
        >
          {loading ? "Saving..." : mode === "create" ? "Create" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
