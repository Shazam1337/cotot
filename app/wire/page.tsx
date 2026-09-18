import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { WirePage } from "@/components/wire/wire-page";

export const metadata: Metadata = {
  title: "Activity",
  description: "Inspect ONIX public activity, attribution status, and contribution metrics.",
};

export default function WireRoute() {
  return (
    <>
      <main className="product-page">
        <WirePage />
      </main>
      <SiteFooter />
    </>
  );
}
