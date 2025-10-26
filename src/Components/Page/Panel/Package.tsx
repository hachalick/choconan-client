import { H } from "@/Components/Ui/H";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "@/Assets/Styles/PackagePanel.style.css";
import {
  digitsEnToFa,
  digitsFaToEn,
  addCommas,
} from "@persian-tools/persian-tools";
import HorizontalScrollEconomicPackagePanel from "@/Components/Customs/HorizontalScrollEconomicPackagePanel";
import { ERoute } from "@/Common/Enums/Routs";
import { RiDeleteBin5Line } from "react-icons/ri";
import SelectProduct from "@/Components/Customs/SelectProduct";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import { Input, InputContainer, Label } from "@/Components/Ui/Input";
import Form from "@/Components/Ui/Form";
import "react-multi-date-picker/styles/colors/green.css"
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";


export default function PackagePanel() {
  const defaultEconomic = {
    src: "",
    title: "",
    start_hours: "",
    end_hours: "",
    start_day: "",
    end_day: "",
    price: 0,
    is_active: true,
  };

  //#region state

  const [startHours, setStartHours] = useState<Value>(
    new DateObject({ calendar: persian }).setHour(8).setMinute(0).setSecond(0)
  );
  const [endHours, setEndHours] = useState<Value>(
    new DateObject({ calendar: persian }).setHour(23).setMinute(0).setSecond(0)
  );
  const [rangeDay, setRangeDay] = useState([
    new DateObject({ calendar: persian }).subtract(0, "days"),
    new DateObject({ calendar: persian }).add(2, "days"),
  ]);
  const [addEconomicPackage, setAddEconomicPackage] = useState(false);
  const [getListEconomicStatus, setGetListEconomicStatus] = useState(true);
  const [countProductEconomicPackage, setCountProductEconomicPackage] =
    useState(1);
  const [economicPackage, setEconomicPackage] =
    useState<TEconomicPackage>(defaultEconomic);
  const [selectProduct, setSelectProduct] = useState({
    product_id: "",
    name: "",
    price: 0,
  });
  const [selectProducts, setSelectProducts] = useState<
    {
      product_id: string;
      name: string;
      count: number;
      price: number;
    }[]
  >([]);

  const [listEconomicPackage, setListEconomicPackage] =
    useState<TGetEconomicPackages>([]);

  //#endregion

  //#region effect

  useEffect(() => {
    if (getListEconomicStatus) {
      const fetchData = async () => {
        const res = await FetchApi.Order.fetchGetEconomicPackages({ all: "a" });
        setListEconomicPackage(res);
      };
      fetchData();
      setGetListEconomicStatus(false);
    }
  }, [getListEconomicStatus]);

  //#endregion

  //#region change handlers

  const onChangeHandler = (e: any) => {
    setEconomicPackage((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  //#endregion

  //#region click handlers

  const onClickChangeStatuesAdd = () => {
    setAddEconomicPackage((val) => !val);
  };

  const onClickChangeStatuesActive = () => {
    setEconomicPackage((val) => ({ ...val, is_active: !val.is_active }));
  };

  const onClickAddEconomicPackage = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const data = economicPackage;
    data.start_hours = digitsFaToEn(String(startHours));
    data.end_hours = digitsFaToEn(String(endHours));
    const day = digitsFaToEn(String(rangeDay)).split(",");
    data.start_day = day[0];
    data.end_day = day[1];
    if (typeof data.price) data.price = parseInt(String(data.price));
    try {
      setEconomicPackage(defaultEconomic);
      onClickChangeStatuesAdd();
      const res = await FetchApi.Order.fetchAddEconomicPackage({
        access_token,
        economic_package: data,
      });
      for (const item of selectProducts) {
        await FetchApi.Order.fetchAddContentEconomicPackage({
          access_token,
          economic_package_id: res.economic_package_id,
          product_id: item.product_id,
          count: item.count,
        });
      }
      setSelectProducts([]);
    } catch (error) {}
    setGetListEconomicStatus(true);
  };

  const onClickAddProductToPackage = () => {
    if (
      selectProduct.name &&
      selectProduct.product_id &&
      countProductEconomicPackage > 0
    ) {
      if (
        !selectProducts.find((p) => p.product_id === selectProduct.product_id)
      ) {
        setSelectProducts((val) => [
          ...val,
          { ...selectProduct, count: countProductEconomicPackage },
        ]);
        setCountProductEconomicPackage(1);
      }
    }
  };

  const onClickDeleteProductToPackage = (product_id: string) => {
    setSelectProducts((prev) => {
      const index = prev.findIndex(
        (product) => product.product_id === product_id
      );
      return prev.filter((_, idx) => idx !== index);
    });
  };

  //#endregion

  //#region utility

  const sumPrice = () => {
    let sum = 0;
    for (const product of selectProducts) {
      sum += product.count * product.price;
    }
    return sum;
  };

  //#endregion

  return (
    <div className="flex flex-col gap-3">
      <Box variant="primary">
        <H size={2}>پک اقتصادی</H>
      </Box>
      <Form variant="secondary">
        {/* <div className="flex backdrop-blur-md sticky top-1">
              <Button
                title="ذخیره محصول"
                variant="success"
                StartIcon={BsCloudArrowUp}
                onClick={() => onClickAddEconomicPackage()}
              />
            </div> */}
        <img
          src={ERoute.HOST + economicPackage.src}
          alt=""
          className="w-32 mx-auto aspect-[3/4] object-contain"
        />
        <InputContainer column>
          <Label htmlFor="src">عکس</Label>
          <Input
            type="text"
            name="src"
            title="src"
            id="src"
            dir="ltr"
            onChange={(e) => onChangeHandler(e)}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="title">نام پک اقصادی</Label>
          <Input
            type="text"
            name="title"
            title="title"
            id="title"
            onChange={(e) => onChangeHandler(e)}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="start_hours">ساعت شروع</Label>
          <div className="text-black">
            <DatePicker
              hideOnScroll
              disableDayPicker
              arrow={false}
              format="HH:mm:ss"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={startHours}
              onChange={setStartHours}
              plugins={[<TimePicker key={"timer"} />]}
              className="hours-datapicker green"
              inputClass="hours-datapicker"
            />
          </div>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="end_hours">ساعات پایان</Label>
          <div className="text-black">
            <DatePicker
              hideOnScroll
              disableDayPicker
              arrow={false}
              format="HH:mm:ss"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={endHours}
              onChange={setEndHours}
              plugins={[<TimePicker key={"timer"} />]}
              className="hours-datapicker green"
              inputClass="hours-datapicker"
            />
          </div>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="end_day">بازه روز</Label>
          <div className="text-black">
            <DatePicker
              hideOnScroll
              arrow={false}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={rangeDay}
              onChange={setRangeDay}
              className="hours-datapicker green"
              inputClass="hours-datapicker"
              range
            />
          </div>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="is_active">قیمت تمام شده</Label>
          <span>{digitsEnToFa(addCommas(sumPrice()))}</span>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="price">قیمت کل پک</Label>
          <Input
            type="number"
            name="price"
            title="price"
            id="price"
            onChange={(e) => onChangeHandler(e)}
          />
        </InputContainer>
        <InputContainer>
          <Input title="is_active" id="is_active" type="checkbox" />
          <Label htmlFor="is_active">
            وضعیت {economicPackage.is_active ? "فعال" : "غیر فعال"}
          </Label>
        </InputContainer>
        <div className="flex flex-wrap gap-4 justify-end">
          <Button
            title="اضافه کردن پک اقتصادی"
            variant="success"
            StartIcon={IoIosAddCircleOutline}
            onClick={() => onClickChangeStatuesAdd()}
          >
            اضافه کردن پک اقتصادی
          </Button>
        </div>
      </Form>
      <Box variant="secondary">
        <div className="flex flex-col gap-4">
          <Form variant="guest">
            <SelectProduct setVal={setSelectProduct} />
            <Input
              type="number"
              name="price"
              title="price"
              id="price"
              value={countProductEconomicPackage}
              onChange={(e) => {
                if (parseInt(e.target.value) > 0) {
                  setCountProductEconomicPackage(parseInt(e.target.value));
                }
              }}
            />
            <div className="flex flex-wrap gap-4 justify-end">
              <Button
                variant="success"
                title="add product"
                StartIcon={IoIosAddCircleOutline}
                onClick={() => onClickAddProductToPackage()}
              >
                اضافه کردن به پک
              </Button>
            </div>
          </Form>
          <div className="flex flex-col gap-4">
            {selectProducts.map((val, i) => (
              <div key={i}>
                <div className="flex justify-between items-center">
                  {digitsEnToFa(val.count)} عدد {val.name}
                  <Button
                    type="button"
                    title="حذف محصول"
                    variant="error"
                    StartIcon={RiDeleteBin5Line}
                    onClick={() =>
                      onClickDeleteProductToPackage(val.product_id)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
      <HorizontalScrollEconomicPackagePanel
        listEconomicPackage={listEconomicPackage}
        setGetListEconomicStatus={setGetListEconomicStatus}
      />
    </div>
  );
  // return (
  //   <div className="flex flex-col gap-3">
  //     <Box variant="primary">
  //       <H size={2}>پک اقتصادی</H>
  //     </Box>
  //     <div className="flex flex-col gap-3 rounded-xl">
  //       {addEconomicPackage ? (
  //         <Box variant="secondary">
  //           <div className="flex gap-2 relative">
  //             <div className="flex flex-col gap-2 h-fit rounded-lg shadow-lg backdrop-blur-md p-2 sticky top-1">
  //               <Button
  //                 title="ذخیره محصول"
  //                 variant="success"
  //                 StartIcon={BsCloudArrowUp}
  //                 onClick={() => onClickAddEconomicPackage()}
  //               />
  //               <Button
  //                 title="کنسل"
  //                 variant="error"
  //                 StartIcon={MdOutlineCancel}
  //                 onClick={() => onClickChangeStatuesAdd()}
  //               />
  //             </div>
  //             <Form variant="guest">
  //               <div className="flex flex-col gap-2">
  //                 <SelectProduct setVal={setSelectProduct} />
  //                 <Input
  //                   type="number"
  //                   name="price"
  //                   title="price"
  //                   id="price"
  //                   value={countProductEconomicPackage}
  //                   onChange={(e) => {
  //                     if (parseInt(e.target.value) > 0) {
  //                       setCountProductEconomicPackage(
  //                         parseInt(e.target.value)
  //                       );
  //                     }
  //                   }}
  //                 />
  //                 <Button
  //                   variant="success"
  //                   title="add product"
  //                   StartIcon={IoIosAddCircleOutline}
  //                   onClick={() => onClickAddProductToPackage()}
  //                 >
  //                   اضافه کردن به پک
  //                 </Button>
  //                 <div className="flex flex-col gap-2">
  //                   {selectProducts.map((val, i) => (
  //                     <div key={i}>
  //                       <div className="flex">
  //                         {val.name} * {val.count}
  //                         <Button
  //                           type="button"
  //                           title="حذف محصول"
  //                           variant="error"
  //                           onClick={() =>
  //                             onClickDeleteProductToPackage(val.product_id)
  //                           }
  //                         >
  //                           <RiDeleteBin5Line size={25} />
  //                         </Button>
  //                       </div>
  //                       <hr className="mt-2" />
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //               <img
  //                 src={ERoute.HOST + economicPackage.src}
  //                 alt=""
  //                 className="w-32 mx-auto aspect-[3/4] object-contain"
  //               />
  //               <InputContainer>
  //                 <Label htmlFor="src">عکس</Label>
  //                 <Input
  //                   type="text"
  //                   name="src"
  //                   title="src"
  //                   id="src"
  //                   dir="ltr"
  //                   onChange={(e) => onChangeHandler(e)}
  //                 />
  //               </InputContainer>
  //               <InputContainer>
  //                 <Label htmlFor="title">نام پک اقصادی</Label>
  //                 <Input
  //                   type="text"
  //                   name="title"
  //                   title="title"
  //                   id="title"
  //                   onChange={(e) => onChangeHandler(e)}
  //                 />
  //               </InputContainer>
  //               <div className="flex flex-wrap">
  //                 <div className="flex flex-wrap flex-col gap-3 grow">
  //                   <Label htmlFor="start_hours">ساعت شروع</Label>
  //                   <div>
  //                     <DatePicker
  //                       hideOnScroll
  //                       disableDayPicker
  //                       arrow={false}
  //                       format="HH:mm:ss"
  //                       calendar={persian}
  //                       locale={persian_fa}
  //                       calendarPosition="bottom-right"
  //                       value={startHours}
  //                       onChange={setStartHours}
  //                       plugins={[<TimePicker key={"timer"} />]}
  //                       className="hours-datapicker w-3"
  //                       inputClass="hours-datapicker"
  //                     />
  //                   </div>
  //                 </div>
  //                 <div className="flex flex-wrap flex-col gap-3 grow">
  //                   <Label htmlFor="end_hours">ساعات پایان</Label>
  //                   <div>
  //                     <DatePicker
  //                       hideOnScroll
  //                       disableDayPicker
  //                       arrow={false}
  //                       format="HH:mm:ss"
  //                       calendar={persian}
  //                       locale={persian_fa}
  //                       calendarPosition="bottom-right"
  //                       value={endHours}
  //                       onChange={setEndHours}
  //                       plugins={[<TimePicker key={"timer"} />]}
  //                       className="hours-datapicker w-3"
  //                       inputClass="hours-datapicker"
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //               <label htmlFor="end_day">بازه روز</label>
  //               <div>
  //                 <DatePicker
  //                   hideOnScroll
  //                   arrow={false}
  //                   calendar={persian}
  //                   locale={persian_fa}
  //                   calendarPosition="bottom-right"
  //                   value={rangeDay}
  //                   onChange={setRangeDay}
  //                   className="hours-datapicker w-3"
  //                   inputClass="hours-datapicker"
  //                   range
  //                 />
  //               </div>
  //               <div className="flex flex-wrap">
  //                 <div className="flex flex-col grow">
  //                   <Label htmlFor="is_active">قیمت تمام شده</Label>
  //                   <span>{sumPrice()}</span>
  //                 </div>
  //                 <div className="flex flex-col grow">
  //                   <label htmlFor="price">قیمت کل پک</label>
  //                   <input
  //                     type="number"
  //                     name="price"
  //                     title="price"
  //                     id="price"
  //                     className="focus:outline-none no-spinner rounded-md bgcooooooooooooooooooloooooooooo100 px-2 py-1 text-[#4e3751] "
  //                     onChange={(e) => onChangeHandler(e)}
  //                   />
  //                 </div>
  //               </div>
  //               <Label htmlFor="is_active">
  //                 وضعیت {economicPackage.is_active ? "فعال" : "غیر فعال"}
  //               </Label>
  //               <Button
  //                 name="is_active"
  //                 title="is_active"
  //                 id="is_active"
  //                 variant="primary"
  //                 onClick={() => onClickChangeStatuesActive()}
  //               >
  //                 تغییر وضعیت
  //               </Button>
  //             </Form>
  //           </div>
  //         </Box>
  //       ) : (
  //         <Button
  //           title="اضافه کردن پک اقتصادی"
  //           variant="success"
  //           StartIcon={IoIosAddCircleOutline}
  //           onClick={() => onClickChangeStatuesAdd()}
  //         >
  //           اضافه کردن پک اقتصادی
  //         </Button>
  //       )}
  //     </div>
  //     <HorizontalScrollEconomicPackagePanel
  //       listEconomicPackage={listEconomicPackage}
  //       setGetListEconomicStatus={setGetListEconomicStatus}
  //     />
  //   </div>
  // );
}
