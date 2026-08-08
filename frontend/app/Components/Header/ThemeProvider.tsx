"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React, { useSyncExternalStore } from 'react';

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

const emptySubscribe = () => () => {};

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ visibility: isClient ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </ThemeProvider>
  );
}