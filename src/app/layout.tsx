import type { Metadata, Viewport } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reverie — Journal de reves intelligent",
    template: "%s | Reverie",
  },
  description:
    "Capturez, interpretez et illustrez vos reves avec l'intelligence artificielle. Journal onirique personnalise, images generatives et analyse multi-lentilles.",
  metadataBase: new URL("https://reverie-web.vercel.app"),
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: "Reverie",
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
