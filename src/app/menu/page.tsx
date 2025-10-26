import HorizontalScroll from "@/Components/Customs/HorizontalScroll";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import { Metadata } from "next";
import React from "react";
import { metadata } from "../layout";
import SearchBoxMenu from "@/Components/Customs/SearchBoxMenu";
import Layout from "@/Components/Layout/Layout";
import { H } from "@/Components/Ui/H";
import Box from "@/Components/Ui/Box";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

export default async function Menu() {
  const allProduct = await FetchApi.Menu.fetchAllProductMenu();
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/menu", name: "منو" },
        ]}
      />
      <Box variant="primary">
        <H size={2}>دنبال بهترین محصول دلخواه خودت باش !</H>
      </Box>
      <SearchBoxMenu />
      {allProduct.map((product, i) => (
        <HorizontalScroll
          key={i}
          title={product.category}
          products={product.products}
          icon={product.icon}
          category={product.category}
        />
      ))}
    </Layout>
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: { id?: string };
}): Promise<Metadata> {
  const newMetaData = { ...metadata };
  const allProduct = await FetchApi.Menu.fetchAllProductMenu();
  let text = "";
  allProduct.forEach((pro) => {
    pro.products.forEach((product) => {
      text += product.name + "-";
    });
  });
  newMetaData.title = "choconan | منو کافه شوکونان";
  newMetaData.description = `محصولات کافه شوکونان ${text}`;
  return newMetaData;
}
