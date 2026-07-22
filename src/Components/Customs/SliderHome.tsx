"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/Assets/Styles/SliderHome.style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export function SliderHome1() {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="mt-3 flex">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/image/slider/view-1.JPG" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-2.JPG" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-3.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
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

export function SliderHome2() {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="mt-3 flex">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/image/slider/view-4.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-5.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-6.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-7.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-8.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-9.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-10.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-11.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-12.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
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


export function SliderHome3() {
  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="mt-3 flex">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/image/slider/view-15.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-16.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-17.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/slider/view-18.jpg" alt="choconan" loading="lazy"/>
        </SwiperSlide>
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