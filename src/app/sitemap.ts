import type { MetadataRoute } from "next";
import { CASE_PATH, HOME, HTML_LANG, LOCALES } from "@/lib/locales";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Cada página em cada idioma, com as versões alternativas (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { paths: HOME, changeFrequency: "monthly" as const, priority: 1 },
    { paths: CASE_PATH, changeFrequency: "yearly" as const, priority: 0.8 },
  ];
  return pages.flatMap(({ paths, changeFrequency, priority }) =>
    LOCALES.map((l) => ({
      url: `${site.url}${paths[l]}`,
      changeFrequency,
      priority: l === "en" ? priority : priority - 0.1,
      alternates: { languages: Object.fromEntries(LOCALES.map((o) => [HTML_LANG[o], `${site.url}${paths[o]}`])) },
    })),
  );
}
