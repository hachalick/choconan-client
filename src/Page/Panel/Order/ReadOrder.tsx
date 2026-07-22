"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EDashboardCapability } from "@/Common/Enums/DashboardCapability.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import { AccountContext } from "@/Contexts/Account.Context";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { BsCheckSquare, BsDashSquare } from "react-icons/bs";
import { MdWifiTethering, MdWifiTetheringOff } from "react-icons/md";
import Swal from "sweetalert2";
import moment from "moment-jalaali";
import { ReadOrderTableListViewModel } from "@/Common/Connection/Api/ViewModels/Order.Service.ViewModel";

export default function ReadOrder() {
  const setting = useContext(AccountContext);

  const [orders, setOrders] = useState<Array<ReadOrderTableListViewModel>>([]);

  useEffect(() => {
    if (setting?.orders.state) {
      setting?.orders.setState(false);
      return;
    }

    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const orders = await FetchApi.Order.ReadOrderTableList({
        AccessToken: access_token,
      });
      console.log(orders)
      setOrders(orders);
    };

    fetchData();
  }, [setting?.orders.state]);

  const onClickAccept = async ({ id }: { id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const factor = orders.find((val) => val.Id === id);

    if (!factor) return;

    try {
      const resCreate = await FetchApi.Order.CreateOrder({
        AccessToken: access_token,
      });

      await FetchApi.Order.UpdateOrder({
        AccessToken: access_token,
        Id: resCreate.Id,
        Tax: resCreate.Tax,
        Location: `میز ${orders.find((a) => a.Id === id)?.Location}`,
        FactorNumber: resCreate.FactorNumber,
        CustomerMobile: resCreate.CustomerMobile,
        IsPay: false,
        FactorDate: moment().format("jYYYY/jMM/jDD HH:mm:ss"),
      });

      factor.Items.forEach(async (val) => {
        const resCreateItem = await FetchApi.Order.CreateOrderItem({
          AccessToken: access_token,
          Id: resCreate.Id,
        });

        await FetchApi.Order.UpdateOrderItem({
          AccessToken: access_token,
          Id: resCreateItem.Id,
          ProductCount: val.ProductCount,
          ProductName: val.ProductName,
          ProductPrice: val.ProductPrice,
          ProductDiscount: 0,
        });
      });

      Swal.fire({
        title: "با موفقیت ایجاد شد!",
        text: "ثبت فاکتور مورد نظر با موفقیت ایجاد شد. برای مشاهده به فروشگاه برید",
        icon: "success",
        confirmButtonText: "تایید",
        timer: 1000,
      });

      await onClickDelete({ id });
      setting?.dashboard.setState(EDashboard.READ_FACTOR);
    } catch (error) {}
  };

  const onClickDelete = async ({ id }: { id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Order.DeleteStatusTable({
      AccessToken: access_token,
      Id: id,
    });
    setting?.orders.setState(true);
  };

  return (
    <>
      <Box variant="primary">
        <div className="flex items-center gap-4 justify-between">
          <H size={2}>سفارشات</H>
          <Button
            variant={
              setting?.connectServerSocketIo.setState ? "success" : "error"
            }
            title="online"
            StartIcon={
              setting?.connectServerSocketIo.setState
                ? MdWifiTethering
                : MdWifiTetheringOff
            }
          >
            اتصال به سرور
          </Button>
        </div>
      </Box>
      {orders.map((val) => (
        <Box key={val.Id} variant="secondary">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 ml-2">
              {setting?.profile.Access.includes(
                EDashboardCapability.DELETE_ORDER,
              ) && (
                <Button
                  type="button"
                  title="delete order"
                  variant="error"
                  onClick={() => onClickDelete({ id: val.Id })}
                  StartIcon={BsDashSquare}
                />
              )}
              {setting?.profile.Access.includes(
                EDashboardCapability.CREATE_ORDER,
              ) && (
                <Button
                  type="button"
                  title="accept order"
                  variant="success"
                  onClick={() => onClickAccept({ id: val.Id })}
                  StartIcon={BsCheckSquare}
                />
              )}
            </div>
            <div className="grow flex flex-col gap-2">
              <H size={3}>سفارش میز شماره {digitsEnToFa(val.Location)}</H>
              <hr />
              <ul>
                {val.Items.map((order, i) => (
                  <li
                    key={i}
                    className="font-semibold text-md mb-2 list-decimal mr-5"
                  >
                    {order.ProductName} {digitsEnToFa(order.ProductCount)} عدد
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
