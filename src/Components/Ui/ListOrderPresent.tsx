"use client";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import React, { useEffect, useState } from "react";
import AddDeleteProductMenu from "./AddDeleteProductMenu";
import Box from "../Element/Box";
import { H } from "../Element/H";
import P from "../Element/P";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { OrderRepository } from "@/Common/Utils/DbClient";
import { IOrderPresent } from "@/Common/Interfaces/OrderPresent.Interface";

function ListOrder({
  listOrder,
  setListOrder,
}: {
  listOrder: Array<IOrderPresent>;
  setListOrder: React.Dispatch<React.SetStateAction<Array<IOrderPresent>>>;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      const listOrderIndex = await OrderRepository.getAll();

      for (const item of listOrderIndex) {
        const res = await FetchApi.Menu.ReadMenuProductDetail({
          Id: item.product_id,
        });

        setListOrder((value) => [
          ...value,
          {
            Id: res.Id,
            Name: res.Name,
            Description: res.Description,
            Price: res.Price,
            SrcImage: res.SrcImage,
            Waiting: res.Waiting,
            Count: item.count,
          },
        ]);
      }

      setShow(true);
    };
    getAllData();
  }, []);

  if (show) {
    return (
      <Box variant="guest">
        <div className="flex flex-col gap-4">
          {listOrder.length
            ? listOrder.map((card, i) => (
                <Box variant="primary" key={i}>
                  <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
                    <div className="shrink-0">
                      <img
                        src={EServerRoute.HOST + card.SrcImage}
                        width={100}
                        height={100}
                        alt={card.Name}
                        className="md:w-32 md:h-32 w-44 h-44 object-contain rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col gap-4 grow w-full">
                      <H size={3}>{card.Name}</H>
                      <P size={4}>{card.Description}</P>
                      <div className="flex justify-end gap-4">
                        <AddDeleteProductMenu product_id={card.Id} />
                      </div>
                    </div>
                  </div>
                </Box>
              ))
            : "💔 سبد خرید خالی است 💔"}
        </div>
      </Box>
    );
  } else {
    return <Box variant="guest">در حال دریافت اطلاعات ...</Box>;
  }
}

export default ListOrder;
