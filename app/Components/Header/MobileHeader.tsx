"use client";
import React, { useState } from "react";
import { styled, alpha, Theme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HeaderCategoryMobile from "@/app/Components/Header/HeaderCategoryMobile";

interface StyledProps {
  theme: Theme;
}

const Search = styled("div")(({ theme }: StyledProps) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: "flex",
  alignItems: "center",
  transition: theme.transitions.create(["width", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }: StyledProps) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }: StyledProps) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 0, 0.8, 2),
    paddingRight: `calc(1em + ${theme.spacing(3.5)})`,
    fontSize: "14px",
    width: "100%",
  },
}));

export default function MobileHeader() {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#F97316", py: 0.5 }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              minHeight: "56px !important",
              px:0
            }}
          >
          
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <HeaderCategoryMobile />
              <Link href={{ pathname: "/" }} style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ 
                    
                    fontWeight: "bold", 
                    fontSize: { xs: "15px", sm: "18px" },
                    display: isFocused ? { xs: "none", sm: "block" } : "block"
                  }}
                >
                  Shopping App
                </Typography>
              </Link>
            </Box>

        
            <Box 
              sx={{ 
                display: "flex", 
                
                alignItems: "center", 
                gap: 1, 
                flexGrow: isFocused ? 1 : 0, 
                justifyContent: "flex-start",
                height: 38,
              }}
            >
            
              <Search
                sx={{
                  width: isFocused 
                    ? { xs: "130px", sm: "220px", md: "280px" } 
                    : "38px", 
                  height: 38,
                  backgroundColor: isFocused ? alpha("#ffffff", 0.25) : alpha("#ffffff", 0.15)
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon sx={{ fontSize: 20 }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={isFocused ? "Search..." : ""}
                  inputProps={{ "aria-label": "search" }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </Search>

            
              <IconButton
                sx={{
                  backgroundColor: "#C2410C",
                  color: "#ffffff",
                  width: 38,
                  height: 38,
                  "&:hover": { backgroundColor: "#9A3412" },
                  flexShrink: 0,
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 20 }} />
              </IconButton>

              <Link href="/login">
              <IconButton
                sx={{
                  backgroundColor: "#f0f0f0",
                  color: "#000000",
                  width: 38,
                  height: 38,
                  "&:hover": { backgroundColor: "#f9f9f9" },
                  flexShrink: 0,
                }}
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 22 }} />
              </IconButton>
                </Link>
            
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f0f0f0",
                  color: "#000000",
                  textTransform: "none",
                  borderRadius: "30px",
                  minWidth: "38px",
                  height: 38,
                  padding: "0 8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#f9f9f9" },
                  flexShrink: 0,
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