"use client";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { dbOrders } from "@/Common/Utils/DbClient";
import SelectTable from "@/Components/Customs/SelectTable";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import TotalFactorMenu from "@/Components/Customs/TotalFactorMenu";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Swal from "sweetalert2";

export default function PresentFactor() {
  const [val, setVal] = useState("");
  const [listOrder, setListOrder] = useState<TOrdersPresent>([]);

  useEffect(() => {
    const getAllData = async () => {
      const dataDb = await dbOrders.getAll();
      const listAllData: TOrdersPresent = [];
      for (const i in dataDb) {
        const {
          available,
          description,
          id,
          meta_description,
          meta_title,
          name,
          price,
          src,
          waiting,
          product_id,
        } = await FetchApi.Menu.fetchProductMenu({
          category: dataDb[i].category,
          id: String(dataDb[i].id_product_menu),
        });
        listAllData.push({
          available,
          description,
          meta_description,
          meta_title,
          name,
          price,
          src,
          waiting,
          id_product_menu: id,
          category: dataDb[i].category,
          count: dataDb[i].count,
          product_id,
        });
      }
      setListOrder(listAllData);
    };
    getAllData();
  }, []);

  // useEffect(() => {
  //   setShow(true);
  // }, []);

  const onClickHandler = async () => {
    if (!val) {
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
    } else {
      const access_token = sessionStorage.getItem("access_token") || "";
      const statusTable = await FetchApi.Order.fetchStatusTable({
        table_id: val,
        access_token,
      });
      if (statusTable.can_order) {
        Swal.fire({
          title: "مشکل داریم !",
          text: `میز انتخاب شده در حال استفاده است`,
          icon: "error",
          confirmButtonText: "تعویض میز",
        });
      } else {
        const orders = listOrder.map((order) => ({
          count: order.count,
          product_id: order.product_id,
        }));
        const res = await FetchApi.Order.fetchOrderTable({
          table_id: val,
          list_order: orders,
        });
        if (res.submit) {
          Swal.fire({
            title: "ثبت سفارش",
            text: "سفارش شما در لیست تایید قرار گرفت",
            icon: "success",
            confirmButtonText: "تایید",
          });
          dbOrders.clear();
          location.replace("/");
        } else {
          Swal.fire({
            title: "مشکل داریم !",
            text: `میز سفارش شما در لیست تایید قرار گرفت حال استفاده است`,
            icon: "error",
            confirmButtonText: "تایید",
          });
        }
      }
    }
  };

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/order", name: "سبد خرید" },
          { path: "/order/present", name: "حضوری" },
          { path: "/order/present/factor", name: "فاکتور" },
        ]}
      />

      <Box variant="primary">
        <H size={2}>میز سفارش</H>
      </Box>
      <TotalFactorMenu listOrder={listOrder} />
      <SelectTable setVal={setVal} />
      <Box variant="guest">
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            variant="warning"
            href="/order/present"
            title="ثبت سفارش"
            StartIcon={FiShoppingBag}
          >
            ویرایش سبد
          </Button>
          <Button
            variant="success"
            onClick={() => onClickHandler()}
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
