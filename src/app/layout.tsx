import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { IntroWrapper } from "@/components/shared/IntroWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXORA — Field-to-Schedule Execution Intelligence",
  description: "Intelligent reconciliation between heterogeneous field execution reports and structured L5/L6 project schedules. SIH26122 MVP.",
  keywords: ["NEXORA", "field-to-schedule", "execution intelligence", "Primavera", "AI", "construction"],
  authors: [{ name: "NEXORA" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <IntroWrapper>
          {children}
          <Toaster />
          <SonnerToaster position="top-right" richColors closeButton />
        </IntroWrapper>
      </body>
    </html>
  );
}
