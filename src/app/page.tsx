import Category from "@/Components/Customs/Category";
import { H } from "@/Components/Ui/H";
import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import {
  SliderHome1,
  SliderHome2,
  SliderHome3,
} from "@/Components/Customs/SliderHome";
import VideoHome from "@/Components/Customs/VideoHome";
import BannerLove from "@/Components/Layout/Banner-Love";
import Layout from "@/Components/Layout/Layout";
import Banner from "@/Components/Layout/Banner";
import Box from "@/Components/Ui/Box";
import P from "@/Components/Ui/P";

export default function Home() {
  return (
    <Layout variant="website">
      <ShowNestedRoute list_route={[{ path: "/", name: "خانه" }]} />
      {/* <BannerLove /> */}
      {/* <BannerYalda /> */}
      <Banner />
      <Box variant="primary">
        <H size={1}>به کافه شوکونان خوش آمدید</H>
      </Box>
      <SliderHome1 />
      <Box variant="guest">
        <P size={3}>
          کافه‌ها همیشه مکانی بوده‌اند که خانه و محل کار را به هم پیوند می‌دهند؛
          جایی برای آرامش، ارتباطات صمیمانه و تجربه طعم‌های تازه. در کافه
          شوکونان، ما فضایی گرم و صمیمی خلق کرده‌ایم که در آن احساس راحتی و
          رضایت کنید.
        </P>
      </Box>
      <Box variant="primary">
        <H size={1}>تجربه‌ای متفاوت از طعم و کیفیت</H>
      </Box>
      <SliderHome2 />
      <Box variant="guest">
        <P size={3}>
          در کافه شوکونان، از بیکری و پیستری گرفته تا بار گرم و سرد، تمام تلاش
          ما بر ارائه بهترین‌ها با عشق و دقت متمرکز است. خدمات حرفه‌ای و فضای
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
