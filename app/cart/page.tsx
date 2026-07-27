"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  SvgIcon,
  SvgIconProps,
} from "@mui/material";

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

interface CartItem {
  id: string;
  code: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  monthlyPrice?: number;
  quantity: number;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "1",
    code: "139444",
    title: "ViewSonic VX2776 27'' FHD VX2776-SMH - Black",
    image: "https://via.placeholder.com/100",
    price: 499,
    oldPrice: 649,
    monthlyPrice: 42,
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const sumAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
              onClick={handleClearCart}
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
        {cartItems.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 3 } }}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
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
                {/* ITem Info*/}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
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
                      Code: {item.code}
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
                      {item.title}
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
                      onClick={() => handleQuantityChange(item.id, -1)}
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
                      onClick={() => handleQuantityChange(item.id, 1)}
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "flex-end",
                          gap: 0.8,
                        }}
                      >
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
                        {item.oldPrice && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#94a3b8",
                              textDecoration: "line-through",
                              fontSize: { xs: "0.75rem", sm: "0.85rem" },
                            }}
                          >
                            {item.oldPrice * item.quantity} GEL
                          </Typography>
                        )}
                      </Box>
                      {item.monthlyPrice && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#ff6b00",
                            fontWeight: 600,
                            display: "block",
                            fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          }}
                        >
                          Per Month: From {item.monthlyPrice} GEL
                        </Typography>
                      )}
                    </Box>

                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
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
      {cartItems.length > 0 && (
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