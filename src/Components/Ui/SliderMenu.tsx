"use client";
import React, { useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { FaQuora, FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GrWorkshop } from "react-icons/gr";
import {
  IoCafeOutline,
  IoClose,
  IoInformationCircleOutline,
} from "react-icons/io5";
import {
  MdOutlineAccountCircle,
  MdOutlineRestaurantMenu,
} from "react-icons/md";
import { PiPhoneDisconnectBold } from "react-icons/pi";
import { TbLogs } from "react-icons/tb";
import { Button } from "../Element/Button";
import Box from "../Element/Box";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function SliderMenu() {
  const [isShow, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (isShow)
    return (
      <div className="flex items-center p-2 relative">
        <Button
          type="button"
          title="button show navbar"
          onClick={() => setOpen((val) => !val)}
          variant="primary"
          StartIcon={AiFillAppstore}
        />

        <div
          className={`w-screen h-dvh backdrop-blur-lg absolute ${
            isOpen ? "right-0" : "-right-[100vw]"
          } top-0`}
          onClick={() => setOpen((val) => !val)}
        ></div>
        <nav
          className={`bg-primary-56 transition-all absolute grid grid-rows-[auto_1fr_auto] gap-2 top-0 h-dvh w-64 p-2 ${
            isOpen ? "right-0" : "-right-72"
          }`}
        >
          <div>
            <Box variant="guest">
              <div className="flex justify-between ">
                <img
                  src="/assets/image/logo/s-logo.svg"
                  alt="shonan Logo"
                  width={38}
                  height={40}
                  className=""
                />
                <Button
                  title="d"
                  variant="error"
                  StartIcon={IoClose}
                  onClick={() => setOpen((val) => !val)}
                />
              </div>
            </Box>
          </div>
          <div className="overflow-auto">
            <Box variant="guest">
              <ul className="flex gap-4 flex-col">
                <li>
                  <Button
                    href={EInnerRoute.HOME}
                    variant="secondary"
                    title="خانه"
                    StartIcon={GoHome}
                    onClick={() => setOpen((val) => !val)}
                    wFull
                  >
                    خانه
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.MENU}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={MdOutlineRestaurantMenu}
                    wFull
                  >
                    منو
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.PRODUCT}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={IoCafeOutline}
                    wFull
                  >
                    محصولات
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.ORDER}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={FiShoppingBag}
                    wFull
                  >
                    سبد خرید
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.FAQ}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={FaQuora}
                    wFull
                  >
                    سوال متداول
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.NEWS}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={TbLogs}
                    wFull
                  >
                    مقالات
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.NEWS}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={BsNewspaper}
                    wFull
                  >
                    اخبار
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.SERVICE}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={GrWorkshop}
                    wFull
                  >
                    خدمات
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.ABOUT_US}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={IoInformationCircleOutline}
                    wFull
                  >
                    درباره ما
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.CONTACT_US}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={PiPhoneDisconnectBold}
                    wFull
                  >
                    ارتباط با ما
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.QUESTION}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={FaQuora}
                    wFull
                  >
                    پرسش و پاسخ
                  </Button>
                </li>
                <li>
                  <Button
                    href={EInnerRoute.SEARCH}
                    variant="secondary"
                    title=""
                    onClick={() => setOpen((val) => !val)}
                    StartIcon={FaSearch}
                    wFull
                  >
                    جستجو
                  </Button>
                </li>
              </ul>
            </Box>
          </div>
          <div className="">
            <Button
              href={EInnerRoute.ACCOUNT}
              variant="secondary"
              title=""
              onClick={() => setOpen((val) => !val)}
              StartIcon={MdOutlineAccountCircle}
              wFull
            >
              حساب کاربری
            </Button>
          </div>
        </nav>
      </div>
    );
}
