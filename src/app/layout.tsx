import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Credit Hub | Credit Repair & Funding Community",
  description: "Fix your credit. Secure $50K-$250K in funding. Build a funding business using the same system behind $30M+ secured. Take the free Credit GPS Quiz.",
  icons: {
    icon: "/credit-hub-logo.svg",
    shortcut: "/credit-hub-logo.svg",
    apple: "/credit-hub-logo.svg",
  },
  openGraph: {
    title: "The Credit Hub | Credit Repair & Funding Community",
    description: "Fix your credit. Secure $50K-$250K in funding. Build a funding business using the same system behind $30M+ secured.",
    images: [
      {
        url: "/credit-hub-logo.svg",
        width: 1200,
        height: 630,
        alt: "The Credit Hub - Credit Repair & Funding Community",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Credit Hub | Credit Repair & Funding Community",
    description: "Fix your credit. Secure $50K-$250K in funding. Build a funding business using the same system behind $30M+ secured.",
    images: ["/credit-hub-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
