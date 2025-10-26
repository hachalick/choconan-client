import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/account/*",
        "/order",
        "/order/*",
      ],
    },
    sitemap: "https://choconan.ir/sitemap.xml",
  };
}
