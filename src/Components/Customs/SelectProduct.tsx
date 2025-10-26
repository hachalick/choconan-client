"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function SelectProduct({
  setVal,
}: {
  setVal: React.Dispatch<
    React.SetStateAction<{
      product_id: string;
      name: string;
      price: number;
    }>
  >;
}) {
  const [options, setOptions] =
    useState<{ value: string; label: string; price: number }[]>();

  useEffect(() => {
    const setTable = async () => {
      const listProduct = await FetchApi.Menu.fetchAllProductMenu();
      const list: { value: string; label: string; price: number }[] = [];
      for (const category of listProduct) {
        for (const product of category.products) {
          list.push({
            label: product.name,
            value: product.product_id,
            price: product.price,
          });
        }
      }
      setOptions(list);
    };
    setTable();
  }, []);

  return (
    <Select
      options={options}
      placeholder="محصول را انتخاب کنید"
      onChange={(e) =>
        setVal({
          product_id: String(e?.value) ?? "",
          name: String(e?.label) ?? "",
          price: e?.price ?? 0,
        })
      }
      className="text-[#3a2e3c]"
    />
  );
}

export default SelectProduct;
