import { EServerRoute } from "@/Common/Enums/ServerRout";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/account/*", "/order", "/order/*"],
    },
    sitemap: `${EServerRoute.HOST}/sitemap.xml`,
  };
}
