import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { MetadataRoute } from "next";
type ItemSitemap = MetadataRoute.Sitemap[0];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const clientHost = "https://choconan.ir"
  const allProduct = await FetchApi.Menu.fetchAllProductMenu();
  const listCategory = allProduct.map((product) => {
    const list: ItemSitemap = {
      url: `${clientHost}/menu/${product.category}`,
      lastModified: new Date().toISOString(),
    };
    return list;
  });
  let listProducts: MetadataRoute.Sitemap = [];
  allProduct.forEach((product) => {
    const list = product.products.map((pro) => {
      const list: ItemSitemap = {
        url: `${clientHost}/menu/${product.category}/${
          pro.id
        }/${encodeURI(pro.name)}`,
        lastModified: new Date().toISOString(),
      };
      return list;
    });
    listProducts = [...listProducts, ...list];
  });
  const sitemap = [
    {
      url: `${clientHost}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/about-us`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/blogs`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/contact-us`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/faqs`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/news`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/products`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/questions`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/search`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${clientHost}/menu`,
      lastModified: new Date().toISOString(),
    },
    ...listCategory,
    ...listProducts,
  ];
  return sitemap;
}
