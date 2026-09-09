import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProofPage } from "@/components/proof/proof-page";

export const metadata: Metadata = {
  title: "Proof — DONS",
  description: "Protocol economics, creator settlements, and DONS network status.",
};

export default function ProofRoute() {
  return (
    <>
      <main>
        <ProofPage />
      </main>
      <SiteFooter />
    </>
  );
}
