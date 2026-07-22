import Link from "next/link";
import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import AddDeleteProductMenu from "./AddDeleteProductMenu";
import Box from "../Element/Box";
import { H } from "../Element/H";
import P from "../Element/P";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export function CardHorizontalScroll({
  data,
}: {
  data: {
    Id: string;
    IsShowMenu: boolean;
    Name: string;
    Description: string;
    Price: number;
    Waiting: number;
    SnapId: string;
    TapsiId: string;
    SrcImage: string;
    IsLink: boolean;
  };
}) {
  return (
    <div
      className={`flex flex-col shrink-0 snap-center  w-[70%] md:w-80 ${
        data.IsShowMenu ? "grayscale-0" : "grayscale"
      }`}
    >
      <Box variant="primary">
        <ContainerCardHorizontalScroll IsLink={data.IsShowMenu} Id={data.Id}>
          <Box variant="guest">
            <img
              alt={data.Name}
              src={EServerRoute.HOST + data.SrcImage}
              className="w-full h-full object-cover rounded-2xl aspect-square"
            />
          </Box>
          <H text="center" size={3}>
            {data.Name}
          </H>
          <H size={4} text="center">
            {digitsEnToFa(data?.Price)} هزار تومان
          </H>
          <P size={4}>
            <span className="line-clamp-1">
              {data.Description ? data.Description : "توضیحاتی درج نشده"}
            </span>
          </P>
        </ContainerCardHorizontalScroll>
        {data.IsLink ? (
          <div className="mt-auto flex justify-center items-center p-4">
            <AddDeleteProductMenu product_id={data.Id} />
          </div>
        ) : (
          <div className="mx-auto mt-auto flex items-center gap-2 p-4">
            <IoAlertCircleOutline size={25} />
            ناموجود
            <IoAlertCircleOutline size={25} />
          </div>
        )}
      </Box>
    </div>
  );
}

function ContainerCardHorizontalScroll({
  IsLink,
  Id,
  children,
}: {
  IsLink: boolean;
  Id: string;
  children: React.ReactNode;
}) {
  const className = "flex flex-col shrink-0 gap-3";

  if (IsLink)
    return (
      <Link href={`${EInnerRoute.MENU_PRODUCT}/${Id}`} className={className}>
        {children}
      </Link>
    );
  else return <div className={className}>{children}</div>;
}
