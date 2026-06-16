import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicolas Hurtado — Data Engineer & AI",
  description:
    "Portfolio of Nicolas Hurtado — data engineering, data science, AI and backend. Projects, certifications, and experience.",
  openGraph: {
    title: "Nicolas Hurtado — Data Engineer & AI",
    description:
      "Data engineering, data science, AI and backend. Projects, certifications, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans bg-ink text-sand antialiased">{children}</body>
    </html>
  );
}
