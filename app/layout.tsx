import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { WalletProvider } from "@/components/wallet/wallet-provider";
import cototLogo from "@/public/assets/brand/ChatGPT Image 9 сент. 2026 г., 16_03_37.png";
import "./globals.css";

const supreme = localFont({
  src: [
    {
      path: "../components/Supreme Variable (Indian Type Foundry)/Supreme-Variable.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../components/Supreme Variable (Indian Type Foundry)/Supreme-VariableItalic.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-supreme",
  display: "swap",
});

const kulagSha = localFont({
  src: "../components/KULAG SHA/KULAG SHA.otf",
  variable: "--font-kulag-sha",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "COTOT — Proof of Attention",
  description: "Measure creator impact and share network value transparently on Solana.",
  icons: {
    icon: [{ url: cototLogo.src, type: "image/png" }],
    shortcut: [{ url: cototLogo.src, type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${supreme.variable} ${kulagSha.variable}`}>
      <body>
        <WalletProvider>
          <div className="site-shell">
            <SiteHeader />
            {children}
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
