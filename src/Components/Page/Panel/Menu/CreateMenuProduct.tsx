import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { ERoute } from "@/Common/Enums/Routs";
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
import { Option, Select } from "@/Components/Ui/Select";
import { AccountContext } from "@/Contexts/Account.Context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateMenuProduct() {
  const setting = useContext(AccountContext);

  const baseDefaultProduct: TIdProductMenu & { category_id: string } = useMemo(
    () => ({
      product_id: "",
      id: 1,
      available: true,
      name: "",
      src: "",
      description: "",
      meta_description: "",
      meta_title: "",
      price: 0,
      waiting: 0,
      category_id: "",
    }),
    []
  );

  const [cloudProduct, setCloudProduct] = useState(true);
  const [defaultProduct, setDefaultProduct] = useState(baseDefaultProduct);
  const [saveChangeProduct, setSaveChangeProduct] = useState(false);
  const [timerProduct, setTimerProduct] = useState<NodeJS.Timeout>();
  const [menu, setMenu] = useState<TIdCategoriesMenu>([]);
  const [getList, setGetList] = useState(true);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        const allProduct = await FetchApi.Menu.fetchAllProductMenu();
        let foundProduct = null;
        let foundCategory = "";

        // جستجو در بین دسته‌بندی‌ها و محصولات
        for (const categoryData of allProduct) {
          const product = categoryData.products.find(
            (val) => val.product_id === setting?.productMenu.state
          );

          if (product) {
            foundProduct = product;
            foundCategory = categoryData.category_product_id;
            break;
          }
        }

        if (foundProduct) {
          const {
            available,
            description,
            id,
            meta_description,
            meta_title,
            name,
            price,
            product_id,
            src,
            waiting,
          } = foundProduct;

          setDefaultProduct((val) => ({
            ...val,
            available,
            description,
            id,
            meta_description,
            meta_title,
            name,
            price,
            product_id,
            src,
            waiting,
            category_id: foundCategory,
          }));
        }

        setMenu(allProduct);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token") || "";
    clearTimeout(timerProduct);
    setSaveChangeProduct(false);
    saveChangeProduct && setCloudProduct(false);
    return setTimerProduct(
      setTimeout(async () => {
        if (saveChangeProduct) {
          const { update } = await FetchApi.Menu.fetchUpdateProductMenu({
            access_token,
            available: defaultProduct.available,
            product_id: defaultProduct.product_id,
            name: defaultProduct.name,
            src: defaultProduct.src,
            description: defaultProduct.description,
            meta_description: defaultProduct.meta_description,
            meta_title: defaultProduct.meta_title,
            price: defaultProduct.price,
            waiting: defaultProduct.waiting,
            id: defaultProduct.id,
          });
          setSaveChangeProduct(update);
          setCloudProduct(update);
        }
      }, 1000)
    );
  }, [defaultProduct]);

  const onChangeProduct = (e: any) => {
    setDefaultProduct((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (defaultProduct.product_id !== "") {
      setSaveChangeProduct(true);
    }
  };

  const onClickCancelProduct = () => {
    setDefaultProduct(baseDefaultProduct);
    setting?.productMenu.setState("");
    setting?.dashboard.setState(EDashboard.READ_MENU_PRODUCT);
  };

  const onClickCreateProduct = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Menu.fetchCreateProductMenu({
      access_token,
      available: defaultProduct.available,
      category_id: defaultProduct.category_id,
      description: defaultProduct.description,
      meta_description: defaultProduct.meta_description,
      meta_title: defaultProduct.meta_title,
      name: defaultProduct.name,
      price: defaultProduct.price,
      src: defaultProduct.src,
      waiting: defaultProduct.waiting,
      id: defaultProduct.id,
    });

    setDefaultProduct(baseDefaultProduct);
    setting?.dashboard.setState(EDashboard.READ_MENU_PRODUCT);
    setting?.productMenu.setState("");
  };

  return (
    <>
      <Box variant="primary">
        <H size={2}>محصول های منو</H>
      </Box>
      <Form variant="secondary" col>
        <div className="flex justify-center col-span-full">
          <img
            src={`${ERoute.HOST}/${defaultProduct.src}`}
            alt={defaultProduct.name}
            className="w-40 h-40 object-contain"
            loading="lazy"
          />
        </div>
        <InputContainer column>
          <Label htmlFor="src">مسیر عکس</Label>
          <Input
            title="مسیر عکس"
            type="text"
            id="src"
            name="src"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.src}
            dir="ltr"
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="meta_title">متا تایتل</Label>
          <Input
            title="متا تایتل"
            type="text"
            id="meta_title"
            name="meta_title"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.meta_title}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="name">نام محصول</Label>
          <Input
            title="نام محصول"
            type="text"
            id="name"
            name="name"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.name}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="price">قیمت</Label>
          <Input
            title="قیمت"
            type="number"
            id="price"
            name="price"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.price}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="waiting">مدت انتظار</Label>
          <Input
            title="مدت انتظار"
            type="number"
            id="waiting"
            name="waiting"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.waiting}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="category_id">دسته بندی</Label>
          <Select
            name="category_id"
            title="category_id"
            id="category_id"
            onChange={(e) => onChangeProduct(e)}
            grow
            value={defaultProduct.category_id}
          >
            {menu.map((val, i) => (
              <Option value={val.category_product_id} key={i}>
                {val.category}
              </Option>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Input
            title="موجود"
            type="checkbox"
            id="available"
            name="available"
            onChange={(e) => onChangeProduct(e)}
            checked={defaultProduct.available}
          />
          <Label htmlFor="available">موجود</Label>
        </InputContainer>
        <span className="col-span-full">
          <InputContainer column>
            <Label htmlFor="description">توضیحات</Label>
            <Input
              title="توضیحات"
              type="textarea"
              id="description"
              name="description"
              rows={6}
              onChange={(e) => onChangeProduct(e)}
              value={defaultProduct.description}
            />
          </InputContainer>
        </span>
        <span className="col-span-full">
          <InputContainer column>
            <Label htmlFor="meta_description">متا توضیحات</Label>
            <Input
              title="متا توضیحات"
              type="textarea"
              id="meta_description"
              name="meta_description"
              rows={6}
              onChange={(e) => onChangeProduct(e)}
              value={defaultProduct.meta_description}
            />
          </InputContainer>
        </span>
        <div className="flex justify-end gap-4 flex-wrap col-span-full">
          {defaultProduct.product_id !== "" ? (
            <>
              <Button
                title="cancel"
                variant="error"
                onClick={() => onClickCancelProduct()}
                StartIcon={IoMdCloseCircleOutline}
              >
                بستن دسته بندی
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudProduct}
                loadingChild={"در حال بروزرسانی اطلاعات"}
                disabled
              >
                اطلاع بروز است
              </Button>
            </>
          ) : (
            <>
              <Button
                title="ایجاد محصول"
                variant="success"
                StartIcon={IoIosAddCircleOutline}
                onClick={() => onClickCreateProduct()}
              >
                ایجاد محصول
              </Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}
