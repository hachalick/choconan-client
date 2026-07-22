"use client";
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { SlPrinter } from "react-icons/sl";
import { ImSphere } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { Button } from "@/Components/Element/Button";
import Layout from "@/Components/Layout/Layout";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadOrderDetailViewModel } from "@/Common/Connection/Api/ViewModels/Order.Service.ViewModel";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function OrderTablePanel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [table, setTable] = useState<ReadOrderDetailViewModel>();
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const setterData = async () => {
      const { id } = await params;
      console.log(id);

      const table = await FetchApi.Order.ReadOrderDetail({
        AccessToken: access_token,
        Id: id,
      });

      setTable(table);
      setShow(true);
    };

    setterData();
  }, []);

  useEffect(() => {
    if (table) {
      const total = table.FactorItems.map(
        (item) => item.ProductCount * item.ProductPrice,
      ).reduce((acc, item) => acc + item);
      setTotal(total);
    }
  }, [table]);

  if (show && table)
    return (
      <Layout variant="dashboard">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="bg-white w-full p-2">
            <div className="box-header flex justify-center items-center text-center font-iranyekan">
              <div className="w-24 h-16 flex justify-center items-center">
                <span className="mx-2">{digitsEnToFa(table.Location)}</span>
              </div>
              <div className="mx-auto">
                <img
                  src="/assets/image/logo/s-logo.jpg"
                  alt="logo"
                  width={70}
                  height={70}
                />
              </div>
              <div className=" w-24 h-16 flex justify-center items-center">
                {digitsEnToFa(table.FactorDate.split(" ")[0])}
                <br />
                {digitsEnToFa(table.FactorDate.split(" ")[1])}
              </div>
            </div>
            <div className="box-title text-center my-2 font-extrabold text-2xl">
              کافه شونان
            </div>
            <table className="w-full table-auto border-collapse border mt-3 font-iranyekan">
              <thead>
                <tr>
                  <th className="border bg-gray-100 ">سفارشات</th>
                  <th className="border bg-gray-100">فی</th>
                  <th className="border bg-gray-100">تعداد</th>
                  <th className="border bg-gray-100">جمع</th>
                </tr>
              </thead>
              <tbody className="text-sm ">
                {table.FactorItems.map((data, i) => (
                  <tr key={i}>
                    <td className="border">{data.ProductName}</td>
                    <td className="border text-center text">
                      {digitsEnToFa(addCommas(data.ProductPrice))}
                    </td>
                    <td className="border text-center">
                      {digitsEnToFa(data.ProductCount)}
                    </td>
                    <td className="border text-center">
                      {digitsEnToFa(
                        addCommas(data.ProductCount * data.ProductPrice),
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border-b">جمع خرید</td>
                  <td className="border-b"></td>
                  <td className="border-b"></td>
                  <td className="border text-center">
                    {digitsEnToFa(addCommas(total))}
                  </td>
                </tr>
                <tr>
                  <td className="border-b">مالیات</td>
                  <td className="border-b text-center">
                    {digitsEnToFa(table.Tax)}
                  </td>
                  <td className="border-b">درصد</td>
                  <td className="border text-center">
                    {digitsEnToFa(addCommas(total * table.Tax * 10))}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="my-3 border-b pb-3 border-black font-iranyekan">
              <div className="flex flex-wrap items-center justify-center">
                قابل پرداخت: <span className="border-b-2 grow h-1 mx-2"></span>
                {digitsEnToFa(
                  addCommas(Math.floor(total + (total * table.Tax) / 100)),
                )}{" "}
                تومان
              </div>
            </div>
            <div className="text-sm flex items-center mb-1" dir="ltr">
              <ImSphere size={20} className="w-7" /> shonan.ir
            </div>
            <div className="text-sm flex items-center mb-1" dir="ltr">
              <FaInstagram size={20} className="w-7" /> shonan.ir
            </div>
            <div className="text-sm flex items-center mb-1">
              آدرس: سهرودی جنوبی - نرسیده به مطهری - نبش کوچه اسلامی - پلاک ۱۶۲
            </div>
            <div className="text-sm text-center mb-1 underline">
              مشتاق دیدار مجددتون هستیم
            </div>
          </div>
          <div className="print:hidden flex flex-col gap-2 mt-2 w-64">
            <Button
              title="print"
              variant="primary"
              StartIcon={SlPrinter}
              onClick={() => window.print()}
              wFull
            >
              print
            </Button>
            <Button
              title="بازگشت به پنل"
              variant="primary"
              href={EInnerRoute.ACCOUNT}
              wFull
            >
              بازگشت به پنل
            </Button>
          </div>
        </div>
      </Layout>
    );
}
