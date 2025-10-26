import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import { H } from "@/Components/Ui/H";
import P from "@/Components/Ui/P";
import React from "react";

function About() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/about-us", name: "درباره ما" },
        ]}
      />
      <Box variant="primary">
        <H size={1}>درباره کافه شوکونان چی میدانید ؟!</H>
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
        <H size={2}>فعالیت کافه شوکونان:</H>
      </Box>{" "}
      <Box variant="guest">
        <P size={3}>
          در ابتدا به وسیله پیج اینستاگرامی choconan.ir فعالیت خود را شروع کرد و
          با عرضه کردن محصولات نان و شکلات های خانگی کار جدی خود را آغاز کرد. در
          نهایت در بهار سال 1403 با ایجاد یک مغازه واقع در سهرودی جنوبی تصمیم به
          ارائه خدمات خود به صورت حضوری انجام داد.
        </P>
      </Box>
      <br />
      <Box variant="primary">
        <H size={2}>در کافی شاپ شوکونان همیشه مواد تازه میل کنید:</H>
      </Box>
      <Box variant="guest">
        <P size={3}>
          تمامی محصولات مثل کیک کوکی شکلات کروسان توسط خانم فرهادیان مدیر coffee
          choconan تولید و عرضه میشود.
        </P>
      </Box>
      <br />
      <Box variant="primary">
        <H size={2}>چرا کافی شاپ شوکونان:</H>
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
        <H size={2}>نحوه ارائه خدمات کافه شوکونان:</H>
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
