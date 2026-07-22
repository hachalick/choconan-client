"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function SelectTable({
  setVal,
}: {
  setVal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>();

  useEffect(() => {
    const setTable = async () => {
      const listTable = await FetchApi.Order.ReadTableList({});

      const listOptions = listTable.map((val) => ({
        label: `میز ${digitsEnToFa(val.Location)}`,
        value: val.Id,
      }));

      setOptions(listOptions);
    };
    setTable();
  }, []);

  return (
    <Select
      options={options}
      placeholder="میزتون رو انتخاب کنید"
      onChange={(e) => setVal(String(e?.value) ?? "")}
    />
  );
}
