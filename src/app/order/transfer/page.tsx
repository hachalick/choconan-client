import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { H } from "@/Components/Ui/H";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Transfer() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/order", name: "سفارشات" },
        ]}
      />
      <Box variant="primary">
        <H size={1}>سفارش از طریق</H>
      </Box>
      <div className="gap-7 flex flex-wrap py-4 justify-center">
        <Link
          className="basis-48 grow md:aspect-0"
          href="https://snappfood.ir/caffe/menu/%DA%A9%D8%A7%D9%81%D9%87_%D8%B4%D9%88%DA%A9%D9%88%D9%86%D8%A7%D9%86-r-12j1y4"
          title="برای دیدن سفارش ارسال پیک خود از کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/logo/snapfood.jpeg"
                width={110}
                height={110}
                alt="snap food"
              />
              <H size={3}>اسنپ فود</H>
            </div>
          </Box>
        </Link>
        <Link
          className="basis-48 grow md:aspect-0"
          href="https://tapsi.food/vendor/5668xz"
          title="برای دیدن سفارش حضوری خود در کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/logo/tapsifood.png"
                width={110}
                height={110}
                alt="tapsi food"
              />
              <H size={3}>تپسی فود</H>
            </div>
          </Box>
        </Link>
        <Link
          className="basis-48 grow md:aspect-0"
          href="https://bordifood.com/shop-detail/%DA%A9%D8%A7%D9%81%D9%87-%D8%B4%D9%88%DA%A9%D9%88%D9%86%D8%A7%D9%86/305"
          title="برای دیدن سفارش حضوری خود در کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/logo/bordifood.png"
                width={110}
                height={110}
                alt="tapsi food"
              />
              <H size={3}>بردی فود</H>
            </div>
          </Box>
        </Link>
      </div>
    </Layout>
  );
}
