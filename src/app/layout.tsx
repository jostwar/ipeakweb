import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iPeak Agency | Marketing, Branding & AI Assistants",
  description:
    "Agencia de marketing premium con estrategia, contenido y automatización para crecer ventas con claridad.",
  metadataBase: new URL("https://ipeakagency.com"),
  openGraph: {
    title: "iPeak Agency",
    description:
      "Estrategia, contenido y automatización para crecer ventas con claridad.",
    type: "website",
    url: "https://ipeakagency.com",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "iPeak Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iPeak Agency",
    description:
      "Marketing digital, branding y asistentes virtuales para escalar ventas.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-black text-white">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
