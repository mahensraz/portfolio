import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Mahens Raz — Full Stack & Mobile Developer",
  description:
    "Mahens Raz, Full Stack & Mobile Developer completing a Master's Degree in Software Engineering and Databases at ENI Fianarantsoa. Building web and mobile applications with React, Next.js, Flutter, Laravel, Node.js, PostgreSQL, and Prisma.",
  keywords: [
    "Mahens Raz",
    "Full Stack & Mobile Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Software Engineering",
    "Next.js",
    "React",
    "Flutter",
    "Laravel",
    "PHP",
    "Node.js",
    "Express.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Docker",
    "ENI Fianarantsoa",
    "Madagascar",
  ],
  authors: [{ name: "Mahens Raz" }],
  creator: "Mahens Raz",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mahens Raz — Full Stack & Mobile Developer",
    description:
      "Full Stack & Mobile Developer building web platforms, backend APIs, and Flutter mobile applications.",
    siteName: "Mahens Raz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahens Raz — Full Stack & Mobile Developer",
    description:
      "Full Stack & Mobile Developer building web platforms, backend APIs, and Flutter mobile applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#080810",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased">
        <SpeedInsights />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
