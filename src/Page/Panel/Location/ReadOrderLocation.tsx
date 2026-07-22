import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadTableListViewModel } from "@/Common/Connection/Api/ViewModels/Order.Service.ViewModel";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ReadOrderLocation() {
  const [reFetch, setReFetch] = useState(true);
  const [listTable, setListTable] = useState<Array<ReadTableListViewModel>>([]);

  useEffect(() => {
    if (reFetch) {
      const fetchTable = async () => {
        const res = await FetchApi.Order.ReadTableList({});

        setListTable(res);
        setReFetch(false);
      };
      fetchTable();
    }
  }, [reFetch]);

  const onClickDeleteTable = async ({ Id }: { Id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Order.DeleteTable({
      AccessToken: access_token,
      Id: Id,
    });
    setReFetch(true);
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>مشاهده محل سفارش گیری</H>
      </Box>
      <div className="flex flex-wrap gap-5">
        {listTable
          .sort(
            (a, b) =>
              +a.Location.replace("میز ", "") - +b.Location.replace("میز ", ""),
          )
          .map((table) => (
            <Box key={table.Id} variant="primary">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="error"
                  title="delete table"
                  onClick={() => onClickDeleteTable({ Id: table.Id })}
                  StartIcon={RiDeleteBin5Line}
                />
                {digitsEnToFa(table.Location)}
              </div>
            </Box>
          ))}
      </div>
    </>
  );
}
