import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rotate PDF Sample",
  description:
    "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
  applicationName: "Rotate PDF Sample",
  authors: [{ name: "kevin", url: "https://github.com/lgz5689" }],
  generator: "Next.js",
  keywords: [
    "React",
    "PDF",
    "Rotate PDF Sample",
    "Rotate PDF",
    "Rotate PDF Online",
    "Rotate PDF Free",
    "Rotate",
  ],
  referrer: "origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
