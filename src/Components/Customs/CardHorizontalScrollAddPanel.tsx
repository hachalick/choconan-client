"use client";
import React, { useState } from "react";
import { ERoute } from "@/Common/Enums/Routs";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsCloudArrowUp } from "react-icons/bs";
import Swal from "sweetalert2";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

export default function CardHorizontalScrollAddPanel({
  id,
  category_id,
}: {
  id: number;
  category_id: string;
}) {
  const initalCard: TProductMenu = {
    available: false,
    description: "",
    id,
    meta_description: "",
    meta_title: "",
    name: "",
    price: 0,
    src: "",
    waiting: 0,
    snap: "",
    tapsi: "",
  };
  const [add, setAdd] = useState(false);
  const [dataCard, setDataCard] = useState<TProductMenu>(initalCard);

  const changeHandler = (e: any) => {
    setDataCard((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const onClickHandlerAvailable = () => {
    setDataCard((val) => ({ ...val, available: !val.available }));
  };

  const saveProductMenu = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      await FetchApi.Menu.fetchCreateProductMenu({
        access_token,
        available: dataCard.available,
        category_id,
        description: dataCard.description,
        meta_description: dataCard.meta_description,
        meta_title: dataCard.meta_title,
        name: dataCard.name,
        price: dataCard.price,
        src: dataCard.src,
        waiting: dataCard.waiting,
        id,
        snap: dataCard.snap,
        tapsi: dataCard.tapsi,
      });
      Swal.fire({
        title: "با موفقیت ثبت شد!",
        text: "محصول با اطلاعات وارد شده با موفقیت ثبت شد",
        icon: "success",
        confirmButtonText: "تایید",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      Swal.fire({
        title: "اضافه نشد!",
        text: "محصول با اطلاعات وارد شده ثبت نشد",
        icon: "error",
        confirmButtonText: "تلاش مجدد",
      });
    }
  };

  if (add) {
    return (
      <div className="flex flex-col shrink-0 snap-center w-[70%] md:w-80 h-[450px] rounded-xl bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] shadow-primary pb-1 mb-4 overflow-y-auto">
        <div className="flex flex-col shrink-0 pb-1 relative">
          <button
            type="button"
            title="ذخیره محصول"
            className="bg-gray-500 rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-2 mr-auto"
            onClick={() => saveProductMenu()}
          >
            <BsCloudArrowUp size={25} />
          </button>
          <button
            type="button"
            title="کنسل"
            className="bg-rose-500 rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-11 mr-auto"
            onClick={() => setAdd(false)}
          >
            <MdOutlineCancel size={25} />
          </button>
          <div className="aspect-[7/8] md:aspect-square">
            <img alt={dataCard.name} src={ERoute.HOST + dataCard.src} />
          </div>
          <form className="flex flex-col mx-3 gap-1 mb-2">
            <label htmlFor="src">آدرس عکس :</label>
            <input
              id="src"
              name="src"
              type="text"
              value={dataCard.src}
              placeholder="src"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2"
              dir="ltr"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="meta_title">متا تایتل :</label>
            <input
              id="meta_title"
              name="meta_title"
              type="text"
              value={dataCard.meta_title}
              placeholder="meta_title"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="meta_description">متا توضیحات :</label>
            <textarea
              id="meta_description"
              name="meta_description"
              value={dataCard.meta_description}
              placeholder="meta_description"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2 resize-none"
              rows={5}
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="name">نام محصول :</label>
            <input
              id="name"
              name="name"
              type="text"
              value={dataCard.name}
              placeholder="name"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="description">توضیحات :</label>
            <textarea
              id="description"
              name="description"
              value={dataCard.description}
              placeholder="description"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2 resize-none"
              rows={5}
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="waiting">مدت زمان انتظار :</label>
            <input
              id="waiting"
              name="waiting"
              type="number"
              value={dataCard.waiting}
              placeholder="waiting"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="price">قیمت :</label>
            <input
              id="price"
              name="price"
              type="number"
              value={dataCard.price}
              placeholder="price"
              className="bgcooooooooooooooooooloooooooooo50/20 px-2 py-1 mx-2"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="src">وضعیت موجودی :</label>
            {dataCard.available ? "موجود" : "ناموجود"}
            <button
              type="button"
              className="mb-4 bgcooooooooooooooooooloooooooooo200/20 w-32 mx-auto py-1 rounded-lg"
              onClick={() => onClickHandlerAvailable()}
            >
              {dataCard.available ? "ناموجود کردن" : "موجود کردن"}
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <button
        type="button"
        title="اضافه کردن محصول"
        onClick={() => setAdd(true)}
        className="flex flex-col justify-center items-center shrink-0 snap-center w-[70%] md:w-80 h-[450px] rounded-xl bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] shadow-primary pb-1 mb-4"
      >
        <IoIosAddCircleOutline size={250} className="opacity-20" />
        <span className="opacity-30 text-xl">اضافه کردن محصول</span>
      </button>
    );
  }
}
