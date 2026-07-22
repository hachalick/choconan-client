import { EServerRoute } from "@/Common/Enums/ServerRout";
import { Metadata } from "next";
import Image from "next/image";
import { LuTimer } from "react-icons/lu";
import { redirect, RedirectType } from "next/navigation";
import { metadata } from "@/app/layout";
import Layout from "@/Components/Layout/Layout";
import Box from "@/Components/Element/Box";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuProductDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import ShowNestedRoute from "@/Components/Ui/ShowNestedRoute";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default async function ProductDetailsMenu({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  let response: ReadMenuProductDetailViewModel;

  try {
    const res = await FetchApi.Menu.ReadMenuProductDetail({
      Id: id,
    });

    response = res;
  } catch (error) {
    redirect(EInnerRoute.MENU, RedirectType.replace);
  }

  return (
    <Layout variant="website">
      <ShowNestedRoute
        list_route={[
          { path: EInnerRoute.HOME, name: "خانه" },
          { path: EInnerRoute.MENU, name: "منو" },
          {
            path: `${EInnerRoute.MENU_CATEGORY}/${response.CategoryId}`,
            name: `${response.CategoryName}`,
          },
          {
            path: `${EInnerRoute.MENU_PRODUCT}/${response.Id}`,
            name: `${response.Name}`,
          },
        ]}
      />
      <div
        className={`max-w-[620px] relative my-3 mx-auto mb-5 ${
          response.IsShowMenu ? "grayscale-0" : "grayscale"
        }`}
      >
        <Box variant="primary">
          <div className="flex flex-col justify-center items-center pt-6">
            <Image
              src={
                EServerRoute.HOST +
                (response.SrcImage || `/default-product.jpg`)
              }
              alt={response.CategoryName || "image product"}
              className="w-[90%] rounded-2xl animate-show-gray-to-color"
              width={500}
              height={500}
            />
            <div
              className="mt-4 py-1 px-2 rounded-lg text-center flex items-center"
              dir="ltr"
            >
              {response.Waiting} <LuTimer className="mx-1" /> | {response.Price}{" "}
              T
            </div>
          </div>
          <div className="mt-3 rounded-b-3xl pb-3">
            <h1 className="font-bold text-center text-xl mb-4">
              {response.Name}
            </h1>
            <p className="mx-6 text-justify mb-2">{response.Description}</p>
            {/* {response.IsShowMenu ? (
              <AddDeleteProductMenu
                category={decodeURI(response.CategoryName)}
                id_product_menu={parseInt(product_id_number)}
              />
            ) : (
              <span className="my-3 text-center mr-5 flex gap-2">
                <IoAlertCircleOutline size={25} />
                ناموجود
                <IoAlertCircleOutline size={25} />
              </span>
            )} */}
          </div>
        </Box>
      </div>
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const newMetaData = { ...metadata };
  const { id } = await params;

  try {
    const res = await FetchApi.Menu.ReadMenuProductDetail({ Id: id });

    newMetaData.title = (res.MetaTitle || "") + " کافه شونان | shonan";
    newMetaData.description =
      (res.MetaDescription || "") + " کافه شونان | shonan";
  } catch (err) {
    console.error("Error fetching metadata:", err);
  }

  return newMetaData;
}
