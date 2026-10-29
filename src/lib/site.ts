import type { Locale, Tr } from "./locales";

// Configuração central do site. Preencha os contatos aqui: os botões,
// o rodapé e o botão flutuante de WhatsApp se ajustam sozinhos.
export const site = {
  name: "Marcucci Studio",
  url: "https://marcucci.studio",
  contact: {
    // Só números, com DDI e DDD. Ex.: "5511999999999"
    whatsapp: "5541984810977",
    email: "gabriel@marcucci.studio",
    github: "",
    linkedin: "",
    instagram: "",
  },
  // Âncoras da home (iguais nos três idiomas). O contato existe em todas as
  // páginas, então aponta para a própria página.
  nav: [
    { id: "home", label: { en: "Home", pt: "Início", es: "Inicio" } },
    { id: "work", label: { en: "Work", pt: "Trabalhos", es: "Trabajos" } },
    { id: "services", label: { en: "Services", pt: "Serviços", es: "Servicios" } },
    { id: "ai", label: { en: "AI", pt: "IA", es: "IA" } },
    { id: "process", label: { en: "Process", pt: "Processo", es: "Proceso" } },
    { id: "contact", label: { en: "Contact", pt: "Contato", es: "Contacto" } },
  ] satisfies { id: string; label: Tr }[],
};

const whatsappMessage: Tr = {
  en: "Hi! I found the Marcucci Studio website and would like to talk about a project.",
  pt: "Olá! Vim pelo site da Marcucci Studio e queria conversar sobre um projeto.",
  es: "¡Hola! Vine por el sitio de Marcucci Studio y quería hablar sobre un proyecto.",
};

/** Os botões "Começar um projeto" levam ao formulário de contato. */
export function projectHref() {
  return "#contact";
}

/** Link do WhatsApp com uma mensagem pronta (a padrão do idioma, ou a montada pelo formulário). */
export function whatsappHref(message: string | Locale = "en") {
  const text = message === "en" || message === "pt" || message === "es" ? whatsappMessage[message] : message;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** WhatsApp formatado para exibir: +55 41 98481-0977. */
export function whatsappDisplay() {
  const n = site.contact.whatsapp;
  return `+${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 9)}-${n.slice(9)}`;
}

export function contactLinks() {
  const c = site.contact;
  return [
    c.whatsapp && { label: "WhatsApp", href: `https://wa.me/${c.whatsapp}` },
    c.email && { label: "E-mail", href: `mailto:${c.email}` },
    c.linkedin && { label: "LinkedIn", href: c.linkedin },
    c.github && { label: "GitHub", href: c.github },
    c.instagram && { label: "Instagram", href: c.instagram },
  ].filter(Boolean) as { label: string; href: string }[];
}

// Os valores das telas do ERP são em reais e seguem o formato brasileiro em todos os idiomas.
export const brl = (n: number, digits = 2) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
