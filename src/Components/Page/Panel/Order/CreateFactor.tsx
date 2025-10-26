import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import Box from "@/Components/Ui/Box";
import { Button } from "@/Components/Ui/Button";
import Form from "@/Components/Ui/Form";
import { H } from "@/Components/Ui/H";
import {
  giveValueInput,
  Input,
  InputContainer,
  Label,
} from "@/Components/Ui/Input";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function CreateFactor() {
  const baseDefaultFactor: TGetFactor = useMemo(
    () => ({
      factor_id: "",
      customer_mobile: "",
      factor_items: [],
      factor_number: 1,
      location: "",
      pay_status: false,
      tax: 0,
      create_at: JSON.stringify(new Date()),
      update_at: JSON.stringify(new Date()),
    }),
    []
  );

  const setting = useContext(AccountContext);

  const [defaultFactor, setDefaultFactor] =
    useState<TGetFactor>(baseDefaultFactor);
  const [detailFactor, setDetailFactors] = useState<TGetFactor>(defaultFactor);
  const [saveChange, setSaveChange] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [cloud, setCloud] = useState(true);
  const [productList, setProductList] = useState<TIdCategoriesMenu>([]);

  //#region use effect

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await FetchApi.Menu.fetchAllProductMenu();
      setProductList(products);
      if (setting?.factor.state) {
        const res = await FetchApi.Order.fetchGetOrder({
          access_token,
          order_id: setting.factor.state,
        });
        setDetailFactors(res);
      }
    };
    fetchProducts();
    const factor_number = localStorage.getItem("factor_number") || "1";
    setDefaultFactor((val) => ({
      ...val,
      factor_number: parseInt(factor_number),
    }));
    setDetailFactors((val) => ({
      ...val,
      factor_number: parseInt(factor_number),
    }));
    const access_token = sessionStorage.getItem("access_token") || "";
  }, []);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timer);
    if (saveChange) {
      setCloud(false);
    }
    return setTimer(
      setTimeout(async () => {
        if (saveChange) {
          let updated = true;
          const { update: updateOrder } = await FetchApi.Order.fetchUpdateOrder(
            {
              access_token,
              customer_mobile: detailFactor.customer_mobile,
              factor_number: detailFactor.factor_number,
              location: detailFactor.location,
              pay_status: detailFactor.pay_status,
              tax: detailFactor.tax,
              order_id: detailFactor.factor_id,
            }
          );

          updated = updated && updateOrder;

          for (const item of detailFactor.factor_items) {
            const { update: OrderItem } =
              await FetchApi.Order.fetchUpdateOrderItem({
                access_token,
                order_item_id: item.factor_item_id,
                product_count: item.product_count,
                product_discount: item.product_discount,
                product_name: item.product_name,
                product_price: item.product_price,
              });
            updated = updated && OrderItem;
          }
          setCloud(updated);
          setSaveChange(!updated);
        }
      }, 1000)
    );
  }, [saveChange]);

  //#endregion

  //#region on change

  const onChangeMainForm = (e: any) => {
    setDetailFactors((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (detailFactor.factor_id !== "") {
      setSaveChange(true);
    }
  };

  const onChangeDetailForm = (e: any, index: number) => {
    setDetailFactors((val) => ({
      ...val,
      factor_items: val.factor_items.map((item, i) => {
        if (index === i) {
          if (e.target.name === "product_name") {
            const findProduct = productList
              .map((cat) => cat.products)
              .flat()
              .find((pro) => pro.name === e.target.value);
            if (findProduct) {
              return {
                factor_item_id: item.factor_item_id ? item.factor_item_id : "",
                product_count: 1,
                product_discount: 0,
                product_name: findProduct?.name || "",
                product_price: findProduct?.price || 0,
              };
            }
          }
          return { ...item, [e.target.name]: giveValueInput(e) };
        } else {
          return { ...item };
        }
      }),
    }));
    if (detailFactor.factor_id !== "") {
      setSaveChange(true);
    }
  };

  //#endregion

  //#region on click

  const onClickCloseUpdateFactor = () => {
    setDetailFactors(defaultFactor);
    setting?.factor.setState("");
    setting?.dashboard.setState(EDashboard.READ_FACTOR);
  };

  const onClickAddItemToFactor = async () => {
    if (detailFactor.factor_id !== "") {
      const access_token = sessionStorage.getItem("access_token") || "";

      const { factor_item_id } = await FetchApi.Order.fetchCreateOrderItem({
        access_token,
        order_id: detailFactor.factor_id,
      });
      setDetailFactors((val) => ({
        ...val,
        factor_items: [
          ...val.factor_items,
          {
            product_count: 0,
            product_discount: 0,
            product_name: "",
            product_price: 0,
            factor_item_id: factor_item_id,
          },
        ],
      }));
    } else {
      setDetailFactors((val) => ({
        ...val,
        factor_items: [
          ...val.factor_items,
          {
            product_count: 0,
            product_discount: 0,
            product_name: "",
            product_price: 0,
            factor_item_id: "",
          },
        ],
      }));
    }
  };

  const onClickCreateNewFactor = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const newFactor = await FetchApi.Order.fetchCreateOrder({ access_token });
    await FetchApi.Order.fetchUpdateOrder({
      access_token,
      customer_mobile: detailFactor.customer_mobile,
      factor_number: detailFactor.factor_number,
      location: detailFactor.location,
      pay_status: detailFactor.pay_status,
      tax: detailFactor.tax,
      order_id: newFactor.factor_id,
    });

    for (const item of detailFactor.factor_items) {
      const newItemFactor = await FetchApi.Order.fetchCreateOrderItem({
        access_token,
        order_id: newFactor.factor_id,
      });

      await FetchApi.Order.fetchUpdateOrderItem({
        access_token,
        order_item_id: newItemFactor.factor_item_id,
        product_count: item.product_count,
        product_discount: item.product_discount,
        product_name: item.product_name,
        product_price: item.product_price,
      });
    }

    setDetailFactors(defaultFactor);
    setDefaultFactor((val) => ({
      ...val,
      factor_number: val.factor_number + 1,
    }));
    localStorage.setItem(
      "factor_number",
      JSON.stringify(defaultFactor.factor_number + 1)
    );
    setting?.dashboard.setState(EDashboard.READ_FACTOR);
  };

  const onClickDeleteItemToFactor = async (index: number) => {
    setDetailFactors((val) => ({
      ...val,
      factor_items: val.factor_items.filter((val, i) => i !== index),
    }));
    if (detailFactor.factor_id !== "") {
      const access_token = sessionStorage.getItem("access_token") || "";

      await FetchApi.Order.fetchDeleteOrderItem({
        access_token,
        order_item_id: detailFactor.factor_items[index].factor_item_id,
      });
    }
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>جزئیات فاکتور</H>
      </Box>
      <Form variant="primary" col>
        {detailFactor.factor_id === "" ? (
          <></>
        ) : (
          <InputContainer column>
            <Label htmlFor="factor_id">شناسه فاکتور</Label>
            <Input
              value={detailFactor.factor_id}
              type="text"
              name="factor_id"
              title=""
              id="factor_id"
              onChange={(e) => onChangeMainForm(e)}
              disabled
            />
          </InputContainer>
        )}
        <InputContainer column>
          <Label htmlFor="factor_number">شماره فاکتور</Label>
          <Input
            value={detailFactor.factor_number}
            type="number"
            name="factor_number"
            title=""
            id="factor_number"
            onChange={(e) => onChangeMainForm(e)}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="customer_mobile">موبایل سفارش دهنده</Label>
          <Input
            value={detailFactor.customer_mobile}
            type="text"
            name="customer_mobile"
            title=""
            id="customer_mobile"
            onChange={(e) => onChangeMainForm(e)}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="location">تحویل سفارش</Label>
          <Input
            value={detailFactor.location}
            type="text"
            name="location"
            title=""
            list="ice-cream-flavors"
            id="location"
            onChange={(e) => onChangeMainForm(e)}
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
          <Label htmlFor="tax">مالیات (درصد)</Label>
          <Input
            value={detailFactor.tax}
            type="number"
            name="tax"
            title=""
            id="tax"
            onChange={(e) => onChangeMainForm(e)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            checked={detailFactor.pay_status}
            type="checkbox"
            name="pay_status"
            title=""
            id="pay_status"
            onChange={(e) => onChangeMainForm(e)}
          />
          <Label htmlFor="pay_status">وضعیت پرداخت</Label>
        </InputContainer>
      </Form>
      <div className="flex flex-col gap-4">
        {detailFactor.factor_items.map((val, i) => (
          <Form variant="secondary" key={i} col>
            <InputContainer column>
              <Label htmlFor="product_name">نام محصول</Label>
              <Input
                type="text"
                title="product_name"
                id="product_name"
                name="product_name"
                value={val.product_name}
                onChange={(e) => onChangeDetailForm(e, i)}
                list="product"
              />
              <datalist id="product">
                <option value="میز 1">مشتری</option>
                {productList.map((cat) => {
                  return cat.products.map((pro) => (
                    <option key={`${i}-${pro.name}`} value={pro.name}>
                      {cat.category}
                    </option>
                  ));
                })}
              </datalist>
            </InputContainer>
            <InputContainer column>
              <Label htmlFor="product_price">قیمت</Label>
              <Input
                value={val.product_price}
                type="number"
                title="product_price"
                name="product_price"
                id="product_price"
                onChange={(e) => onChangeDetailForm(e, i)}
              />
            </InputContainer>
            <InputContainer column>
              <Label htmlFor="product_count">تعداد محصول</Label>
              <Input
                type="number"
                title="product_count"
                name="product_count"
                id="product_count"
                value={val.product_count}
                onChange={(e) => onChangeDetailForm(e, i)}
              />
            </InputContainer>
            <InputContainer column>
              <Label htmlFor="product_discount">تخفیف روی محصول</Label>
              <Input
                type="number"
                title="product_discount"
                name="product_discount"
                id="product_discount"
                value={val.product_discount}
                onChange={(e) => onChangeDetailForm(e, i)}
              />
            </InputContainer>
            <div className="col-span-full flex justify-end">
              <Button
                variant="error"
                title="delete"
                type="button"
                StartIcon={RiDeleteBin5Line}
                onClick={() => onClickDeleteItemToFactor(i)}
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
        {detailFactor.factor_id === "" ? (
          <Button
            title="ثبت فاکتور"
            variant="success"
            StartIcon={IoIosAddCircleOutline}
            onClick={() => onClickCreateNewFactor()}
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
              loading={!cloud}
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
