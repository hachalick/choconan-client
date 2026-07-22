"use client";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Swal from "sweetalert2";
import { OrderRepository } from "@/Common/Utils/DbClient";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import TotalFactorMenu from "@/Components/Ui/TotalFactorMenu";
import SelectTable from "@/Components/Ui/SelectTable";
import { IOrderPresent } from "@/Common/Interfaces/OrderPresent.Interface";
import { EInnerRoute } from "@/Common/Enums/InnerRout";



export default function PresentFactor() {
  const [location, setLocation] = useState("");
  const [listOrder, setListOrder] = useState<Array<IOrderPresent>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderItems = await OrderRepository.getAll();

      for (const item of orderItems) {
        const product = await FetchApi.Menu.ReadMenuProductDetail({
          Id: item.product_id,
        });

        if (!product.IsShowMenu) continue;

        setListOrder((value) => [
          ...value,
          {
            Id: product.Id,
            Count: item.count,
            Description: product.Description,
            Name: product.Name,
            Price: product.Price,
            SrcImage: product.SrcImage,
            Waiting: product.Waiting,
          },
        ]);
      }
    };

    fetchData();
  }, []);

  const onClickCreateOrder = async () => {
    if (!location) {
      Swal.fire({
        title: "مشکل داریم !",
        text: "میز خود را انتخاب نکردید",
        icon: "error",
        confirmButtonText: "تلاش مجدد",
      });
    } else if (!listOrder.length) {
      Swal.fire({
        title: "مشکل داریم !",
        text: "سبد سفارش خالی است",
        icon: "error",
        confirmButtonText: "تلاش مجدد",
      });
    }

    const statusTable = await FetchApi.Order.ReadStatusTable({
      Id: location,
    });

    if (statusTable.IsBusy) {
      Swal.fire({
        title: "مشکل داریم !",
        text: `میز انتخاب شده در حال استفاده است`,
        icon: "error",
        confirmButtonText: "تعویض میز",
      });
    }

    const res = await FetchApi.Order.CreateOrderTable({
      Id: location,
      Orders: listOrder.map((item) => ({
        Count: item.Count,
        ProductId: item.Id,
      })),
    });

    if (res.Create) {
      Swal.fire({
        title: "ثبت سفارش",
        text: "سفارش شما در لیست تایید قرار گرفت",
        icon: "success",
        confirmButtonText: "تایید",
      });
      OrderRepository.clear();
      document.location.replace("/");
    } else {
      Swal.fire({
        title: "مشکل داریم !",
        text: `مشکل در ثبت سفارش پیش آمده.`,
        icon: "error",
        confirmButtonText: "تایید",
      });
    }
  };

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.ORDER, name: "سبد خرید" },
          { path: EInnerRoute.ORDER_PRESENT, name: "حضوری" },
          { path: EInnerRoute.ORDER_PRESENT_ORDER, name: "فاکتور" },
        ]}
      />

      <Box variant="primary">
        <H size={2}>میز سفارش</H>
      </Box>
      <TotalFactorMenu
        listOrder={listOrder.map((val) => ({
          Count: val.Count,
          Name: val.Name,
          Price: val.Price,
        }))}
      />
      <SelectTable setVal={setLocation} />
      <Box variant="guest">
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            variant="warning"
            href={EInnerRoute.ORDER_PRESENT}
            title="ثبت سفارش"
            StartIcon={FiShoppingBag}
          >
            ویرایش سبد
          </Button>
          <Button
            variant="success"
            onClick={() => onClickCreateOrder()}
            title="ثبت سفارش"
            StartIcon={FiShoppingBag}
          >
            ثبت سفارش
          </Button>
        </div>
      </Box>
    </Layout>
  );
}
