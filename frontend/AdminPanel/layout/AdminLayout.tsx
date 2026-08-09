"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 3, md: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}
