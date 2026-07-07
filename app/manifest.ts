import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SangaPay",
    short_name: "SangaPay",
    description: "Send across borders instantly.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#0F172A",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
