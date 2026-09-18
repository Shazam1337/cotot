import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { RewardsPage } from "@/components/rewards/rewards-page";

export const metadata: Metadata = {
  title: "Earnings",
  description: "Connect a Solana wallet to explore the ONIX earnings prototype and payout history.",
};

export default function RewardsRoute() {
  return (
    <>
      <main className="product-page">
        <RewardsPage />
      </main>
      <SiteFooter />
    </>
  );
}
