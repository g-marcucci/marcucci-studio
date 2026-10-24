import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera o site estático em `out/` (HTML, CSS e JS prontos) para subir na
  // Hostinger. Cada página vira uma pasta com index.html, por isso a barra no fim.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
