"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const DesktopHeader = dynamic(() => import("./DesktopHeader"));
const MobileHeader = dynamic(() => import("./MobileHeader"));

export default function Header() {
  return (
    <>
      {/* Desktop view (visible on md and up) */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <DesktopHeader />
      </Box>

      {/* Mobile view (visible below md) */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileHeader />
      </Box>
    </>
  );
}