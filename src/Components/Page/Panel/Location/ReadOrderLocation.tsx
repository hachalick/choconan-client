import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadOrderLocation() {
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
        setReFetch(false);
      };
      fetchTable();
    }
  }, [reFetch]);

  const onClickDeleteTable = async ({ table_id }: { table_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Order.fetchDeleteTable({ access_token, table_id });
    setReFetch(true);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>مشاهده محل سفارش گیری</H>
      </Box>
      <div className="flex flex-wrap gap-5">
        {listTable.map((table) => (
          <Box key={table.table_id} variant="primary">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="error"
                title="delete table"
                onClick={() => onClickDeleteTable({ table_id: table.table_id })}
                StartIcon={RiDeleteBin5Line}
              />
              حذف میز {digitsEnToFa(table.table)}
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
