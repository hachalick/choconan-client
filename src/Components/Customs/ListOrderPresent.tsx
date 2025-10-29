"use client";
import { ERoute } from "@/Common/Enums/Routs";
import { dbOrders } from "@/Common/Utils/DbClient";
import React, { useEffect, useState } from "react";
import AddDeleteProductMenu from "./AddDeleteProductMenu";
import Box from "../Ui/Box";
import { H } from "../Ui/H";
import P from "../Ui/P";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

function ListOrder({
  listOrder,
  setListOrder,
}: {
  listOrder: TOrdersPresent;
  setListOrder: React.Dispatch<React.SetStateAction<TOrdersPresent>>;
}) {
  const [show, setShow] = useState(false);

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
          snap,
          tapsi,
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
          snap,
          tapsi,
        });
      }
      setListOrder(listAllData);
      setShow(true);
    };
    getAllData();
  }, []);

  if (show) {
    return (
      <Box variant="guest">
        {listOrder.length
          ? listOrder.map((card, i) => (
              <Box variant="primary" key={i}>
                <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
                  <div className="shrink-0">
                    <img
                      src={ERoute.HOST + card.src}
                      width={100}
                      height={100}
                      alt={card.name}
                      className="md:w-32 md:h-32 w-44 h-44 object-contain rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-4 grow w-full">
                    <H size={3}>{card.name}</H>
                    <P size={4}>{card.description}</P>
                    <div className="flex justify-end gap-4">
                      <AddDeleteProductMenu
                        category={card.category}
                        id_product_menu={card.id_product_menu}
                      />
                    </div>
                  </div>
                </div>
              </Box>
            ))
          : "💔 سبد خرید خالی است 💔"}
      </Box>
    );
  } else {
    return <Box variant="guest">در حال دریافت اطلاعات ...</Box>;
  }
}

export default ListOrder;
