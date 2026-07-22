import { metadata } from "@/app/layout";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import HorizontalScroll from "@/Components/Customs/HorizontalScroll";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import P from "@/Components/Ui/P";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

async function Category({
  params,
}: {
  params: Promise<{ category_name: string }>;
}) {
  let category: TGetCategoryMenuResponseDto;

  const { category_name } = await params;

  try {
    category = await FetchApi.Menu.fetchCategoryMenu({
      category_name: decodeURI(category_name),
    });
  } catch (error) {
    redirect(`/menu`, RedirectType.replace);
  }

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/menu", name: "منو" },
          {
            path: `/menu/${decodeURI(category_name)}`,
            name: `${decodeURI(category_name)}`,
          },
        ]}
      />
      <HorizontalScroll
        title={decodeURI(category_name)}
        category={category.category}
        icon={category.icon}
        products={category.products}
      />
      <div>
        <div className="mx-auto">
          <Box variant="primary">
            <div className="flex flex-col gap-3 items-center justify-center">
              <H size={2}>دیگه چیا داریم ؟!</H>
              <P size={3}>برای مشاهده کردن کامل منو روی دکمه بزنید.</P>
              <Button href="/menu" variant="secondary" title="رفتن به منو">
                رفتن به منو
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
}

export default Category;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category_name: string }>;
  searchParams: {};
}): Promise<Metadata> {
  const newMetaData = { ...metadata };

  const { category_name } = await params;

  try {
    const res = await FetchApi.Menu.fetchCategoryMenu({
      category_name: decodeURI(category_name),
    });
    let listProductCategory = "";
    res.products.forEach((product, i) => {
      if (i < res.products.length - 1) {
        listProductCategory += `${product.name}، `;
      } else {
        listProductCategory += product.name;
      }
    });
    const metaDescription = `به کافه شوکونان بیایید و طعم بی نظیر ${decodeURI(
      category_name
    )} های مارا که شامل ${listProductCategory} میشود را در لحظات شیرین و آرامش بخش سپری کنید. منتظر حضور گرم شما هستیم`;
    newMetaData.title =
      (decodeURI(category_name) || "") + " کافه شوکونان | choconan";
    newMetaData.description = metaDescription;
  } catch (error) {
    redirect(`/menu`, RedirectType.replace);
  }
  return newMetaData;
}
