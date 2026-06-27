"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C2410C',
      dark: '#9A3412',
    },
    secondary: {
      main: '#5c3393', 
    },
    background: {
      default: '#f8fafc', 
    },
  },
  typography: {
    fontFamily: '__Inter_aaf875, __Inter_Fallback_aaf875, sans-serif',
  },
});

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}