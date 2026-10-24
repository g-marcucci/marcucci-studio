import { Avatar } from "@/components/avatar";

export default function NotFound() {
  return (
    <div className="p-2 md:p-3">
      <main className="grid min-h-[calc(100vh-24px)] place-items-center rounded-[22px] bg-bg px-6 text-center md:rounded-[30px]">
        <div>
          <Avatar size={64} className="mx-auto" />
          <p className="mt-8 font-pixel text-[14px] font-black tracking-[0.18em] text-muted uppercase">Erro 404</p>
          <h1 className="mt-3 font-display text-[40px] leading-none tracking-[-0.03em] text-fg md:text-[56px]">
            Essa página não existe.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-[16px] text-muted">O link pode ter mudado. A página inicial tem tudo o que importa.</p>
          <a
            href="/"
            className="mt-8 inline-flex rounded-full bg-fg px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Voltar para o início
          </a>
        </div>
      </main>
    </div>
  );
}
