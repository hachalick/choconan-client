"use client";
import React, { useEffect, useState } from "react";
import { ERoute } from "@/Common/Enums/Routs";
import { MdOutlineCloudDone, MdOutlineCloudUpload } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import CardHorizontalScrollPanel from "./CardHorizontalScrollPanel";
import CardHorizontalScrollAddPanel from "./CardHorizontalScrollAddPanel";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

function HorizontalScrollPanel({
  title,
  category,
  category_product_id,
  products,
  icon,
}: {
  category_product_id: string;
  title: string;
  category: string;
  icon: string;
  products: TIdProductsMenu;
}) {
  const [data, setData] = useState({
    category_product_id,
    category,
    icon,
  });
  const [statusChange, setStatusChange] = useState(false);
  const [statusCloud, setStatusCloud] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timer);
    setStatusChange(false);
    statusChange && setStatusCloud(false);
    return setTimer(
      setTimeout(async () => {
        if (statusChange) {
          const { update } = await FetchApi.Menu.fetchUpdateCategoryMenu({
            category: data.category,
            category_id: data.category_product_id,
            icon: data.icon,
            access_token,
          });
          setStatusChange(update);
          setStatusCloud(update);
        }
      }, 1000)
    );
  }, [data]);

  const changeHandler = (e: any) => {
    setData((val) => ({ ...val, [e.target.name]: e.target.value }));
    setStatusChange(true);
  };

  const onClickDelete = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      await FetchApi.Menu.fetchDeleteCategoryMenu({
        access_token,
        category_id: category_product_id
      });
      Swal.fire({
        title: "با موفقیت حذف شد!",
        text: "دسته بندی مورد نظر با موفقیت حذف شد",
        icon: "success",
        confirmButtonText: "تایید",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {}
  };

  const getId = (): number => {
    let num = products.length + 1;
    for (let i = 0; i < products.length; i++) {
      if (i + 1 !== products[i].id) {
        num = i + 1;
      }
    }
    return num;
  };

  return (
    <div className="mt-3">
      <div className="2sm:flex justify-center flex-wrap items-center mb-2 scroll-mt-[50px] ">
        <img
          src={ERoute.HOST + data.icon}
          alt={data.category}
          className="w-9 h-9 ml-2"
        />
        <form className="font-bold text-[#3a2e3c] flex flex-wrap gap-2">
          <div className="flex flex-col">
            <label htmlFor="src">آدرس عکس:</label>
            <input
              type="text"
              name="icon"
              id="src"
              value={data.icon}
              dir="ltr"
              className="px-2 py-1 rounded-md w-64"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={category_product_id}>نام دسته بندی</label>
            <input
              type="text"
              name="category"
              id={category_product_id}
              value={data.category}
              className="px-2 py-1 rounded-md w-64"
              onChange={(e) => changeHandler(e)}
            />
          </div>
        </form>
        <button
          type="button"
          title="حذف محصول"
          className="bg-rose-500 rounded-lg w-8 h-8 flex justify-center items-center mr-auto ml-2 shadow-primary-sm"
          onClick={() => onClickDelete()}
        >
          <RiDeleteBin5Line size={25} />
        </button>
        <div
          title="save change"
          className={`${
            statusCloud ? "bg-emerald-500" : " bg-orange-500"
          } rounded-lg w-8 h-8 flex justify-center items-center shadow-primary-sm`}
        >
          {statusCloud ? (
            <MdOutlineCloudDone size={25} />
          ) : (
            <MdOutlineCloudUpload size={25} />
          )}
        </div>
      </div>
      <div className="flex snap-x snap-mandatory scroll-smooth w-full overflow-x-auto gap-5 2sm:gap-10 py-7 ">
        <BlankCard />
        <CardHorizontalScrollAddPanel
          id={getId()}
          category_id={category_product_id}
        />
        {products.map((data, i) => (
          <CardHorizontalScrollPanel key={data.id} data={data} />
        ))}
        <BlankCard />
      </div>
    </div>
  );
}

function BlankCard() {
  return <div className="shrink-0 w-[42%] md:w-0"></div>;
}

export default HorizontalScrollPanel;
