import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartWhatsAppButton from "@/components/SmartWhatsAppButton";
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
  title: "Automotriz Carmona | Líderes en Venta de Autos Nuevos & Seminuevos",
  description: "Compra, vende o financia tu próximo auto con el respaldo de 30 años de trayectoria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <SmartWhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
