import ShowNestedRoute from "@/Components/Customs/ShowNestedRoute";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Ui/Box";
import Datalist from "@/Components/Ui/Details";
import Summery from "@/Components/Ui/Summary";
import React from "react";

function FAQ() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: "/", name: "خانه" },
          { path: "/faqs", name: "سوالات متداول" },
        ]}
      />
      <Datalist>
        <Summery variant="primary">نحوه رزرو کردن کافه شوکونان</Summery>
        <Box variant="guest">
          در ابتدا نیاز است که بصورت حضوری جزئیات مطرح شود اما بصورت کلی به
          مواردی اشاره خواهیم کرد.
          <br />
          رزرو کردن به دو صورت امکان پذیر می باشد
          <br />
          <ol className="list-decimal">
            <li className="mr-4">
              فضا داخل یا ایوان بدون درخواست سرویس از کافه، فضا آن قسمت بطور
              کامل در اختیار شخص قرار می گیرد که در اینصورت مبلغی به صورت توافقی
              بنابر روز، ساعت، میزان زمان و ... برای اجاره مکان تعیین می شود که
              یک سوم آن به عنوان پیش پرداخت و مابقی آن در روز مراسم پرداخت می
              شود.
            </li>
            <li className="mr-4">
              فضا داخل یا ایوان با گرفتن سرویس از کافه، هزینه و تعداد هر محصول
              بنابر قیمت روز برآورد می شود و دو ثلث آن هزینه به عنوان پیش پرداخت
              و مابقی آن به در روز مراسم پرداخت می شود.
            </li>
          </ol>
          <br />
        </Box>
      </Datalist>
    </Layout>
  );
}

export default FAQ;
