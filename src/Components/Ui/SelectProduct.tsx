"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectProduct({
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
  const [options, setOptions] = useState<
    Array<{ value: string; label: string; price: number }>
  >([]);

  useEffect(() => {
    const setTable = async () => {
      const menu = await FetchApi.Menu.ReadMenuDetail({});

      for (const category of menu) {
        for (const product of category.Products) {
          setOptions((value) => [
            ...value,
            {
              value: product.Id,
              label: product.Name,
              price: product.Price,
            },
          ]);
        }
      }
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
