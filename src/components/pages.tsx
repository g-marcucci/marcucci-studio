import type { Metadata } from "next";
import { AI_PATH, CASE_PATH, HOME, HTML_LANG, LOCALES, OG_LOCALE, type Locale, type Tr } from "@/lib/locales";
import { site } from "@/lib/site";
import { CaseErp } from "./case-erp";
import { LocaleProvider } from "@/lib/i18n";
import { Nav } from "./nav";
import { AiService } from "./ai-page";
import { AiSection } from "./orchestra";
import { Cta, EventsMarquee, Faq, Footer, Hero, Process, WhatsAppFloat } from "./sections";
import { Services } from "./services";
import { Work } from "./work";

// As páginas de cada idioma montam o mesmo conteúdo com um LocaleProvider.

/** Metadados da página com as versões nos outros idiomas (hreflang). */
function meta(locale: Locale, paths: Record<Locale, string>, title: Tr, description: Tr): Metadata {
  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical: paths[locale],
      languages: { ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], paths[l]])), "x-default": paths.en },
    },
    openGraph: { title: title[locale], description: description[locale], locale: OG_LOCALE[locale], type: "website", url: paths[locale] },
  };
}

export const homeMetadata = (locale: Locale) =>
  meta(
    locale,
    HOME,
    {
      en: `${site.name} · Systems, web apps, automations and websites`,
      pt: `${site.name} · Sistemas, webapps, automações e sites`,
      es: `${site.name} · Sistemas, web apps, automatizaciones y sitios`,
    },
    {
      en: "Custom software that runs your business: systems and ERPs, web apps, automations and websites, built from scratch, from the database to the last screen.",
      pt: "Software sob medida que roda o seu negócio: sistemas e ERPs, webapps, automações e sites, feitos do zero, do banco de dados à última tela.",
      es: "Software a medida que mueve tu negocio: sistemas y ERPs, web apps, automatizaciones y sitios, hechos desde cero, de la base de datos a la última pantalla.",
    },
  );

export const caseMetadata = (locale: Locale) =>
  meta(
    locale,
    CASE_PATH,
    {
      en: `Multi-marketplace ERP · ${site.name}`,
      pt: `ERP multimarketplace · ${site.name}`,
      es: `ERP multimarketplace · ${site.name}`,
    },
    {
      en: "Case study: a hub for sellers on eight channels at once. Orders, customers, reputation, margin and listings in one place, built from scratch.",
      pt: "Case: um hub para quem vende em oito canais ao mesmo tempo. Pedidos, clientes, reputação, margem e anúncios num lugar só, feito do zero.",
      es: "Caso: un hub para quien vende en ocho canales a la vez. Pedidos, clientes, reputación, margen y publicaciones en un solo lugar, hecho desde cero.",
    },
  );

/** Moldura comum (topo, rodapé, WhatsApp) e o idioma do documento. */
function Frame({ locale, alternates, children }: { locale: Locale; alternates: Record<Locale, string>; children: React.ReactNode }) {
  return (
    <LocaleProvider locale={locale} alternates={alternates}>
      {/* O layout raiz é único (inglês); aqui o <html lang> passa a ser o do idioma da página. */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(HTML_LANG[locale])}` }} />
      <div className="p-2 md:p-3">
        {/* moldura arredondada, como uma tela */}
        <div className="relative min-h-screen overflow-clip rounded-[22px] bg-bg md:rounded-[30px]">
          <Nav />
          <main className="mx-auto max-w-[1280px] md:border-x md:border-line">
            {children}
            <Cta />
            <Footer />
          </main>
        </div>
        <WhatsAppFloat />
      </div>
    </LocaleProvider>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <Frame locale={locale} alternates={HOME}>
      <Hero />
      <EventsMarquee />
      <div className="h-8 md:h-10" />
      <Work />
      <Services />
      <AiSection />
      <Process />
      <Faq />
    </Frame>
  );
}

export const aiMetadata = (locale: Locale) =>
  meta(
    locale,
    AI_PATH,
    {
      en: `AI agents and multi-agent automation · ${site.name}`,
      pt: `Agentes de IA e automação multiagente · ${site.name}`,
      es: `Agentes de IA y automatización multiagente · ${site.name}`,
    },
    {
      en: "Teams of AI agents that split the work between LLMs, read your data, use your tools and call a person when it matters. Designed, built and monitored end to end.",
      pt: "Equipes de agentes de IA que dividem o trabalho entre LLMs, leem seus dados, usam suas ferramentas e chamam uma pessoa quando importa. Desenhadas, construídas e acompanhadas de ponta a ponta.",
      es: "Equipos de agentes de IA que dividen el trabajo entre LLMs, leen tus datos, usan tus herramientas y llaman a una persona cuando importa. Diseñados, construidos y acompañados de punta a punta.",
    },
  );

export function AiPage({ locale }: { locale: Locale }) {
  return (
    <Frame locale={locale} alternates={AI_PATH}>
      <AiService />
    </Frame>
  );
}

export function CasePage({ locale }: { locale: Locale }) {
  return (
    <Frame locale={locale} alternates={CASE_PATH}>
      <CaseErp />
    </Frame>
  );
}
