import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";
import { ReadMenuCategoryDetailViewModel } from "@/Common/Connection/Api/ViewModels/Menu.Service.ViewModel";
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
import { AccountContext } from "@/Contexts/Account.Context";
import { useChangeTimer } from "@/Hooks/UseChangeTimer.Hook";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoIssueClosed } from "react-icons/go";
import { IoIosAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

export default function CreateMenuCategory() {
  const setting = useContext(AccountContext);

  const baseDefaultCategory: ReadMenuCategoryDetailViewModel = useMemo(
    () => ({
      Description: "",
      Icon: "",
      Id: "",
      IsShowMenu: true,
      MetaDescription: "",
      Name: "",
      MetaTitle: "",
      Products: [],
    }),
    [],
  );

  const [defaultCategory, setDefaultCategory] = useState(baseDefaultCategory);

  //#region use effect

  useEffect(() => {
    const fetchData = async () => {
      if (setting?.categoryMenu.state) {
        const res = await FetchApi.Menu.ReadMenuCategoryDetail({
          Id: setting.categoryMenu.state,
        });

        setDefaultCategory(res);
      }
    };
    fetchData();
  }, []);

  const [cloudCategory, setSaveChangeCategory] = useChangeTimer(async () => {
    const access_token = sessionStorage.getItem("access_token") || "";
    const res = await FetchApi.Menu.UpdateMenuCategory({
      AccessToken: access_token,
      Name: defaultCategory.Name,
      Id: defaultCategory.Id,
      Icon: defaultCategory.Icon,
      Description: defaultCategory.Description,
      IsShowMenu: defaultCategory.IsShowMenu,
      MetaDescription: defaultCategory.MetaDescription,
      MetaTitle: defaultCategory.MetaTitle,
    });

    return res.Update;
  }, [defaultCategory]);

  //#endregion

  const onChangeCategory = (e: any) => {
    setDefaultCategory((val) => ({
      ...val,
      [e.target.name]: giveValueInput(e),
    }));
    if (defaultCategory.Id) {
      setSaveChangeCategory(true);
    }
  };

  //#region on click

  const onClickCancelCategory = () => {
    setDefaultCategory(baseDefaultCategory);
    setting?.categoryMenu.setState("");
    setting?.dashboard.setState(EDashboard.READ_MENU_CATEGORY);
  };

  const onClickCreateCategory = async () => {
    const access_token = sessionStorage.getItem("access_token") || "";

    await FetchApi.Menu.CreateMenuCategory({
      AccessToken: access_token,
      Name: defaultCategory.Name,
      Icon: defaultCategory.Icon,
      Description: defaultCategory.Description,
      IsShowMenu: defaultCategory.IsShowMenu,
      MetaTitle: defaultCategory.MetaTitle,
      MetaDescription: defaultCategory.MetaDescription,
    });

    setDefaultCategory(baseDefaultCategory);
    setting?.categoryMenu.setState("");
    setting?.dashboard.setState(EDashboard.READ_MENU_CATEGORY);
  };

  //#endregion

  return (
    <>
      <Box variant="primary">
        <H size={2}>دسته بندی های منو</H>
      </Box>
      <Form variant="secondary">
        <div className="flex justify-center">
          <img
            src={`${EServerRoute.HOST}${defaultCategory.Icon}`}
            alt={defaultCategory.Name}
            className="w-40 h-40 object-contain"
            loading="lazy"
          />
        </div>
        <InputContainer column>
          <Label>مسیر عکس</Label>
          <Input
            title="مسیر عکس"
            type="text"
            id="Icon"
            name="Icon"
            onChange={(e) => onChangeCategory(e)}
            value={defaultCategory.Icon}
            onFocus={(e) => e.target.select()}
            dir="ltr"
          />
        </InputContainer>
        <InputContainer column>
          <Label>نام دسته بندی</Label>
          <Input
            title="نام دسته بندی"
            type="text"
            id="Name"
            name="Name"
            onChange={(e) => onChangeCategory(e)}
            onFocus={(e) => e.target.select()}
            value={defaultCategory.Name}
          />
        </InputContainer>
        <InputContainer column>
          <Label>توضیح دسته بندی</Label>
          <Input
            title="توضیح دسته بندی"
            type="textarea"
            id="Description"
            name="Description"
            onChange={(e) => onChangeCategory(e)}
            onFocus={(e) => e.target.select()}
            value={defaultCategory.Description}
          />
        </InputContainer>
        <InputContainer>
          <Input
            title="نمایش در منو"
            type="checkbox"
            id="IsShowMenu"
            name="IsShowMenu"
            onChange={(e) => onChangeCategory(e)}
            checked={defaultCategory.IsShowMenu}
          />
          <Label htmlFor="IsShowMenu">نمایش در منو</Label>
        </InputContainer>
        <InputContainer column>
          <Label>متا تایتل دسته بندی</Label>
          <Input
            title="متا تایتل دسته بندی"
            type="text"
            id="MetaTitle"
            name="MetaTitle"
            onChange={(e) => onChangeCategory(e)}
            onFocus={(e) => e.target.select()}
            value={defaultCategory.MetaTitle}
          />
        </InputContainer>
        <InputContainer column>
          <Label>متا توضیحات دسته بندی</Label>
          <Input
            title="متا توضیحات دسته بندی"
            type="textarea"
            id="MetaDescription"
            name="MetaDescription"
            onChange={(e) => onChangeCategory(e)}
            onFocus={(e) => e.target.select()}
            value={defaultCategory.MetaDescription}
          />
        </InputContainer>
        <div className="flex justify-end gap-4 flex-wrap">
          {defaultCategory.Id ? (
            <>
              <Button
                title=""
                variant="error"
                StartIcon={IoMdCloseCircleOutline}
                onClick={() => onClickCancelCategory()}
              >
                بستن دسته بندی
              </Button>
              <Button
                title="تغییرات ثبت شده"
                variant="success"
                StartIcon={GoIssueClosed}
                loading={!cloudCategory}
                loadingChild={"در حال بروزرسانی اطلاعات"}
                disabled
              >
                اطلاع بروز است
              </Button>
            </>
          ) : (
            <>
              <Button
                title=""
                variant="success"
                StartIcon={IoIosAddCircleOutline}
                onClick={() => onClickCreateCategory()}
              >
                ایجاد دسته بندی
              </Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
}
