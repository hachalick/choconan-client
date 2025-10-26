"use client";
import { dbOrders } from "@/Common/Utils/DbClient";
import ListOrder from "@/Components/Customs/ListOrderPresent";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineDeleteSweep } from "react-icons/md";

export default function Present() {
  const [listOrder, setListOrder] = useState<TOrdersPresent>([]);

  const onclickClear = () => {
    dbOrders.clear();
    setListOrder([]);
  };

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/order", name: "سبد خرید" },
          { path: "/order/present", name: "حضوری" },
        ]}
      />

      <Box variant="primary">
        <H size={1}>سبد خرید</H>
      </Box>
      <ListOrder listOrder={listOrder} setListOrder={setListOrder} />

      {listOrder.length ? (
        <>
          <Box variant="guest">
            <div className="flex flex-wrap justify-end gap-3">
              <Button
                type="button"
                onClick={() => onclickClear()}
                title="خالی کردن سبد خرید"
                variant="error"
                StartIcon={MdOutlineDeleteSweep}
                href="/menu"
              >
                خالی کردن سبد خرید
              </Button>
              <Button
                type="button"
                href="/order/present/factor"
                variant="success"
                title="ادامه خرید"
                StartIcon={FiShoppingBag}
              >
                ادامه خرید
              </Button>
            </div>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
}
