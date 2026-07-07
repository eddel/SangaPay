import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PwaBootstrap } from "@/components/sangapay/pwa-bootstrap";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SangaPay",
  description: "Send across borders instantly.",
  applicationName: "SangaPay",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SangaPay",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <PwaBootstrap />
        {children}
      </body>
    </html>
  );
}
