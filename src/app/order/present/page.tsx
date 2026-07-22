"use client";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import React, { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import ListOrder from "@/Components/Ui/ListOrderPresent";
import { OrderRepository } from "@/Common/Utils/DbClient";
import { IOrderPresent } from "@/Common/Interfaces/OrderPresent.Interface";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function Present() {
  const [listOrder, setListOrder] = useState<Array<IOrderPresent>>([]);

  const onClickClear = () => {
    OrderRepository.clear();
    setListOrder([]);
  };

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.ORDER, name: "سبد خرید" },
          { path: EInnerRoute.ORDER_PRESENT, name: "حضوری" },
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
                onClick={() => onClickClear()}
                title="خالی کردن سبد خرید"
                variant="error"
                StartIcon={MdOutlineDeleteSweep}
                href={EInnerRoute.MENU}
              >
                خالی کردن سبد خرید
              </Button>
              <Button
                type="button"
                href={EInnerRoute.ORDER_PRESENT_ORDER}
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
