import { AttentionBecomesValue } from "@/components/home/attention-becomes-value";
import { DonsTape } from "@/components/home/dons-tape";
import { FoundationHero } from "@/components/home/foundation-hero";
import { Proof } from "@/components/home/proof";
import { TheWire } from "@/components/home/the-wire";
import { TopDons } from "@/components/home/top-dons";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <FoundationHero />
        <DonsTape />
        <TheWire />
        <AttentionBecomesValue />
        <TopDons />
        <Proof />
      </main>
      <SiteFooter />
    </>
  );
}
