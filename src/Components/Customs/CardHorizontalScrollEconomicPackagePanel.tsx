import { ERoute } from "@/Common/Enums/Routs";
import { digitsEnToFa, digitsFaToEn } from "@persian-tools/persian-tools";
import React, { useEffect, useState } from "react";
import { MdOutlineCloudDone, MdOutlineCloudUpload } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit, TbEditOff } from "react-icons/tb";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from "moment-jalaali";
import { IoIosAddCircleOutline } from "react-icons/io";
import SelectProduct from "./SelectProduct";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

function CardHorizontalScrollEconomicPackagePanel({
  prop,
  setGetListEconomicStatus,
}: {
  prop: TGetEconomicPackage;
  setGetListEconomicStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [s_hours, s_minute, s_second] = prop.start_hours.split(":");
  const [e_hours, e_minute, e_second] = prop.end_hours.split(":");
  const [editable, setEditable] = useState(false);
  const [statusChange, setStatusChange] = useState(false);
  const [statusCloud, setStatusCloud] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [startHours, setStartHours] = useState<Value>(
    new DateObject({ calendar: persian })
      .setHour(parseInt(s_hours))
      .setMinute(parseInt(s_minute))
      .setSecond(parseInt(s_second))
  );
  const [endHours, setEndHours] = useState<Value>(
    new DateObject({ calendar: persian })
      .setHour(parseInt(e_hours))
      .setMinute(parseInt(e_minute))
      .setSecond(parseInt(e_second))
  );
  const [rangeDay, setRangeDay] = useState([
    new DateObject({
      calendar: persian,
      date: new Date(
        moment(prop.start_day, "jYYYY/jMM/jDD").format("YYYY-MM-DD")
      ),
    }),
    new DateObject({
      calendar: persian,
      date: new Date(
        moment(prop.end_day, "jYYYY/jMM/jDD").format("YYYY-MM-DD")
      ),
    }),
  ]);
  const [economicPackage, setEconomicPackage] = useState<{
    src: string;
    title: string;
    start_hours: string;
    end_hours: string;
    start_day: string;
    end_day: string;
    price: number;
    is_active: boolean;
  }>({
    src: prop.src,
    title: prop.title,
    start_hours: prop.start_hours,
    end_hours: prop.end_hours,
    start_day: prop.start_day,
    end_day: prop.end_day,
    price: prop.price,
    is_active: prop.is_active,
  });
  const [selectProduct, setSelectProduct] = useState({
    product_id: "",
    name: "",
    price: 0,
  });
  const [selectProducts, setSelectProducts] =
    useState<TGetContentEconomicPackages>(prop.contentEconomicPackage);
  const [countProductEconomicPackage, setCountProductEconomicPackage] =
    useState(1);

  useEffect(() => {
    clearTimeout(timer);
    setStatusChange(false);
    statusChange && setStatusCloud(false);
    return setTimer(
      setTimeout(async () => {
        if (statusChange) {
          const access_token = sessionStorage.getItem("access_token") || "";
          const data = economicPackage;
          const day = digitsFaToEn(String(rangeDay)).split(",");
          data.start_hours = digitsFaToEn(String(startHours));
          data.end_hours = digitsFaToEn(String(endHours));
          data.start_day = day[0];
          data.end_day = day[1];
          await FetchApi.Order.fetchUpdateEconomicPackage({
            access_token,
            economic_package: {
              end_day: data.end_day,
              end_hours: data.end_hours,
              is_active: data.is_active,
              price: data.price,
              src: data.src,
              start_day: data.start_day,
              start_hours: data.start_hours,
              title: data.title,
            },
            economic_package_id: prop.economic_package_id,
          });
          setStatusChange(true);
          setStatusCloud(true);
        }
      }, 1000)
    );
  }, [startHours, endHours, rangeDay, economicPackage]);

  function sumPrice(list: TGetContentEconomicPackages): number {
    let sum = 0;
    for (const item of list) {
      sum += item.count * item.productMenu.price;
    }
    return sum;
  }

  const onClickDelete = async (economic_package_id: string) => {
    const access_token = sessionStorage.getItem("access_token") || "";
    await FetchApi.Order.fetchDeleteEconomicPackage({
      access_token,
      economic_package_id,
    });
    setGetListEconomicStatus(true);
  };

  const onChange = (e: any) => {
    setEconomicPackage((val) => ({ ...val, [e.target.name]: e.target.value }));
    setStatusChange(true);
  };

  const onClickChangeStatuesActive = () => {
    setEconomicPackage((val) => ({ ...val, is_active: !val.is_active }));
    setStatusChange(true);
  };

  const onClickAddProductToPackage = async () => {
    if (
      selectProduct.name &&
      selectProduct.product_id &&
      countProductEconomicPackage > 0
    ) {
      console.log(1);
      if (
        !selectProducts.find(
          (p) => p.productMenu.product_id === selectProduct.product_id
        )
      ) {
        try {
          const access_token = sessionStorage.getItem("access_token") || "";
          const res = await FetchApi.Order.fetchAddContentEconomicPackage({
            access_token,
            count: countProductEconomicPackage,
            economic_package_id: prop.economic_package_id,
            product_id: selectProduct.product_id,
          });
          setSelectProducts((val) => [
            ...val,
            {
              count: countProductEconomicPackage,
              content_economic_package_id: res.content_economic_package_id,
              productMenu: res.productMenu,
            },
          ]);
          setCountProductEconomicPackage(1);
        } catch (error) {}
      }
    }
  };

  const onClickDeleteProductToPackage = async ({
    content_economic_package_id,
    product_id,
  }: {
    product_id: string;
    content_economic_package_id: string;
  }) => {
    try {
      const access_token = sessionStorage.getItem("access_token") || "";
      setSelectProducts((prev) => {
        const index = prev.findIndex(
          (product) => product.productMenu.product_id === product_id
        );
        return prev.filter((_, idx) => idx !== index);
      });
      await FetchApi.Order.fetchDeleteContentEconomicPackage({
        access_token,
        content_economic_package_id,
      });
    } catch (error) {}
  };

  return (
    <div className="p-3 rounded-lg bg-gradient-to-br from-cooooooooooooooooooloooooooooo to-[#4e3751] shadow-primary-sm flex flex-col gap-1 relative">
      <div className="absolute left-3 flex flex-col gap-2">
        {editable ? (
          <>
            <div
              title="save change"
              className={`${
                statusCloud ? "bg-emerald-500" : " bg-orange-500"
              } rounded-lg w-8 h-8 flex justify-center items-center shadow-primary-sm`}
            >
              {statusCloud ? (
                <MdOutlineCloudDone size={25} />
              ) : (
                <MdOutlineCloudUpload size={25} />
              )}
            </div>
            <button
              type="button"
              title="ادیت محصول"
              className="bg-rose-500 rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-11 mr-auto shadow-primary-sm"
              onClick={() => setEditable((val) => !val)}
            >
              <TbEditOff size={25} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              title="حذف محصول"
              className="bg-rose-500 rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-11 mr-auto shadow-primary-sm"
              onClick={() => onClickDelete(prop.economic_package_id)}
            >
              <RiDeleteBin5Line size={25} />
            </button>
            <button
              type="button"
              title="ادیت محصول"
              className="bg-orange-500 rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-11 mr-auto shadow-primary-sm"
              onClick={() => setEditable((val) => !val)}
            >
              <TbEdit size={25} />
            </button>
          </>
        )}
      </div>
      <img
        src={ERoute.HOST + economicPackage.src}
        alt={economicPackage.title}
        className="w-32 mx-auto aspect-[3/4] object-contain px-1 shadow-primary-sm rounded-lg"
      />
      {editable ? (
        <form className="flex flex-col grow gap-2">
          <div className="flex flex-col gap-2">
            <h3>لیست محصولات</h3>
            <SelectProduct setVal={setSelectProduct} />
            <input
              type="number"
              name="price"
              title="price"
              id="price"
              value={countProductEconomicPackage}
              className="focus:outline-none no-spinner rounded-md bgcooooooooooooooooooloooooooooo100 px-2 py-1 text-[#4e3751]"
              onChange={(e) => {
                if (parseInt(e.target.value) > 0) {
                  setCountProductEconomicPackage(parseInt(e.target.value));
                }
              }}
            />
            <button
              type="button"
              title="add product"
              className="bg-green-600 rounded-lg h-8 flex justify-center items-center shadow-primary-sm gap-1"
              onClick={() => onClickAddProductToPackage()}
            >
              <IoIosAddCircleOutline size={25} className="" />
              اضافه کردن به پک
            </button>
            <div className="flex flex-col gap-2">
              {selectProducts.map((val, i) => (
                <div key={i}>
                  <div className="flex">
                    {val.productMenu.name} * {val.count}
                    <button
                      type="button"
                      title="حذف محصول"
                      className="bg-rose-500 rounded-lg w-8 h-8 flex justify-center items-center sticky left-2 top-11 mr-auto shadow-primary-sm"
                      onClick={() =>
                        onClickDeleteProductToPackage({
                          product_id: val.productMenu.product_id,
                          content_economic_package_id:
                            val.content_economic_package_id,
                        })
                      }
                    >
                      <RiDeleteBin5Line size={25} />
                    </button>
                  </div>
                  <hr className="mt-2" />
                </div>
              ))}
            </div>
          </div>
          <label htmlFor="src">عکس</label>
          <input
            type="text"
            name="src"
            title="src"
            id="src"
            dir="ltr"
            value={economicPackage.src}
            className="focus:outline-none focus:cursor-default bgcooooooooooooooooooloooooooooo100 rounded-md text-[#4e3751] px-2 py-1"
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="title">نام پک اقصادی</label>
          <input
            type="text"
            name="title"
            title="title"
            id="title"
            value={economicPackage.title}
            className="focus:outline-none focus:cursor-default bgcooooooooooooooooooloooooooooo100 rounded-md text-[#4e3751] px-2 py-1"
            onChange={(e) => onChange(e)}
          />
          <div className="flex flex-wrap">
            <div className="flex flex-wrap flex-col gap-3 grow">
              <label htmlFor="start_hours">ساعت شروع</label>
              <div>
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
                  className="hours-datapicker w-3"
                  inputClass="hours-datapicker"
                />
              </div>
            </div>
            <div className="flex flex-wrap flex-col gap-3 grow">
              <label htmlFor="end_hours">ساعات پایان</label>
              <div>
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
                  className="hours-datapicker w-3"
                  inputClass="hours-datapicker"
                />
              </div>
            </div>
          </div>
          <label htmlFor="end_day">بازه روز</label>
          <div>
            <DatePicker
              hideOnScroll
              arrow={false}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={rangeDay}
              onChange={setRangeDay}
              className="hours-datapicker w-3"
              inputClass="hours-datapicker"
              range
            />
          </div>
          <div className="flex flex-wrap">
            <div className="flex flex-col grow">
              <label htmlFor="is_active">قیمت تمام شده</label>
              <span>{sumPrice(selectProducts)}</span>
            </div>
            <div className="flex flex-col grow">
              <label htmlFor="price">قیمت کل پک</label>
              <input
                type="number"
                name="price"
                title="price"
                id="price"
                className="focus:outline-none no-spinner rounded-md bgcooooooooooooooooooloooooooooo100 px-2 py-1 text-[#4e3751] "
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <label htmlFor="is_active">
            وضعیت {economicPackage.is_active ? "فعال" : "غیر فعال"}
          </label>
          <button
            type="button"
            name="is_active"
            title="is_active"
            id="is_active"
            onClick={() => onClickChangeStatuesActive()}
            className="mb-4 bgcooooooooooooooooooloooooooooo200/20 w-32 mx-auto py-1 rounded-lg shadow-primary-sm"
          >
            تغییر وضعیت
          </button>
        </form>
      ) : (
        <div>
          <h3>
            نام پک {economicPackage.title ? economicPackage.title : "ندارد"}
          </h3>
          <h4>از ساعت {digitsEnToFa(economicPackage.start_hours)}</h4>
          <h4>تا ساعت {digitsEnToFa(economicPackage.end_hours)}</h4>
          <h4>از تاریخ {digitsEnToFa(economicPackage.start_day)}</h4>
          <h4>تا تاریخ {digitsEnToFa(economicPackage.end_day)}</h4>
          <h4>مجموع قیمت {digitsEnToFa(sumPrice(selectProducts))}</h4>
          <h4>قیمت پک {digitsEnToFa(economicPackage.price)}</h4>
          <h4>وضعیت {economicPackage.is_active ? "فعال" : "غیر فعال"}</h4>
          <div className="outline outline-1 px-2 py-1 rounded-md">
            لیست محصولات
            {selectProducts.map((val2) => (
              <div key={val2.content_economic_package_id}>
                <h5>
                  {val2.productMenu.name} {digitsEnToFa(val2.productMenu.price)}{" "}
                  * {digitsEnToFa(val2.count)}
                </h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardHorizontalScrollEconomicPackagePanel;
