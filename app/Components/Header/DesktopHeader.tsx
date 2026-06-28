"use client";
import { styled, alpha, Theme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import HeaderCategory from "./HeaderCategory";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import Button from "@mui/material/Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

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
  justify: "center",
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#F97316" }}>
        <Container maxWidth="lg">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Main logo */}
            <Link
              href={{
                pathname: "/",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  mr: { xs: 2, sm: 4 },
                }}
              >
                Shopping App
              </Typography>
            </Link>

            <HeaderCategory />
            {/* Search function*/}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="What are you looking for?..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/* Cart*/}
            <IconButton
              sx={{
                backgroundColor: "#C2410C",
                color: "#ffffff",
                width: 50,
                height: 50,
                "&:hover": {
                  backgroundColor: "#9A3412",
                },
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 24 }} />
            </IconButton>
            {/* Login page*/}
             <Link href="/login">
            <Button
              variant="contained"
              startIcon={
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: "24px !important", color: "#000000" }}
                />
              }
              sx={{
                backgroundColor: "#f0f0f0",
                color: "#000000", 
                textTransform: "none", 
                borderRadius: "50px",
                padding: "5px 15px",
                fontSize: "16px", 
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
            </Link>
            {/* Language switcher*/}
          <Button
              variant="contained"
              sx={{
                backgroundColor: "#f0f0f0",
                color: "#000000", 
                textTransform: "none", 
                borderRadius: "30px",
                padding: "5px 15px",
                fontSize: "16px", 
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
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
