"use client";

import React from "react";
import Link from "next/link";
import { styled, alpha, Theme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Container,
  IconButton,
  Button,
  
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HeaderCategory from "./HeaderCategory";

const Search = styled("div")(({ theme }: { theme: Theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

export default function DesktopHeader() {
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="What are you looking for?..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

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
              <IconButton
                component={Link}
                href="/cart"
                sx={{
                  backgroundColor: "#C2410C",
                  color: "#ffffff",
                  width: 44,
                  height: 44,
                  "&:hover": {
                    backgroundColor: "#9A3412",
                  },
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 22 }} />
              </IconButton>

              {/* Login page */}
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