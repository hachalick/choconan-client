import React from "react";
import { ERoute } from "@/Common/Enums/Routs";
import { CardHorizontalScrollV2 } from "./CardHorizontalScroll";
import { H } from "../Ui/H";
import Box from "../Ui/Box";

function HorizontalScroll({
  title,
  category,
  products,
  icon,
}: {
  title: string;
  category: string;
  icon: string;
  products: TIdProductsMenu;
}) {
  return (
    <div className="relative mt-3">
      <div className="scroll-mt-[50px]" id={title}>
        <Box variant="primary">
          <div className="flex items-center gap-4">
            <img
              src={ERoute.HOST + icon}
              alt={title}
              width={40}
              height={40}
              className="w-12 h-12 "
              loading="lazy"
            />
            <H size={3}>{title}</H>
          </div>
        </Box>
      </div>
      <div className="flex snap-x snap-mandatory scroll-smooth w-full overflow-x-auto gap-5 2sm:gap-10 py-7">
        <BlankCard />
        <div className="bg-radial-gradient-right w-10 h-[91%] absolute right-0 bottom-1"></div>
        <div className="bg-radial-gradient-left w-10 h-[91%] absolute left-0 bottom-1"></div>
        {products.map((data, i) => (
          <CardHorizontalScrollV2
            key={data.id}
            data={data}
            category={category}
            isLink={data.available}
          />
        ))}
        <BlankCard />
      </div>
    </div>
  );
}

function BlankCard() {
  return <div className="shrink-0 w-[10%] md:w-0"></div>;
}

export default HorizontalScroll;
