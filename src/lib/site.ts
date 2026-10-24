// Configuração central do site. Preencha os contatos aqui: os botões,
// o rodapé e o botão flutuante de WhatsApp se ajustam sozinhos.
export const site = {
  name: "Marcucci Studio",
  tagline: "Sistemas, webapps, automações e sites sob medida.",
  url: "https://marcucci.studio",
  contact: {
    // Só números, com DDI e DDD. Ex.: "5511999999999"
    whatsapp: "",
    email: "",
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

/** Para onde vão os botões "Começar um projeto". */
export function projectHref() {
  const { whatsapp, email } = site.contact;
  if (whatsapp) return `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  if (email) return `mailto:${email}?subject=${encodeURIComponent("Projeto · Marcucci Studio")}`;
  return "#contato";
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
