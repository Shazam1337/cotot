import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { WirePage } from "@/components/wire/wire-page";

export const metadata: Metadata = {
  title: "Live Signals — COTOT",
  description: "Follow creator attention from detection to settlement.",
};

export default function WireRoute() {
  return (
    <>
      <main>
        <WirePage />
      </main>
      <SiteFooter />
    </>
  );
}
