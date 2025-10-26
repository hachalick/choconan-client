import { ERoute } from "@/Common/Enums/Routs";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import Image from "next/image";
import React from "react";
import ImageClient from "./ImageClient";

function CardEconomicPackage({ details }: { details: TGetEconomicPackage }) {
  function sum() {
    let sum = 0;
    details.contentEconomicPackage.forEach((val) => {
      sum += val.count * val.productMenu.price;
    });
    return sum;
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] shadow-primary-sm p-3 flex flex-wrap justify-center items-center gap-3">
      <div className="flex flex-col justify-center items-center">
        <ImageClient
          alt={details.title}
          src={ERoute.HOST + details.src}
          className="w-32 shadow-primary-sm rounded-md"
          height={80}
          width={80}
        />
      </div>
      <div className="flex flex-col gap-1 grow">
        <h3>{details.title}</h3>
        <hr />
        <h3>محصولات داخل پک</h3>
        <div className="flex flex-wrap gap-2">
          {details.contentEconomicPackage.map((val) => (
            <div
              key={val.content_economic_package_id}
              className="flex flex-wrap items-center"
            >
              <ImageClient
                alt={details.title}
                src={ERoute.HOST + val.productMenu.src}
                className="w-24"
                height={80}
                width={80}
              />
              <span>
                {val.productMenu.name} {digitsEnToFa(val.count)} عدد
              </span>
            </div>
          ))}
        </div>
        <hr />
        <h3>هزینه محصولات داخل پک {digitsEnToFa(sum())} هزار تومان</h3>
        <h3>قیمت پک {digitsEnToFa(details.price)} هزار تومان</h3>
      </div>
    </div>
  );
}

export default CardEconomicPackage;
