import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import {
  ReadMenuDetailViewModel,
  ReadMenuProductDetailViewModel,
} from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
import {
  ReadMenuSnapFoodViewModel,
  ReadMenuTapsiFoodViewModel,
} from "@/Common/Connection/Api/ViewModels/Service.Service.ViewModel";
import { EDashboard } from "@/Common/Enums/Dashboard";
import { EServerRoute } from "@/Common/Enums/ServerRout";
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
import { Option, Select } from "@/Components/Element/Select";
import { AccountContext } from "@/Contexts/Account.Context";
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateMenuProduct() {
  const setting = useContext(AccountContext);

  const baseDefaultProduct: ReadMenuProductDetailViewModel = useMemo(
    () => ({
      CategoryId: "",
      CategoryName: "",
      Description: "",
      Id: "",
      IsShowMenu: true,
      MetaDescription: "",
      MetaTitle: "",
      Name: "",
      Price: 0,
      SnapId: "",
      SrcImage: "",
      TapsiId: "",
      Waiting: 0,
    }),
    [],
  );

  const [defaultProduct, setDefaultProduct] = useState(baseDefaultProduct);
  const [getList, setGetList] = useState(true);
  const [menu, setMenu] = useState<Array<ReadMenuDetailViewModel>>([]);
  const [dataMatchSnap, setDataMatchSnap] = useState<ReadMenuSnapFoodViewModel>(
    () => ({ AllProduct: [], Match: [], NotMatch: [] }),
  );
  const [dataMatchTapsi, setDataMatchTapsi] =
    useState<ReadMenuTapsiFoodViewModel>(() => ({
      AllProduct: [],
      Match: [],
      NotMatch: [],
    }));

  useEffect(() => {
    const fetchData = async () => {
      const resSnap = await FetchApi.OnlineShop.ReadMenuSnapFood();

      setDataMatchSnap(resSnap);

      const resTapsi = await FetchApi.OnlineShop.ReadMenuTapsiFood();

      setDataMatchTapsi(resTapsi);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (getList) {
      const fetchMenu = async () => {
        if (setting?.productMenu.state) {
          const resProduct = await FetchApi.Menu.ReadMenuProductDetail({
            Id: setting?.productMenu.state || "",
          });

          console.log(resProduct);

          setDefaultProduct(resProduct);
        }

        const resMenu = await FetchApi.Menu.ReadMenuDetail({});

        setMenu(resMenu);
        setGetList(false);
      };
      fetchMenu();
    }
  }, [getList]);

  const [cloudProduct, setSaveChangeProduct] = useChangeTimer(async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    console.log({
      AccessToken: access_token,
      Id: defaultProduct.Id,
      IsShowMenu: defaultProduct.IsShowMenu,
      SrcImage: defaultProduct.SrcImage,
      Name: defaultProduct.Name,
      Description: defaultProduct.Description,
      MetaTitle: defaultProduct.MetaTitle,
      MetaDescription: defaultProduct.MetaDescription,
      Price: defaultProduct.Price,
      Waiting: defaultProduct.Waiting,
      SnapId: defaultProduct.SnapId,
      TapsiId: defaultProduct.TapsiId,
      CategoryId: defaultProduct.CategoryId,
    });

    const res = await FetchApi.Menu.UpdateMenuProduct({
      AccessToken: access_token,
      Id: defaultProduct.Id,
      IsShowMenu: defaultProduct.IsShowMenu,
      SrcImage: defaultProduct.SrcImage,
      Name: defaultProduct.Name,
      Description: defaultProduct.Description,
      MetaTitle: defaultProduct.MetaTitle,
      MetaDescription: defaultProduct.MetaDescription,
      Price: defaultProduct.Price,
      Waiting: defaultProduct.Waiting,
      SnapId: defaultProduct.SnapId,
      TapsiId: defaultProduct.TapsiId,
      CategoryId: defaultProduct.CategoryId,
    });

    return res.Update;
  }, [defaultProduct]);

  const onChangeProduct = (e: any) => {
    setDefaultProduct((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));

    if (defaultProduct.Id) {
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

    await FetchApi.Menu.CreateMenuProduct({
      AccessToken: access_token,
      CategoryId: defaultProduct.CategoryId,
      IsShowMenu: defaultProduct.IsShowMenu,
      Description: defaultProduct.Description,
      MetaDescription: defaultProduct.MetaDescription,
      MetaTitle: defaultProduct.MetaTitle,
      Name: defaultProduct.Name,
      Price: defaultProduct.Price,
      SrcImage: defaultProduct.SrcImage,
      Waiting: defaultProduct.Waiting,
      SnapId: defaultProduct.SnapId,
      TapsiId: defaultProduct.TapsiId,
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
            src={`${EServerRoute.HOST}${defaultProduct.SrcImage}`}
            alt={defaultProduct.Name}
            className="w-40 h-40 object-contain"
            loading="lazy"
          />
        </div>
        <InputContainer column>
          <Label htmlFor="SrcImage">مسیر عکس</Label>
          <Input
            title="مسیر عکس"
            type="text"
            id="SrcImage"
            name="SrcImage"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.SrcImage}
            dir="ltr"
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="MetaTitle">متا تایتل</Label>
          <Input
            title="متا تایتل"
            type="text"
            id="MetaTitle"
            name="MetaTitle"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.MetaTitle}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="Name">نام محصول</Label>
          <Input
            title="نام محصول"
            type="text"
            id="Name"
            name="Name"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.Name}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="SnapId">شناسه اسنپ</Label>
          <Input
            title="لینک اسنپ"
            type="text"
            id="SnapId"
            name="SnapId"
            list="list-product-snap"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.SnapId || ""}
            onFocus={(e) => e.target.select()}
          />
          <datalist id="list-product-snap">
            {dataMatchSnap?.AllProduct?.map((val) => (
              <option value={val.Id} key={val.Id}>
                {val.Title}
              </option>
            ))}
          </datalist>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="TapsiId">شناسه تپسی</Label>
          <Input
            title="لینک تپسی"
            type="text"
            id="TapsiId"
            name="TapsiId"
            list="list-product-tapsi"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.TapsiId || ""}
          />
          <datalist id="list-product-tapsi">
            {dataMatchTapsi?.AllProduct?.map((val) => (
              <option value={val.Id} key={val.Id}>
                {val.Title}
              </option>
            ))}
          </datalist>
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="Price">قیمت</Label>
          <Input
            title="قیمت"
            type="number"
            id="Price"
            name="Price"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.Price}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="Waiting">مدت انتظار</Label>
          <Input
            title="مدت انتظار"
            type="number"
            id="Waiting"
            name="Waiting"
            onChange={(e) => onChangeProduct(e)}
            value={defaultProduct.Waiting}
            onFocus={(e) => e.target.select()}
          />
        </InputContainer>
        <InputContainer column>
          <Label htmlFor="CategoryId">دسته بندی</Label>
          <Select
            name="CategoryId"
            title="CategoryId"
            id="CategoryId"
            onChange={(e) => onChangeProduct(e)}
            grow
            value={defaultProduct.CategoryId}
          >
            {menu.map((val, i) => (
              <Option value={val.Id} key={i}>
                {val.Name}
              </Option>
            ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Input
            title="موجود"
            type="checkbox"
            id="IsShowMenu"
            name="IsShowMenu"
            onChange={(e) => onChangeProduct(e)}
            checked={defaultProduct.IsShowMenu}
          />
          <Label htmlFor="available">موجود</Label>
        </InputContainer>
        <span className="col-span-full">
          <InputContainer column>
            <Label htmlFor="Description">توضیحات</Label>
            <Input
              title="توضیحات"
              type="textarea"
              id="Description"
              name="Description"
              rows={6}
              onChange={(e) => onChangeProduct(e)}
              value={defaultProduct.Description}
              onFocus={(e) => e.target.select()}
            />
          </InputContainer>
        </span>
        <span className="col-span-full">
          <InputContainer column>
            <Label htmlFor="MetaDescription">متا توضیحات</Label>
            <Input
              title="متا توضیحات"
              type="textarea"
              id="MetaDescription"
              name="MetaDescription"
              rows={6}
              onChange={(e) => onChangeProduct(e)}
              value={defaultProduct.MetaDescription}
              onFocus={(e) => e.target.select()}
            />
          </InputContainer>
        </span>
        <div className="flex justify-end gap-4 flex-wrap col-span-full">
          {defaultProduct.Id !== "" ? (
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
