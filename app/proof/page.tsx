import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProofPage } from "@/components/proof/proof-page";

export const metadata: Metadata = {
  title: "Records",
  description: "Review ONIX distribution cycles, allocation records, and prototype network status.",
};

export default function ProofRoute() {
  return (
    <>
      <main className="product-page">
        <ProofPage />
      </main>
      <SiteFooter />
    </>
  );
}
