"use client";
import { CContactUs } from "@/Common/Constants/Connection.Constant";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Box from "../Element/Box";
import Enamad from "../Ui/Enamad";
import { EInnerRoute } from "@/Common/Enums/InnerRout";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";

export default function Footer() {
  const [menu, setMenu] = useState<Array<ReadMenuDetailViewModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const menu = await FetchApi.Menu.ReadMenuDetail({});
      setMenu(menu);
    };

    fetchData();
  }, []);

  return (
    <footer className="py-2 print:hidden">
      <div className="max-w-6xl mx-auto">
        <Box variant="primary">
          <div className="py-2 gap-0 md:gap-3 rounded-2xl md:grid grid-cols-4 grid-rows-5 grid-flow-col grid-row-col">
            <div className="col-start-1 row-start-1 col-span-4 row-span-2">
              <Link href={EInnerRoute.MENU_CATEGORY} className="font-bold">
                دسته بندی منو
              </Link>
              <ul className="mt-3 border-b-2 flex justify-between flex-wrap gap-y-2 pb-2">
                {menu
                  .filter((category) => category.IsShowMenu)
                  .map((category, i) => (
                    <li key={i} className="basis-36">
                      <Link
                        href={`${EInnerRoute.MENU_CATEGORY}/${category.Id}`}
                        className="flex flex-wrap items-center"
                      >
                        <Image
                          src={EServerRoute.HOST + category.Icon}
                          alt={category.Name}
                          width={40}
                          height={40}
                          priority
                          className="w-9 h-9 ml-2"
                          loading="eager"
                        ></Image>
                        {category.Name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-3 col-start-1 row-start-3 col-span-2 row-span-2">
              <h3 className="font-bold mb-2">راه ارتباطی</h3>
              <ul className="border-b-2 flex justify-between flex-wrap flex-col pr-2 pb-2">
                {CContactUs.map((val, i) => (
                  <li key={i} className="my-1">
                    <a href={val.href} className="flex flex-wrap">
                      {val.name}
                      <span className="mr-auto">{val.content}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 col-start-1 row-start-4 col-span-2 row-span-2">
              <h3 className="font-bold mb-2">شبکه های اجتماعی</h3>
              <ul className="border-b-2 flex justify-evenly flex-wrap pr-2 pb-2">
                <li className="my-1">
                  <a
                    href="https://wa.me/+989127017624"
                    className="flex flex-wrap border rounded-md p-1 bg-green-700"
                  >
                    <FaWhatsapp />
                  </a>
                </li>
                <li className="my-1">
                  <a
                    href="https://t.me/shonanir"
                    className="flex flex-wrap border rounded-md p-1 bg-blue-700"
                  >
                    <FaTelegramPlane className="-translate-x-[1px]" />
                  </a>
                </li>
                <li className="my-1">
                  <a
                    href="https://instagram.com/shonan.ir"
                    className="flex flex-wrap border rounded-md p-1 bg-gradient-to-br from-fuchsia-700 to-pink-700"
                  >
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-3 col-start-3 row-start-3 col-span-2 row-span-3">
              <h3 className="font-bold mb-2">آدرس</h3>
              <address>
                سهرودی جنوبی - نرسیده به مطهری - نبش کوچه اسلامی - پلاک ۱۶۲
              </address>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d809.7869169417086!2d51.433990469641834!3d35.72258668706652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0300617a6673%3A0x889f06ed7f3e24ea!2z2qnYp9mB2Ycg2LTZiNqp2YjZhtin2YY!5e0!3m2!1sen!2s!4v1722403037757!5m2!1sen!2s"
                className="w-full md:h-[calc(74%)] h-64 mt-3"
                title="location map"
              ></iframe>
            </div>
          </div>
        </Box>
      </div>
      <div className="max-w-6xl mx-auto mt-2">
        <Box variant="primary">
          <div>
            <h3 className="font-bold mb-2">نماد</h3>
            <Enamad />
          </div>
        </Box>
      </div>
    </footer>
  );
}
