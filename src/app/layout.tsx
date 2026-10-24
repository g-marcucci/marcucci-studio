import type { Metadata, Viewport } from "next";
import { DM_Sans, Doto, Funnel_Display, JetBrains_Mono, Onest } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const funnel = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel" });
const onest = Onest({ subsets: ["latin"], variable: "--font-onest" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const doto = Doto({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-doto" });

// Título e descrição vêm de cada página (por idioma); aqui só o endereço base.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
};

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
};

// Aplica o tema salvo antes da pintura para evitar o flash claro/escuro.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${funnel.variable} ${onest.variable} ${jetbrains.variable} ${doto.variable} ${dmSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
