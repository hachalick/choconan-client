import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuTapsiFoodViewModel } from "@/Common/Connection/Api/ViewModels/Service.Service.ViewModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@/Components/Element/Table";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";

export default function OnlineTapsi() {
  const [dataMatch, setDataMatch] = useState<ReadMenuTapsiFoodViewModel>({
    AllProduct: [],
    Match: [],
    NotMatch: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchApi.OnlineShop.ReadMenuTapsiFood();
      setDataMatch(res);
    };

    fetchData();
  }, []);

  return (
    <>
      <Table variant="secondary">
        <TableThead>
          <TableTr>
            <TableTh>هم قیمت</TableTh>
            <TableTh>نام محصول در تپسی</TableTh>
            <TableTh>نام محصول در شونان</TableTh>
            <TableTh>قیمت در تپسی</TableTh>
            <TableTh>قیمت در شونان</TableTh>
          </TableTr>
        </TableThead>
        <TableBody>
          {dataMatch.Match.map((val, i) => (
            <TableTr key={val.Title + i}>
              <TableTd>
                <span className="flex justify-center">
                  <input
                    title="check"
                    type="checkbox"
                    defaultChecked={val.SelfPrice === val.Price}
                    className="w-5 h-5"
                  />
                </span>
              </TableTd>
              <TableTd>{val.Title}</TableTd>
              <TableTd>{val.SelfTitle}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.Price))}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.SelfPrice))}</TableTd>
            </TableTr>
          ))}
        </TableBody>
        <TableCaption position="bottom">
          جدول مقایسه محصولات درج شده{" "}
          {digitsEnToFa(addCommas(dataMatch.Match.length))} مورد
        </TableCaption>
      </Table>
      <Table variant="secondary">
        <TableThead>
          <TableTr>
            <TableTh>شناسه محصول در اسنپ</TableTh>
            <TableTh>نام محصول در اسنپ</TableTh>
            <TableTh>قیمت در اسنپ</TableTh>
          </TableTr>
        </TableThead>
        <TableBody>
          {dataMatch.NotMatch.map((val, i) => (
            <TableTr key={val.Title + i}>
              <TableTd>{val.Id}</TableTd>
              <TableTd>{val.Title}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.Price))}</TableTd>
            </TableTr>
          ))}
        </TableBody>
        <TableCaption position="bottom">
          جدول محصولات درج نشده تپسی فود{" "}
          {digitsEnToFa(addCommas(dataMatch.NotMatch.length))} مورد
        </TableCaption>
      </Table>
      <Table variant="secondary">
        <TableThead>
          <TableTr>
            <TableTh>شناسه محصول در تپسی</TableTh>
            <TableTh>نام محصول در تپسی</TableTh>
            <TableTh>قیمت در تپسی</TableTh>
          </TableTr>
        </TableThead>
        <TableBody>
          {dataMatch.AllProduct.map((val, i) => (
            <TableTr key={val.Title + i}>
              <TableTd>{val.Id}</TableTd>
              <TableTd>{val.Title}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.Price))}</TableTd>
            </TableTr>
          ))}
        </TableBody>
        <TableCaption position="bottom">
          جدول کل محصولات تپسی فود{" "}
          {digitsEnToFa(addCommas(dataMatch.AllProduct.length))} مورد
        </TableCaption>
      </Table>
    </>
  );
}
