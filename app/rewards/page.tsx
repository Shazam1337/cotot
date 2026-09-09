import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { RewardsPage } from "@/components/rewards/rewards-page";

export const metadata: Metadata = {
  title: "Your Cut — DONS",
  description: "Personal creator rewards and DONS settlement history.",
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
