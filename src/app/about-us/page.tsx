import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { H } from "@/Components/Element/H";
import P from "@/Components/Element/P";
import React from "react";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

function About() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.ABOUT_US, name: "درباره ما" },
        ]}
      />
      <Box variant="primary">
        <H size={1}>درباره کافه شونان چی میدانید ؟!</H>
      </Box>
      <Box variant="guest">
        <P size={3}>
          دارای دو محیط می باشد. یک فضای خارجی ایوان و یک فضای داخلی سالن که یک
          محیط آرام و خانوادگی، هر سلیقه ای را با این محل خاص مانوس می کند. ساعت
          کاری آن در روزهای شنبه تا پنجشنبه از 8 صبح تا 12 شب است و در روز جمعه
          از 11 صبح تا 12 شب آماده پذیرایی از مشتریان عزیز می باشد.
        </P>
      </Box>
      <br />
      <Box variant="primary">
        <H size={2}>فعالیت کافه شونان:</H>
      </Box>{" "}
      <Box variant="guest">
        <P size={3}>
          در ابتدا به وسیله پیج اینستاگرامی shonan.ir فعالیت خود را شروع کرد و
          با عرضه کردن محصولات نان و شکلات های خانگی کار جدی خود را آغاز کرد. در
          نهایت در بهار سال 1403 با ایجاد یک مغازه واقع در سهرودی جنوبی تصمیم به
          ارائه خدمات خود به صورت حضوری انجام داد.
        </P>
      </Box>
      <br />
      <Box variant="primary">
        <H size={2}>در کافی شاپ شونان همیشه مواد تازه میل کنید:</H>
      </Box>
      <Box variant="guest">
        <P size={3}>
          تمامی محصولات مثل کیک کوکی شکلات کروسان توسط خانم فرهادیان مدیر coffee
          shonan تولید و عرضه میشود.
        </P>
      </Box>
      <br />
      <Box variant="primary">
        <H size={2}>چرا کافی شاپ شونان:</H>
      </Box>
      <Box variant="guest">
        <P size={3}>
          با داشتن پروانه کسب و کار میتوانید اطمینان از فعالیت قانونی حاصل کنید.
          <br />
          میتوانید برای صبحانه ناهار و شام در یک محیط آرام و مواد اولیه با کیفیت
          از خدمات ما بهره ببرید.
        </P>
      </Box>
      <br />
      <Box variant="primary">
        <H size={2}>نحوه ارائه خدمات کافه شونان:</H>
      </Box>
      <Box variant="guest">
        <P size={3}>
          برگزاری ایونت های مختصر و گرفتن جشن تولد که از قبل هماهنگی هایی لازم
          را با مدیریت انجام داده اند.
        </P>
      </Box>
    </Layout>
  );
}

export default About;
