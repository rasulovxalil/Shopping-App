"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  SvgIcon,
  SvgIconProps,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/app/Components/Auth/AuthContext";
import { useCart } from "@/app/Components/Cart/CartContext";

const DeleteIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </SvgIcon>
);

const ClearIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h5v2h-5zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z" />
  </SvgIcon>
);

const MinusIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M19 13H5v-2h14v2z" />
  </SvgIcon>
);

const PlusIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </SvgIcon>
);

export default function CartPage() {
  const { user } = useAuth();
  const { items: cartItems, loading, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (productId: number, currentQuantity: number, delta: number) => {
    const newQty = currentQuantity + delta;
    updateQuantity(productId, newQty > 0 ? newQty : 1);
  };

  const sumAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) {
    return (
      <Box
        sx={{
          maxWidth: 1100,
          width: "100%",
          mx: "auto",
          p: { xs: 2, sm: 3, md: 4 },
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 700 }}>
          Sign in to view your cart
        </Typography>
        <Typography sx={{ color: "#94a3b8" }}>
          Your cart is saved to your account, so you&apos;ll need to sign in first.
        </Typography>
        <Button
          component={Link}
          href="/login"
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: "#f97316",
            borderRadius: "50px",
            textTransform: "none",
            fontWeight: 700,
            px: 4,
            "&:hover": { backgroundColor: "#ea580c" },
          }}
        >
          Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1100,
        width: "100%",
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#ffffff",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <Box>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Cart
          </Typography>
          {cartItems.length > 0 && (
            <Button
              onClick={() => clearCart()}
              startIcon={<ClearIcon fontSize="small" />}
              sx={{
                color: "#64748b",
                textTransform: "none",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                padding: { xs: "4px 8px", sm: "6px 12px" },
                "&:hover": { color: "#ff6b00", backgroundColor: "transparent" },
              }}
            >
              Clear
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: { xs: 2, sm: 3 } }} />

        {/* Cart List */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#f97316" }} />
          </Box>
        ) : cartItems.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}>
            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 2 },
                  py: { xs: 2, sm: 1 },
                  px: { xs: 1.5, sm: 1 },
                  borderRadius: "12px",
                  border: { xs: "1px solid #f1f5f9", sm: "none" },
                  backgroundColor: { xs: "#ffffff", sm: "transparent" },
                  transition: "0.2s",
                  "&:hover": { backgroundColor: "#fafafa" },
                }}
              >
                {/* Item Info */}
                <Box
                  component={Link}
                  href={`/products/${item.productId}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Box
                    component="img"
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    sx={{
                      width: { xs: 64, sm: 80 },
                      height: { xs: 64, sm: 80 },
                      borderRadius: "8px",
                      objectFit: "contain",
                      backgroundColor: "#f8fafc",
                      p: 1,
                      border: "1px solid #f1f5f9",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "#94a3b8", display: "block", mb: 0.25 }}
                    >
                      Code: {item.productId} &middot; {item.brand}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#0f172a",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        maxWidth: { xs: "100%", sm: 360 },
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Box>

                {/* For mobile responsive design */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    flexDirection: { xs: "row", sm: "row" },
                    gap: { xs: 1, sm: 3 },
                    pt: { xs: 1, sm: 0 },
                    borderTop: { xs: "1px dashed #f1f5f9", sm: "none" },
                  }}
                >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ff6b00",
                      color: "#ffffff",
                      borderRadius: "50px",
                      px: 0.8,
                      py: 0.2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
                      sx={{ color: "#ffffff", p: 0.4 }}
                    >
                      <MinusIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{
                        mx: 1,
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        minWidth: "16px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
                      sx={{ color: "#ffffff", p: 0.4 }}
                    >
                      <PlusIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Delete button */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1.5, sm: 3 },
                    }}
                  >
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#0f172a",
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        {item.price * item.quantity} GEL
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => removeFromCart(item.productId)}
                      sx={{
                        backgroundColor: "#f8fafc",
                        color: "#64748b",
                        p: { xs: 0.8, sm: 1 },
                        "&:hover": { backgroundColor: "#ffebe6", color: "#ff6b00" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" sx={{ color: "#94a3b8" }}>
              Your cart is empty
            </Typography>
          </Box>
        )}
      </Box>

      {/* Bottom part and buy button */}
      {!loading && cartItems.length > 0 && (
        <Box sx={{ mt: { xs: 4, sm: 6 } }}>
          <Divider sx={{ mb: { xs: 2.5, sm: 4 } }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: { xs: "space-between", sm: "flex-start" },
                gap: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#475569", fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                Sum Amount:
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  fontSize: { xs: "1.5rem", sm: "2.125rem" },
                }}
              >
                {sumAmount} GEL
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff6b00",
                color: "#ffffff",
                borderRadius: "50px",
                px: 6,
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: "0.95rem", sm: "1rem" },
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  backgroundColor: "#e05e00",
                  boxShadow: "0px 4px 12px rgba(255, 107, 0, 0.3)",
                },
              }}
            >
              Buy
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
