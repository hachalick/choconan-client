import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { H } from "@/Components/Element/H";
import React from "react";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function ContactUs() {
  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.CONTACT_US, name: "ارتباط با ما" },
        ]}
      />
      <Box variant="primary">
        <H size={1}>راه های ارتباطی و شبکه های اجتماعی کافه شونان</H>
      </Box>
      <div className="gap-7 flex flex-wrap py-4 justify-center">
        <a
          className="basis-48 grow md:aspect-0"
          href="https://t.me/shonanchannel"
          title="link channel telegram shonannel"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/telegram.png"
                width={60}
                height={60}
                alt="telegram shonan"
              />
              <H size={5} dir="ltr">
                @shonanchannel
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://instagram.com/shonan.ir"
          title="link instagram shonan"
          rel="noopener"
          target="_blank"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/instagram.png"
                width={60}
                height={60}
                alt="instagram shonan"
              />
              <H size={5} dir="ltr">
                @shonan.ir
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://wa.me/+989127017624"
          title="link whatsapp shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/whatsapp.png"
                width={60}
                height={60}
                alt="instagram shonan"
              />
              <H size={5} dir="ltr">
                +98 - 9127017624
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="mailto:shonan.ir@gmail.com"
          title="link instagram shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/gmail.png"
                width={60}
                height={60}
                alt="instagram shonan"
              />

              <H size={5} dir="ltr">
                shonan.ir
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://maps.app.goo.gl/1m3wv9uVnohukrrL7"
          title="link google maps shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/google-map.png"
                width={60}
                height={60}
                alt="google maps shonan"
              />
              <H size={5} dir="ltr">
                google maps
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://nshn.ir/bd_bvk0pyxueui"
          title="location neshan shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/neshan-logo.png"
                width={60}
                height={60}
                alt="location neshan shonan"
              />
              <H size={5} dir="ltr">
                neshan
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://balad.ir/p/5znhswrOssFX5H"
          title="link balad shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/balad.png"
                width={60}
                height={60}
                alt="location balad shonan"
              />
              <H size={5} dir="ltr">
                balad
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="tel:02186072428"
          title="link telephone shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/icon/telephone.png"
                width={60}
                height={60}
                alt="telephone shonan"
              />
              <H size={5} dir="ltr">
                021 - 8607 2428
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="tel:+989127017624"
          title="link mobile shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/icon/phone.png"
                width={60}
                height={60}
                alt="mobile shonan"
              />
              <H size={5} dir="ltr">
                +98 - 9127017624
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://tapsi.food/vendor/5668xz"
          title="link tapsi food shonan"
          rel="noopener"
          target="_blank"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/tapsifood.png"
                width={60}
                height={60}
                alt="tapsi food shonan"
              />
              <H size={5} dir="ltr">
                tapsi food
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://snappfood.ir/caffe/menu/%DA%A9%D8%A7%D9%81%D9%87_%D8%B4%D9%88%DA%A9%D9%88%D9%86%D8%A7%D9%86-r-12j1y4/"
          title="link snap food shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/snapfood.jpeg"
                width={60}
                height={60}
                alt="snap food shonan"
              />
              <H size={5} dir="ltr">
                snap food
              </H>
            </div>
          </Box>
        </a>
        <a
          className="basis-48 grow md:aspect-0"
          href="https://bordifood.com/shop-detail/%DA%A9%D8%A7%D9%81%D9%87-%D8%B4%D9%88%DA%A9%D9%88%D9%86%D8%A7%D9%86/305"
          title="link bordifood shonan"
          target="_blank"
          rel="noopener"
        >
          <Box variant="guest">
            <div className="flex flex-col justify-center items-center p-4 gap-5 h-40">
              <img
                src="/assets/image/logo/bordifood.png"
                width={60}
                height={60}
                alt="bordi food"
              />
              <H size={5} dir="ltr">
                bordi food
              </H>
            </div>
          </Box>
        </a>
      </div>
    </Layout>
  );
}
