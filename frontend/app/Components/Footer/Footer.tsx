"use client";

import { Box, Grid, Typography, Stack, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import Container from "@mui/material/Container";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import Link from "next/link";
import type { ReactNode } from "react";

const ACCENT = "#f97316";
const ACCENT_DARK = "#9A3412";
const HEADING_COLOR = "#C2410C";
const TEXT_COLOR = "#57534e";
const linkTextSx = {
  fontSize: "0.875rem",
  color: TEXT_COLOR,
  cursor: "pointer",
  transition: "color 0.2s ease, transform 0.2s ease",
  "&:hover": { color: ACCENT_DARK },
};

const headingSx = {
  fontWeight: 700,
  mb: 1.25,
  fontSize: "0.95rem",
  letterSpacing: "0.02em",
  color: HEADING_COLOR,
  textTransform: "uppercase" as const,
  position: "relative" as const,
  display: "inline-block",
  pb: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "3px",
    borderRadius: "3px",
    backgroundColor: ACCENT,
  },
};

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography sx={linkTextSx}>{children}</Typography>
    </Link>
  );
}

function IconRow({
  icon,
  children,
  href,
}: {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
}) {
  const content = (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        alignItems: "center",
        "&:hover .footer-icon-circle": {
          backgroundColor: ACCENT,
          color: "#fff",
        },
        "&:hover .footer-icon-text": { color: ACCENT_DARK },
      }}
    >
      <Box
        className="footer-icon-circle"
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(249,115,22,0.12)",
          color: ACCENT,
          transition: "all 0.2s ease",
          flexShrink: 0,
          "& svg": { fontSize: "1rem" },
        }}
      >
        {icon}
      </Box>
      <Typography className="footer-icon-text" sx={{ ...linkTextSx, "&:hover": {} }}>
        {children}
      </Typography>
    </Stack>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }
  return content;
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        color: ACCENT,
        background: "linear-gradient(135deg, #fff5eb 0%, #ffe0cc 100%)",
        borderTop: "1px solid rgba(249,115,22,0.15)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3.5, sm: 4, md: 4.5 } }}>
        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 2.5 }}
          sx={{
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography sx={headingSx}>About Us</Typography>
            <Stack spacing={0.75} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
              <FooterLink href="/info/online-payment-methods">How To Buy Online</FooterLink>
              <FooterLink href="/info/who-we-are">Who We Are</FooterLink>
              <FooterLink href="/info/online-payment-methods">Online Payment Methods</FooterLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography sx={headingSx}>Terms &amp; Conditions</Typography>
            <Stack spacing={0.75} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
              <FooterLink href="/info/warranty-terms">Warranty Terms</FooterLink>
              <FooterLink href="/info/personal-data-policy">Personal Data Policy</FooterLink>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography sx={headingSx}>Follow Us</Typography>
            <Stack spacing={0.85} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
              <IconRow icon={<FacebookIcon />} href="#">
                Facebook
              </IconRow>
              <IconRow icon={<InstagramIcon />} href="#">
                Instagram
              </IconRow>
              <IconRow icon={<YouTubeIcon />} href="#">
                Youtube
              </IconRow>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography sx={headingSx}>Contact Us</Typography>
            <Stack spacing={0.85} sx={{ alignItems: { xs: "center", sm: "flex-start" } }}>
              <IconRow icon={<EmailIcon />} href="mailto:shoppingapp@example.ge">
                shoppingapp@example.ge
              </IconRow>
              <IconRow icon={<CallIcon />} href="tel:+27751515151">
                277 51 51 51
              </IconRow>
              <IconRow icon={<LocationPinIcon />} href="/info/our-stores">
                Locations
              </IconRow>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 2.5, md: 3 }, borderColor: "rgba(249,115,22,0.2)" }} />

        <Typography
          sx={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: TEXT_COLOR,
            textAlign: "center",
          }}
        >
          Copyright © 2026 shoppingappexample.ge — All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}