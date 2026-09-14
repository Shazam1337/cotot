import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProofPage } from "@/components/proof/proof-page";

export const metadata: Metadata = {
  title: "Open Ledger — COTOT",
  description: "Transparent protocol economics, creator settlements, and network status.",
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
