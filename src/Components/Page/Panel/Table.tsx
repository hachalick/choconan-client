"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { RiDeleteBack2Line, RiDeleteBin5Line } from "react-icons/ri";

export default function TablePanel() {
  const [reFetch, setReFetch] = useState(true);
  const [listTable, setListTable] = useState<
    {
      table_id: string;
      table: number;
    }[]
  >([]);

  useEffect(() => {
    if (reFetch) {
      const fetchTable = async () => {
        const res = await FetchApi.Order.fetchTables();
        setListTable(res);
      };
      fetchTable();
      setReFetch(false);
    }
  }, [reFetch]);

  const onClickAddTable = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    let numberTable = 1;
    for (let i = 0; i < listTable.length; i++) {
      if (listTable[i].table - 1 !== i) {
        numberTable = i + 1;
        break;
      } else {
        numberTable += 1;
      }
    }
    await FetchApi.Order.fetchCreateTable({ access_token, table_number: numberTable });
    setReFetch(true);
  };

  const onClickDeleteTable = async ({ table_id }: { table_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Order.fetchDeleteTable({ access_token, table_id });
    setReFetch(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <Box variant="primary">
        <H size={2}>مدیریت میز</H>
      </Box>
      <div>
        <Button
          type="button"
          title="add table"
          variant="success"
          onClick={() => onClickAddTable()}
          StartIcon={MdOutlineAddBox}
        >
          صندلی جدید
        </Button>
      </div>
      <Box variant="primary">
        <H size={3}>میز های موجود:</H>
      </Box>
      <div className="flex flex-wrap gap-4">
        {listTable.map((table) => (
          <Button
            key={table.table_id}
            type="button"
            variant="error"
            title="add table"
            onClick={() => onClickDeleteTable({ table_id: table.table_id })}
            StartIcon={RiDeleteBin5Line}
          >
            حذف میز {digitsEnToFa(table.table)}
          </Button>
        ))}
      </div>
    </div>
  );
}
