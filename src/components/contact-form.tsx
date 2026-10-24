"use client";

import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useT, type Tr } from "@/lib/i18n";
import { site, whatsappHref } from "@/lib/site";

// O formulário não envia nada para servidor: só monta a mensagem e abre o
// WhatsApp (ou o e-mail) de quem está visitando, já com o texto pronto, no
// idioma da página.

const TYPES: Tr[] = [
  { en: "System / ERP", pt: "Sistema / ERP", es: "Sistema / ERP" },
  { en: "Web app", pt: "Webapp", es: "Web app" },
  { en: "Automation", pt: "Automação", es: "Automatización" },
  { en: "Website or landing page", pt: "Site ou landing page", es: "Sitio o landing page" },
  { en: "Integration", pt: "Integração", es: "Integración" },
  { en: "Other", pt: "Outro", es: "Otro" },
];
const DEADLINES: Tr[] = [
  { en: "As soon as possible", pt: "O quanto antes", es: "Lo antes posible" },
  { en: "In 1 to 3 months", pt: "Em 1 a 3 meses", es: "En 1 a 3 meses" },
  { en: "No rush", pt: "Sem pressa", es: "Sin prisa" },
];

const LIME = "#d4ff4a";

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
        on ? "border-transparent text-[#150d36]" : "border-white/15 text-white/75 hover:border-white/35 hover:text-white"
      }`}
      style={on ? { background: LIME } : undefined}
    >
      {on && <Check className="size-3.5" />}
      {children}
    </button>
  );
}

const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-2.5 text-[14.5px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#d4ff4a]/70 focus:bg-white/[0.1]";

export function ContactForm() {
  const t = useT();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [types, setTypes] = useState<Tr[]>([]);
  const [deadline, setDeadline] = useState<Tr | null>(null);
  const [about, setAbout] = useState("");
  const [tried, setTried] = useState(false);

  const missing = { name: !name.trim(), about: !about.trim() };
  const valid = !missing.name && !missing.about;

  const toggleType = (type: Tr) => setTypes((cur) => (cur.includes(type) ? cur.filter((x) => x !== type) : [...cur, type]));

  /** A mensagem que chega; `bold` usa a marcação de negrito do WhatsApp. */
  const message = (bold: boolean) => {
    const b = (s: Tr) => (bold ? `*${t(s)}*` : t(s));
    const lines: (string | false)[] = [
      t({
        en: "Hi Gabriel! I found you through the Marcucci Studio website.",
        pt: "Olá, Gabriel! Vim pelo site da Marcucci Studio.",
        es: "¡Hola, Gabriel! Vine por el sitio de Marcucci Studio.",
      }),
      "",
      `${b({ en: "Name:", pt: "Nome:", es: "Nombre:" })} ${name.trim()}`,
      company.trim() ? `${b({ en: "Company:", pt: "Empresa:", es: "Empresa:" })} ${company.trim()}` : false,
      types.length > 0 ? `${b({ en: "Project:", pt: "Projeto:", es: "Proyecto:" })} ${types.map(t).join(", ")}` : false,
      deadline ? `${b({ en: "Timeline:", pt: "Prazo:", es: "Plazo:" })} ${t(deadline)}` : false,
      "",
      b({ en: "About the project:", pt: "Sobre o projeto:", es: "Sobre el proyecto:" }),
      about.trim(),
    ];
    return lines.filter((l): l is string => l !== false).join("\n");
  };

  const send = (via: "whatsapp" | "email") => {
    setTried(true);
    if (!valid) return;
    const subject = `${t({ en: "Project", pt: "Projeto", es: "Proyecto" })} · ${name.trim()}`;
    const url =
      via === "whatsapp"
        ? whatsappHref(message(true))
        : `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message(false))}`;
    window.open(url, via === "whatsapp" ? "_blank" : "_self", "noopener");
  };

  const missingText = missing.name && missing.about
    ? t({ en: "your name and the project", pt: "seu nome e o projeto", es: "tu nombre y el proyecto" })
    : missing.name
      ? t({ en: "your name", pt: "seu nome", es: "tu nombre" })
      : t({ en: "a bit about the project", pt: "um pouco do projeto", es: "un poco del proyecto" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      noValidate
      className="rounded-[22px] border border-white/15 bg-[#150d36]/40 p-5 backdrop-blur-md md:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-white/80">{t({ en: "Your name", pt: "Seu nome", es: "Tu nombre" })}</span>
          <input
            className={`${field} ${tried && missing.name ? "border-[#ff8a8a]" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
            placeholder={t({ en: "What should I call you?", pt: "Como posso te chamar?", es: "¿Cómo te llamo?" })}
            aria-invalid={tried && missing.name}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-white/80">
            {t({ en: "Company", pt: "Empresa", es: "Empresa" })}{" "}
            <span className="text-white/40">{t({ en: "(optional)", pt: "(opcional)", es: "(opcional)" })}</span>
          </span>
          <input
            className={field}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={80}
            autoComplete="organization"
            placeholder={t({ en: "Company or store name", pt: "Nome da empresa ou loja", es: "Nombre de la empresa o tienda" })}
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[13px] text-white/80">
          {t({ en: "What do you need?", pt: "O que você precisa?", es: "¿Qué necesitas?" })}{" "}
          <span className="text-white/40">
            {t({ en: "(pick as many as you like)", pt: "(pode marcar mais de um)", es: "(puedes marcar varios)" })}
          </span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((type) => (
            <Chip key={type.en} on={types.includes(type)} onClick={() => toggleType(type)}>
              {t(type)}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[13px] text-white/80">{t({ en: "When do you need it?", pt: "Para quando?", es: "¿Para cuándo?" })}</legend>
        <div className="flex flex-wrap gap-2">
          {DEADLINES.map((d) => (
            <Chip key={d.en} on={deadline === d} onClick={() => setDeadline(deadline === d ? null : d)}>
              {t(d)}
            </Chip>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-[13px] text-white/80">
          {t({ en: "Tell me a bit about the project", pt: "Conta um pouco do projeto", es: "Cuéntame un poco del proyecto" })}
        </span>
        <textarea
          className={`${field} min-h-[110px] resize-y ${tried && missing.about ? "border-[#ff8a8a]" : ""}`}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength={1200}
          placeholder={t({
            en: "What needs to work, how it's done today, what bothers you most…",
            pt: "O que precisa funcionar, como é feito hoje, o que mais incomoda…",
            es: "Qué tiene que funcionar, cómo se hace hoy, qué es lo que más molesta…",
          })}
          aria-invalid={tried && missing.about}
        />
      </label>

      {tried && !valid && (
        <p className="mt-3 text-[13px] text-[#ffb3b3]" role="alert">
          {t({ en: "Please add", pt: "Preencha", es: "Completa" })} {missingText}{" "}
          {t({ en: "so I can understand the context.", pt: "para eu entender o contexto.", es: "para entender el contexto." })}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          className="group flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-[#150d36] transition-transform hover:-translate-y-0.5"
          style={{ background: LIME }}
        >
          <MessageCircle className="size-4" />
          {t({ en: "Send via WhatsApp", pt: "Enviar pelo WhatsApp", es: "Enviar por WhatsApp" })}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => send("email")}
          className="flex items-center gap-1.5 text-[14px] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          <Mail className="size-4" /> {t({ en: "or send by email", pt: "ou mandar por e-mail", es: "o enviar por e-mail" })}
        </button>
      </div>
      <p className="mt-4 text-[12px] text-white/45">
        {t({
          en: "Opens your WhatsApp or email with the message ready for you to review. Nothing is stored on this site.",
          pt: "Abre o seu WhatsApp ou e-mail com a mensagem pronta para você revisar. Nada fica salvo neste site.",
          es: "Abre tu WhatsApp o e-mail con el mensaje listo para que lo revises. Nada se guarda en este sitio.",
        })}
      </p>
    </form>
  );
}
