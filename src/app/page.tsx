import { Nav } from "@/components/nav";
import { Cta, EventsMarquee, Faq, Footer, Hero, Process, WhatsAppFloat } from "@/components/sections";
import { Services } from "@/components/services";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <div className="p-2 md:p-3">
      {/* moldura arredondada, como uma tela */}
      <div className="relative min-h-screen overflow-clip rounded-[22px] bg-bg md:rounded-[30px]">
        <Nav />
        <main className="mx-auto max-w-[1280px] md:border-x md:border-line">
          <Hero />
          <EventsMarquee />
          <div className="h-8 md:h-10" />
          <Work />
          <Services />
          <Process />
          <Faq />
          <Cta />
          <Footer />
        </main>
      </div>
      <WhatsAppFloat />
    </div>
  );
}
