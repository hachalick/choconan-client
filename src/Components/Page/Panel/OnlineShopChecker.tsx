import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import {
  getPropChoconan,
  getPropSnapFood,
  getPropTapsiFood,
  margeListProduct,
} from "@/Common/Utils/PrettiJson";
import { Button } from "@/Components/Ui/Button";
import Details from "@/Components/Ui/Details";
import Summary from "@/Components/Ui/Summary";
import {
  Table,
  TableBody,
  TableCaption,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@/Components/Ui/Table";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";

function OnlineShopCheckerPanel() {
  const [dataMatchProduct, seTableTdataMatchProduct] =
    useState<TMatchProduct>();
  const [message, setMessage] = useState("در حال بارگیری اطلاعات . . .");
  const [openSummery, setOpenSummery] = useState({
    choconan: false,
    snap_food: false,
    tapsi_food: false,
  });
  const [geTableTdata, setGetData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMessage("در حال بارگیری اطلاعات تپسی . . .");
        const resTapsi = await FetchApi.OnlineShop.fetchCrawlerTapsi();
        const listProductTapsiFood = getPropTapsiFood(resTapsi);
        setMessage("در حال بارگیری اطلاعات اسنپ . . .");
        const resSnap = await FetchApi.OnlineShop.fetchCrawlerSnap();
        const listProductSnapFood = getPropSnapFood(resSnap);
        setMessage("در حال بارگیری اطلاعات شوکونان . . .");
        const resChoconan = await FetchApi.Menu.fetchAllProductMenu();
        const listProductChoconan = getPropChoconan(resChoconan);
        setMessage("در حال بارگیری اطلاعات . . .");
        const margeListProducts = margeListProduct({
          dataChoconan: listProductChoconan,
          dataSnapFood: listProductSnapFood,
          dataTapsiFood: listProductTapsiFood,
        });
        seTableTdataMatchProduct(margeListProducts);
        setGetData(false);
      } catch (error) {}
    };
    geTableTdata && fetchData();
  }, [geTableTdata]);

  const onClickSummeryHandler = () => {
    window.scrollTo(0, 0);
  };

  if (dataMatchProduct) {
    return (
      <>
        <div className="flex justify-end">
          <Button
            type="button"
            title="re-get"
            variant="secondary"
            onClick={() => setGetData(true)}
          >
            <TbRefresh size={25} /> بازخوانی مجدد
          </Button>
        </div>
        <div className="flex flex-col gap-5 relative">
          <Details
            name="choconan"
            open={openSummery.choconan}
            onClick={() => onClickSummeryHandler()}
          >
            <Summary variant="primary">گزارش یکسانان</Summary>
            <div className="flex flex-col gap-4">
              {dataMatchProduct.productFound.map((item, i) => (
                <Table key={i} variant="secondary">
                  <TableCaption position="bottom">
                    جدول محصول {item.choconan.name}
                  </TableCaption>
                  <TableThead>
                    <TableTr>
                      <TableTh>فروشنده</TableTh>
                      <TableTh>قیمت</TableTh>
                      <TableTh>موجودی</TableTh>
                    </TableTr>
                  </TableThead>
                  <TableBody>
                    <TableTr key={i}>
                      <TableTd>شوکونان</TableTd>
                      <TableTd>{digitsEnToFa(item.choconan.price)}</TableTd>
                      <TableTd>
                        {item.choconan.available ? "دارد" : "ندارد"}
                      </TableTd>
                    </TableTr>
                    <TableTr key={i}>
                      <TableTd>اسنپ فود</TableTd>
                      <TableTd>
                        {item.snapFood === undefined
                          ? " UNKNOWN"
                          : digitsEnToFa(item.snapFood.price)}
                      </TableTd>
                      <TableTd>
                        {item.snapFood === undefined
                          ? " UNKNOWN"
                          : item.snapFood.available
                          ? "دارد"
                          : "ندارد"}
                      </TableTd>
                    </TableTr>
                    <TableTr key={i}>
                      <TableTd>تپسی فود</TableTd>
                      <TableTd>
                        {item.tapsiFood === undefined
                          ? " UNKNOWN"
                          : digitsEnToFa(item.tapsiFood.price)}
                      </TableTd>
                      <TableTd>
                        {item.tapsiFood === undefined
                          ? " UNKNOWN"
                          : item.tapsiFood.available
                          ? "دارد"
                          : "ندارد"}
                      </TableTd>
                    </TableTr>
                  </TableBody>
                </Table>
              ))}
            </div>
          </Details>
          <Details
            name="snap_food"
            open={openSummery.snap_food}
            onClick={() => onClickSummeryHandler()}
          >
            <Summary variant="primary">یکسان نشده های اسنپ فود</Summary>
            <Table variant="secondary">
              <TableCaption position="bottom">
                جدول یکسان نشده های اسنپ فود
              </TableCaption>
              <TableThead>
                <TableTr>
                  <TableTh>محصول</TableTh>
                  <TableTh>قیمت</TableTh>
                  <TableTh>موجودی</TableTh>
                </TableTr>
              </TableThead>
              <TableBody>
                {dataMatchProduct.snapFoodNotMatch.map((val, i) => (
                  <TableTr key={val.name + i}>
                    <TableTd>{val.name}</TableTd>
                    <TableTd>{digitsEnToFa(val.price)}</TableTd>
                    <TableTd>{val.available ? "دارد" : "ندارد"}</TableTd>
                  </TableTr>
                ))}
              </TableBody>
            </Table>
          </Details>
          <Details
            name="tapsi_food"
            open={openSummery.tapsi_food}
            onClick={() => onClickSummeryHandler()}
          >
            <Summary variant="primary">یکسان نشده های تپسی فود</Summary>
            <Table variant="secondary">
              <TableCaption position="bottom">
                جدول یکسان نشده های تپسی فود
              </TableCaption>
              <TableThead>
                <TableTr>
                  <TableTh>محصول</TableTh>
                  <TableTh>قیمت</TableTh>
                  <TableTh>موجودی</TableTh>
                </TableTr>
              </TableThead>
              <TableBody>
                {dataMatchProduct.tapsiFoodNotMatch.map((val, i) => (
                  <TableTr key={val.name + i}>
                    <TableTd>{val.name}</TableTd>
                    <TableTd>{digitsEnToFa(val.price)}</TableTd>
                    <TableTd>{val.available ? "دارد" : "ندارد"}</TableTd>
                  </TableTr>
                ))}
              </TableBody>
            </Table>
          </Details>
        </div>
      </>
    );
  } else {
    return (
      <div className="text-lg flex items-center justify-center p-3 min-h-[90dvh]">
        <img
          src="/assets/image/icon/loading.png"
          width={20}
          height={20}
          alt="loading img"
          className="mx-2 w-6 animate-spin"
        />
        {message}
      </div>
    );
  }
}

export default OnlineShopCheckerPanel;
