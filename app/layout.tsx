import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "Mahen's Raz — Full Stack Developer",
  description:
    "Software engineering student and full stack developer building scalable, intuitive digital solutions with Next.js, React, Laravel, Node.js and modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "React",
    "Laravel",
    "Node.js",
    "Express.js",
    "PHP",
    "TypeScript",
    "Web Developer",
    "Madagascar",
  ],
  authors: [{ name: "Mahen's Raz" }],
  creator: "Mahen's Raz",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mahen's Raz — Full Stack Developer",
    description:
      "Building scalable and intuitive digital solutions with modern web technologies.",
    siteName: "Mahen's Raz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahen's Raz — Full Stack Developer",
    description:
      "Building scalable and intuitive digital solutions with modern web technologies.",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
