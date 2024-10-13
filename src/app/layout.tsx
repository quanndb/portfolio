import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReactLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vu Minh Quan - Portfolio",
  description: "Portfolio website showcasing my work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body className={cn(inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <HeroHighlight className="w-full">
              <Header />
              <main>{children}</main>
              <Footer />
            </HeroHighlight>
            <Toaster />
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
