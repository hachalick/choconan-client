import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { H } from "@/Components/Ui/H";
import {
  addCommas,
  digitsEnToFa,
  digitsFaToEn,
} from "@persian-tools/persian-tools";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import persian from "react-date-object/calendars/persian";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { InputContainer, Label } from "@/Components/Ui/Input";
import { Option, Select } from "@/Components/Ui/Select";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import Swal from "sweetalert2";
import { AccountContext } from "@/Contexts/Account.Context";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

export default function ReadFactor() {
  const setting = useContext(AccountContext);

  //#region state

  const [factors, setFactors] = useState<TGetFactors>([]);
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
        let pay_status: boolean | undefined;
        if (payStatus === "false") pay_status = false;
        else if (payStatus === "true") pay_status = true;
        const res = await FetchApi.Order.fetchGetOrders({
          access_token,
          start_day,
          end_day,
          pay_status,
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

  const onClickDeleteFactor = async ({ factor_id }: { factor_id: string }) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    try {
      Swal.fire({
        title: "آیا از حذف فاکتور اطمینان دارید ؟",
        showDenyButton: true,
        denyButtonText: "کنسل",
        confirmButtonText: "پاک بشه",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await FetchApi.Order.fetchDeleteOrder({ access_token, order_id: factor_id });
          Swal.fire({
            title: "با موفقیت حذف شد!",
            text: "فاکتور مورد نظر با موفقیت حذف شد",
            icon: "success",
            confirmButtonText: "تایید",
            timer: 1000,
          });
          setGetList(true);
          // console.log("on delete factor");
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

  const onClickEditFactor = ({ factor_id }: { factor_id: string }) => {
    setting?.factor.setState(factor_id);
    setting?.dashboard.setState(EDashboard.CREATE_FACTOR);
  };

  //#endregion

  //#region utility

  const sumFactor = (items: TGetFactorItem[]) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.product_count * (item.product_price - item.product_discount);
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
            <Label htmlFor="pay_status">وضعیت پرداخت</Label>
            <Select
              name={payStatus}
              title="pay_status"
              id="pay_status"
              onChange={(e) => onChangePayStatus(e)}
              defaultValue={payStatus}
            >
              <Option value="all">همه</Option>
              <Option value="true">شده</Option>
              <Option value="false">نشده</Option>
            </Select>
          </InputContainer>
        </div>
      </Box>
      <div className="flex flex-col gap-4">
        {factors.map((value, index) => (
          <Box variant="secondary" key={value.factor_id}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 p-2">
                <Button
                  variant="error"
                  title="delete"
                  type="button"
                  StartIcon={RiDeleteBin5Line}
                  onClick={() =>
                    onClickDeleteFactor({ factor_id: value.factor_id })
                  }
                />
                <Button
                  variant="warning"
                  title="edit"
                  type="button"
                  StartIcon={FaRegEdit}
                  onClick={() =>
                    onClickEditFactor({ factor_id: value.factor_id })
                  }
                />
                <Button
                  variant="primary"
                  title="print"
                  type="button"
                  href={`/account/factor/${value.factor_id}`}
                  StartIcon={MdOutlineLocalPrintshop}
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span>شناسه فاکتور</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.factor_id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تاریخ ایجاد</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(value.create_at)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تاریخ بروزرسانی</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{digitsEnToFa(value.update_at)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>شماره فاکتور</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.factor_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>سفارش دهنده</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.customer_mobile}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تحویل سفارش</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>وضعیت پرداخت</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>{value.pay_status ? "شده" : "نشده"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>مجموع قابل پرداخت</span>
                  <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                  <span>
                    {digitsEnToFa(addCommas(sumFactor(value.factor_items)))}{" "}
                    هزار تومان
                  </span>
                </div>
                <hr />
                <div className="flex flex-col gap-4">
                  <div>جزئیات سفارش</div>
                  <ul className="list-disc flex flex-col gap-2">
                    {value.factor_items.map((val, i) => (
                      <li
                        key={i}
                        className="flex flex-wrap justify-between items-center"
                      >
                        <span>
                          {digitsEnToFa(val.product_count)} عدد{" "}
                          {val.product_name || '" محصول ثبت نشده "'} به مبلغ
                          واحد {digitsEnToFa(val.product_price)} تومان
                        </span>
                        <span className="border-dotted border-b-4 border-white h-[1px] grow mx-4"></span>
                        <span>
                          (مجموع{" "}
                          {digitsEnToFa(
                            addCommas(val.product_count * val.product_price)
                          )}{" "}
                          هزار تومان)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
}
