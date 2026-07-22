export const dynamic = "force-dynamic";
export const revalidate = 0;

import { EServerRoute } from "@/Common/Enums/ServerRout";
import { MetadataRoute } from "next";
type ItemSitemap = MetadataRoute.Sitemap[0];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = [
    {
      url: `${EServerRoute.HOST}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/about-us`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/blogs`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/contact-us`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/faqs`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/news`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/products`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/questions`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/search`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EServerRoute.HOST}/menu`,
      lastModified: new Date().toISOString(),
    },
  ];
  return sitemap;
}
