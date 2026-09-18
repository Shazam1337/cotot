import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { WalletProvider } from "@/components/wallet/wallet-provider";
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

export const metadata: Metadata = {
  applicationName: "ONIX",
  title: { default: "ONIX — Signal to value infrastructure", template: "%s | ONIX" },
  description: "ONIX tracks public activity, measures contribution, and makes value distribution visible from event to record.",
  openGraph: { title: "ONIX — Signal to value infrastructure", description: "Track activity. Measure contribution. Inspect distribution.", siteName: "ONIX", type: "website" },
  twitter: { card: "summary_large_image", title: "ONIX — Signal to value infrastructure", description: "Track activity. Measure contribution. Inspect distribution." },
  icons: { icon: { url: "/assets/logo.png", type: "image/png" }, apple: "/assets/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={supreme.variable}>
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
