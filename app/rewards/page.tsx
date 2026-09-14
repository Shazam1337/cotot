import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { RewardsPage } from "@/components/rewards/rewards-page";

export const metadata: Metadata = {
  title: "Rewards — COTOT",
  description: "Creator rewards, eligible signals, and settlement history.",
};

export default function RewardsRoute() {
  return (
    <>
      <main>
        <RewardsPage />
      </main>
      <SiteFooter />
    </>
  );
}
