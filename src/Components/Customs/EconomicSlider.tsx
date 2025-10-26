"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/Assets/Styles/SliderHome.style.css"

// import required modules
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import ImageClient from "./ImageClient";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

function EconomicSlider() {
  const [pack, setPack] = useState<TGetEconomicPackages>([]);

  useEffect(() => {
    const getData = async () => {
      setPack(await FetchApi.Order.fetchGetEconomicPackages({ all: "a" }));
    };
    getData();
  }, []);

  const sumPack = (val: TGetContentEconomicPackages): number => {
    let s = 0;
    for (const i in val) {
      s += val[i].productMenu.price;
    }
    return s;
  };

  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  if (pack.length > 0)
    return (
      <div className="mt-3 flex">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {pack
            .filter((val) => val.is_active === true)
            .map((val, i) => (
              <SwiperSlide key={i}>
                <Card
                  end_hours={val.end_hours}
                  name={val.title}
                  price={val.price}
                  src={val.src}
                  start_hours={val.start_hours}
                  sum={sumPack(val.contentEconomicPackage)}
                />
              </SwiperSlide>
            ))}
          <div
            className="flex relative justify-center items-center w-fit"
            slot="container-end"
          >
            <svg viewBox="0 0 48 48" ref={progressCircle} className="w-8 hidden">
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent} className="absolute hidden"></span>
          </div>
        </Swiper>
      </div>
    );
}

function Card({
  end_hours,
  name,
  price,
  src,
  start_hours,
  sum,
}: {
  src: string;
  name: string;
  start_hours: string;
  end_hours: string;
  price: number;
  sum: number;
}) {
  return (
    <div className="flex items-center bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] rounded-xl p-2 shadow-primary-sm max-w-96 m-2 mx-auto">
      <div>
        <ImageClient
          alt={name}
          src={src}
          height={100}
          width={100}
          className="w-52"
        />
      </div>
      <div className="grow flex flex-col gap-2">
        <h3 className="font-bold text-xl">پک اقتصادی &quot;{name}&quot;</h3>
        <h4>
          {digitsEnToFa(start_hours.slice(0, 5))} -{" "}
          {digitsEnToFa(end_hours.slice(0, 5))}
        </h4>
        <span>
          <h4 className="line-through">
            {digitsEnToFa(addCommas(sum * 1000))} تومان
          </h4>
          <h4>{digitsEnToFa(addCommas(price * 1000))} تومان</h4>
        </span>
        <button
          type="button"
          className="outline-1 outline w-fit mr-auto rounded-md px-2 py-1"
        >
          دیدن جزئیات
        </button>
      </div>
    </div>
  );
}

export default EconomicSlider;
