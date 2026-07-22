export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Metadata } from "next";
import React from "react";
import { metadata } from "../layout";
import Layout from "@/Components/Layout/Layout";
import { H } from "@/Components/Element/H";
import Box from "@/Components/Element/Box";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import SearchBoxMenu from "@/Components/Ui/SearchBoxMenu";
import HorizontalScroll from "@/Components/Ui/HorizontalScroll";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default async function Menu() {
  const menu = await FetchApi.Menu.ReadMenuDetail({});

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.MENU, name: "منو" },
        ]}
      />
      <Box variant="primary">
        <H size={2}>دنبال بهترین محصول دلخواه خودت باش !</H>
      </Box>
      <SearchBoxMenu />
      {menu.map((category, i) => (
        <HorizontalScroll
          key={i}
          Id={category.Id}
          Name={category.Name}
          Products={category.Products}
          Icon={category.Icon}
          IsShowMenu={category.IsShowMenu}
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
  const menu = await FetchApi.Menu.ReadMenuDetail({});
  let text = "";

  menu.forEach((pro) => {
    pro.Products.forEach((product) => {
      text += product.Name + "-";
    });
  });

  newMetaData.title = "shonan | منو کافه شونان";
  newMetaData.description = `محصولات کافه شونان ${text}`;
  return newMetaData;
}
