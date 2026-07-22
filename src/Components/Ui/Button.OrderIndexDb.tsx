"use client";
import { IOrderRepository, OrderRepository } from "@/Common/Utils/DbClient";
import React from "react";

// export function BaseIndexDb() {
//   const fetchAllOrders = async ({ data }: { data: any[] }) => {
//     console.log(data);
//   };

//   useEffect(() => {
//     const handleOnline = async () => {
//       const orderDb = await OrderRepository.getAll();
//       C({ data: all_data });
//       for (let i in all_data) {
//         dbOrders.deleteById({ id: all_data[i].id });
//       }
//     };
//     window.addEventListener("online", handleOnline);
//     return () => {
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   return <></>;
// }

export function ButtonOrderIndexDbIncrement({
  setCount,
  count,
  className,
  data,
  children,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  className?: string;
  data: Omit<IOrderRepository, "id">;
  children?: any;
}) {
  const clickHandler = async (Param: Omit<IOrderRepository, "id">) => {
    if (!navigator) return;

    setCount(() => Param.count);

    const listOrderProduct = await OrderRepository.getAll();
    const findOrderProduct = await OrderRepository.getWhere({
      product_id: Param.product_id,
    });

    if (findOrderProduct.length > 0) {
      await OrderRepository.update(findOrderProduct[0].id, {
        count: Param.count,
      });
    } else {
      await OrderRepository.add({
        count: Param.count,
        product_id: Param.product_id,
      });
    }

    const elementMenuBasket = document.getElementById("count-basket");
    const elementPulsIsBasketFull = document.getElementById("pulsIsBasketFull");

    if (elementMenuBasket) {
      elementMenuBasket.innerText = Param.count.toString();
    }

    if (listOrderProduct.length > 0 && elementPulsIsBasketFull)
      if (elementPulsIsBasketFull.hidden === true)
        elementPulsIsBasketFull.hidden = false;
  };

  return (
    <button
      type="button"
      title="increment btn"
      className={className}
      onClick={() =>
        clickHandler({
          count: count + 1,
          product_id: data.product_id,
        })
      }
    >
      {children}
    </button>
  );
}

export function ButtonOrderIndexDbDecrement({
  setCount,
  count,
  className,
  data,
  children,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  className?: string;
  data: Omit<IOrderRepository, "id">;
  children?: any;
}) {
  const clickHandler = async (Param: Omit<IOrderRepository, "id">) => {
    setCount(() => Param.count);

    if (!navigator) return;

    setCount(() => Param.count);

    const listOrderProduct = await OrderRepository.getAll();
    const findOrderProduct = await OrderRepository.getWhere({
      product_id: Param.product_id,
    });

    if (findOrderProduct.length > 0) {
      await OrderRepository.update(findOrderProduct[0].id, {
        count: Param.count,
      });
    } else {
      await OrderRepository.add({
        count: Param.count,
        product_id: Param.product_id,
      });
    }

    const elementMenuBasket = document.getElementById("count-basket");
    const elementPulsIsBasketFull = document.getElementById("pulsIsBasketFull");

    if (elementMenuBasket) {
      elementMenuBasket.innerText = Param.count.toString();
    }

    if (listOrderProduct.length === 0 && elementPulsIsBasketFull)
      if (elementPulsIsBasketFull.hidden === false)
        elementPulsIsBasketFull.hidden = true;
  };

  return (
    <button
      type="button"
      title="decrement btn"
      className={className}
      onClick={() =>
        clickHandler({
          count: Math.max(count - 1, 0),
          product_id: data.product_id,
        })
      }
    >
      {children}
    </button>
  );
}
