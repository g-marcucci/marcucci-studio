// Idiomas do site. Inglês é o padrão (na raiz); português e espanhol ficam em /pt e /es.
// Arquivo sem "use client": as páginas (geradas no build) também leem estes valores.
export const LOCALES = ["en", "pt", "es"] as const;
export type Locale = (typeof LOCALES)[number];

/** Texto nos três idiomas, escrito ao lado de onde é usado. */
export type Tr = { en: string; pt: string; es: string };
/** Texto traduzido ou fixo (nomes próprios, números). */
export type Text = string | Tr;

export const HTML_LANG: Record<Locale, string> = { en: "en", pt: "pt-BR", es: "es" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", pt: "pt_BR", es: "es_ES" };
export const LOCALE_LABEL: Record<Locale, string> = { en: "EN", pt: "PT", es: "ES" };

/** Raiz de cada idioma: o link "Início" e as âncoras da home partem daqui. */
export const HOME: Record<Locale, string> = { en: "/", pt: "/pt/", es: "/es/" };

/** Endereço da página do case do ERP em cada idioma. */
export const CASE_PATH: Record<Locale, string> = {
  en: "/work/erp-multimarketplace/",
  pt: "/pt/trabalhos/erp-multimarketplace/",
  es: "/es/trabajos/erp-multimarketplace/",
};

/** Página do serviço de agentes de IA em cada idioma. */
export const AI_PATH: Record<Locale, string> = {
  en: "/services/ai-agents/",
  pt: "/pt/servicos/agentes-de-ia/",
  es: "/es/servicios/agentes-de-ia/",
};
