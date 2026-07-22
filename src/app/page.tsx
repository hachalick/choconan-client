export const dynamic = "force-dynamic";
export const revalidate = 0;

import { H } from "@/Components/Element/H";
import Layout from "@/Components/Layout/Layout";
import Banner from "@/Components/Ui/Banner";
import Box from "@/Components/Element/Box";
import P from "@/Components/Element/P";
import {
  SliderHome1,
  SliderHome2,
  SliderHome3,
} from "@/Components/Ui/SliderHome";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import Category from "@/Components/Ui/Category";
import VideoHome from "@/Components/Ui/VideoHome";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function Home() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[{ path: EInnerRoute.HOME, name: "خانه" }]}
      />
      {/* <BannerLove /> */}
      {/* <BannerYalda /> */}
      <Banner />
      <Box variant="primary">
        <H size={1}>به کافه شونان خوش آمدید</H>
      </Box>
      <SliderHome1 />
      <Box variant="guest">
        <P size={3}>
          کافه‌ها همیشه مکانی بوده‌اند که خانه و محل کار را به هم پیوند می‌دهند؛
          جایی برای آرامش، ارتباطات صمیمانه و تجربه طعم‌های تازه. در کافه شونان،
          ما فضایی گرم و صمیمی خلق کرده‌ایم که در آن احساس راحتی و رضایت کنید.
        </P>
      </Box>
      <Box variant="primary">
        <H size={1}>تجربه‌ای متفاوت از طعم و کیفیت</H>
      </Box>
      <SliderHome2 />
      <Box variant="guest">
        <P size={3}>
          در کافه شونان، از بیکری و پیستری گرفته تا بار گرم و سرد، تمام تلاش ما
          بر ارائه بهترین‌ها با عشق و دقت متمرکز است. خدمات حرفه‌ای و فضای
          خانوادگی، اولویت ما برای جلب رضایت شماست و با توجه به جزئیات، تجربه‌ای
          خاص و فراموش‌نشدنی برای شما رقم می‌زنیم.
        </P>
      </Box>
      <Box variant="primary">
        <H size={1}>شما مهمان و دوست ما هستید</H>
      </Box>
      <SliderHome3 />
      <Box variant="guest">
        <P size={3}>
          ما شما را نه به‌عنوان مشتری، بلکه به‌عنوان مهمان و دوست خود می‌بینیم.
          همراهی شما به ما برای ارائه خدمات بهتر و هدایت خلق تجربه‌های بی‌نظیر
          انگیزه می‌دهد و در مسیر رشد و پایداری گام های ما را محکم تر می‌کند.
          <b className="font-semibold mx-2">مشتاق دیدارتان هستیم!</b>
        </P>
      </Box>
      {/* <SearchBoxMenu /> */}
      <Category />
      <VideoHome />
    </Layout>
  );
}
