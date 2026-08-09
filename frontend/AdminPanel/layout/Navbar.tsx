"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const NAV_LINKS = [
  { label: "Users", href: "/admin/users", icon: <PeopleAltOutlinedIcon fontSize="small" /> },
  { label: "Products", href: "/admin/products", icon: <Inventory2OutlinedIcon fontSize="small" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#F97316" }} elevation={2}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            {/* Brand */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DashboardCustomizeOutlinedIcon sx={{ color: "#fff" }} />
              <Typography
                component={Link}
                href="/admin/users"
                variant="h6"
                noWrap
                sx={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Admin Panel
              </Typography>
              <Chip
                size="small"
                label="Shopping App"
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  backgroundColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Desktop nav links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              {NAV_LINKS.map((link) => {
                const active = pathname?.startsWith(link.href);
                return (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    startIcon={link.icon}
                    sx={{
                      color: "#ffffff",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "15px",
                      borderRadius: "50px",
                      padding: "6px 16px",
                      backgroundColor: active ? "#C2410C" : "transparent",
                      "&:hover": {
                        backgroundColor: active ? "#9A3412" : "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
              <Button
                component={Link}
                href="/"
                startIcon={<StorefrontOutlinedIcon fontSize="small" />}
                sx={{
                  color: "#000000",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  borderRadius: "50px",
                  padding: "6px 16px",
                  backgroundColor: "#f0f0f0",
                  ml: 1,
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                View Store
              </Button>
            </Box>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ color: "#fff" }}
                aria-label="open admin navigation menu"
              >
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)}>
                {NAV_LINKS.map((link) => (
                  <MenuItem
                    key={link.href}
                    component={Link}
                    href={link.href}
                    selected={pathname?.startsWith(link.href)}
                    onClick={() => setAnchorEl(null)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {link.icon}
                      {link.label}
                    </Box>
                  </MenuItem>
                ))}
                <MenuItem component={Link} href="/" onClick={() => setAnchorEl(null)}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <StorefrontOutlinedIcon fontSize="small" />
                    View Store
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
