import type { Metadata } from "next";
import { CreatorsPage } from "@/components/creators/creators-page";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Creator Index — COTOT",
  description: "Discover the creators generating measurable network value.",
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
