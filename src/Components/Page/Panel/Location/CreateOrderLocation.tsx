import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";

export default function CreateOrderLocation() {
  const setting = useContext(AccountContext);

  const [listTable, setListTable] = useState<
    {
      table_id: string;
      table: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchTable = async () => {
      const res = await FetchApi.Order.fetchTables();
      setListTable(res);
    };
    fetchTable();
  }, []);

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
    await FetchApi.Order.fetchCreateTable({
      access_token,
      table_number: numberTable,
    });
    setting?.dashboard.setState(EDashboard.READ_ORDER_LOCATION)
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>ایجاد محل سفارش گیری</H>
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
    </>
  );
}
