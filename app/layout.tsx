import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicolas Hurtado — Data, AI & Intelligent Systems",
  description:
    "Portfolio of Nicolas Hurtado — data engineering, data science, AI and backend. Experience, projects, certifications.",
  openGraph: {
    title: "Nicolas Hurtado — Data, AI & Intelligent Systems",
    description:
      "Data engineering, data science, AI and backend. Experience, projects, certifications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper font-sans text-body antialiased">{children}</body>
    </html>
  );
}
