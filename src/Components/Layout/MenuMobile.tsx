"use client";
import { dbOrders } from "@/Common/Utils/DbClient";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import {
  MdOutlineAccountCircle,
  MdOutlineRestaurantMenu,
  MdOutlineSwipeDown,
} from "react-icons/md";
import { Button } from "../Ui/Button";
import Box from "../Ui/Box";

function MenuMobile() {
  const [countBasket, setCountBasket] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const getBasket = async () => {
      const existOrderProduct = await dbOrders.getAll();
      existOrderProduct.forEach((val) => {
        setCountBasket((v) => (v += val.count));
      });
    };
    getBasket();
  }, []);

  return (
    <div className="fixed bottom-2 right-0 left-0 flex items-center justify-center print:hidden z-2">
      <Box variant="guest">
        <div className="flex w-fit gap-4">
          <Button
            title="home"
            variant="primary"
            StartIcon={MdOutlineSwipeDown}
            onClick={() => {
              scrollTo(0, 0);
            }}
          />
          <Button
            title="home"
            href="/"
            variant={pathname === "/" ? "secondary" : "primary"}
            StartIcon={GoHome}
          />
          <Button
            title="menu"
            href="/menu"
            variant={pathname.startsWith("/menu") ? "secondary" : "primary"}
            StartIcon={MdOutlineRestaurantMenu}
          />
          <span className="relative flex justify-center items-center">
            <span
              className="animate-ping duration-600 absolute bg-error-60 w-full h-full -z-1 rounded-full"
              id="pulsIsBasketFull"
              hidden
            />
            <Button
              title="order"
              href="/order"
              variant={pathname.startsWith("/order") ? "secondary" : "primary"}
              StartIcon={FiShoppingBag}
            ></Button>
          </span>
          <Button
            title="account"
            href="/account"
            variant={pathname.startsWith("/account") ? "secondary" : "primary"}
            StartIcon={MdOutlineAccountCircle}
          />
        </div>
      </Box>
    </div>
  );
}

export default MenuMobile;
