"use client";

import React, { useState, MouseEvent } from "react";
import Link from "next/link";
import {
  Badge,
  Box,
  Popper,
  Paper,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useCart } from "./CartContext";

interface CartMenuProps {
  size?: number;
  iconFontSize?: number;
}

export default function CartMenu({ size = 44, iconFontSize = 22 }: CartMenuProps) {
  const { items, totalCount, totalPrice, removeFromCart } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box onMouseLeave={handleClose} sx={{ display: "inline-block" }}>
      <IconButton
        component={Link}
        href="/cart"
        onMouseEnter={handleMouseEnter}
        sx={{
          backgroundColor: "#C2410C",
          color: "#ffffff",
          width: size,
          height: size,
          "&:hover": { backgroundColor: "#9A3412" },
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Badge badgeContent={totalCount} color="error" invisible={totalCount === 0}>
          <ShoppingCartIcon sx={{ fontSize: iconFontSize }} />
        </Badge>
      </IconButton>

      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" style={{ zIndex: 1300 }}>
        <Paper elevation={4} sx={{ width: 320, maxWidth: "90vw", mt: 1, borderRadius: 2, p: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Your Cart ({totalCount})</Typography>

            {items.length === 0 ? (
              <Typography sx={{ color: "text.secondary", fontSize: 14, py: 2, textAlign: "center" }}>
                Your cart is empty.
              </Typography>
            ) : (
              <>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxHeight: 280, overflowY: "auto" }}>
                  {items.map((item) => (
                    <Box key={item.productId} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        component="img"
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        sx={{
                          width: 44,
                          height: 44,
                          objectFit: "contain",
                          borderRadius: 1,
                          border: "1px solid #f1f5f9",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography noWrap sx={{ fontSize: 13, fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                          {item.quantity} x {item.price} GEL
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => removeFromCart(item.productId)}>
                        <DeleteOutlineIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 600 }}>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 700 }}>{totalPrice} GEL</Typography>
                </Box>

                <Button
                  component={Link}
                  href="/cart"
                  fullWidth
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "#f97316",
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: "50px",
                    "&:hover": { backgroundColor: "#ea580c" },
                  }}
                >
                  View Cart
                </Button>
              </>
            )}
        </Paper>
      </Popper>
    </Box>
  );
}
