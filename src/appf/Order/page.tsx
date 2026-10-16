import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { H } from "@/Components/Element/H";
import Link from "next/link";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function Order() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.ORDER, name: "سبد خرید" },
        ]}
      />
      <Box variant="primary">
        <H size={1}>نوع سفارش دهی</H>
      </Box>
      <div className="gap-7 flex flex-wrap py-4 justify-center">
        <Link
          className="basis-48 grow md:aspect-0"
          href={EInnerRoute.ORDER_PRESENT}
          title="برای دیدن سفارش ارسال پیک خود از کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/icon/present.png"
                width={110}
                height={110}
                alt="telegram shonan"
              />
              <H size={3}>حضوری</H>
            </div>
          </Box>
        </Link>
        <Link
          className="basis-48 grow md:aspect-0"
          href={EInnerRoute.ORDER_TRANSFER}
          title="برای دیدن سفارش حضوری خود در کافه"
        >
          <Box variant="guest">
            <div className="flex flex-col gap-5 justify-center items-center">
              <img
                src="/assets/image/icon/take-away.png"
                width={110}
                height={110}
                alt="telegram shonan"
              />
              <H size={3}>ارسال پیک</H>
            </div>
          </Box>
        </Link>
      </div>
    </Layout>
  );
}
