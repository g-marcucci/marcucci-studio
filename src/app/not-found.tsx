"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { HOME, type Locale } from "@/lib/locales";

// O 404.html é o mesmo para qualquer endereço; o idioma vem do começo do caminho.
const TEXT = {
  en: { title: "This page doesn't exist.", text: "The link may have changed. The home page has everything that matters.", back: "Back to home" },
  pt: { title: "Essa página não existe.", text: "O link pode ter mudado. A página inicial tem tudo o que importa.", back: "Voltar para o início" },
  es: { title: "Esta página no existe.", text: "El enlace puede haber cambiado. La página de inicio tiene todo lo que importa.", back: "Volver al inicio" },
};

export default function NotFound() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const first = location.pathname.split("/")[1];
    if (first === "pt" || first === "es") setLocale(first);
  }, []);
  const t = TEXT[locale];

  return (
    <div className="p-2 md:p-3">
      <main className="grid min-h-[calc(100vh-24px)] place-items-center rounded-[22px] bg-bg px-6 text-center md:rounded-[30px]">
        <div>
          <Avatar size={64} className="mx-auto" />
          <p className="mt-8 font-pixel text-[14px] font-black tracking-[0.18em] text-muted uppercase">404</p>
          <h1 className="mt-3 font-display text-[40px] leading-none tracking-[-0.03em] text-fg md:text-[56px]">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-sm text-[16px] text-muted">{t.text}</p>
          <a
            href={HOME[locale]}
            className="mt-8 inline-flex rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            {t.back}
          </a>
        </div>
      </main>
    </div>
  );
}
