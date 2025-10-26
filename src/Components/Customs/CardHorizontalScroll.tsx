import Link from "next/link";
import React from "react";
import { LuTimer } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";
import { ERoute } from "@/Common/Enums/Routs";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import AddDeleteProductMenu from "./AddDeleteProductMenu";
import Box from "../Ui/Box";
import { H } from "../Ui/H";
import P from "../Ui/P";

export function CardHorizontalScrollV2({
  data,
  category,
  isLink,
}: {
  data: TIdProductMenu;
  category: string;
  isLink: boolean;
}) {
  return (
    <div
      className={`flex flex-col shrink-0 snap-center  w-[70%] md:w-80 ${
        data.available ? "grayscale-0" : "grayscale"
      }`}
    >
      <Box variant="primary">
        <ContainerCardHorizontalScroll
          category={category}
          id={data.id}
          isLink={isLink}
          name={data.name}
        >
          <Box variant="guest">
            <img
              alt={data.name}
              src={ERoute.HOST + data.src}
              className="w-full h-full object-cover rounded-2xl aspect-square"
            />
          </Box>
          <H text="center" size={3}>
            {data.name}
          </H>
          {/* <h3 className="font-bold text-center text-xl">{data.name}</h3> */}
          <H size={4} text="center">
            {digitsEnToFa(data?.price)} هزار تومان
          </H>
          <P size={4}>
            <span className="line-clamp-1">
              {data.description ? data.description : "توضیحاتی درج نشده"}
            </span>
          </P>
        </ContainerCardHorizontalScroll>
        {data.available ? (
          <div className="mt-auto flex justify-center items-center p-4">
            <AddDeleteProductMenu
              category={category}
              id_product_menu={data.id}
            />
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

export function CardHorizontalScroll({
  data,
  category,
  isLink,
}: {
  data: TIdProductMenu;
  category: string;
  isLink: boolean;
}) {
  return (
    <div
      className={`flex flex-col shrink-0 snap-center w-[70%] md:w-80 aspect-[3/4] rounded-xl bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] shadow-primary pb-1 mb-4 ${
        data.available ? "grayscale-0" : "grayscale"
      }`}
    >
      <ContainerCardHorizontalScroll
        category={category}
        id={data.id}
        isLink={isLink}
        name={data.name}
      >
        <div className="aspect-[6/8] overflow-hidden">
          <img
            alt={data.name}
            src={ERoute.HOST + data.src}
            className="w-full h-full object-contain rounded-t-2xl"
          />
        </div>
        <h5
          dir="ltr"
          className="mt-4 mx-auto textcooooooooooooooooooloooooooooo300 flex items-center"
        >
          {data?.waiting} <LuTimer className="mx-1 -translate-y-[2px]" /> |{" "}
          {data?.price} T
        </h5>
        <h3 className="font-bold mx-2 mb-3 mt-2 text-center">{data.name}</h3>
        <p className="line-clamp-2 mx-4">
          {data.description ? data.description : "توضیحاتی درج نشده"}
        </p>
      </ContainerCardHorizontalScroll>
      {data.available ? (
        <span className="my-3">
          <AddDeleteProductMenu category={category} id_product_menu={data.id} />
        </span>
      ) : (
        <span className="my-3 mx-auto flex items-center gap-2">
          <IoAlertCircleOutline size={25} />
          ناموجود
          <IoAlertCircleOutline size={25} />
        </span>
      )}
    </div>
  );
}

function ContainerCardHorizontalScroll({
  isLink,
  category,
  id,
  name,
  children,
}: {
  isLink: boolean;
  category: string;
  id: number;
  name: string;
  children: React.ReactNode;
}) {
  const className = "flex flex-col shrink-0 gap-3";

  if (isLink)
    return (
      <Link
        href={`/menu/${category}/${id}/${encodeURI(name)}`}
        className={className}
      >
        {children}
      </Link>
    );
  else return <div className={className}>{children}</div>;
}
