import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secure Dashboard Next",
  description:
    "A full-stack Next.js authentication dashboard with Turnstile, OTP, JWT, and role-based access.",
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