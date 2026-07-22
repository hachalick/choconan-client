import React from "react";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import { CardHorizontalScroll } from "./CardHorizontalScroll";
import { H } from "../Element/H";
import Box from "../Element/Box";
import { ReadMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";

export default function HorizontalScroll(Param: ReadMenuDetailViewModel) {
  return (
    <div className="relative mt-3">
      <div className="scroll-mt-[50px]" id={Param.Name}>
        <Box variant="primary">
          <div className="flex items-center gap-4">
            <img
              src={EServerRoute.HOST + Param.Icon}
              alt={Param.Name}
              width={40}
              height={40}
              className="w-12 h-12 "
              loading="lazy"
            />
            <H size={3}>{Param.Name}</H>
          </div>
        </Box>
      </div>
      <div className="flex snap-x snap-mandatory scroll-smooth w-full overflow-x-auto gap-5 2sm:gap-10 py-7">
        <BlankCard />
        <div className="bg-radial-gradient-right w-10 h-[91%] absolute right-0 bottom-1"></div>
        <div className="bg-radial-gradient-left w-10 h-[91%] absolute left-0 bottom-1"></div>
        {Param.Products.map((data) => (
          <CardHorizontalScroll
            key={data.Id}
            data={{
              Description: data.Description,
              Id: data.Id,
              IsLink: data.IsShowMenu,
              IsShowMenu: data.IsShowMenu,
              Name: data.Name,
              Price: data.Price,
              SnapId: data.SnapId,
              SrcImage: data.SrcImage,
              TapsiId: data.TapsiId,
              Waiting: data.Waiting,
            }}
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
