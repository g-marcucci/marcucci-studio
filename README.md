# Marcucci Studio

Landing page / portfólio: sistemas, webapps, automações e sites.

Next.js 16 · Tailwind CSS 4 · Motion · lucide-react

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera o site estático em out/
```

## Publicar na Hostinger

O site é exportado como estático (`output: "export"` em `next.config.ts`). Para publicar em marcucci.studio:

1. `npm run build`
2. Compacte o conteúdo de `out/` (incluindo o `.htaccess`) num .zip.
3. No hPanel, abra o Gerenciador de Arquivos de marcucci.studio, envie o .zip para `public_html` e extraia, substituindo os arquivos.

O `.htaccess` (em `public/`) cuida da página 404, do cache e dos redirecionamentos (páginas `/work/*` do site anterior e a URL antiga do case em português).

## Idiomas

Inglês é o padrão; português e espanhol ficam em `/pt/` e `/es/`, com seletor no topo.

| | Home | Case do ERP |
|---|---|---|
| EN | `/` | `/work/erp-multimarketplace/` |
| PT | `/pt/` | `/pt/trabalhos/erp-multimarketplace/` |
| ES | `/es/` | `/es/trabajos/erp-multimarketplace/` |

Página do serviço de agentes de IA: `/services/ai-agents/`, `/pt/servicos/agentes-de-ia/` e `/es/servicios/agentes-de-ia/` (`ai-page.tsx`). A seção da home e o palco animado ficam em `orchestra.tsx`.

- Os textos ficam junto de cada componente, no formato `t({ en, pt, es })` (`useT()` em `src/lib/i18n.tsx`).
- Rotas e metadados (hreflang, Open Graph) em `src/lib/locales.ts` e `src/components/pages.tsx`; cada arquivo em `src/app/**/page.tsx` só escolhe o idioma.

- Contatos (WhatsApp, e-mail, redes): `src/lib/site.ts`. Os botões, o rodapé e o botão flutuante de WhatsApp aparecem conforme os campos preenchidos.
- Seções: `src/components/sections.tsx` (hero, faixa de eventos, processo, FAQ, CTA, rodapé), `work.tsx` (case do ERP), `services.tsx` (bento de serviços).
- Case do ERP: resumo na home (`work.tsx`) e página completa (`case-erp.tsx`).
- As telas do ERP são recriadas em código com dados fictícios (`erp/screens.tsx`, `dashboard-demo.tsx`) e usam a fonte e as cores do próprio sistema pela classe `.erp` (`globals.css`).
- Números animados em odômetro: `Odometer` em `ui.tsx`.
- Mascote em pixel art: `src/components/avatar.tsx` (favicon em `src/app/icon.svg`).
