import { DonsTape } from "@/components/home/dons-tape";
import { FoundationHero } from "@/components/home/foundation-hero";
import { PlatformOverview } from "@/components/home/platform-overview";
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
        <PlatformOverview />
        <div className="theme-dark">
          <TheWire />
        </div>
        <TopDons />
        <div className="theme-dark">
          <Proof />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
