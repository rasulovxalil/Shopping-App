"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HeaderCategoryMobile from "@/app/Components/Header/HeaderCategoryMobile";
import SearchBox from "@/app/Components/Header/SearchBox";
import { useAuth } from "@/app/Components/Auth/AuthContext";
import { useCart } from "@/app/Components/Cart/CartContext";

export default function MobileHeader() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const { totalCount } = useCart();

  return (
    <Box sx={{ width:"100%"}}>
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
            
              <SearchBox variant="mobile" onFocusChange={setIsFocused} />

                <Link href="/cart">
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
                <Badge badgeContent={totalCount} color="error" invisible={totalCount === 0}>
                  <ShoppingCartIcon sx={{ fontSize: 20 }} />
                </Badge>
              </IconButton>
              </Link>

              {user ? (
                <Tooltip title={`Signed in as ${user.email} — tap to sign out`}>
                  <IconButton
                    onClick={logout}
                    sx={{
                      backgroundColor: "#22c55e",
                      color: "#ffffff",
                      width: 38,
                      height: 38,
                      "&:hover": { backgroundColor: "#16a34a" },
                      flexShrink: 0,
                    }}
                  >
                    <AccountCircleOutlinedIcon sx={{ fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
              ) : (
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
              )}

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