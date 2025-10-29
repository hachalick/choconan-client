import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import {
  Table,
  TableBody,
  TableCaption,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@/Components/Ui/Table";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";

export default function OnlineSnap() {
  const [dataMatch, setDataMatch] = useState<{
    allProduct: Array<{
      id: number;
      title: string;
      price: number;
    }>;
    match: Array<{
      id: number;
      title: string;
      price: number;
      selfPrice: number;
      selfTitle: string;
    }>;
    notMatch: Array<{
      id: number;
      title: string;
      price: number;
      selfPrice: number;
    }>;
  }>({ allProduct: [], match: [], notMatch: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await FetchApi.OnlineShop.fetchCrawlerSnap();
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
            <TableTh>نام محصول در اسنپ</TableTh>
            <TableTh>نام محصول در شوکونان</TableTh>
            <TableTh>قیمت در اسنپ</TableTh>
            <TableTh>قیمت در شوکونان</TableTh>
          </TableTr>
        </TableThead>
        <TableBody>
          {dataMatch.match.map((val, i) => (
            <TableTr key={val.title + i}>
              <TableTd>
                <span className="flex justify-center">
                  <input
                    title="check"
                    type="checkbox"
                    checked={val.selfPrice === val.price}
                    className="w-5 h-5"
                  />
                </span>
              </TableTd>
              <TableTd>{val.title}</TableTd>
              <TableTd>{val.selfTitle}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.price))}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.selfPrice))}</TableTd>
            </TableTr>
          ))}
        </TableBody>
        <TableCaption position="bottom">
          جدول مقایسه محصولات درج شده{" "}
          {digitsEnToFa(addCommas(dataMatch.match.length))} مورد
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
          {dataMatch.notMatch.map((val, i) => (
            <TableTr key={val.title + i}>
              <TableTd>{val.id}</TableTd>
              <TableTd>{val.title}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.price))}</TableTd>
            </TableTr>
          ))}
        </TableBody>
        <TableCaption position="bottom">
          جدول محصولات درج نشده اسنپ فود{" "}
          {digitsEnToFa(addCommas(dataMatch.notMatch.length))} مورد
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
          {dataMatch.allProduct.map((val, i) => (
            <TableTr key={val.title + i}>
              <TableTd>{val.id}</TableTd>
              <TableTd>{val.title}</TableTd>
              <TableTd>{digitsEnToFa(addCommas(val.price))}</TableTd>
            </TableTr>
          ))}
        </TableBody>
        <TableCaption position="bottom">
          جدول کل محصولات اسنپ فود{" "}
          {digitsEnToFa(addCommas(dataMatch.allProduct.length))} مورد
        </TableCaption>
      </Table>
    </>
  );
}
