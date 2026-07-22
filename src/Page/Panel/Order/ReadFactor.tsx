import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import { H } from "@/Components/Element/H";
import {
  addCommas,
  digitsEnToFa,
  digitsFaToEn,
} from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { InputContainer, Label } from "@/Components/Element/Input";
import { Option, Select } from "@/Components/Element/Select";
import { FaRegEdit } from "react-icons/fa";
import {
  MdOutlineAttachMoney,
  MdOutlineLocalPrintshop,
  MdOutlineMoneyOff,
} from "react-icons/md";
import Swal from "sweetalert2";
import { AccountContext } from "@/Contexts/Account.Context";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadOrderListViewModel } from "@/Common/Connection/Api/ViewModels/Order.Service.ViewModel";
import { EInnerRoute } from "@/Common/Enums/InnerRout";

export default function ReadFactor() {
  const setting = useContext(AccountContext);

  //#region state

  const [factors, setFactors] = useState<Array<ReadOrderListViewModel>>([]);
  const [getList, setGetList] = useState(true);
  const [payStatus, setPayStatus] = useState<"false" | "true" | "all">("false");

  const [rangeDay, setRangeDay] = useState([
    new DateObject({ calendar: persian }).subtract(0, "days"),
    new DateObject({ calendar: persian }).add(0, "days"),
  ]);

  //#endregion

  //#region effect

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const day = digitsFaToEn(String(rangeDay)).split(",");
    const start_day = day[0];
    const end_day = day[1];

    if (getList) {
      const fetchData = async () => {
        let IsPay: boolean | undefined;
        if (payStatus === "false") IsPay = false;
        else if (payStatus === "true") IsPay = true;
        else IsPay = undefined;

        const res = await FetchApi.Order.ReadOrderList({
          AccessToken: access_token,
          StartDay: start_day,
          EndDay: end_day,
          IsPay: IsPay,
        });

        setFactors(res);
        setGetList(false);
      };
      fetchData();
    }
  }, [getList, rangeDay, payStatus]);

  //#endregion

  //#region on click

  const onChangePayStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPayStatus(e.target.value as "false" | "true" | "all");
    setGetList(true);
  };

  const onClickDeleteFactor = async ({ Id }: { Id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      Swal.fire({
        title: "آیا از حذف فاکتور اطمینان دارید ؟",
        showDenyButton: true,
        denyButtonText: "کنسل",
        confirmButtonText: "پاک بشه",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await FetchApi.Order.DeleteOrder({
            AccessToken: access_token,
            Id: Id,
          });

          Swal.fire({
            title: "با موفقیت حذف شد!",
            text: "فاکتور مورد نظر با موفقیت حذف شد",
            icon: "success",
            confirmButtonText: "تایید",
            timer: 1000,
          });

          setGetList(true);
        }
      });
    } catch (error) {
      Swal.fire({
        title: "با موفقیت حذف نشد!",
        text: "فاکتور مورد نظر با موفقیت حذف نشد",
        icon: "error",
        confirmButtonText: "تایید",
        timer: 1000,
      });
    }
    setting?.factor.setState("");
  };

  const onClickEditFactor = ({ Id }: { Id: string }) => {
    setting?.factor.setState(Id);
    setting?.dashboard.setState(EDashboard.CREATE_FACTOR);
  };

  const onClickChangePayStatus = async ({
    Id,
    IsPay,
  }: {
    Id: string;
    IsPay: boolean;
  }) => {
    const access_token = sessionStorage.getItem("access_token") || "";

    try {
      await FetchApi.Order.UpdatePayStatusOrder({
        AccessToken: access_token,
        Id: Id,
        IsPay: IsPay,
      });
      setGetList(true);
    } catch {}
  };

  //#endregion

  //#region utility

  const sumAllFactor = (items: Array<ReadOrderListViewModel>) => {
    let sum = 0;
    items.forEach((item) => {
      item.FactorItems.forEach((product) => {
        sum +=
          product.ProductCount *
          (product.ProductPrice - product.ProductDiscount);
      });
    });
    return sum;
  };

  const sumFactor = (
    items: Array<{
      Id: string;
      ProductCount: number;
      ProductDiscount: number;
      ProductName: string;
      ProductPrice: number;
    }>,
  ) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.ProductCount * (item.ProductPrice - item.ProductDiscount);
    });
    return sum;
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>
          لیست فاکتور های اخیر ( {digitsEnToFa(factors.length)} نتیجه )
        </H>
      </Box>
      <Box variant="primary">
        <div className="flex gap-4 justify-between flex-wrap">
          <div className="flex flex-col gap-4">
            <InputContainer>
              <Label htmlFor="end_day">بازه روز</Label>
              <div className="text-black bg-white pr-4 py-2 rounded-lg ">
                <DatePicker
                  hideOnScroll
                  arrow={false}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  value={rangeDay}
                  onChange={(e) => {
                    setRangeDay(e);
                    setGetList(true);
                  }}
                  className="hours-datapicker green"
                  inputClass="hours-datapicker"
                  range
                />
              </div>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="IsPay">وضعیت پرداخت</Label>
              <Select
                name={payStatus}
                title="IsPay"
                id="IsPay"
                onChange={(e) => onChangePayStatus(e)}
                defaultValue={payStatus}
              >
                <Option value="all">همه</Option>
                <Option value="true">شده</Option>
                <Option value="false">نشده</Option>
              </Select>
            </InputContainer>
          </div>
          <div className="flex flex-col gap-4">
            <span>{digitsEnToFa(addCommas(sumAllFactor(factors)))} تومان</span>
          </div>
        </div>
      </Box>
      <div className="flex flex-col gap-4">
        {factors.map((value, index) => (
          <Box variant="secondary" key={value.Id}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="error"
                  title="delete"
                  type="button"
                  StartIcon={RiDeleteBin5Line}
                  onClick={() => onClickDeleteFactor({ Id: value.Id })}
                />
                <Button
                  variant="warning"
                  title="edit"
                  type="button"
                  StartIcon={FaRegEdit}
                  onClick={() => onClickEditFactor({ Id: value.Id })}
                />
                <Button
                  variant="primary"
                  title="print"
                  type="button"
                  href={`${EInnerRoute.ACCOUNT_FACTOR}/${value.Id}`}
                  StartIcon={MdOutlineLocalPrintshop}
                />
                <Button
                  variant={value.IsPay ? "success" : "error"}
                  title="وضعیت پرداخت"
                  type="button"
                  StartIcon={
                    value.IsPay ? MdOutlineAttachMoney : MdOutlineMoneyOff
                  }
                  onClick={() =>
                    onClickChangePayStatus({
                      Id: value.Id,
                      IsPay: !value.IsPay,
                    })
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span>شماره فاکتور</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(addCommas(value.FactorNumber))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تاریخ فاکتور</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(`${value.FactorDate.split(" ")[1]} ${value.FactorDate.split(" ")[0]}`)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>سفارش دهنده</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(value.CustomerMobile)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تحویل سفارش</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(value.Location)}</span>
                </div>
                <hr />
                <div className="flex flex-col gap-4">
                  <div>جزئیات سفارش</div>
                  <ul className="list-disc flex flex-col gap-2">
                    {value.FactorItems.map((val, i) => (
                      <li
                        key={i}
                        className="flex flex-wrap justify-between items-center"
                      >
                        <span>
                          {digitsEnToFa(addCommas(val.ProductCount))} عدد{" "}
                          {val.ProductName || '" محصول ثبت نشده "'} به مبلغ واحد{" "}
                          {digitsEnToFa(addCommas(val.ProductPrice))} تومان
                        </span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>
                          (مجموع{" "}
                          {digitsEnToFa(
                            addCommas(val.ProductCount * val.ProductPrice),
                          )}{" "}
                          تومان)
                        </span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                </div>
                <div className="flex justify-between items-center">
                  <span>مجموع قابل پرداخت</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>
                    {digitsEnToFa(addCommas(sumFactor(value.FactorItems)))}{" "}
                    تومان
                  </span>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
