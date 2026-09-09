import type { Metadata } from "next";
import { CreatorsPage } from "@/components/creators/creators-page";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Creators — DONS",
  description: "The creator discovery and reputation layer of DONS.",
};

export default function CreatorsRoute() {
  return (
    <>
      <main>
        <CreatorsPage />
      </main>
      <SiteFooter />
    </>
  );
}
