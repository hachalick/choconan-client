import { metadata } from "@/app/layout";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import P from "@/Components/Element/P";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import React from "react";
import { ReadMenuCategoryDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import HorizontalScroll from "@/Components/Ui/HorizontalScroll";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default async function Category({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let category: ReadMenuCategoryDetailViewModel;

  const { id } = await params;

  try {
    category = await FetchApi.Menu.ReadMenuCategoryDetail({
      Id: id,
    });
  } catch (error) {
    redirect(`/menu`, RedirectType.replace);
  }

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.MENU, name: "منو" },
          {
            path: `${EInnerRoute.MENU_CATEGORY}/${category.Id}`,
            name: `${category.Name}`,
          },
        ]}
      />
      <HorizontalScroll
        Id={category.Id}
        Name={category.Name}
        Icon={category.Icon}
        Products={category.Products}
        IsShowMenu={category.IsShowMenu}
      />
      <div>
        <div className="mx-auto">
          <Box variant="primary">
            <div className="flex flex-col gap-3 items-center justify-center">
              <H size={2}>دیگه چیا داریم ؟!</H>
              <P size={3}>برای مشاهده کردن کامل منو روی دکمه بزنید.</P>
              <Button
                href={EInnerRoute.MENU}
                variant="secondary"
                title="رفتن به منو"
              >
                رفتن به منو
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: {};
}): Promise<Metadata> {
  const newMetaData = { ...metadata };

  const { id } = await params;

  try {
    const res = await FetchApi.Menu.ReadMenuCategoryDetail({
      Id: id,
    });

    newMetaData.title = (res.MetaTitle || "") + " کافه شونان | shonan";
    newMetaData.description = res.MetaDescription;
  } catch (error) {
    redirect(`${EInnerRoute.MENU}`, RedirectType.replace);
  }

  return newMetaData;
}
