export const dynamic = "force-dynamic";
export const revalidate = 0;

import { EInnerRoute } from "@/Common/Enums/InnerRout";
import { MetadataRoute } from "next";
type ItemSitemap = MetadataRoute.Sitemap[0];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = [
    {
      url: `${EInnerRoute.HOST}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.ABOUT_US}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.CONTACT_US}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.FAQ}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.NEWS}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.PRODUCT}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.QUESTION}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.SEARCH}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${EInnerRoute.HOST}${EInnerRoute.MENU}`,
      lastModified: new Date().toISOString(),
    },
  ];
  
  return sitemap;
}
