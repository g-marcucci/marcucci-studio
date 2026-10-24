import type { Metadata } from "next";
import { CaseErp } from "@/components/case-erp";
import { Nav } from "@/components/nav";
import { Cta, Footer, WhatsAppFloat } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `ERP multimarketplace · ${site.name}`,
  description:
    "Case: um hub para quem vende em quatro marketplaces ao mesmo tempo. Pedidos, clientes, reputação, margem e anúncios num lugar só, feito do zero.",
};

export default function CaseErpPage() {
  return (
    <div className="p-2 md:p-3">
      <div className="relative min-h-screen overflow-clip rounded-[22px] bg-bg md:rounded-[30px]">
        <Nav />
        <main className="mx-auto max-w-[1280px] md:border-x md:border-line">
          <CaseErp />
          <Cta />
          <Footer />
        </main>
      </div>
      <WhatsAppFloat />
    </div>
  );
}
