"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert,
  Skeleton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import type { AdminUser } from "../types/types";
import { createUser, deleteUser, fetchUsers, updateUser } from "../lib/adminApi";
import UserFormDialog from "../components/UserFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialUsers = async () => {
      try {
        const data = await fetchUsers(controller.signal);
        setUsers(data);
        setError("");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch users.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadInitialUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError("");
    loadUsers();
  };

  const openCreate = () => {
    setFormMode("create");
    setSelectedUser(null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  };

  const openEdit = (user: AdminUser) => {
    setFormMode("edit");
    setSelectedUser(user);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  };

  const handleFormSubmit = async (email: string, password: string) => {
    setSaving(true);
    try {
      if (formMode === "create") {
        await createUser(email, password);
      } else if (selectedUser) {
        await updateUser(selectedUser.id, email, password);
      }
      setFormOpen(false);
      await loadUsers();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteUser(deleteTarget.id);
      setDeleteTarget(null);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#431407" }}>
            Users
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Manage registered accounts for the shopping app.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} sx={{ border: "1px solid #e5e7eb" }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#f97316",
              "&:hover": { backgroundColor: "#ea580c" },
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #eef0f2" }} elevation={0}>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fff7ed" }}>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={3}>
                      <Skeleton height={32} />
                    </TableCell>
                  </TableRow>
                ))}

              {!loading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    No users found.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Chip label={`#${user.id}`} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => openEdit(user)} sx={{ color: "#f97316" }}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => setDeleteTarget(user)} color="error">
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <UserFormDialog
        key={formKey}
        open={formOpen}
        mode={formMode}
        user={selectedUser}
        loading={saving}
        onCancel={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete user"
        description={`Are you sure you want to delete "${deleteTarget?.email}"? This action cannot be undone.`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
