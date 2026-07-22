"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import Select from "react-select";

function SelectTable({
  setVal,
}: {
  setVal: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>();

  useEffect(() => {
    const setTable = async () => {
      const listTable = await FetchApi.Order.fetchTables();
      const listOptions = listTable.map((val) => ({
        label: `میز ${digitsEnToFa(val.table)}`,
        value: val.table_id,
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

export default SelectTable;
