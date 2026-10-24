"use client";

import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { site, whatsappHref } from "@/lib/site";

// O formulário não envia nada para servidor: só monta a mensagem e abre o
// WhatsApp (ou o e-mail) de quem está visitando, já com o texto pronto.

const TYPES = ["Sistema / ERP", "Webapp", "Automação", "Site ou landing page", "Integração", "Outro"];
const DEADLINES = ["O quanto antes", "Em 1 a 3 meses", "Sem pressa"];

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
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [about, setAbout] = useState("");
  const [tried, setTried] = useState(false);

  const missing = { name: !name.trim(), about: !about.trim() };
  const valid = !missing.name && !missing.about;

  const toggleType = (t: string) => setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  /** A mensagem que chega; `bold` usa a marcação de negrito do WhatsApp. */
  const message = (bold: boolean) => {
    const b = (s: string) => (bold ? `*${s}*` : s);
    const lines: (string | false)[] = [
      "Olá, Gabriel! Vim pelo site da Marcucci Studio.",
      "",
      `${b("Nome:")} ${name.trim()}`,
      company.trim() ? `${b("Empresa:")} ${company.trim()}` : false,
      types.length > 0 ? `${b("Projeto:")} ${types.join(", ")}` : false,
      deadline ? `${b("Prazo:")} ${deadline}` : false,
      "",
      b("Sobre o projeto:"),
      about.trim(),
    ];
    return lines.filter((l): l is string => l !== false).join("\n");
  };

  const send = (via: "whatsapp" | "email") => {
    setTried(true);
    if (!valid) return;
    const url =
      via === "whatsapp"
        ? whatsappHref(message(true))
        : `mailto:${site.contact.email}?subject=${encodeURIComponent(`Projeto · ${name.trim()}`)}&body=${encodeURIComponent(message(false))}`;
    window.open(url, via === "whatsapp" ? "_blank" : "_self", "noopener");
  };

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
          <span className="mb-1.5 block text-[13px] text-white/80">Seu nome</span>
          <input
            className={`${field} ${tried && missing.name ? "border-[#ff8a8a]" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
            placeholder="Como posso te chamar?"
            aria-invalid={tried && missing.name}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] text-white/80">
            Empresa <span className="text-white/40">(opcional)</span>
          </span>
          <input
            className={field}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={80}
            autoComplete="organization"
            placeholder="Nome da empresa ou loja"
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[13px] text-white/80">
          O que você precisa? <span className="text-white/40">(pode marcar mais de um)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Chip key={t} on={types.includes(t)} onClick={() => toggleType(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[13px] text-white/80">Para quando?</legend>
        <div className="flex flex-wrap gap-2">
          {DEADLINES.map((d) => (
            <Chip key={d} on={deadline === d} onClick={() => setDeadline(deadline === d ? "" : d)}>
              {d}
            </Chip>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-[13px] text-white/80">Conta um pouco do projeto</span>
        <textarea
          className={`${field} min-h-[110px] resize-y ${tried && missing.about ? "border-[#ff8a8a]" : ""}`}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength={1200}
          placeholder="O que precisa funcionar, como é feito hoje, o que mais incomoda…"
          aria-invalid={tried && missing.about}
        />
      </label>

      {tried && !valid && (
        <p className="mt-3 text-[13px] text-[#ffb3b3]" role="alert">
          Preencha {missing.name && missing.about ? "seu nome e o projeto" : missing.name ? "seu nome" : "um pouco do projeto"}{" "}
          para eu entender o contexto.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          className="group flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-[#150d36] transition-transform hover:-translate-y-0.5"
          style={{ background: LIME }}
        >
          <MessageCircle className="size-4" />
          Enviar pelo WhatsApp
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => send("email")}
          className="flex items-center gap-1.5 text-[14px] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          <Mail className="size-4" /> ou mandar por e-mail
        </button>
      </div>
      <p className="mt-4 text-[12px] text-white/45">
        Abre o seu WhatsApp ou e-mail com a mensagem pronta para você revisar. Nada fica salvo neste site.
      </p>
    </form>
  );
}
