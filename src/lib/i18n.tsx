"use client";

import { createContext, useContext } from "react";
import { HOME, type Locale, type Text } from "./locales";

export * from "./locales";

type Ctx = { locale: Locale; alternates: Record<Locale, string> };

const LocaleContext = createContext<Ctx>({ locale: "en", alternates: HOME });

export function LocaleProvider({
  locale,
  alternates,
  children,
}: {
  locale: Locale;
  /** A mesma página nos outros idiomas (para o seletor do topo). */
  alternates: Record<Locale, string>;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={{ locale, alternates }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** `t({ en, pt, es })` devolve o texto no idioma da página; string fixa passa direto. */
export function useT() {
  const { locale } = useLocale();
  return (text: Text) => (typeof text === "string" ? text : text[locale]);
}
