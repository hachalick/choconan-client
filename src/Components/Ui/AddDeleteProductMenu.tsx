"use client";
import React, { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle, FaRegTrashAlt } from "react-icons/fa";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FiShoppingBag } from "react-icons/fi";
import {
  ButtonOrderIndexDbDecrement,
  ButtonOrderIndexDbIncrement,
} from "./Button.OrderIndexDb";
import { OrderRepository } from "@/Common/Utils/DbClient";

export default function AddDeleteProductMenu({
  product_id,
}: {
  product_id: string;
}) {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await OrderRepository.getWhere({ product_id });

      if (data && data.length > 0) {
        setCount(data[0].count);
      }

      setShow(true);
    };
    getData();
  }, []);

  if (show) {
    return (
      <div className="flex items-center justify-center rounded-xl relative overflow-hidden w-full max-w-36">
        <div
          className={`absolute w-full h-full bg-primary-44 rounded-xl flex items-center justify-center duration-200 ease-in-out ${
            count ? "translate-x-44" : ""
          }`}
        >
          <ButtonOrderIndexDbIncrement
            data={{ count, product_id }}
            count={count}
            setCount={setCount}
          >
            <span className="flex gap-2 text-sm items-center justify-center">
              <FiShoppingBag size={20} className="" />
              اضافه به سبد خرید
            </span>
          </ButtonOrderIndexDbIncrement>
        </div>
        <div className="flex items-center justify-center shadow-lg rounded-xl w-full">
          <div className="border flex p-1 rounded-r-xl">
            <ButtonOrderIndexDbIncrement
              data={{ count, product_id }}
              count={count}
              setCount={setCount}
            >
              <FaPlusCircle size={25} />
            </ButtonOrderIndexDbIncrement>
          </div>
          <div className="px-2 grow text-center text-xl">
            {digitsEnToFa(count)}
          </div>
          <div className="border flex p-1 rounded-l-xl">
            <ButtonOrderIndexDbDecrement
              data={{ count, product_id }}
              count={count}
              setCount={setCount}
            >
              {count === 1 ? (
                <FaRegTrashAlt size={25} />
              ) : (
                <FaMinusCircle size={25} />
              )}
            </ButtonOrderIndexDbDecrement>
          </div>
        </div>
      </div>
    );
  }
}
