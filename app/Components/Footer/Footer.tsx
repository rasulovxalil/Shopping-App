"use client";
import { Box, Grid, Typography, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import Container from "@mui/material/Container";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import Link from 'next/link';

export default function Footer() {
  return (
    <Box sx={{color:"#f97316", background:"linear-gradient(135deg, #fff5eb 0%, #ffe0cc 100%)"}}>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: "0.9rem",
                color: "#C2410C",
              }}
            >
              About Us
            </Typography>
            <Stack spacing={1}>
              <Link href="/info/online-payment-methods" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}
                >
                  How To buy Online
                </Typography>
              </Link>
              <Link href="/info/who-we-are" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}
                >
                  Who We Are
                </Typography>
              </Link>
              <Link href="/info/online-payment-methods" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}
                >
                  Online Payment Methods
                </Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: "0.9rem",
                color: "#C2410C",
              }}
            >
              Terms And Conditions
            </Typography>
            <Stack spacing={1}>
              <Link href="/info/warranty-terms" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}
                >
                  Warranty Terms
                </Typography>
              </Link>
              <Link href="/info/personal-data-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}
                >
                  Personal Data Policy
                </Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={1}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: "0.9rem",
                  color: "#C2410C",
                }}
              >
                Follow us
              </Typography>
              <Stack direction="row" spacing={1}>
                <FacebookIcon /> <Typography   sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}>Facebook</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <InstagramIcon /> <Typography   sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}>Instagram</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <YouTubeIcon /> <Typography   sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}>Youtube</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={1}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: "0.9rem",
                  color: "#C2410C",
                }}
              >
                Contact Us
              </Typography>
              <Stack direction="row" spacing={1}>
                <EmailIcon /> <Typography   sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}>shoppingapp@example.ge</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CallIcon /> <Typography   sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }} >277 51 51 51</Typography>
              </Stack>
              <Link href="/info/our-stores" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Stack direction="row" spacing={1}>
                  <LocationPinIcon /> <Typography   sx={{
                    fontSize: "0.85rem",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}>Locations</Typography>
                </Stack>
              </Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 16 }}>
            <Stack spacing={1}>
              <Typography variant="h6"   sx={{
                    fontSize: "Bolt",
                    color: "#424242", 
                    cursor: "pointer",
                    "&:hover": { color: "'#9A3412'" }, 
                  }}>
                Copyright @ 2026 shoppingappexample.ge All Rights Reserved.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
