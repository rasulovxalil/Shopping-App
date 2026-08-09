import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import MuiProvider from "./Components/Header/ThemeProvider";
import SiteChrome from "./Components/Header/SiteChrome";
import { AuthProvider } from "./Components/Auth/AuthContext";
import { CartProvider } from "./Components/Cart/CartContext";
import type { Viewport } from "next";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopping App",
  description: "",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <MuiProvider>
            <AuthProvider>
              <CartProvider>
                <SiteChrome>{children}</SiteChrome>
              </CartProvider>
            </AuthProvider>
          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
