import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { WirePage } from "@/components/wire/wire-page";

export const metadata: Metadata = {
  title: "The Wire — DONS",
  description: "The live stream of creator attention moving through DONS.",
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
