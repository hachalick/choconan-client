import { EServerRoute } from "@/Common/Enums/ServerRout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Box from "../Element/Box";
import { H } from "../Element/H";
import { EInnerRoute } from "@/Common/Enums/InnerRout";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";

export default async function Category() {
  const menu = await FetchApi.Menu.ReadMenuDetail({});

  return (
    <div className="mt-5">
      <H size={2}>چیا داریم ؟!</H>
      <ul className="gap-6 flex flex-wrap py-4 justify-center">
        {menu
          .filter((category) => category.IsShowMenu)
          .map((category, i) => (
            <li key={i} className="basis-32 rounded-2xl md:grow-0 grow">
              <Link
                href={`${EInnerRoute.MENU_CATEGORY}/${category.Id}`}
                title={category.Name}
              >
                <Box variant="primary">
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={EServerRoute.HOST + category.Icon}
                      width={60}
                      height={60}
                      alt={category.Name}
                      priority
                    />
                    <h3 dir="ltr" className="mt-2">
                      {category.Name}
                    </h3>
                  </div>
                </Box>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
