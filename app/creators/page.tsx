import type { Metadata } from "next";
import { CreatorsPage } from "@/components/creators/creators-page";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Contributors",
  description: "Compare ONIX contributors by reach, activity, earnings, and contribution.",
};

export default function CreatorsRoute() {
  return (
    <>
      <main className="product-page">
        <CreatorsPage />
      </main>
      <SiteFooter />
    </>
  );
}
