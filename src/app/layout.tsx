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
  title: "Purpose & Profit Builders | Faith-Driven Entrepreneur Community",
  description: "Build consistent income from $0-$10K/mo using Kingdom economics and simple AI systems. No hustle. No burnout. Take the free 2-minute Clarity Quiz.",
  icons: {
    icon: "/ppb-logo.svg",
    shortcut: "/ppb-logo.svg",
    apple: "/ppb-logo.svg",
  },
  openGraph: {
    title: "Purpose & Profit Builders | Faith-Driven Entrepreneur Community",
    description: "Build consistent income from $0-$10K/mo using Kingdom economics and simple AI systems. No hustle. No burnout. Purpose → Peace → Profit.",
    images: [
      {
        url: "/ppb-logo.svg",
        width: 1200,
        height: 630,
        alt: "Purpose & Profit Builders - Faith-Driven Entrepreneur Community",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purpose & Profit Builders | Faith-Driven Entrepreneur Community",
    description: "Build consistent income from $0-$10K/mo using Kingdom economics and simple AI systems. No hustle. No burnout.",
    images: ["/ppb-logo.svg"],
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
