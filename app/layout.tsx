import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartWhatsAppButton from "@/components/SmartWhatsAppButton";
import MarketingScripts from "@/components/MarketingScripts";
import { getLayoutBrands } from "@/lib/api/layoutBrands";
import { getMarketingScripts } from "@/lib/api/marketingScripts";
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
  openGraph: {
    title: "Automotriz Carmona | Líderes en Venta de Autos",
    description: "Compra, vende o financia tu próximo auto con el respaldo de 30 años de trayectoria.",
    url: 'https://automotrizcarmona.cl',
    siteName: 'Automotriz Carmona',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Automotriz Carmona",
    description: "Compra, vende o financia tu próximo auto con el respaldo de 30 años de trayectoria.",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [layoutBrands, marketingScripts] = await Promise.all([
    getLayoutBrands(),
    getMarketingScripts(),
  ]);

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Scripts de marketing inyectados en <head> (GTM, GA4, Ads, Meta Pixel, etc.) */}
        <MarketingScripts scripts={marketingScripts} placement="head" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        {/* Scripts de inicio de <body> (ej. GTM noscript fallback o custom body_start) */}
        <MarketingScripts scripts={marketingScripts} placement="body_start" />

        <Navbar layoutBrands={layoutBrands} />
        {children}
        <SmartWhatsAppButton />
        <Footer />

        {/* Scripts de cierre de <body> (Hotjar, Clarity, custom body_end) */}
        <MarketingScripts scripts={marketingScripts} placement="body_end" />
      </body>
    </html>
  );
}
