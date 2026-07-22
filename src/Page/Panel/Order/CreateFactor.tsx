import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Element/Box";
import { Button } from "@/Components/Element/Button";
import Form from "@/Components/Element/Form";
import { H } from "@/Components/Element/H";
import {
  giveValueInput,
  Input,
  InputContainer,
  Label,
} from "@/Components/Element/Input";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from "moment-jalaali";
import { ReadMenuDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import { ReadOrderDetailViewModel } from "@/Common/Connection/Api/ViewModels/Order.Service.ViewModel";
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";

export default function CreateFactor() {
  const setting = useContext(AccountContext);
  const baseDefaultFactor: ReadOrderDetailViewModel = useMemo(
    () => ({
      CustomerMobile: "",
      FactorDate: moment().format("jYYYY/jMM/jDD HH:mm:ss"),
      FactorNumber: 1,
      Id: "",
      IsPay: false,
      Location: "",
      Tax: 0,
      FactorItems: [],
    }),
    [],
  );
  const [defaultFactor, setDefaultFactor] = useState(baseDefaultFactor);
  const [defaultFactorItemId, setDefaultFactorItemId] = useState("");
  const [productMenuList, setProductMenuList] = useState<
    Array<ReadMenuDetailViewModel>
  >([]);

  //#region use effect

  useEffect(() => {
    const fetchProducts = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";
      const products = await FetchApi.Menu.ReadMenuDetail({});
      setProductMenuList(products);

      if (setting?.factor.state) {
        const res = await FetchApi.Order.ReadOrderDetail({
          AccessToken: access_token,
          Id: setting.factor.state,
        });
        setDefaultFactor(res);
      }
    };
    fetchProducts();

    const factor_number = localStorage.getItem("factor_number") || "1";
    setDefaultFactor((val) => ({
      ...val,
      factor_number: parseInt(factor_number),
    }));
    setDefaultFactor((val) => ({
      ...val,
      factor_number: parseInt(factor_number),
    }));
  }, []);

  const [cloudDefaultFactor, setSaveChangeFactor] = useChangeTimer(async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    const res = await FetchApi.Order.UpdateOrder({
      AccessToken: access_token,
      CustomerMobile: defaultFactor.CustomerMobile,
      FactorNumber: defaultFactor.FactorNumber,
      Location: defaultFactor.Location,
      IsPay: defaultFactor.IsPay,
      Tax: defaultFactor.Tax,
      Id: defaultFactor.Id,
      FactorDate: defaultFactor.FactorDate,
    });

    return res.Update;
  }, [defaultFactor]);

  const [cloudDefaultFactorItem, setSaveChangeFactorItem] =
    useChangeTimer(async () => {
      if (defaultFactorItemId) {
        const access_token = sessionStorage.getItem("access_token") || "";

        const item = defaultFactor.FactorItems.find(
          (val) => val.Id === defaultFactorItemId,
        );

        if (item) {
          const res = await FetchApi.Order.UpdateOrderItem({
            AccessToken: access_token,
            Id: item.Id,
            ProductCount: item.ProductCount,
            ProductDiscount: item.ProductDiscount,
            ProductName: item.ProductName,
            ProductPrice: item.ProductPrice,
          });

          return res.Update;
        }
        setDefaultFactorItemId("");
      }

      return true;
    }, [defaultFactor]);

  //#endregion

  //#region on change

  const onChangeFactorForm = (e: any) => {
    setDefaultFactor((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultFactor.Id) {
      setSaveChangeFactor(true);
    }
  };

  const onChangeFactorItemForm = (e: any, index: number) => {
    setDefaultFactor((val) => ({
      ...val,
      FactorItems: val.FactorItems.map((item, i) => {
        const findProduct = productMenuList
          .map((cat) => cat.Products)
          .flat()
          .find((pro) => pro.Name === e.target.value);

        if (index === i && e.target.name === "ProductName" && findProduct) {
          return {
            Id: item?.Id,
            ProductCount: 1,
            ProductDiscount: 0,
            ProductName: findProduct.Name,
            ProductPrice: findProduct.Price,
          };
        } else if (index === i) {
          return { ...item, [e.target.name]: giveValueInput(e) };
        } else {
          return { ...item };
        }
      }),
    }));

    if (defaultFactor.Id) {
      const factorItemId = defaultFactor.FactorItems[index].Id;
      setSaveChangeFactorItem(true);
      setDefaultFactorItemId(factorItemId);
    }
  };

  //#endregion

  //#region on click

  const onClickAddItemToFactor = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    if (defaultFactor.Id) {
      const res = await FetchApi.Order.CreateOrderItem({
        AccessToken: access_token,
        Id: defaultFactor.Id,
      });

      setDefaultFactor((val) => ({
        ...val,
        FactorItems: [
          ...val.FactorItems,
          {
            Id: res.Id,
            ProductCount: 1,
            ProductDiscount: 0,
            ProductName: "",
            ProductPrice: 0,
          },
        ],
      }));
    } else {
      setDefaultFactor((val) => ({
        ...val,
        FactorItems: [
          ...val.FactorItems,
          {
            Id: "",
            ProductCount: 1,
            ProductDiscount: 0,
            ProductName: "",
            ProductPrice: 0,
          },
        ],
      }));
    }
  };

  const onClickCreateFactor = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const newFactor = await FetchApi.Order.CreateOrder({
      AccessToken: access_token,
    });

    await FetchApi.Order.UpdateOrder({
      AccessToken: access_token,
      Id: newFactor.Id,
      CustomerMobile: defaultFactor.CustomerMobile,
      FactorNumber: defaultFactor.FactorNumber,
      Location: defaultFactor.Location,
      IsPay: defaultFactor.IsPay,
      Tax: defaultFactor.Tax,
      FactorDate: defaultFactor.FactorDate,
    });

    for (const item of defaultFactor.FactorItems) {
      const newItemFactor = await FetchApi.Order.CreateOrderItem({
        AccessToken: access_token,
        Id: newFactor.Id,
      });

      await FetchApi.Order.UpdateOrderItem({
        AccessToken: access_token,
        Id: newItemFactor.Id,
        ProductCount: item.ProductCount,
        ProductDiscount: item.ProductDiscount,
        ProductName: item.ProductName,
        ProductPrice: item.ProductPrice,
      });
    }

    setDefaultFactor(defaultFactor);
    setDefaultFactor((val) => ({
      ...val,
      factor_number: val.FactorNumber + 1,
    }));
    localStorage.setItem(
      "factor_number",
      JSON.stringify(defaultFactor.FactorNumber + 1),
    );
    setting?.dashboard.setState(EDashboard.READ_FACTOR);
  };

  const onClickDeleteFactorItem = async (index: number) => {
    console.log(index);
    setDefaultFactor((val) => ({
      ...val,
      FactorItems: val.FactorItems.filter((val, i) => i !== index),
    }));

    if (defaultFactor.Id) {
      const access_token = sessionStorage.getItem("access_token") || "";
      const factorItemId = defaultFactor.FactorItems[index].Id;

      await FetchApi.Order.DeleteOrderItem({
        Id: factorItemId,
        AccessToken: access_token,
      });
    }
  };

  const onClickCloseUpdateFactor = () => {
    setDefaultFactor(defaultFactor);
    setting?.factor.setState("");
    setting?.dashboard.setState(EDashboard.READ_FACTOR);
  };
  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>جزئیات فاکتور</H>
      </Box>
      <Form variant="primary" col>
        <InputContainer column>
          <Label htmlFor="end_day">تاریخ ثبت</Label>
          <div className="text-black bg-white pr-4 py-2 rounded-lg ">
            <DatePicker
              hideOnScroll
              arrow={false}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={defaultFactor.FactorDate}
              onChange={(e) => {
                onChangeFactorForm({
                  target: {
                    name: "create_at",
                    type: "text",
                    value: `${e?.year}/${e?.month.number}/${e?.day} ${e?.hour}:${e?.minute}:${e?.second}`,
                  },
                });
              }}
              className="hours-datapicker green"
              inputClass="hours-datapicker"
              format="YYYY/MM/DD HH:mm"
              plugins={[<TimePicker position="bottom" />]}
            />
          </div>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="CustomerMobile">موبایل سفارش دهنده</Label>
          <Input
            name="CustomerMobile"
            id="CustomerMobile"
            value={defaultFactor.CustomerMobile}
            type="text"
            title="موبایل سفارش دهنده"
            onChange={(e) => onChangeFactorForm(e)}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="Location">تحویل سفارش</Label>
          <Input
            value={defaultFactor.Location}
            type="text"
            id="Location"
            name="Location"
            title="تحویل سفارش"
            list="ice-cream-flavors"
            onChange={(e) => onChangeFactorForm(e)}
            onFocus={(e) => e.target.select()}
          />
          <datalist id="ice-cream-flavors">
            <option value="میز 1">مشتری</option>
            <option value="میز 2">مشتری</option>
            <option value="میز 3">مشتری</option>
            <option value="میز 4">مشتری</option>
            <option value="میز 5">مشتری</option>
            <option value="میز 6">مشتری</option>
            <option value="میز 7">مشتری</option>
            <option value="میز 8">مشتری</option>
            <option value="میز 9">مشتری</option>
            <option value="بیرون بر">مشتری</option>
            <option value="تپسی">همکار</option>
            <option value="اسنپ">همکار</option>
          </datalist>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="Tax">مالیات (درصد)</Label>
          <Input
            value={defaultFactor.Tax}
            type="number"
            name="Tax"
            title=""
            id="Tax"
            onChange={(e) => onChangeFactorForm(e)}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer>
          <Input
            checked={defaultFactor.IsPay}
            type="checkbox"
            name="IsPay"
            title=""
            id="IsPay"
            onChange={(e) => onChangeFactorForm(e)}
          />
          <Label htmlFor="IsPay">وضعیت پرداخت</Label>
        </InputContainer>
      </Form>
      <div className="flex flex-col gap-4">
        {defaultFactor.FactorItems.map((val, i) => (
          <Form variant="secondary" key={i} col>
            <InputContainer column>
              <Label htmlFor={`ProductName-${i}`}>محصول</Label>
              <Input
                type="text"
                title="ProductName"
                id={`ProductName-${i}`}
                name="ProductName"
                value={val.ProductName}
                onChange={(e) => onChangeFactorItemForm(e, i)}
                list="product"
                onFocus={(e) => e.target.select()}
              />
              <datalist id="product">
                <option value="میز 1">مشتری</option>
                {productMenuList.map((cat) => {
                  return cat.Products.map((pro) => (
                    <option key={`${i}-${pro.Name}`} value={pro.Name}>
                      {cat.Name}
                    </option>
                  ));
                })}
              </datalist>
            </InputContainer>
            <InputContainer column>
              <Label htmlFor={`ProductPrice-${i}`}>قیمت</Label>
              <Input
                value={val.ProductPrice}
                type="number"
                title="ProductPrice"
                name="ProductPrice"
                id={`ProductPrice-${i}`}
                onChange={(e) => onChangeFactorItemForm(e, i)}
                onFocus={(e) => e.target.select()}
              />
            </InputContainer>
            <InputContainer column>
              <Label htmlFor={`ProductCount-${i}`}>مقدار</Label>
              <Input
                type="number"
                title="ProductCount"
                name="ProductCount"
                id={`ProductCount-${i}`}
                value={val.ProductCount}
                onChange={(e) => onChangeFactorItemForm(e, i)}
                onFocus={(e) => e.target.select()}
              />
            </InputContainer>
            <InputContainer column>
              <Label htmlFor={`ProductDiscount-${i}`}>تخفیف (تومان)</Label>
              <Input
                type="number"
                title="ProductDiscount"
                name="ProductDiscount"
                id={`ProductDiscount-${i}`}
                value={val.ProductDiscount}
                onChange={(e) => onChangeFactorItemForm(e, i)}
                onFocus={(e) => e.target.select()}
              />
            </InputContainer>
            <div className="col-span-full flex justify-end">
              <Button
                variant="error"
                title="delete"
                type="button"
                StartIcon={RiDeleteBin5Line}
                onClick={() => onClickDeleteFactorItem(i)}
              >
                حذف محصول
              </Button>
            </div>
          </Form>
        ))}
      </div>
      <div className="flex justify-end gap-4 flex-wrap">
        <Button
          title="ایجاد کردن محصول"
          variant="primary"
          StartIcon={IoIosAddCircleOutline}
          onClick={() => onClickAddItemToFactor()}
        >
          ایجاد کردن محصول
        </Button>
        {defaultFactor.Id === "" ? (
          <Button
            title="ثبت فاکتور"
            variant="success"
            StartIcon={IoIosAddCircleOutline}
            onClick={() => onClickCreateFactor()}
          >
            ثبت فاکتور
          </Button>
        ) : (
          <>
            <Button
              title="بستن تغییرات فاکتور"
              variant="error"
              StartIcon={IoMdCloseCircleOutline}
              onClick={() => onClickCloseUpdateFactor()}
            >
              بستن فاکتور
            </Button>
            <Button
              title="تغییرات ثبت شده"
              variant="success"
              StartIcon={GoIssueClosed}
              loading={!(cloudDefaultFactor && cloudDefaultFactorItem)}
              loadingChild={"در حال بروزرسانی اطلاعات"}
              disabled
            >
              اطلاع بروز است
            </Button>
          </>
        )}
      </div>
    </>
  );
}
