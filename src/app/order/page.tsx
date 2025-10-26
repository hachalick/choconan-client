import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { H } from "@/Components/Ui/H";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Order() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/order", name: "سبد خرید" },
        ]}
      />
      <Box variant="primary">
        <H size={1}>نوع سفارش دهی</H>
      </Box>
      <div className="gap-7 flex flex-wrap py-4 justify-center">
        <Link
          className="basis-48 grow md:aspect-0"
          href="/order/present"
          title="برای دیدن سفارش ارسال پیک خود از کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/icon/present.png"
                width={110}
                height={110}
                alt="telegram choconan"
              />
              <H size={3}>حضوری</H>
            </div>
          </Box>
        </Link>
        <Link
          className="basis-48 grow md:aspect-0"
          href="/order/transfer"
          title="برای دیدن سفارش حضوری خود در کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/icon/take-away.png"
                width={110}
                height={110}
                alt="telegram choconan"
              />
              <H size={3}>ارسال پیک</H>
            </div>
          </Box>
        </Link>
      </div>
    </Layout>
  );
}
