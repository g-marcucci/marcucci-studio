# Marcucci Studio

Landing page / portfólio: sistemas, webapps, automações e sites.

Next.js 16 · Tailwind CSS 4 · Motion · lucide-react

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- Contatos (WhatsApp, e-mail, redes): `src/lib/site.ts`. Os botões, o rodapé e o botão flutuante de WhatsApp aparecem conforme os campos preenchidos.
- Seções: `src/components/sections.tsx` (hero, faixa de eventos, processo, FAQ, CTA, rodapé), `work.tsx` (case do ERP), `services.tsx` (bento de serviços).
- As telas do ERP são recriadas em código com dados fictícios (`dashboard-demo.tsx`, `work.tsx`).
- Mascote em pixel art: `src/components/avatar.tsx` (favicon em `src/app/icon.svg`).
