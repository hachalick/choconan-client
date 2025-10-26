"use client";
import React, { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import { dbOrders } from "@/Common/Utils/DbClient";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FiShoppingBag } from "react-icons/fi";
import { BtnOrderDecrement, BtnOrderIncrement } from "./BtnIndexOrder";
import { Button } from "../Ui/Button";

function AddDeleteProductMenu({
  category,
  id_product_menu,
}: {
  category: string;
  id_product_menu: number;
}) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await dbOrders.getOne({
        data: { id_product_menu, category },
      });
      if (data) {
        setCount(data.count);
      }
      setShow(true);
    };
    getData();
  }, []);

  if (show)
    return (
      <div className="flex items-center justify-center rounded-xl relative overflow-hidden w-full max-w-36">
        <div
          className={`absolute w-full h-full bg-primary-44 rounded-xl flex items-center justify-center duration-200 ease-in-out ${
            count ? "translate-x-44" : ""
          }`}
        >
          <BtnOrderIncrement
            data={{ category, id_product_menu }}
            count={count}
            setCount={setCount}
          >
            <span className="flex gap-2 text-sm items-center justify-center">
              <FiShoppingBag size={20} className="" />
              اضافه به سبد خرید
            </span>
          </BtnOrderIncrement>
        </div>
        <div className="flex items-center justify-center shadow-lg rounded-xl w-full">
          <div className="border flex p-1 rounded-r-xl">
            <BtnOrderIncrement
              data={{ category, id_product_menu }}
              count={count}
              setCount={setCount}
            >
              <FaPlusCircle size={25} />
            </BtnOrderIncrement>
          </div>
          <div className="px-2 grow text-center text-xl">
            {digitsEnToFa(count)}
          </div>
          <div className="border flex p-1 rounded-l-xl">
            <BtnOrderDecrement
              data={{ category, id_product_menu }}
              count={count}
              setCount={setCount}
            >
              {count === 1 ? (
                <FaRegTrashAlt size={25} />
              ) : (
                <FaMinusCircle size={25} />
              )}
            </BtnOrderDecrement>
          </div>
        </div>
      </div>
    );
}

export default AddDeleteProductMenu;
