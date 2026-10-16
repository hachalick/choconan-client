import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shonan Coffee Shop",
    short_name: "Shonan",
    description: "Web Application Shonan",
    lang: "fa-IR",
    start_url: "/",
    display: "standalone",
    background_color: "#65449C",
    theme_color: "#65449C",
    icons: [
      {
        purpose: "maskable",
        sizes: "192x192",
        src: "assets/image/manifest/icon192_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "192x192",
        src: "assets/image/manifest/icon192_rounded.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "384x384",
        src: "assets/image/manifest/icon384_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "384x384",
        src: "assets/image/manifest/icon384_rounded.png",
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "assets/image/manifest/icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "assets/image/manifest/icon512_rounded.png",
        type: "image/png",
      },
    ],
  };
}
