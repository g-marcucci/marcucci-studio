// Configuração central do site. Preencha os contatos aqui: os botões,
// o rodapé e o botão flutuante de WhatsApp se ajustam sozinhos.
export const site = {
  name: "Marcucci Studio",
  tagline: "Sistemas, webapps, automações e sites sob medida.",
  url: "https://marcucci.studio",
  contact: {
    // Só números, com DDI e DDD. Ex.: "5511999999999"
    whatsapp: "5541984810977",
    email: "gabriel@marcucci.studio",
    github: "",
    linkedin: "",
    instagram: "",
  },
  // Links com "/" na frente funcionam também nas páginas de case; o contato
  // existe em todas as páginas, então fica na própria página.
  nav: [
    { href: "/#inicio", label: "Início" },
    { href: "/#trabalhos", label: "Trabalhos" },
    { href: "/#servicos", label: "Serviços" },
    { href: "/#processo", label: "Processo" },
    { href: "#contato", label: "Contato" },
  ],
};

const whatsappMessage = "Olá! Vim pelo site da Marcucci Studio e queria conversar sobre um projeto.";

/** Os botões "Começar um projeto" levam ao formulário de contato. */
export function projectHref() {
  return "#contato";
}

/** Link do WhatsApp com uma mensagem pronta (a padrão, ou a montada pelo formulário). */
export function whatsappHref(message = whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
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

export const brl = (n: number, digits = 2) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
