import React from "react";
import CardEconomicPackage from "./CardEconomicPackage";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

export default async function HorizontalScrollEconomicPackage() {
  const res = await FetchApi.Order.fetchGetEconomicPackages({});

  return (
    <div className="flex flex-col gap-3">
      {res.map((val) => (
        <CardEconomicPackage key={val.economic_package_id} details={val} />
      ))}
    </div>
  );
}
