"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { ERoute } from "@/Common/Enums/Routs";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import { AccountContext } from "@/Contexts/Account.Context";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { BsCheckSquare, BsDashSquare } from "react-icons/bs";
import { MdWifiTethering, MdWifiTetheringOff } from "react-icons/md";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

export default function ReadOrder() {
  const setting = useContext(AccountContext);

  const [orders, setData] = useState<TIdPresentOrdersTable>([]);

  useEffect(() => {
    if (setting?.orders.state) {
      const fetchData = async () => {
        const orders = await FetchApi.Order.fetchOrderPanel();
        setData(orders);
      };
      fetchData();
      setting?.orders.setState(false);
    }
  }, [setting?.orders.state]);

  const onClickAccept = async ({ table_id }: { table_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const factor = orders
      .map((val) =>
        val.factorPresentOrderTable.map((v) => ({
          name: v.products.name,
          price: v.products.price,
          count: v.count,
        }))
      )
      .flat();
    try {
      const { factor_number, tax, customer_mobile, factor_id } =
        await FetchApi.Order.fetchCreateOrder({ access_token });
      await FetchApi.Order.fetchUpdateOrder({
        access_token,
        tax,
        location: `میز ${
          orders.find((a) => a.present_order_table_id === table_id)?.table
        }`,
        factor_number,
        customer_mobile,
        pay_status: false,
        order_id: factor_id,
      });
      factor.forEach(async (val) => {
        const { factor_item_id } = await FetchApi.Order.fetchCreateOrderItem({
          access_token,
          order_id: factor_id,
        });
        await FetchApi.Order.fetchUpdateOrderItem({
          access_token,
          order_item_id: factor_item_id,
          product_count: val.count,
          product_discount: 0,
          product_name: val.name,
          product_price: val.price,
        });
      });
      Swal.fire({
        title: "با موفقیت ایجاد شد!",
        text: "ثبت فاکتور مورد نظر با موفقیت ایجاد شد. برای مشاهده به فروشگاه برید",
        icon: "success",
        confirmButtonText: "تایید",
        timer: 1000,
      });
      await onClickDelete({ table_id });
      setting?.dashboard.setState(EDashboard.READ_FACTOR);
    } catch (error) {}
  };

  const onClickDelete = async ({ table_id }: { table_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Order.fetchDeleteStatusTable({ table_id, access_token });
    setting?.orders.setState(true);
  };

  return (
    <>
      <Box variant="primary">
        <div className="flex items-center gap-4 justify-between">
          <H size={2}>سفارشات</H>
          <Button
            variant={setting?.connectServerSocketIo.setState ? "success" : "error"}
            title="online"
            StartIcon={setting?.connectServerSocketIo.setState ? MdWifiTethering : MdWifiTetheringOff}
          >
            اتصال به سرور
          </Button>
        </div>
      </Box>
      {orders.map((val) => (
        <Box key={val.table} variant="secondary">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 ml-2">
              {setting?.profile.access.includes(
                EDashboardCapability.DELETE_ORDER
              ) && (
                <Button
                  type="button"
                  title="delete order"
                  variant="error"
                  onClick={() =>
                    onClickDelete({ table_id: val.present_order_table_id })
                  }
                  StartIcon={BsDashSquare}
                />
              )}
              {setting?.profile.access.includes(
                EDashboardCapability.CREATE_ORDER
              ) && (
                <Button
                  type="button"
                  title="accept order"
                  variant="success"
                  onClick={() =>
                    onClickAccept({ table_id: val.present_order_table_id })
                  }
                  StartIcon={BsCheckSquare}
                />
              )}
            </div>
            <div className="grow flex flex-col gap-2">
              <H size={3}>سفارش میز شماره {digitsEnToFa(val.table)}</H>
              <hr />
              <ul>
                {val.factorPresentOrderTable.map((order, i) => (
                  <li
                    key={i}
                    className="font-semibold text-md mb-2 list-decimal mr-5"
                  >
                    {order.products.name} {digitsEnToFa(order.count)} عدد
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Box>
      ))}
    </>
  );
}
