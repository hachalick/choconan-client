import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadTableListViewModel } from "@/Common/Connection/Api/ViewModels/Order.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";

export default function CreateOrderLocation() {
  const setting = useContext(AccountContext);

  const [listTable, setListTable] = useState<Array<ReadTableListViewModel>>([]);

  useEffect(() => {
    const fetchTable = async () => {
      const res = await FetchApi.Order.ReadTableList({});

      setListTable(res);
    };
    fetchTable();
  }, []);

  const onClickAddTable = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    let numberTable = 1;
    for (const item of listTable
      .map((val) => +val.Location.replace("میز ", ""))
      .sort((a, b) => a - b)) {
      if (item > numberTable) break;
      numberTable++;
    }

    await FetchApi.Order.CreateTable({
      AccessToken: access_token,
      Location: `میز ${numberTable}`,
    });

    setting?.dashboard.setState(EDashboard.READ_ORDER_LOCATION);
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
