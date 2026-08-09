"use client";

import React from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HeaderCategory from "./HeaderCategory";
import SearchBox from "./SearchBox";
import CartMenu from "@/app/Components/Cart/CartMenu";
import { useAuth } from "@/app/Components/Auth/AuthContext";

export default function DesktopHeader() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ backgroundColor: "#F97316" }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Main logo */}
            <Typography
              component={Link}
              href="/"
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Shopping App
            </Typography>

            <HeaderCategory />

            {/* Search function */}
            <SearchBox variant="desktop" />

            {/* Right Action Items */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {/* Cart */}
              <CartMenu size={44} iconFontSize={22} />

              {/* Login / Sign out */}
              {user ? (
                <Button
                  onClick={logout}
                  variant="contained"
                  startIcon={<LogoutOutlinedIcon sx={{ fontSize: "20px !important", color: "#000000" }} />}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    color: "#000000",
                    textTransform: "none",
                    borderRadius: "50px",
                    padding: "6px 16px",
                    fontSize: "15px",
                    fontWeight: 600,
                    maxWidth: 220,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #f0f0f0",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.email}
                  </Box>
                </Button>
              ) : (
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  startIcon={
                    <AccountCircleOutlinedIcon
                      sx={{ fontSize: "22px !important", color: "#000000" }}
                    />
                  }
                  sx={{
                    backgroundColor: "#f0f0f0",
                    color: "#000000",
                    textTransform: "none",
                    borderRadius: "50px",
                    padding: "6px 16px",
                    fontSize: "15px",
                    fontWeight: 600,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #f0f0f0",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  Sign In
                </Button>
              )}

              {/* Language switcher */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f0f0f0",
                  color: "#000000",
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "6px 14px",
                  minWidth: "auto",
                  fontSize: "15px",
                  fontWeight: 600,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #f0f0f0",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                En
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}